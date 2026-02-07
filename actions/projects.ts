'use server'

import { createClient } from '@/utils/supabase/server';
import { projectSchema, ProjectFormValues } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: ProjectFormValues) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const validatedFields = projectSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { name, description } = validatedFields.data;

    const { data, error } = await supabase
        .from('projects')
        .insert({
            name,
            description,
            owner_id: user.id
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating project:', error);
        return { error: 'Failed to create project' };
    }

    revalidatePath('/dashboard');
    return { success: true, data };
}

export async function getProjects() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Logic: fetch projects where user is owner OR member
    // The RLS policy "Users can view projects they are member of" handles this
    // assuming RLS is set up correctly as per schema.
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data;
}

export async function getProject(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching project:', error);
        return null;
    }

    return data;
}

export async function inviteUser(email: string, projectId: string) {
    const supabase = await createClient();

    // 1. Get current user to check permissions
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return { error: 'Not authenticated' };

    // 2. Find the user to invite by email
    const { data: userToInvite } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

    if (!userToInvite) {
        return { error: 'User not found. They must sign up first.' };
    }

    // 3. Add to project_members
    const { error } = await supabase
        .from('project_members')
        .insert({
            project_id: projectId,
            user_id: userToInvite.id,
            role: 'member'
        });

    if (error) {
        if (error.code === '23505') { // Unique violation
            return { error: 'User is already a member.' };
        }
        console.error('Error inviting user:', error);
        return { error: 'Failed to invite user.' };
    }

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}
