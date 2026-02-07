'use server'

import { createClient } from '@/utils/supabase/server';
import { ticketSchema, TicketFormValues, commentSchema, CommentFormValues } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function createTicket(formData: TicketFormValues) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const validatedFields = ticketSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { title, description, status, priority, assignee_id, project_id } = validatedFields.data;

    // Check if user is member of project (optional but good for security)
    // RLS handles the DB insert permission, but fail fast here is fine.

    const { data, error } = await supabase
        .from('tickets')
        .insert({
            title,
            description,
            status,
            priority,
            assignee_id: assignee_id || null,
            project_id,
            reporter_id: user.id
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating ticket:', error);
        return { error: 'Failed to create ticket' };
    }

    revalidatePath(`/dashboard/projects/${project_id}`);
    return { success: true, data };
}

export async function updateTicketStatus(id: string, status: 'todo' | 'in-progress' | 'done', projectId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('tickets')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('Error updating ticket status:', error);
        return { error: 'Failed to update ticket status' };
    }

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}

export async function updateTicketOrder(items: { id: string; position: number; status: 'todo' | 'in-progress' | 'done' }[], projectId: string) {
    const supabase = await createClient();

    // Perform bulk update using upsert logic or individual updates
    // Supabase JS doesn't support bulk update with different values easily in one call unless we use an RPC or multiple calls.
    // For simplicity with few items, parallel requests are fine.

    const updates = items.map(item =>
        supabase
            .from('tickets')
            .update({ position: item.position, status: item.status })
            .eq('id', item.id)
    );

    const results = await Promise.all(updates);

    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
        console.error('Error updating ticket order:', errors);
        return { error: 'Failed to update specific tickets' };
    }

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}

export async function getTickets(projectId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('tickets')
        .select(`
            *,
            assignee:profiles!tickets_assignee_id_fkey(full_name, avatar_url),
            reporter:profiles!tickets_reporter_id_fkey(full_name, avatar_url)
        `)
        .eq('project_id', projectId)
        .order('position', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching tickets:', JSON.stringify(error, null, 2));
        return [];
    }

    return data;
}

export async function addComment(formData: CommentFormValues) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'User not authenticated' };
    }

    const validatedFields = commentSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { content, ticket_id } = validatedFields.data;

    const { data, error } = await supabase
        .from('comments')
        .insert({
            content,
            ticket_id,
            user_id: user.id
        })
        .select()
        .single();

    if (error) {
        console.error('Error adding comment:', error);
        return { error: 'Failed to add comment' };
    }

    // We might need to know the project_id to revalidate the board/ticket view
    // For now we can revalidate logic later or rely on client fetching for comments
    // Or fetch the ticket to get project_id.

    return { success: true, data };
}

export async function getComments(ticketId: string) {
    const supabase = await createClient();

    // Check if user is authenticated if needed, or rely on RLS
    // RLS usually allows view if member of project.

    const { data, error } = await supabase
        .from('comments')
        .select(`
            id,
            content,
            created_at,
            user:profiles(full_name, avatar_url)
        `)
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }

    return data;
}
