"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "./ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

export const WorkspaceSwitcher = () => {
	const { data: workspaces } = useGetWorkspaces();
	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex justify-between items-center">
				<p className="text-xs uppercase text-neutral-500">Workspaces</p>

				<RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-70 transition" />
			</div>

			<Select>
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
