'use client';

import { useState, useEffect } from 'react';
import { KanbanBoard, TicketType } from "@/components/KanbanBoard";
import { CreateTicketModal } from "./create-ticket-modal";
import { InviteMemberModal } from "./invite-member-modal";
import { FilterBar } from "@/components/FilterBar";
import { createClient } from "@/utils/supabase/client";

type Project = {
    id: string;
    name: string;
    description: string | null;
};

export function ProjectContent({
    project,
    tickets,
}: {
    project: Project;
    tickets: TicketType[];
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [channel, setChannel] = useState<any>(null);

    // Set up broadcast channel for ticket creation
    useEffect(() => {
        const supabase = createClient();
        const channelName = `project-${project.id}`;

        const newChannel = supabase.channel(channelName, {
            config: { broadcast: { self: false } }
        });

        newChannel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                setChannel(newChannel);
            }
        });

        return () => {
            supabase.removeChannel(newChannel);
        };
    }, [project.id]);

    // Broadcast new ticket to other clients
    const handleTicketCreated = async (ticket: TicketType) => {
        if (channel) {
            await channel.send({
                type: 'broadcast',
                event: 'ticket-create',
                payload: { ticket }
            });
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
            <div className="flex items-center justify-between border-b pb-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold">{project.name}</h1>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <InviteMemberModal projectId={project.id} />
                    <CreateTicketModal projectId={project.id} onTicketCreated={handleTicketCreated} />
                </div>
            </div>

            {/* Filter Bar */}
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
            />

            <div className="flex-1 overflow-y-auto">
                <KanbanBoard
                    initialTickets={tickets}
                    projectId={project.id}
                    searchQuery={searchQuery}
                    priorityFilter={priorityFilter}
                    statusFilter={statusFilter}
                />
            </div>
        </div>
    );
}
