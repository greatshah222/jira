"use client";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
export const WorkspaceIdJoinClient = () => {
	const workspaceId = useWorkspaceId();
	const { data: initialValues, isLoading } = useGetWorkspaceInfo({
		workspaceId,
	});

	if (isLoading) return null;

	if (!initialValues) return null;

	return (
		<div className="w-full lg:max-w-xl">
			<JoinWorkspaceForm initialValues={initialValues} />
		</div>
	);
};
