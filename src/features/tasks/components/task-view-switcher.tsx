"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, PlusIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban";
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";
import { TaskStatus } from "../types";
import { DataCalendar } from "./data-calendar";

export const TaskViewSwitcher = ({ hideProjectFilter }: { hideProjectFilter?: boolean }) => {
	const { open } = useCreateTaskModal();
	const workspaceId = useWorkspaceId();

	const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();

	const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
		workspaceId,
		status,
		assigneeId,
		projectId,
		dueDate,
	});

	const [view, setView] = useQueryState("task-view", {
		defaultValue: "table",
	});
	const { mutate: bulkUpdate } = useBulkUpdateTasks();

	const onKanbanChange = useCallback(
		(tasks: { $id: string; status: TaskStatus; position: number }[]) => {
			bulkUpdate({
				json: { tasks },
			});
		},
		[bulkUpdate]
	);

	console.log("tasks", tasks, isLoadingTasks);

	return (
		<Tabs className="flex-1 w-full border rounded-lg" defaultValue={view} onValueChange={setView}>
			<div className="h-full flex flex-col overflow-auto p-4">
				<div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
					<TabsList className="w-full lg:w-auto">
						<TabsTrigger className="h-8 w-full lg:w-auto" value="table">
							Table
						</TabsTrigger>
						<TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
							Kanban
						</TabsTrigger>
						<TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
							Calendar
						</TabsTrigger>
					</TabsList>

					<Button size={"sm"} className="w-full lg:w-auto" onClick={() => open()}>
						<PlusIcon className="size-4 mr-2" />
						New
					</Button>
				</div>
				<DottedSeparator className="my-4" />
				<DataFilters hideProjectFilter={hideProjectFilter} />
				<DottedSeparator className="my-4" />
				{isLoadingTasks ? (
					<div className="flex flex-col items-center justify-center w-full border rounded-lg h-[200px]">
						<Loader2 className="animate-spin size-5 text-muted-foreground" />
					</div>
				) : (
					<>
						<TabsContent value="table" className="mt-0">
							<DataTable columns={columns} data={tasks?.documents ?? []} />
						</TabsContent>
						<TabsContent value="kanban" className="mt-0">
							<DataKanban data={tasks?.documents ?? []} onChange={onKanbanChange} />
						</TabsContent>
						<TabsContent value="calendar" className="mt-0">
							<DataCalendar data={tasks?.documents ?? []} />
						</TabsContent>
					</>
				)}
			</div>
		</Tabs>
	);
};
