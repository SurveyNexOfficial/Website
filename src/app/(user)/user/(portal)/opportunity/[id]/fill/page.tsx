"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { PageLoader } from "@/components/ui/Loader";
import { Question } from "@/types/newSurvey";

type AnswerValue = string | number | string[] | undefined;
type AnswersState = Record<string, AnswerValue>;

export default function SurveyFillPage() {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [answers, setAnswers] = useState<AnswersState>({});
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState<"success" | "error">("success");

	const loadSurvey = useCallback(async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			setQuestions([
				{
					id: "q1",
					surveyId: params.id as string,
					type: "radio",
					title: "How satisfied are you with our service?",
					description: "",
					required: true,
					order: 0,
					options: [
						{ id: "opt1", label: "Very Satisfied", value: "5" },
						{ id: "opt2", label: "Satisfied", value: "4" },
						{ id: "opt3", label: "Neutral", value: "3" },
						{ id: "opt4", label: "Dissatisfied", value: "2" },
						{ id: "opt5", label: "Very Dissatisfied", value: "1" },
					],
				},
				{
					id: "q2",
					surveyId: params.id as string,
					type: "checkbox",
					title: "Which features do you use most?",
					description: "Select all that apply",
					required: true,
					order: 1,
					options: [
						{ id: "opt1", label: "Dashboard", value: "dashboard" },
						{ id: "opt2", label: "Reports", value: "reports" },
						{ id: "opt3", label: "Analytics", value: "analytics" },
					],
				},
				{
					id: "q3",
					surveyId: params.id as string,
					type: "textarea",
					title: "What improvements would you suggest?",
					description: "",
					required: false,
					order: 2,
				},
			]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [params.id]);

	useEffect(() => {
		loadSurvey();
	}, [loadSurvey]);

	const handleAnswer = (questionId: string, answer: AnswerValue) => {
		setAnswers({ ...answers, [questionId]: answer });
	};

	const handleCheckboxChange = (questionId: string, value: string, checked: boolean) => {
		const currentAnswers = (answers[questionId] as string[]) || [];
		const newAnswers = checked ? [...currentAnswers, value] : currentAnswers.filter((v: string) => v !== value);
		handleAnswer(questionId, newAnswers);
	};

	const canGoNext = () => {
		const question = questions[currentQuestion];
		if (question.required) {
			const answer = answers[question.id];
			if (!answer || (Array.isArray(answer) && answer.length === 0)) {
				return false;
			}
		}
		return true;
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	const handlePrevious = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1);
		}
	};

	const handleSubmit = async () => {
		setSubmitting(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setModalType("success");
			setShowModal(true);
		} catch {
			setModalType("error");
			setShowModal(true);
		} finally {
			setSubmitting(false);
		}
	};

	const handleModalClose = () => {
		setShowModal(false);
		if (modalType === "success") {
			router.push("/user/home");
		}
	};

	const renderQuestion = (question: Question) => {
		switch (question.type) {
			case "text":
				return (
					<Input
						placeholder="Your answer"
						value={answers[question.id] || ""}
						onChange={(e) => handleAnswer(question.id, e.target.value)}
						fullWidth
					/>
				);

			case "textarea":
				return (
					<textarea
						placeholder="Your detailed answer"
						value={answers[question.id] || ""}
						onChange={(e) => handleAnswer(question.id, e.target.value)}
						className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black resize-none"
						rows={5}
					/>
				);

			case "radio":
				return (
					<div className="space-y-2">
						{question.options?.map((option) => (
							<label
								key={option.id}
								className="flex items-center gap-2 text-sm p-3 hover:bg-gray-50 cursor-pointer border border-gray-200">
								<input
									type="radio"
									name={question.id}
									value={option.value}
									checked={answers[question.id] === option.value}
									onChange={(e) => handleAnswer(question.id, e.target.value)}
									className="w-4 h-4"
								/>
								<span>{option.label}</span>
							</label>
						))}
					</div>
				);

			case "checkbox":
				return (
					<div className="space-y-2">
						{question.options?.map((option) => (
							<label
								key={option.id}
								className="flex items-center gap-2 text-sm p-3 hover:bg-gray-50 cursor-pointer border border-gray-200">
								<input
									type="checkbox"
									checked={((answers[question.id] as string[]) || []).includes(option.value)}
									onChange={(e) => handleCheckboxChange(question.id, option.value, e.target.checked)}
									className="w-4 h-4"
								/>
								<span>{option.label}</span>
							</label>
						))}
					</div>
				);

			case "select":
				return (
					<select
						value={answers[question.id] || ""}
						onChange={(e) => handleAnswer(question.id, e.target.value)}
						className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
						<option value="">Select an option</option>
						{question.options?.map((option) => (
							<option key={option.id} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				);

			case "rating":
				return (
					<div className="flex gap-2">
						{[1, 2, 3, 4, 5].map((rating) => (
							<button
								key={rating}
								onClick={() => handleAnswer(question.id, rating)}
								className={`w-12 h-12 border text-sm font-medium transition-colors ${
									answers[question.id] === rating
										? "bg-black text-white border-black"
										: "border-gray-300 hover:border-black"
								}`}>
								{rating}
							</button>
						))}
					</div>
				);

			case "date":
				return (
					<Input
						type="date"
						value={answers[question.id] || ""}
						onChange={(e) => handleAnswer(question.id, e.target.value)}
						fullWidth
					/>
				);

			default:
				return null;
		}
	};

	if (loading) return <PageLoader />;

	const question = questions[currentQuestion];
	const progress = ((currentQuestion + 1) / questions.length) * 100;

	return (
		<div className="space-y-6">
			<div className="space-y-6">
				<div className="space-y-2">
					<div className="flex items-center justify-between text-xs">
						<span className="text-gray-600">
							Question {currentQuestion + 1} of {questions.length}
						</span>
						<span className="font-medium">{Math.round(progress)}% Complete</span>
					</div>
					<div className="w-full bg-gray-200 h-2">
						<div className="bg-black h-2 transition-all" style={{ width: `${progress}%` }} />
					</div>
				</div>

				<Card className="p-6">
					<div className="space-y-5">
						<div>
							<p className="text-base font-semibold mb-2">
								{question.title}
								{question.required && <span className="text-red-600 ml-1">*</span>}
							</p>
							{question.description && <p className="text-sm text-gray-600">{question.description}</p>}
						</div>
						<div>{renderQuestion(question)}</div>
					</div>
				</Card>

				<div className="flex items-center justify-between">
					<Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
						<ChevronLeft className="w-4 h-4 mr-1" />
						Previous
					</Button>

					{currentQuestion < questions.length - 1 ? (
						<Button onClick={handleNext} disabled={!canGoNext()}>
							Next
							<ChevronRight className="w-4 h-4 ml-1" />
						</Button>
					) : (
						<Button onClick={handleSubmit} disabled={!canGoNext() || submitting}>
							{submitting ? "Submitting..." : "Submit Survey"}
						</Button>
					)}
				</div>
			</div>

			<Modal
				isOpen={showModal}
				onClose={handleModalClose}
				title={modalType === "success" ? "Success!" : "Error"}
				size="sm">
				<div className="space-y-4 text-center">
					{modalType === "success" ? (
						<>
							<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
								<svg
									className="w-6 h-6 text-green-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<p className="text-sm">
								Your survey has been submitted successfully! Rewards will be credited within 24 hours.
							</p>
						</>
					) : (
						<>
							<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
								<svg
									className="w-6 h-6 text-red-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</div>
							<p className="text-sm">Something went wrong. Please try again.</p>
						</>
					)}
					<Button onClick={handleModalClose} fullWidth>
						{modalType === "success" ? "Go to Dashboard" : "Close"}
					</Button>
				</div>
			</Modal>
		</div>
	);
}
