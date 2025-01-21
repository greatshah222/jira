import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.projects)["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.projects)["$post"]>;

export const useCreateProject = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ form }) => {
			const res = await client.api.projects["$post"]({ form });

			if (!res?.ok) {
				throw new Error("Project creation failed");
			}

			return await res.json();
		},
		onSuccess: () => {
			toast.success("Project created");
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},

		onError: () => {
			toast.error("Project creation failed");
		},
	});

	return mutation;
};
