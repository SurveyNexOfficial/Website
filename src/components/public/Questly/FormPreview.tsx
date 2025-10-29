"use client";

import { useState } from "react";
import { Form, FormElement } from "@/types/form";

interface FormPreviewProps {
	form: Form;
}

interface FormData {
	[key: string]: string | string[];
}

export default function FormPreview({ form }: FormPreviewProps) {
	const [formData, setFormData] = useState<FormData>({});
	const [currentPage, setCurrentPage] = useState(0);
	const [submitted, setSubmitted] = useState(false);

	const elementsPerPage = form.settings.showOneQuestionPerPage ? 1 : form.elements.length;
	const totalPages = form.settings.showOneQuestionPerPage ? form.elements.length : 1;

	const currentElements = form.settings.showOneQuestionPerPage
		? form.elements.slice(currentPage, currentPage + 1)
		: form.elements;

	const handleInputChange = (elementId: string, value: string | string[]) => {
		setFormData((prev) => ({
			...prev,
			[elementId]: value,
		}));
	};

	const handleNext = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (currentPage > 0) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate required fields
		const requiredFields = form.elements.filter((el) => el.required);
		const missingFields = requiredFields.filter((field) => !formData[field.id]);

		if (missingFields.length > 0) {
			alert("Please fill in all required fields");
			return;
		}

		// In a real app, this would send data to an API
		console.log("Form submitted:", formData);
		setSubmitted(true);
	};

	if (submitted) {
		return (
			<div className="bg-white rounded-sm p-12 text-center border border-gray-200">
				<div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
					<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
				<p className="text-gray-600 mb-6">Your response has been recorded.</p>
				<button
					onClick={() => {
						setSubmitted(false);
						setFormData({});
						setCurrentPage(0);
					}}
					className="text-black hover:underline">
					Submit another response
				</button>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-sm border border-gray-200">
			{/* Form Header */}
			<div className="p-8 border-b border-gray-200">
				<h1 className="text-3xl font-light mb-2">{form.title}</h1>
				{form.description && <p className="text-gray-600">{form.description}</p>}
			</div>

			{/* Progress Bar (for multi-page forms) */}
			{form.settings.showOneQuestionPerPage && totalPages > 1 && (
				<div className="px-8 pt-6">
					<div className="flex items-center justify-between text-sm text-gray-600 mb-2">
						<span>
							Question {currentPage + 1} of {totalPages}
						</span>
						<span>{Math.round(((currentPage + 1) / totalPages) * 100)}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-1">
						<div
							className="bg-black h-1 rounded-full transition-all duration-300"
							style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}></div>
					</div>
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="p-8">
					<div className="space-y-8">
						{currentElements.map((element) => (
							<FormField
								key={element.id}
								element={element}
								value={formData[element.id] || ""}
								onChange={(value) => handleInputChange(element.id, value)}
							/>
						))}
					</div>
				</div>

				{/* Navigation */}
				<div className="p-8 border-t border-gray-200 flex items-center justify-between">
					<div>
						{form.settings.showOneQuestionPerPage && currentPage > 0 && (
							<button
								type="button"
								onClick={handlePrevious}
								className="px-6 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
								Previous
							</button>
						)}
					</div>

					<div>
						{form.settings.showOneQuestionPerPage && currentPage < totalPages - 1 ? (
							<button
								type="button"
								onClick={handleNext}
								className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors">
								Next
							</button>
						) : (
							<button
								type="submit"
								className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors">
								Submit
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
}

interface FormFieldProps {
	element: FormElement;
	value: string | string[];
	onChange: (value: string | string[]) => void;
}

function FormField({ element, value, onChange }: FormFieldProps) {
	const handleCheckboxChange = (option: string, checked: boolean) => {
		const currentValues = Array.isArray(value) ? value : [];

		if (checked) {
			onChange([...currentValues, option]);
		} else {
			onChange(currentValues.filter((v) => v !== option));
		}
	};

	return (
		<div>
			<label className="block text-lg font-medium mb-4">
				{element.label}
				{element.required && <span className="text-red-500 ml-1">*</span>}
			</label>

			{element.type === "text" && (
				<input
					type="text"
					value={value as string}
					onChange={(e) => onChange(e.target.value)}
					placeholder={element.placeholder}
					required={element.required}
					className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg"
				/>
			)}

			{element.type === "textarea" && (
				<textarea
					value={value as string}
					onChange={(e) => onChange(e.target.value)}
					placeholder={element.placeholder}
					required={element.required}
					rows={4}
					className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-lg"
				/>
			)}

			{element.type === "email" && (
				<input
					type="email"
					value={value as string}
					onChange={(e) => onChange(e.target.value)}
					placeholder={element.placeholder}
					required={element.required}
					className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg"
				/>
			)}

			{element.type === "number" && (
				<input
					type="number"
					value={value as string}
					onChange={(e) => onChange(e.target.value)}
					placeholder={element.placeholder}
					required={element.required}
					className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg"
				/>
			)}

			{element.type === "radio" && element.options && (
				<div className="space-y-3">
					{element.options.map((option, idx) => (
						<label key={idx} className="flex items-center space-x-3 cursor-pointer">
							<input
								type="radio"
								name={element.id}
								value={option}
								checked={value === option}
								onChange={(e) => onChange(e.target.value)}
								required={element.required}
								className="w-5 h-5 text-black border-gray-300 focus:ring-black"
							/>
							<span className="text-lg">{option}</span>
						</label>
					))}
				</div>
			)}

			{element.type === "checkbox" && element.options && (
				<div className="space-y-3">
					{element.options.map((option, idx) => (
						<label key={idx} className="flex items-center space-x-3 cursor-pointer">
							<input
								type="checkbox"
								checked={Array.isArray(value) && value.includes(option)}
								onChange={(e) => handleCheckboxChange(option, e.target.checked)}
								className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
							/>
							<span className="text-lg">{option}</span>
						</label>
					))}
				</div>
			)}

			{element.type === "select" && element.options && (
				<select
					value={value as string}
					onChange={(e) => onChange(e.target.value)}
					required={element.required}
					className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg">
					<option value="">{element.placeholder}</option>
					{element.options.map((option, idx) => (
						<option key={idx} value={option}>
							{option}
						</option>
					))}
				</select>
			)}
		</div>
	);
}
