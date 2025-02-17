import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ form }) => {
			const res = await client.api.workspaces["$post"]({ form });

			if (!res?.ok) {
				throw new Error("Workspace creation failed");
			}

			return await res.json();
		},
		onSuccess: () => {
			toast.success("Workspace created");
			queryClient.invalidateQueries({
				queryKey: ["workspaces"],
			});
		},

		onError: () => {
			toast.error("Workspace creation failed");
		},
	});

	return mutation;
};
