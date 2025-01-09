import { getCurrent } from "@/features/auth/action";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await getCurrent();

	if (!user) redirect("/sign-in");
	return <div className="flex gap-4">Home page</div>;
}
