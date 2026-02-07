'use client';

import { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { createTicket } from "@/actions/tickets";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TicketType } from '@/components/KanbanBoard';

export function CreateTicketModal({ projectId, onTicketCreated }: { projectId: string; onTicketCreated?: (ticket: TicketType) => void }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            priority: formData.get('priority') as 'low' | 'medium' | 'high',
            status: 'todo' as 'todo', // Default status
            project_id: projectId,
            assignee_id: null // Basic implementation without user search yet
        };

        const res = await createTicket(data);
        setLoading(false);

        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("Ticket created successfully");
            setOpen(false);
            // Broadcast the new ticket to other clients
            if (res.data && onTicketCreated) {
                onTicketCreated(res.data as TicketType);
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Ticket
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Ticket</DialogTitle>
                    <DialogDescription>
                        Add a new task or bug to this project.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Ticket Title"
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                            Priority
                        </Label>
                        <Select name="priority" defaultValue="medium">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Detailed description..."
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Ticket'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
