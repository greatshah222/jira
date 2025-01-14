import { Loader } from "lucide-react";
import React from "react";

const WorkspacesLoading = () => {
	return (
		<div className="h-full flex items-center justify-center">
			<Loader className="animate-spin text-muted-foreground size-6" />
		</div>
	);
};

export default WorkspacesLoading;
