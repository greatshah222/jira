"use client";
import React from "react";
import Link from "next/link";

import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/features/auth/schema";
import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useLogin } from "../api/use-login";

export const SignInCard = () => {
	const { mutate } = useLogin();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
		mutate({ json: values });
	};

	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none">
			<CardHeader className="flex items-center justify-center text-center p-7">
				<CardTitle className="text-2xl">Welcome back!</CardTitle>
			</CardHeader>

			<div className="px-7 mb-2">
				<DottedSeparator />
			</div>

			<CardContent className="p-7">
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} placeholder="Enter email address" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} type="password" placeholder="Enter password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={false} size={"lg"} className="w-full">
							Login
						</Button>
					</form>
				</Form>
			</CardContent>

			<CardContent className="p-7 flex flex-col gap-y-4">
				<Button variant={"secondary"} disabled={false} size={"lg"} className="w-full">
					<FcGoogle className="mr-2 size-5" />
					Login with Google
				</Button>
				<Button variant={"secondary"} disabled={false} size={"lg"} className="w-full">
					<FaGithub className="mr-2 size-5" />
					Login with Github
				</Button>
			</CardContent>

			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex justify-center items-center">
				<p>
					Dont have an account?
					<Link href={"/sign-up"}>
						<span className="text-blue-700"> Sign Up</span>
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};
