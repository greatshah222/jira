"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Task, TaskStatus } from "../types";
import { KanbanColumnHeader } from "./kanban-column-header";

const boards: TaskStatus[] = [
	TaskStatus.BACKLOG,
	TaskStatus.TODO,
	TaskStatus.IN_PROGRESS,
	TaskStatus.IN_REVIEW,
	TaskStatus.DONE,
];

type TasksState = {
	[key in TaskStatus]: Task[];
};

interface DataKanbanProps {
	data: Task[];
	onChange: (tasks: { $id: string; status: TaskStatus; position: number }[]) => void;
}
export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
	const [tasks, setTasks] = useState<TasksState>(() => {
		const initialTasks: TasksState = {
			[TaskStatus.BACKLOG]: [],
			[TaskStatus.TODO]: [],
			[TaskStatus.IN_PROGRESS]: [],
			[TaskStatus.IN_REVIEW]: [],
			[TaskStatus.DONE]: [],
		};

		console.log("data", data);
		console.log("initialTasks", initialTasks);

		data.forEach((task) => {
			initialTasks[task.status].push(task);
		});

		Object.keys(initialTasks).forEach((status) => {
			initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
		});

		return initialTasks;
	});
	return (
		<DragDropContext onDragEnd={() => {}}>
			<div className="flex overflow-x-auto">
				{boards?.map((el) => {
					return (
						<div className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]" key={el}>
							<KanbanColumnHeader board={el} taskCount={tasks[el]?.length} />
						</div>
					);
				})}
			</div>
		</DragDropContext>
	);
};
