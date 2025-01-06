"use client";

import { useCurrent } from "@/features/auth/api/use-current";

export default function Home() {
	const { data } = useCurrent();

	console.log("data", data);
	return <div className="flex gap-4"></div>;
}
