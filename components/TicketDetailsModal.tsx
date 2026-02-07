'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TicketComments } from "@/components/TicketComments";
import { getComments } from "@/actions/tickets";
import { Separator } from "@/components/ui/separator";

// Reusing types roughly
type TicketType = {
    id: string;
    title: string;
    description: string | null;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignee?: { full_name: string | null; avatar_url: string | null } | null;
    created_at?: string;
};

export function TicketDetailsModal({
    ticket,
    open,
    onOpenChange
}: {
    ticket: TicketType | null,
    open: boolean,
    onOpenChange: (open: boolean) => void
}) {
    const [comments, setComments] = useState<any[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);

    useEffect(() => {
        if (open && ticket) {
            setLoadingComments(true);
            getComments(ticket.id).then(data => {
                setComments(data || []);
                setLoadingComments(false);
            });
        }
    }, [open, ticket]);

    if (!ticket) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between pr-8">
                        <DialogTitle className="text-xl">{ticket.title}</DialogTitle>
                        <Badge variant={ticket.priority === 'high' ? 'destructive' : 'outline'}>
                            {ticket.priority}
                        </Badge>
                    </div>
                    <DialogDescription>
                        In list <span className="font-semibold capitalize">{ticket.status.replace('-', ' ')}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    <div>
                        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Description</h4>
                        <div className="text-sm">
                            {ticket.description || "No description provided."}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Assignee</span>
                            <span className="font-medium">{ticket.assignee?.full_name || 'Unassigned'}</span>
                        </div>
                        {/* Could add reporter info too */}
                    </div>

                    <Separator />

                    {loadingComments ? (
                        <div className="text-sm text-center py-4 text-muted-foreground">Loading comments...</div>
                    ) : (
                        <TicketComments ticketId={ticket.id} initialComments={comments} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
