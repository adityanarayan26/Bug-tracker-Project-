import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { KanbanBoard } from "@/components/KanbanBoard";
import { getTickets } from "@/actions/tickets";
import { getProject } from "@/actions/projects";
import { CreateTicketModal } from "./_components/create-ticket-modal";
import { InviteMemberModal } from "./_components/invite-member-modal";

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Fetch project details
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    // Fetch tickets via server action or direct DB query (using server action for consistency with updated types if needed, 
    // but here we can reuse the logic from actions/tickets.ts which does the join)
    const tickets = await getTickets(id);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">
            <div className="flex items-center justify-between border-b pb-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold">{project.name}</h1>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <InviteMemberModal projectId={id} />
                    <CreateTicketModal projectId={id} />
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {/* Needs casting if types strictly don't match, but our action returns compatible structure */}
                <KanbanBoard initialTickets={tickets as any} projectId={id} />
            </div>
        </div>
    );
}
