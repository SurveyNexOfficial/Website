"use client";

import { FormElement } from "@/types/form";

interface ToolboxPanelProps {
	onAddElement: (type: FormElement["type"]) => void;
}

const elementTypes = [
	{ type: "text" as const, label: "Short Answer" },
	{ type: "textarea" as const, label: "Paragraph" },
	{ type: "email" as const, label: "Email" },
	{ type: "number" as const, label: "Number" },
	{ type: "radio" as const, label: "Multiple Choice" },
	{ type: "checkbox" as const, label: "Checkboxes" },
	{ type: "select" as const, label: "Dropdown" },
];

export default function ToolboxPanel({ onAddElement }: ToolboxPanelProps) {
	return (
		<div className="bg-white rounded-sm border border-gray-200 p-4">
			<h3 className="font-medium mb-4">Add Elements</h3>

			<div className="space-y-2">
				{elementTypes.map(({ type, label }) => (
					<button
						key={type}
						onClick={() => onAddElement(type)}
						className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-sm border border-b border-b-gray-200 border-transparent hover:border-gray-200 transition-colors">
						<span className="text-sm font-medium">{label}</span>
					</button>
				))}
			</div>
		</div>
	);
}
