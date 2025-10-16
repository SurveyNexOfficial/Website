"use client";

import { FormElement } from "@/types/form";
import { useState } from "react";

interface FormCanvasProps {
	elements: FormElement[];
	selectedElementId: string | null;
	onSelectElement: (id: string) => void;
	onDeleteElement: (id: string) => void;
	onReorderElements: (startIndex: number, endIndex: number) => void;
}

export default function FormCanvas({
	elements,
	selectedElementId,
	onSelectElement,
	onDeleteElement,
	onReorderElements,
}: FormCanvasProps) {
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

	const handleDragStart = (index: number) => {
		setDraggedIndex(index);
	};

	const handleDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();

		if (draggedIndex !== null && draggedIndex !== index) {
			onReorderElements(draggedIndex, index);
			setDraggedIndex(index);
		}
	};

	const handleDragEnd = () => {
		setDraggedIndex(null);
	};

	if (elements.length === 0) {
		return (
			<div className="bg-white rounded-sm border-2 border-dashed border-gray-300 p-12 text-center">
				<div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
					<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">Start building your form</h3>
				<p className="text-gray-600">Add elements from the toolbox to get started</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-sm border border-gray-200 p-6">
			<div className="space-y-4">
				{elements.map((element, index) => (
					<div
						key={element.id}
						draggable
						onDragStart={() => handleDragStart(index)}
						onDragOver={(e) => handleDragOver(e, index)}
						onDragEnd={handleDragEnd}
						onClick={() => onSelectElement(element.id)}
						className={`p-4 border rounded-sm cursor-pointer transition-colors relative group ${
							selectedElementId === element.id
								? "border-black bg-gray-50"
								: "border-gray-200 hover:border-gray-300"
						}`}>
						{/* Drag Handle */}
						<div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
							<div className="w-1 h-8 bg-gray-400 rounded cursor-move"></div>
						</div>

						{/* Delete Button */}
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDeleteElement(element.id);
							}}
							className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded">
							<svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>

						<ElementPreview element={element} />
					</div>
				))}
			</div>
		</div>
	);
}

function ElementPreview({ element }: { element: FormElement }) {
	return (
		<div>
			<label className="block text-sm font-medium mb-2">
				{element.label}
				{element.required && <span className="text-red-500 ml-1">*</span>}
			</label>

			{element.type === "text" && (
				<input
					type="text"
					placeholder={element.placeholder}
					className="w-full px-3 py-2 border border-gray-300 rounded-sm"
					disabled
				/>
			)}

			{element.type === "textarea" && (
				<textarea
					placeholder={element.placeholder}
					rows={3}
					className="w-full px-3 py-2 border border-gray-300 rounded-sm resize-none"
					disabled
				/>
			)}

			{element.type === "email" && (
				<input
					type="email"
					placeholder={element.placeholder}
					className="w-full px-3 py-2 border border-gray-300 rounded-sm"
					disabled
				/>
			)}

			{element.type === "number" && (
				<input
					type="number"
					placeholder={element.placeholder}
					className="w-full px-3 py-2 border border-gray-300 rounded-sm"
					disabled
				/>
			)}

			{element.type === "radio" && element.options && (
				<div className="space-y-2">
					{element.options.map((option, idx) => (
						<label key={idx} className="flex items-center space-x-2">
							<input type="radio" name={element.id} disabled />
							<span className="text-sm">{option}</span>
						</label>
					))}
				</div>
			)}

			{element.type === "checkbox" && element.options && (
				<div className="space-y-2">
					{element.options.map((option, idx) => (
						<label key={idx} className="flex items-center space-x-2">
							<input type="checkbox" disabled />
							<span className="text-sm">{option}</span>
						</label>
					))}
				</div>
			)}

			{element.type === "select" && element.options && (
				<select className="w-full px-3 py-2 border border-gray-300 rounded-sm" disabled>
					<option>{element.placeholder}</option>
					{element.options.map((option, idx) => (
						<option key={idx}>{option}</option>
					))}
				</select>
			)}
		</div>
	);
}
