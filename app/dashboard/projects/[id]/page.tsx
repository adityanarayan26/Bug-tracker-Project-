import { notFound } from "next/navigation";
import { getTickets } from "@/actions/tickets";
import { getProject } from "@/actions/projects";
import { ProjectContent } from "./_components/project-content";

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

    return (
        <ProjectContent
            project={project}
            tickets={tickets as any}
        />
    );
}
