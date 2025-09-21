"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, FileImage, FileVideo, Volume2, FileText, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { Survey, SurveyFormData, Question, MediaType } from "../../types/survey";
import { surveyFormSchema } from "../../utils/surveyValidator";

interface SurveyFormProps {
	onSave: (data: Survey) => void;
	survey?: Survey;
}

const stepFields: Record<Step, Path<SurveyFormData>[]> = {
	basic: ["name", "description", "termsAndConditions", "startDate", "endDate"],
	questions: ["questions"],
	preview: [],
};

const mediaTypeOptions: { value: MediaType; label: string; icon: React.ReactNode }[] = [
	{ value: "Image", label: "Image", icon: <FileImage size={16} /> },
	{ value: "Video", label: "Video", icon: <FileVideo size={16} /> },
	{ value: "Audio", label: "Audio", icon: <Volume2 size={16} /> },
	{ value: "PDF", label: "PDF", icon: <FileText size={16} /> },
];

type Step = "basic" | "questions" | "preview";

export default function SurveyForm({ survey, onSave }: SurveyFormProps) {
	const [currentStep, setCurrentStep] = useState<Step>("basic");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const defaultQuestion: Omit<Question, "id"> = {
		question: "",
		responseType: "Text",
		allowMedia: false,
		allowedMediaTypes: [],
		maxMediaFiles: 1,
		selectType: "Single",
		responseOptions: [""],
	};

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors },
		trigger,
	} = useForm<SurveyFormData>({
		resolver: zodResolver(surveyFormSchema),
		defaultValues: {
			name: survey?.name || "",
			description: survey?.description || "",
			termsAndConditions: survey?.termsAndConditions || "",
			startDate: survey?.startDate || "",
			endDate: survey?.endDate || "",
			questions: survey?.questions || [{ ...defaultQuestion, id: crypto.randomUUID() }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "questions",
	});

	const watchedQuestions = watch("questions");
	const watchedForm = watch();

	const onSubmit = async (data: SurveyFormData) => {
		setIsSubmitting(true);
		try {
			const surveyData: Survey = {
				id: survey?.id || crypto.randomUUID(),
				...data,
				createdAt: survey?.createdAt || new Date().toISOString(),
			};
			onSave(surveyData);
		} catch (error) {
			console.error("Error saving survey:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const addQuestion = () => {
		append({ ...defaultQuestion, id: crypto.randomUUID() });
	};

	const addResponseOption = (questionIndex: number) => {
		const currentOptions = watchedQuestions[questionIndex]?.responseOptions || [""];
		setValue(`questions.${questionIndex}.responseOptions`, [...currentOptions, ""]);
	};

	const removeResponseOption = (questionIndex: number, optionIndex: number) => {
		const currentOptions = watchedQuestions[questionIndex]?.responseOptions || [""];
		const newOptions = currentOptions.filter((_, index) => index !== optionIndex);
		setValue(`questions.${questionIndex}.responseOptions`, newOptions);
	};

	const toggleMediaType = (questionIndex: number, mediaType: MediaType) => {
		const currentTypes = watchedQuestions[questionIndex]?.allowedMediaTypes || [];
		const newTypes = currentTypes.includes(mediaType)
			? currentTypes.filter((type) => type !== mediaType)
			: [...currentTypes, mediaType];
		setValue(`questions.${questionIndex}.allowedMediaTypes`, newTypes);
	};

	const getStepTitle = () => {
		switch (currentStep) {
			case "basic":
				return "Basic Information";
			case "questions":
				return "Questions";
			case "preview":
				return "Preview & Save";
			default:
				return "";
		}
	};

	const goNext = async () => {
		const validationDone = await trigger(stepFields[currentStep], { shouldFocus: true });
		if (!validationDone) {
			return;
		}

		setCurrentStep((prev) => (prev === "basic" ? "questions" : "preview"));
	};

	const goPrev = () => {
		setCurrentStep((prev) => (prev === "preview" ? "questions" : "basic"));
	};

	return (
		<div className="pb-16">
			<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="flex items-center gap-4 mb-8">
					<Link href={"/"} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
						<ChevronLeft size={20} />
					</Link>
					<div>
						<h1 className="text-3xl font-light text-black">{survey ? "Edit Survey" : "Create Survey"}</h1>
						<p className="text-gray-600 mt-1">
							Step {currentStep === "basic" ? "1" : currentStep === "questions" ? "2" : "3"} of 3:{" "}
							{getStepTitle()}
						</p>
					</div>
				</div>

				{/* Progress Bar */}
				<div className="mb-8">
					<div className="flex items-center">
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
								currentStep === "basic" ? "bg-black text-white" : "bg-gray-200 text-gray-600"
							}`}>
							1
						</div>
						<div
							className={`flex-1 h-1 mx-4 ${currentStep !== "basic" ? "bg-black" : "bg-gray-200"}`}></div>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
								currentStep === "questions"
									? "bg-black text-white"
									: currentStep === "preview"
									? "bg-black text-white"
									: "bg-gray-200 text-gray-600"
							}`}>
							2
						</div>
						<div
							className={`flex-1 h-1 mx-4 ${
								currentStep === "preview" ? "bg-black" : "bg-gray-200"
							}`}></div>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
								currentStep === "preview" ? "bg-black text-white" : "bg-gray-200 text-gray-600"
							}`}>
							3
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Step 1: Basic Information */}
					{currentStep === "basic" && (
						<div className="flex flex-col gap-y-6">
							<div>
								<label className="block text-sm font-medium text-black mb-2">Survey Name *</label>
								<input
									{...register("name")}
									type="text"
									className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
									placeholder="Enter survey name"
								/>
								{errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
							</div>

							<div>
								<label className="block text-sm font-medium text-black mb-2">Description *</label>
								<textarea
									{...register("description")}
									rows={3}
									className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent resize-none"
									placeholder="Enter survey description"
								/>
								{errors.description && (
									<p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-black mb-2">
									Terms and Conditions *
								</label>
								<textarea
									{...register("termsAndConditions")}
									rows={4}
									className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent resize-none"
									placeholder="Enter terms and conditions"
								/>
								{errors.termsAndConditions && (
									<p className="text-red-600 text-sm mt-1">{errors.termsAndConditions.message}</p>
								)}
							</div>

							<div className="flex sm:flex-row flex-col gap-6">
								<div className="flex-1">
									<label className="block text-sm font-medium text-black mb-2">Start Date *</label>
									<input
										{...register("startDate")}
										type="date"
										className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
									/>
									{errors.startDate && (
										<p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>
									)}
								</div>

								<div className="flex-1">
									<label className="block text-sm font-medium text-black mb-2">End Date *</label>
									<input
										{...register("endDate")}
										type="date"
										className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
									/>
									{errors.endDate && (
										<p className="text-red-600 text-sm mt-1">{errors.endDate.message}</p>
									)}
								</div>
							</div>
						</div>
					)}

					{/* Step 2: Questions */}
					{currentStep === "questions" && (
						<div className="flex flex-col gap-y-6">
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-medium text-black">Questions</h2>
								<button
									type="button"
									onClick={addQuestion}
									className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
									<Plus size={16} />
									Add Question
								</button>
							</div>

							{fields.map((field, questionIndex) => (
								<div key={field.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
									<div className="flex justify-between items-center">
										<h3 className="font-medium text-black">Question {questionIndex + 1}</h3>
										{fields.length > 1 && (
											<button
												type="button"
												onClick={() => remove(questionIndex)}
												className="text-red-600 hover:bg-red-50 p-1 rounded">
												<Trash2 size={16} />
											</button>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-black mb-2">Question *</label>
										<input
											{...register(`questions.${questionIndex}.question`)}
											type="text"
											className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
											placeholder="Enter your question"
										/>
										{errors.questions?.[questionIndex]?.question && (
											<p className="text-red-600 text-sm mt-1">
												{errors.questions[questionIndex]?.question?.message}
											</p>
										)}
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-black mb-2">
												Response Type *
											</label>
											<select
												{...register(`questions.${questionIndex}.responseType`)}
												className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent">
												<option value="Text">Text</option>
												<option value="Select">Select</option>
											</select>
										</div>

										{watchedQuestions[questionIndex]?.responseType === "Select" && (
											<div>
												<label className="block text-sm font-medium text-black mb-2">
													Selection Type *
												</label>
												<select
													{...register(`questions.${questionIndex}.selectType`)}
													className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent">
													<option value="Single">Single Option</option>
													<option value="Multi">Multi Option</option>
												</select>
											</div>
										)}
									</div>

									{watchedQuestions[questionIndex]?.responseType === "Select" && (
										<div>
											<div className="flex justify-between items-center mb-2">
												<label className="block text-sm font-medium text-black">
													Response Options *
												</label>
												<button
													type="button"
													onClick={() => addResponseOption(questionIndex)}
													className="px-4 py-2 bg-black/80 text-white text-sm rounded-lg cursor-pointer hover:bg-black transition-colors duration-300 ease-in-out">
													Add Option
												</button>
											</div>
											<div className="space-y-2">
												{watchedQuestions[questionIndex]?.responseOptions?.map(
													(option, optionIndex) => (
														<div key={optionIndex} className="flex items-center gap-2">
															<input
																{...register(
																	`questions.${questionIndex}.responseOptions.${optionIndex}`
																)}
																type="text"
																className="flex-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
																placeholder={`Option ${optionIndex + 1}`}
															/>
															{(watchedQuestions[questionIndex]?.responseOptions
																?.length || 0) > 1 && (
																<button
																	type="button"
																	onClick={() =>
																		removeResponseOption(questionIndex, optionIndex)
																	}
																	className="text-red-600 hover:bg-red-50 p-1 rounded">
																	<Trash2 size={14} />
																</button>
															)}
														</div>
													)
												)}
											</div>
										</div>
									)}

									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<input
												{...register(`questions.${questionIndex}.allowMedia`)}
												type="checkbox"
												className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
												onChange={(e) => {
													if (!e.target.checked) {
														setValue(`questions.${questionIndex}.allowedMediaTypes`, []);
														setValue(`questions.${questionIndex}.maxMediaFiles`, 1);
													}
												}}
											/>
											<label className="text-sm font-medium text-black">Allow Media Files</label>
										</div>

										{watchedQuestions[questionIndex]?.allowMedia && (
											<div className="pl-7 space-y-4">
												<div>
													<label className="block text-sm font-medium text-black mb-2">
														Allowed Media Types *
													</label>
													<div className="grid grid-cols-2 gap-2">
														{mediaTypeOptions.map((mediaType) => (
															<label
																key={mediaType.value}
																className="flex items-center gap-2 p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
																<input
																	type="checkbox"
																	checked={
																		watchedQuestions[
																			questionIndex
																		]?.allowedMediaTypes?.includes(
																			mediaType.value
																		) || false
																	}
																	onChange={() =>
																		toggleMediaType(questionIndex, mediaType.value)
																	}
																	className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
																/>
																{mediaType.icon}
																<span className="text-sm">{mediaType.label}</span>
															</label>
														))}
													</div>
												</div>

												<div>
													<label className="block text-sm font-medium text-black mb-2">
														Maximum Media Files
													</label>
													<input
														{...register(`questions.${questionIndex}.maxMediaFiles`, {
															valueAsNumber: true,
														})}
														type="number"
														min="1"
														max="10"
														className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
													/>
												</div>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					)}

					{/* Step 3: Preview */}
					{currentStep === "preview" && (
						<div className="space-y-8">
							<div className="bg-gray-50 rounded-lg p-6">
								<h2 className="text-2xl font-medium text-black mb-4">{watchedForm.name}</h2>
								<div className="space-y-4 text-sm">
									<div>
										<span className="font-medium">Description:</span> {watchedForm.description}
									</div>
									<div>
										<span className="font-medium">Duration:</span> {watchedForm.startDate} to{" "}
										{watchedForm.endDate}
									</div>
									<div>
										<span className="font-medium">Terms:</span> {watchedForm.termsAndConditions}
									</div>
									<div>
										<span className="font-medium">Questions:</span>{" "}
										{watchedForm.questions?.length || 0}
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="text-xl font-medium text-black">Questions Preview</h3>
								{watchedForm.questions?.map((question, index) => (
									<div key={index} className="border border-gray-200 rounded-lg p-4">
										<h4 className="font-medium text-black mb-2">
											Question {index + 1}: {question.question}
										</h4>
										<div className="text-sm text-gray-600 space-y-1">
											<div>Response Type: {question.responseType}</div>
											{question.responseType === "Select" && (
												<>
													<div>Selection: {question.selectType}</div>
													<div>Options: {question.responseOptions?.join(", ")}</div>
												</>
											)}
											{question.allowMedia && (
												<>
													<div>Media Files: Allowed ({question.maxMediaFiles} max)</div>
													<div>Types: {question.allowedMediaTypes?.join(", ")}</div>
												</>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
						<div>
							{currentStep !== "basic" && (
								<button
									type="button"
									onClick={goPrev}
									className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
									<ChevronLeft size={16} />
									Previous
								</button>
							)}
						</div>

						<div className="flex gap-4">
							{currentStep !== "preview" && (
								<button
									type="button"
									onClick={goNext}
									className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
									Next
									<ChevronRight size={16} />
								</button>
							)}

							{currentStep === "preview" && (
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
									<Eye size={16} />
									{isSubmitting ? "Saving..." : survey ? "Update Survey" : "Create Survey"}
								</button>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
