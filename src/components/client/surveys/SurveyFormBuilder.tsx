"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Question, QuestionType } from "@/types/newSurvey";

interface SurveyFormBuilderProps {
	initialQuestions?: Question[];
	onSave: (questions: Question[]) => void;
}

export default function SurveyFormBuilder({ initialQuestions = [], onSave }: SurveyFormBuilderProps) {
	const [questions, setQuestions] = useState<Question[]>(initialQuestions);

	const questionTypes: { value: QuestionType; label: string }[] = [
		{ value: "text", label: "Short Text" },
		{ value: "textarea", label: "Long Text" },
		{ value: "radio", label: "Single Choice" },
		{ value: "checkbox", label: "Multiple Choice" },
		{ value: "select", label: "Dropdown" },
		{ value: "rating", label: "Rating" },
		{ value: "date", label: "Date" },
	];

	const addQuestion = () => {
		const newQuestion: Question = {
			id: `q_${Date.now()}`,
			surveyId: "",
			type: "text",
			title: "",
			description: "",
			required: false,
			order: questions.length,
		};
		setQuestions([...questions, newQuestion]);
	};

	const updateQuestion = (id: string, updates: Partial<Question>) => {
		setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)));
	};

	const deleteQuestion = (id: string) => {
		setQuestions(questions.filter((q) => q.id !== id));
	};

	const addOption = (questionId: string) => {
		const question = questions.find((q) => q.id === questionId);
		if (!question) return;

		const newOption = {
			id: `opt_${Date.now()}`,
			label: "",
			value: `option_${(question.options?.length || 0) + 1}`,
		};

		updateQuestion(questionId, {
			options: [...(question.options || []), newOption],
		});
	};

	const updateOption = (questionId: string, optionId: string, label: string) => {
		const question = questions.find((q) => q.id === questionId);
		if (!question || !question.options) return;

		const updatedOptions = question.options.map((opt) => (opt.id === optionId ? { ...opt, label } : opt));

		updateQuestion(questionId, { options: updatedOptions });
	};

	const deleteOption = (questionId: string, optionId: string) => {
		const question = questions.find((q) => q.id === questionId);
		if (!question || !question.options) return;

		updateQuestion(questionId, {
			options: question.options.filter((opt) => opt.id !== optionId),
		});
	};

	const needsOptions = (type: QuestionType) => {
		return ["radio", "checkbox", "select"].includes(type);
	};

	return (
		<div className="space-y-4">
			{questions.map((question) => (
				<Card key={question.id} className="p-4">
					<div className="flex items-start gap-3">
						<div className="pt-2 cursor-move">
							<GripVertical className="w-4 h-4 text-gray-400" />
						</div>

						<div className="flex-1 space-y-3">
							<div className="flex items-start gap-3">
								<div className="flex-1 space-y-3">
									<Input
										placeholder="Question title"
										value={question.title}
										onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
										fullWidth
									/>

									<Input
										placeholder="Description (optional)"
										value={question.description}
										onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
										fullWidth
									/>

									<div className="flex items-center gap-3">
										<select
											value={question.type}
											onChange={(e) =>
												updateQuestion(question.id, { type: e.target.value as QuestionType })
											}
											className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
											{questionTypes.map((type) => (
												<option key={type.value} value={type.value}>
													{type.label}
												</option>
											))}
										</select>

										<label className="flex items-center gap-2 text-sm">
											<input
												type="checkbox"
												checked={question.required}
												onChange={(e) =>
													updateQuestion(question.id, { required: e.target.checked })
												}
												className="w-4 h-4"
											/>
											Required
										</label>
									</div>
								</div>

								<Button variant="ghost" size="sm" onClick={() => deleteQuestion(question.id)}>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>

							{needsOptions(question.type) && (
								<div className="pl-4 border-l-2 border-gray-200 space-y-2">
									<p className="text-xs font-medium text-gray-600">Options</p>
									{question.options?.map((option) => (
										<div key={option.id} className="flex items-center gap-2">
											<Input
												placeholder="Option text"
												value={option.label}
												onChange={(e) => updateOption(question.id, option.id, e.target.value)}
												fullWidth
											/>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => deleteOption(question.id, option.id)}>
												<Trash2 className="w-3 h-3" />
											</Button>
										</div>
									))}
									<Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
										Add Option
									</Button>
								</div>
							)}
						</div>
					</div>
				</Card>
			))}

			<Button variant="outline" onClick={addQuestion} fullWidth>
				<Plus className="w-4 h-4 mr-2" />
				Add Question
			</Button>

			<div className="flex justify-end gap-3 pt-4">
				<Button variant="outline" onClick={() => onSave(questions)}>
					Save Draft
				</Button>
				<Button onClick={() => onSave(questions)}>Save & Continue</Button>
			</div>
		</div>
	);
}
