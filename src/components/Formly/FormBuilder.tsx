"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, FormElement } from "@/types/form";
import ToolboxPanel from "./ToolboxPanel";
import FormCanvas from "./FormCanvas";
import PropertiesPanel from "./PropertiesPanel";
import { generateId, getForm, saveForm } from "@/utils/storage";
import { ArrowLeft } from "lucide-react";

interface FormBuilderProps {
	formId?: string;
}

export default function FormBuilder({ formId }: FormBuilderProps) {
	const router = useRouter();
	const [form, setForm] = useState<Form>({
		id: formId || generateId(),
		title: "Untitled Form",
		description: "",
		elements: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		settings: {
			showOneQuestionPerPage: false,
			allowMultipleSubmissions: true,
		},
	});

	const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (formId) {
			const existingForm = getForm(formId);
			if (existingForm) {
				setForm(existingForm);
			} else {
				router.push("/formly");
			}
		}
	}, [formId, router]);

	const handleSave = () => {
		const updatedForm = {
			...form,
			updatedAt: new Date().toISOString(),
		};

		setForm(updatedForm);
		saveForm(updatedForm);
		setIsDirty(false);
	};

	const handleAddElement = (type: FormElement["type"]) => {
		const newElement: FormElement = {
			id: generateId(),
			type,
			label: getDefaultLabel(type),
			placeholder: getDefaultPlaceholder(type),
			required: false,
			options:
				type === "radio" || type === "checkbox" || type === "select" ? ["Option 1", "Option 2"] : undefined,
		};

		setForm((prev) => ({
			...prev,
			elements: [...prev.elements, newElement],
		}));
		setSelectedElementId(newElement.id);
		setIsDirty(true);
	};

	const handleUpdateElement = (elementId: string, updates: Partial<FormElement>) => {
		setForm((prev) => ({
			...prev,
			elements: prev.elements.map((el) => (el.id === elementId ? { ...el, ...updates } : el)),
		}));
		setIsDirty(true);
	};

	const handleDeleteElement = (elementId: string) => {
		setForm((prev) => ({
			...prev,
			elements: prev.elements.filter((el) => el.id !== elementId),
		}));
		setSelectedElementId(null);
		setIsDirty(true);
	};

	const handleReorderElements = (startIndex: number, endIndex: number) => {
		const newElements = [...form.elements];
		const [removed] = newElements.splice(startIndex, 1);
		newElements.splice(endIndex, 0, removed);

		setForm((prev) => ({ ...prev, elements: newElements }));
		setIsDirty(true);
	};

	const selectedElement = form.elements.find((el) => el.id === selectedElementId);

	return (
		<>
			{/* Header */}
			<div className="bg-white border-b border-gray-200 pb-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<button
								onClick={() => router.push("/formly")}
								className="p-2 bg-gray-100 rounded-lg hover:cursor-pointer">
								<ArrowLeft className="text-gray-700" />
							</button>

							<div className="flex flex-col gap-2 justify-center">
								<input
									type="text"
									value={form.title}
									onChange={(e) => {
										setForm((prev) => ({ ...prev, title: e.target.value }));
										setIsDirty(true);
									}}
									className="text-xl font-semibold bg-transparent border-none outline-none focus:bg-white focus:border focus:border-gray-300 focus:rounded px-2"
									placeholder="Form title"
								/>

								<input
									type="text"
									value={form.description}
									onChange={(e) => {
										setForm((prev) => ({ ...prev, description: e.target.value }));
										setIsDirty(true);
									}}
									className="block text-gray-600 bg-transparent border-none outline-none focus:bg-white focus:border focus:border-gray-300 focus:rounded px-2"
									placeholder="Form description (optional)"
								/>
							</div>
						</div>

						<div className="flex items-center gap-x-2">
							<button
								onClick={() => router.push(`/formly/${form.id}/preview`)}
								className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
								Preview
							</button>

							<button
								onClick={handleSave}
								disabled={!isDirty}
								className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
								{isDirty ? "Save" : "Saved"}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-6 py-6">
				<div className="grid grid-cols-12 gap-6">
					{/* Toolbox */}
					<div className="col-span-3">
						<ToolboxPanel onAddElement={handleAddElement} />
					</div>

					{/* Canvas */}
					<div className="col-span-6">
						<FormCanvas
							elements={form.elements}
							selectedElementId={selectedElementId}
							onSelectElement={setSelectedElementId}
							onDeleteElement={handleDeleteElement}
							onReorderElements={handleReorderElements}
						/>
					</div>

					{/* Properties */}
					<div className="col-span-3">
						<PropertiesPanel element={selectedElement} onUpdateElement={handleUpdateElement} />
					</div>
				</div>
			</div>
		</>
	);
}

function getDefaultLabel(type: FormElement["type"]): string {
	const labels = {
		text: "Short Answer",
		textarea: "Long Answer",
		email: "Email Address",
		number: "Number",
		radio: "Multiple Choice",
		checkbox: "Checkboxes",
		select: "Dropdown",
	};
	return labels[type];
}

function getDefaultPlaceholder(type: FormElement["type"]): string {
	const placeholders = {
		text: "Your answer",
		textarea: "Your answer",
		email: "example@email.com",
		number: "0",
		radio: "",
		checkbox: "",
		select: "Choose an option",
	};
	return placeholders[type];
}
