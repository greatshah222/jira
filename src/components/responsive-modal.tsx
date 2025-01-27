"use client";

import { useMedia } from "react-use";
import { useIsClient } from "usehooks-ts";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

interface ResponsiveModalProps {
	children: React.ReactNode;

	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({ children, open, onOpenChange }: ResponsiveModalProps) => {
	const isDesktop = useMedia("(min-width: 1024px)", true);
	const isClient = useIsClient();
	if (!isClient) return null;

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogTitle className=""></DialogTitle>
				<DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
					{children}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerTitle></DrawerTitle>
			<DrawerContent>
				<div className="overflow-y-auto hide-scrollbar max-h-[85vh]">{children}</div>
			</DrawerContent>
		</Drawer>
	);
};
