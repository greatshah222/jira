"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "../api/use-create-project";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createProjectSchema } from "../schema";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const CreateProjectForm = ({ onCancel }: { onCancel?: () => void }) => {
	const { mutate, isPending } = useCreateProject();
	const router = useRouter();

	const workspaceId = useWorkspaceId();

	const inputRef = useRef<HTMLInputElement>(null);

	const form = useForm<z.infer<typeof createProjectSchema>>({
		resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
		console.log("values", values);
		const finalValues = {
			...values,
			workspaceId,
			image: values?.image instanceof File ? values.image : "",
		};

		mutate(
			{
				form: finalValues,
			},
			{
				onSuccess: () => {
					form.reset();

					// router.push(`/workspaces/${data?.$id}`);
				},
			}
		);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			form.setValue("image", file);
		}
	};
	return (
		<Card className="w-full h-full border-none shadow-none">
			<CardHeader className="flex p-7">
				<CardTitle className="text-xl font-bold">Create a new project</CardTitle>
			</CardHeader>

			<div className="px-7">
				<DottedSeparator />
			</div>

			<CardContent className="p-7">
				<Form {...form}>
					<form className="" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Project name</FormLabel>

										<FormControl>
											<Input placeholder="Enter Project name" {...field} disabled={isPending} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<div className="flex flex-col gap-y-2">
										<div className="flex items-center gap-x-5">
											{field.value ? (
												<div className="size-[72px] relative rounded-md overflow-hidden">
													<Image
														src={
															field.value instanceof File
																? URL.createObjectURL(field.value)
																: field.value
														}
														alt="Logo"
														fill
														className="object-none"
													/>
												</div>
											) : (
												<Avatar className="size-[72px]">
													<AvatarFallback>
														<ImageIcon className="size-[36px] text-neutral-400" />
													</AvatarFallback>
												</Avatar>
											)}

											<div className="flex flex-col ">
												<p className="text-sm">Project Icon</p>
												<p className="text-sm text-muted-foreground">
													JPG, PNG, SVG or JPEG, max 1mb
												</p>

												<input
													className="hidden"
													accept=".jpg, .png, .jpeg, .svg"
													type="file"
													ref={inputRef}
													disabled={isPending}
													onChange={handleImageChange}
												/>

												{field?.value ? (
													<Button
														type="button"
														variant={"destructive"}
														disabled={isPending}
														size={"xs"}
														className="w-fit mt-2"
														onClick={() => {
															field.onChange(null);
															if (inputRef.current) {
																inputRef.current.value = "";
															}
														}}
													>
														Remove Image
													</Button>
												) : (
													<Button
														type="button"
														variant={"teritary"}
														disabled={isPending}
														size={"xs"}
														className="w-fit mt-2"
														onClick={() => inputRef?.current?.click()}
													>
														Upload Image
													</Button>
												)}
											</div>
										</div>
									</div>
								)}
							/>
						</div>
						<DottedSeparator className="py-7" />

						<div className="flex items-center justify-between">
							<Button
								type="button"
								size={"lg"}
								variant={"secondary"}
								onClick={onCancel}
								disabled={isPending}
								className={cn(!onCancel && "invisible")}
							>
								Cancel
							</Button>

							<Button type="submit" size={"lg"} disabled={isPending}>
								Create Project
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
