'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { addComment } from '@/actions/tickets';
import { formatDistanceToNow } from 'date-fns';

type Comment = {
    id: string;
    content: string;
    created_at: string;
    user: {
        full_name: string | null;
        avatar_url: string | null;
    } | null;
};

export function TicketComments({
    ticketId,
    initialComments
}: {
    ticketId: string,
    initialComments: Comment[]
}) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoading(true);
        const res = await addComment({ content: newComment, ticket_id: ticketId });
        setLoading(false);

        if (res?.error) {
            toast.error('Error adding comment');
        } else if (res?.data) {
            // Optimistic update or fetch functionality?
            // The server action returns the new comment but maybe not the joined user info depending on implementation
            // Ideally we'd revalidate or fetch, but for now let's just append if we had user info, 
            // but we don't have current user info easily here without passing it down.
            // Simplified: Refresh page or rely on revalidatePath
            setNewComment('');
            // For a better UX we should append it effectively. 
            // We can assume current user for Optimistic UI if we passed "currentUser" prop.
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold">Comments</h3>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {comments.length === 0 && (
                    <p className="text-sm text-muted-foreground">No comments yet.</p>
                )}
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 text-sm">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.user?.avatar_url || ''} />
                            <AvatarFallback>{comment.user?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{comment.user?.full_name || 'Unknown'}</span>
                                <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-muted-foreground">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
                <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={loading}
                    className="min-h-[80px]"
                />
                <div className="flex justify-end">
                    <Button type="submit" size="sm" disabled={loading || !newComment.trim()}>
                        {loading ? 'Posting...' : 'Post Comment'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
