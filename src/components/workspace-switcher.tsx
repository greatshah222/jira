"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "./ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const WorkspaceSwitcher = () => {
	const workspaceId = useWorkspaceId();

	const { data: workspaces } = useGetWorkspaces();
	const { open } = useCreateWorkspaceModal();

	const router = useRouter();

	const onSelect = (id: string) => {
		router.push(`/workspaces/${id}`);
	};
	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex justify-between items-center">
				<p className="text-xs uppercase text-neutral-500">Workspaces</p>

				<RiAddCircleFill
					className="size-5 text-neutral-500 cursor-pointer hover:opacity-70 transition"
					onClick={open}
				/>
			</div>

			<Select onValueChange={onSelect} value={workspaceId}>
				<SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
					<SelectValue placeholder="No workspace selected"></SelectValue>
				</SelectTrigger>

				<SelectContent>
					{workspaces?.documents?.map((el) => (
						<SelectItem key={el?.$id} value={el?.$id}>
							<div className="flex justify-start items-center gap-3 font-medium">
								<WorkspaceAvatar name={el?.name} image={el?.imageUrl} />

								<span className="truncate">{el?.name}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
