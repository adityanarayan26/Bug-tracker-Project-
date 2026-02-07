import { z } from 'zod';

export const projectSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
});

export const ticketSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(['todo', 'in-progress', 'done']).default('todo'),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
    assignee_id: z.string().optional().nullable(),
    project_id: z.string().uuid(),
});

export const commentSchema = z.object({
    content: z.string().min(1, 'Comment cannot be empty'),
    ticket_id: z.string().uuid(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
export type TicketFormValues = z.infer<typeof ticketSchema>;
export type CommentFormValues = z.infer<typeof commentSchema>;
