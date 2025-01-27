"use client";

import Link from "next/link";
import { Fragment } from "react";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";

import { MemberRole } from "@/features/members/types";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { Separator } from "@/components/ui/separator";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageLoader } from "@/components/page-loader";

export const MembersList = () => {
	const workspaceId = useWorkspaceId();

	const [ConfirmDialog, confirm] = useConfirm(
		"Remove member",
		"This member will be removed from the workspace",
		"destructive"
	);

	const { data, isLoading } = useGetMembers({ workspaceId });

	const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();
	const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember();

	const handleUpdateMember = (memberId: string, role: MemberRole) => {
		updateMember({
			json: { role },
			param: { memberId },
		});
	};

	const handleDeleteMember = async (memberId: string) => {
		const ok = await confirm();
		if (!ok) return;

		deleteMember(
			{ param: { memberId } },
			{
				onSuccess: () => {
					window.location.reload();
				},
			}
		);
	};
	if (isLoading) return <PageLoader />;

	return (
		<>
			<ConfirmDialog />

			<Card className="w-full h-full border-none shadow-none">
				<CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
					<Button asChild variant="secondary" size="sm">
						<Link href={`/workspaces/${workspaceId}`}>
							<ArrowLeftIcon className="size-4 mr-2" />
							Back
						</Link>
					</Button>

					<CardTitle className="text-xl font-bold">Members list</CardTitle>
				</CardHeader>
				<div className="px-7">
					<DottedSeparator />
				</div>

				<CardContent className="p-7">
					{data?.documents?.map((el, index) => (
						<Fragment key={el.$id}>
							<div className="flex items-center gap-2">
								<MemberAvatar className="size-10" fallbackClassName="text-lg" name={el.name} />

								<div className="flex flex-col">
									<p className="text-sm font-medium">{el?.name}</p>
									<p className="text-xs text-muted-foreground">{el?.email}</p>
								</div>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button className="ml-auto" variant={"secondary"} size="icon">
											<MoreVerticalIcon className="size-4 to-muted-foreground" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent side="bottom" align="end">
										<DropdownMenuItem
											onClick={() => handleUpdateMember(el.$id, MemberRole.ADMIN)}
											disabled={isDeletingMember || isUpdatingMember}
											className="font-medium"
										>
											Set as Admin
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => handleUpdateMember(el.$id, MemberRole.MEMBER)}
											disabled={isDeletingMember || isUpdatingMember}
											className="font-medium"
										>
											Set as Member
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												handleDeleteMember(el.$id);
											}}
											disabled={isDeletingMember || isUpdatingMember}
											className="font-medium text-amber-700"
										>
											Remove {el.name}
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							{index < data?.documents?.length - 1 && <Separator className="my-2.5" />}
						</Fragment>
					))}
				</CardContent>
			</Card>
		</>
	);
};
