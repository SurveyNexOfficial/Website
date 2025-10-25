"use client";

import { FormElement } from "@/types/form";

interface ToolboxPanelProps {
	onAddElement: (type: FormElement["type"]) => void;
}

const elementTypes = [
	{ type: "text" as const, label: "Short Answer", icon: "📝" },
	{ type: "textarea" as const, label: "Paragraph", icon: "📄" },
	{ type: "email" as const, label: "Email", icon: "✉️" },
	{ type: "number" as const, label: "Number", icon: "🔢" },
	{ type: "radio" as const, label: "Multiple Choice", icon: "◉" },
	{ type: "checkbox" as const, label: "Checkboxes", icon: "☑️" },
	{ type: "select" as const, label: "Dropdown", icon: "📋" },
];

export default function ToolboxPanel({ onAddElement }: ToolboxPanelProps) {
	return (
		<div className="bg-white rounded-sm border border-gray-200 p-4">
			<h3 className="font-medium mb-4">Add Elements</h3>

			<div className="space-y-2">
				{elementTypes.map(({ type, label, icon }) => (
					<button
						key={type}
						onClick={() => onAddElement(type)}
						className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-sm border border-transparent hover:border-gray-200 transition-colors">
						<span className="text-lg">{icon}</span>
						<span className="text-sm font-medium">{label}</span>
					</button>
				))}
			</div>
		</div>
	);
}
