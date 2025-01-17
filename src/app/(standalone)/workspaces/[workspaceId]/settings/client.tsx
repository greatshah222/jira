"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceIdSettingsClient = () => {
	const workspaceId = useWorkspaceId();

	const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });

	console.log("initialValues", initialValues);

	if (isLoading) return null;

	if (!initialValues) {
		return null;
	}

	return (
		<div className="w-full lg:max-w-xl">
			<EditWorkspaceForm initialValues={initialValues} />
		</div>
	);
};
