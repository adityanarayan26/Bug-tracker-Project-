'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TicketComments } from "@/components/TicketComments";
import { getComments, deleteTicket } from "@/actions/tickets";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2 } from "lucide-react";
import { EditTicketModal } from "@/app/dashboard/projects/[id]/_components/edit-ticket-modal";

type TicketType = {
    id: string;
    title: string;
    description: string | null;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    project_id: string;
    assignee_id?: string | null;
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
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

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

    async function handleDelete() {
        if (!ticket) return;

        setDeleting(true);
        const result = await deleteTicket(ticket.id, ticket.project_id);
        setDeleting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Ticket deleted successfully');
            setDeleteOpen(false);
            onOpenChange(false);
        }
    }

    return (
        <>
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
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditOpen(true)}
                                className="gap-2"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeleteOpen(true)}
                                className="gap-2 text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        </div>

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

            {/* Edit Modal */}
            <EditTicketModal
                ticket={ticket}
                open={editOpen}
                onOpenChange={setEditOpen}
                onSuccess={() => {
                    // Close the details modal to force refresh
                    onOpenChange(false);
                }}
            />

            {/* Delete Confirmation */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Ticket</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{ticket.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
