import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.projects)[":projectId"]["$patch"], 200>;
type RequestType = InferRequestType<(typeof client.api.projects)[":projectId"]["$patch"]>;

export const useUpdateProject = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ form, param }) => {
			const res = await client.api.projects[":projectId"]["$patch"]({ form, param });

			if (!res?.ok) {
				throw new Error("Failed to update project");
			}

			return await res.json();
		},
		onSuccess: ({ data }) => {
			toast.success("project updated");
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
			queryClient.invalidateQueries({
				queryKey: ["project", data.$id],
			});
		},

		onError: () => {
			toast.error("Failed to update project");
		},
	});

	return mutation;
};
