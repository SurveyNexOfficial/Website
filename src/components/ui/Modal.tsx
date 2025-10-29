"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const sizes = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-2xl",
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />
			<div className={`relative bg-white ${sizes[size]} w-full mx-4 shadow-2xl`}>
				<div className="flex items-center justify-between px-4 py-3 border-b">
					<h3 className="text-sm font-semibold">{title}</h3>
					<button onClick={onClose} className="p-1 hover:bg-gray-100 transition-colors">
						<X className="w-4 h-4" />
					</button>
				</div>
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
}
