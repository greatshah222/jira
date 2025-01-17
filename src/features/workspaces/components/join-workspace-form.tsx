"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
	initialValues: {
		name: string;
	};
}

export const JoinWorkspaceForm = ({ initialValues: { name } }: JoinWorkspaceFormProps) => {
	const inviteCode = useInviteCode();
	const workspaceId = useWorkspaceId();
	const router = useRouter();

	const { mutate, isPending } = useJoinWorkspace();

	const onSubmit = () => {
		mutate(
			{
				param: {
					workspaceId,
				},
				json: {
					code: inviteCode,
				},
			},
			{
				onSuccess: ({ data }) => {
					router.push(`/workspaces/${data?.$id}`);
				},
			}
		);
	};
	return (
		<Card className="w-full h-full border-none shadow-none">
			<CardHeader className="p-7">
				<CardTitle className="text-xl font-bold">Join workspace</CardTitle>
				<CardDescription>
					You have been invited to join <strong>{name}</strong>
				</CardDescription>
			</CardHeader>

			<div className="px-7">
				<DottedSeparator />

				<CardContent className="p-7">
					<div className="flex  flex-col lg:flex-row items-center justify-between gap-2">
						<Button
							size={"lg"}
							variant={"secondary"}
							type="button"
							asChild
							className="w-full lg:w-fit"
							disabled={isPending}
						>
							<Link href="/">Cancel</Link>
						</Button>
						<Button
							size={"lg"}
							className="w-full lg:w-fit"
							type="button"
							disabled={isPending}
							onClick={onSubmit}
						>
							Join workspace
						</Button>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};
