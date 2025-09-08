"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft, FileImage, FileVideo, Volume2, FileText } from "lucide-react";
import { format } from "date-fns";
import { Survey, MediaType } from "../../types/survey";
import Link from "next/link";

interface SurveyPreviewProps {
	survey: Survey;
}

export default function SurveyPreview({ survey }: SurveyPreviewProps) {
	const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

	const toggleQuestion = (questionId: string) => {
		const newExpanded = new Set(expandedQuestions);
		if (newExpanded.has(questionId)) {
			newExpanded.delete(questionId);
		} else {
			newExpanded.add(questionId);
		}
		setExpandedQuestions(newExpanded);
	};

	const getMediaIcon = (mediaType: MediaType) => {
		switch (mediaType) {
			case "Image":
				return <FileImage size={16} className="text-gray-600" />;
			case "Video":
				return <FileVideo size={16} className="text-gray-600" />;
			case "Audio":
				return <Volume2 size={16} className="text-gray-600" />;
			case "PDF":
				return <FileText size={16} className="text-gray-600" />;
		}
	};

	return (
		<div className="pb-16">
			<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="flex items-center gap-4 mb-8">
					<Link href={"/businesses"} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
						<ArrowLeft size={20} />
					</Link>
					<h1 className="text-3xl font-light text-black">Survey Preview</h1>
				</div>

				{/* Survey Info */}
				<div className="bg-gray-50 rounded-lg p-6 mb-8">
					<h2 className="text-2xl font-medium text-black mb-4">{survey.name}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="font-medium text-black mb-2">Description</h3>
							<p className="text-gray-700 leading-relaxed">{survey.description}</p>
						</div>
						<div className="space-y-4">
							<div>
								<h3 className="font-medium text-black mb-1">Duration</h3>
								<p className="text-gray-700">
									{format(new Date(survey.startDate), "MMM dd, yyyy")} -{" "}
									{format(new Date(survey.endDate), "MMM dd, yyyy")}
								</p>
							</div>
							<div>
								<h3 className="font-medium text-black mb-1">Created</h3>
								<p className="text-gray-700">{format(new Date(survey.createdAt), "MMM dd, yyyy")}</p>
							</div>
							<div>
								<h3 className="font-medium text-black mb-1">Total Questions</h3>
								<p className="text-gray-700">{survey.questions.length}</p>
							</div>
						</div>
					</div>
					<div className="mt-6">
						<h3 className="font-medium text-black mb-2">Terms and Conditions</h3>
						<p className="text-gray-700 leading-relaxed">{survey.termsAndConditions}</p>
					</div>
				</div>

				{/* Questions */}
				<div className="space-y-4">
					<h3 className="text-xl font-medium text-black mb-4">Questions</h3>
					{survey.questions.map((question, index) => (
						<div key={question.id} className="border border-gray-200 rounded-lg">
							{/* Question Header */}
							<button
								onClick={() => toggleQuestion(question.id)}
								className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
								<div className="flex-1">
									<span className="text-sm text-gray-500 block mb-1">Question {index + 1}</span>
									<h4 className="font-medium text-black">{question.question}</h4>
								</div>
								{expandedQuestions.has(question.id) ? (
									<ChevronUp size={20} className="text-gray-600 ml-4" />
								) : (
									<ChevronDown size={20} className="text-gray-600 ml-4" />
								)}
							</button>

							{/* Question Details */}
							{expandedQuestions.has(question.id) && (
								<div className="p-4 border-t border-gray-100 bg-gray-50">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<h5 className="font-medium text-black mb-2">Response Configuration</h5>
											<div className="space-y-2">
												<p className="text-sm text-gray-700">
													<span className="font-medium">Type:</span> {question.responseType}
												</p>
												{question.responseType === "Select" && (
													<>
														<p className="text-sm text-gray-700">
															<span className="font-medium">Selection:</span>{" "}
															{question.selectType}
														</p>
														<div>
															<p className="text-sm font-medium text-gray-700 mb-1">
																Options:
															</p>
															<ul className="list-disc list-inside text-sm text-gray-600">
																{question.responseOptions.map((option, optionIndex) => (
																	<li key={optionIndex}>{option}</li>
																))}
															</ul>
														</div>
													</>
												)}
											</div>
										</div>
										<div>
											<h5 className="font-medium text-black mb-2">Media Settings</h5>
											<div className="space-y-2">
												<p className="text-sm text-gray-700">
													<span className="font-medium">Allow Media:</span>{" "}
													{question.allowMedia ? "Yes" : "No"}
												</p>
												{question.allowMedia && (
													<>
														<p className="text-sm text-gray-700">
															<span className="font-medium">Max Files:</span>{" "}
															{question.maxMediaFiles}
														</p>
														<div>
															<p className="text-sm font-medium text-gray-700 mb-1">
																Allowed Types:
															</p>
															<div className="flex flex-wrap gap-2">
																{question.allowedMediaTypes.map((mediaType) => (
																	<div
																		key={mediaType}
																		className="flex items-center gap-1 bg-white px-2 py-1 rounded border">
																		{getMediaIcon(mediaType)}
																		<span className="text-xs text-gray-600">
																			{mediaType}
																		</span>
																	</div>
																))}
															</div>
														</div>
													</>
												)}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
