import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { CreateTaskForm } from "./create-task-form";

interface CreateTaskFormWrapperProps {
	onCancel?: () => void;
}

export const CreateTaskFormWrapper = ({ onCancel }: CreateTaskFormWrapperProps) => {
	const workspaceId = useWorkspaceId();

	const { data: projects, isLoading: isLoadingProject } = useGetProjects({ workspaceId });
	const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

	const projectOptions = projects?.documents?.map((el) => ({
		id: el.$id,
		name: el.name,
		imageUrl: el.imageUrl,
	}));

	const memberOptions = members?.documents?.map((el) => ({
		id: el.$id,
		name: el.name,
	}));

	const isLoading = isLoadingMembers || isLoadingProject;

	if (isLoading) {
		return (
			<Card className="w-full h-[714px] border-none shadow-none">
				<CardContent className="flex items-center justify-center h-full">
					<Loader className="size-5 animate-spin text-muted-foreground" />
				</CardContent>
			</Card>
		);
	}

	return (
		<CreateTaskForm
			onCancel={onCancel}
			projectOptions={projectOptions ?? []}
			memberOptions={memberOptions ?? []}
		/>
	);
};
