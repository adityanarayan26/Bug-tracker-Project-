import { notFound } from "next/navigation";
import { getTickets } from "@/actions/tickets";
import { getProject } from "@/actions/projects";
import { ProjectContent } from "./_components/project-content";
import { createClient } from "@/utils/supabase/server";

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

    // Fetch tickets
    const tickets = await getTickets(id);

    // Fetch member count
    const supabase = await createClient();
    const { count: memberCount } = await supabase
        .from("project_members")
        .select("*", { count: "exact", head: true })
        .eq("project_id", id);

    return (
        <ProjectContent
            project={project}
            tickets={tickets as any}
            memberCount={memberCount ?? 0}
        />
    );
}
