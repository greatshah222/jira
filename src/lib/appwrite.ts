import "server-only"; // NOW THIS CAN BE ONLY USED FROM SERVER COMPONENT

import { Client, Account, Storage, Users, Databases } from "node-appwrite";

import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/features/auth/constants";

// WHEN ADMIN NEEDS TO CREATE SOMETHING WE USER BELOW

export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
		.setKey(process.env.NEXT_APPWRITE_KEY!);

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

	const curSession = await cookies();

	const session = curSession.get(AUTH_COOKIE);

	if (!session || !session.value) {
		throw new Error("Unauthorized");
	}

	client.setSession(session.value);

	return {
		get account() {
			return new Account(client);
		},
		get databases() {
			return new Databases(client);
		},
	};
}
