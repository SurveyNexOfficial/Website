"use client";

import { Question } from "@/types/newSurvey";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

interface SurveyPreviewProps {
	title: string;
	description: string;
	questions: Question[];
}

export default function SurveyPreview({ title, description, questions }: SurveyPreviewProps) {
	const renderQuestion = (question: Question) => {
		switch (question.type) {
			case "text":
				return <Input placeholder="Your answer" disabled fullWidth />;

			case "textarea":
				return (
					<textarea
						placeholder="Your answer"
						disabled
						className="w-full px-3 py-2 text-sm border border-gray-300 resize-none"
						rows={4}
					/>
				);

			case "radio":
				return (
					<div className="space-y-2">
						{question.options?.map((option) => (
							<label key={option.id} className="flex items-center gap-2 text-sm">
								<input type="radio" name={question.id} disabled className="w-4 h-4" />
								{option.label}
							</label>
						))}
					</div>
				);

			case "checkbox":
				return (
					<div className="space-y-2">
						{question.options?.map((option) => (
							<label key={option.id} className="flex items-center gap-2 text-sm">
								<input type="checkbox" disabled className="w-4 h-4" />
								{option.label}
							</label>
						))}
					</div>
				);

			case "select":
				return (
					<select disabled className="w-full px-3 py-2 text-sm border border-gray-300">
						<option>Select an option</option>
						{question.options?.map((option) => (
							<option key={option.id}>{option.label}</option>
						))}
					</select>
				);

			case "rating":
				return (
					<div className="flex gap-2">
						{[1, 2, 3, 4, 5].map((rating) => (
							<button
								key={rating}
								disabled
								className="w-8 h-8 border border-gray-300 hover:bg-gray-100 text-sm">
								{rating}
							</button>
						))}
					</div>
				);

			case "date":
				return <Input type="date" disabled fullWidth />;

			default:
				return null;
		}
	};

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			<div className="text-center space-y-2 pb-6 border-b">
				<h1 className="text-xl font-bold">{title || "Survey Title"}</h1>
				<p className="text-sm text-gray-600">{description || "Survey description"}</p>
			</div>

			<div className="space-y-4">
				{questions.map((question, index) => (
					<Card key={question.id} className="p-4">
						<div className="space-y-3">
							<div>
								<p className="text-sm font-medium">
									{index + 1}. {question.title || "Question title"}
									{question.required && <span className="text-red-600 ml-1">*</span>}
								</p>
								{question.description && (
									<p className="text-xs text-gray-600 mt-1">{question.description}</p>
								)}
							</div>
							{renderQuestion(question)}
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
