import { createClient } from "@/utils/supabase/server";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CreateProjectModal } from "./_components/create-project-modal";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // Fetch projects user is a member of with member count
    // note: relying on RLS policy: "Users can view projects they are member of"
    const { data: projects, error } = await supabase
        .from("projects")
        .select("*, project_members(count)")
        .order("created_at", { ascending: false });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
                <CreateProjectModal userId={user.id} />
            </div>

            {projects?.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <Plus className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No projects created</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        You haven't created any projects yet. Start by creating one.
                    </p>
                    <CreateProjectModal userId={user.id} />
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects?.map((project) => (
                        <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                            <Card className="transition-all hover:bg-muted/50 cursor-pointer h-full">
                                <CardHeader>
                                    <CardTitle>{project.name}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {project.description || "No description provided."}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Users className="h-3.5 w-3.5" />
                                        <span>{project.project_members?.[0]?.count ?? 0} members</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">View Board &rarr;</span>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
