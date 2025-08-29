"use client";

import { FormElement } from "@/types/form";

interface PropertiesPanelProps {
	element: FormElement | undefined;
	onUpdateElement: (elementId: string, updates: Partial<FormElement>) => void;
}

export default function PropertiesPanel({ element, onUpdateElement }: PropertiesPanelProps) {
	if (!element) {
		return (
			<div className="bg-white rounded-lg border border-gray-200 p-4">
				<div className="text-center py-8">
					<svg
						className="w-12 h-12 mx-auto mb-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<h3 className="font-medium text-gray-900 mb-1">Properties</h3>
					<p className="text-sm text-gray-600">Select an element to edit its properties</p>
				</div>
			</div>
		);
	}

	const handleOptionChange = (index: number, value: string) => {
		if (!element.options) return;

		const newOptions = [...element.options];
		newOptions[index] = value;
		onUpdateElement(element.id, { options: newOptions });
	};

	const addOption = () => {
		const newOptions = [...(element.options || []), `Option ${(element.options?.length || 0) + 1}`];
		onUpdateElement(element.id, { options: newOptions });
	};

	const removeOption = (index: number) => {
		if (!element.options || element.options.length <= 1) return;

		const newOptions = element.options.filter((_, i) => i !== index);
		onUpdateElement(element.id, { options: newOptions });
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-4">
			<h3 className="font-medium mb-4">Properties</h3>

			<div className="space-y-4">
				{/* Label */}
				<div>
					<label className="block text-sm font-medium mb-2">Question</label>
					<input
						type="text"
						value={element.label}
						onChange={(e) => onUpdateElement(element.id, { label: e.target.value })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
					/>
				</div>

				{/* Placeholder */}
				{(element.type === "text" ||
					element.type === "textarea" ||
					element.type === "email" ||
					element.type === "number" ||
					element.type === "select") && (
					<div>
						<label className="block text-sm font-medium mb-2">Placeholder</label>
						<input
							type="text"
							value={element.placeholder || ""}
							onChange={(e) => onUpdateElement(element.id, { placeholder: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
						/>
					</div>
				)}

				{/* Required */}
				<div className="flex items-center">
					<input
						type="checkbox"
						id={`required-${element.id}`}
						checked={element.required}
						onChange={(e) => onUpdateElement(element.id, { required: e.target.checked })}
						className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
					/>
					<label htmlFor={`required-${element.id}`} className="ml-2 text-sm font-medium">
						Required
					</label>
				</div>

				{/* Options for radio, checkbox, select */}
				{(element.type === "radio" || element.type === "checkbox" || element.type === "select") && (
					<div>
						<label className="block text-sm font-medium mb-2">Options</label>
						<div className="space-y-2">
							{element.options?.map((option, index) => (
								<div key={index} className="flex items-center space-x-2">
									<input
										type="text"
										value={option}
										onChange={(e) => handleOptionChange(index, e.target.value)}
										className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
									/>
									<button
										onClick={() => removeOption(index)}
										disabled={element.options?.length === 1}
										className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							))}
							<button
								onClick={addOption}
								className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-sm text-gray-600">
								+ Add option
							</button>
						</div>
					</div>
				)}

				{/* Validation for text inputs */}
				{(element.type === "text" || element.type === "textarea") && (
					<div>
						<label className="block text-sm font-medium mb-2">Validation</label>
						<div className="space-y-2">
							<div className="flex items-center space-x-2">
								<label className="text-xs text-gray-600 w-20">Min length:</label>
								<input
									type="number"
									value={element.validation?.minLength || ""}
									onChange={(e) =>
										onUpdateElement(element.id, {
											validation: {
												...element.validation,
												minLength: e.target.value ? parseInt(e.target.value) : undefined,
											},
										})
									}
									className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
									min="0"
								/>
							</div>
							<div className="flex items-center space-x-2">
								<label className="text-xs text-gray-600 w-20">Max length:</label>
								<input
									type="number"
									value={element.validation?.maxLength || ""}
									onChange={(e) =>
										onUpdateElement(element.id, {
											validation: {
												...element.validation,
												maxLength: e.target.value ? parseInt(e.target.value) : undefined,
											},
										})
									}
									className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
									min="0"
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
