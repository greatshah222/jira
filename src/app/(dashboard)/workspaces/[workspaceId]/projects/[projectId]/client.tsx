"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useProjectId } from "@/features/projects/hook/use-project-id";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const ProjectIdClient = () => {
	const projectId = useProjectId();
	const { data: project, isPending } = useGetProject({
		projectId,
	});

	const isLoading = isPending;

	if (isLoading) {
		return <PageLoader />;
	}

	if (!project) {
		return <PageError message="Project not found" />;
	}

	console.log("project", project);

	console.log("project", project);
	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<ProjectAvatar name={project.name} image={project.imageUrl} className="size-8" />
					<p className="text-lg font-semibold">{project.name}</p>
				</div>

				<div className="">
					<Button variant={"secondary"} size={"sm"} asChild>
						<Link href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}>
							<PencilIcon className="size-4 mr-2" />
							Edit project
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
