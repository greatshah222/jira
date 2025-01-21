"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hook/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

const Projects = () => {
	const workspaceId = useWorkspaceId();

	const { data, isPending } = useGetProjects({ workspaceId });

	const pathname = usePathname();
	const { open } = useCreateProjectModal();

	console.log("data", data);
	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex justify-between items-center">
				<p className="text-xs uppercase text-neutral-500">Projects</p>

				<RiAddCircleFill
					className="size-5 text-neutral-500 cursor-pointer hover:opacity-70 transition"
					onClick={() => {
						open();
					}}
				/>
			</div>

			{data?.documents?.map((el) => {
				const href = `/workspaces/${workspaceId}/projects/${el?.$id}`;
				const isActive = pathname === href;

				return (
					<Link href={href} key={el?.$id}>
						<div
							className={cn(
								"flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition  cursor-pointer text-neutral-500",
								isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
							)}
						>
							<ProjectAvatar name={el?.name} image={el?.imageUrl} />
							<span className="truncate">{el?.name}</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Projects;
