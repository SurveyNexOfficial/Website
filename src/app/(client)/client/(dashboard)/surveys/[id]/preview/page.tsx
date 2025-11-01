"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { PageLoader } from "@/components/ui/Loader";
import { Question } from "@/types/newSurvey";

export default function SurveyPage() {
	const router = useRouter();
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [surveyData, setSurveyData] = useState({
		title: "",
		description: "",
		reward: 0,
		rewardType: "points" as "points" | "cash" | "voucher",
	});
	const [questions, setQuestions] = useState<Question[]>([]);

	const loadSurvey = useCallback(async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setSurveyData({
				title: "Customer Satisfaction Survey",
				description: "Help us improve our services by sharing your feedback",
				reward: 100,
				rewardType: "points",
			});
			setQuestions([
				{
					id: "q1",
					surveyId: params.id as string,
					type: "radio",
					title: "How satisfied are you with our service?",
					description: "Please rate your overall experience",
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
						{ id: "opt4", label: "Settings", value: "settings" },
					],
				},
				{
					id: "q3",
					surveyId: params.id as string,
					type: "textarea",
					title: "What improvements would you like to see?",
					description: "",
					required: false,
					order: 2,
				},
				{
					id: "q4",
					surveyId: params.id as string,
					type: "rating",
					title: "Rate our customer support",
					description: "",
					required: true,
					order: 3,
				},
				{
					id: "q5",
					surveyId: params.id as string,
					type: "select",
					title: "How often do you use our platform?",
					description: "",
					required: true,
					order: 4,
					options: [
						{ id: "opt1", label: "Daily", value: "daily" },
						{ id: "opt2", label: "Weekly", value: "weekly" },
						{ id: "opt3", label: "Monthly", value: "monthly" },
						{ id: "opt4", label: "Rarely", value: "rarely" },
					],
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

	const renderQuestion = (question: Question) => {
		switch (question.type) {
			case "text":
				return <Input placeholder="Your answer" disabled fullWidth />;

			case "textarea":
				return (
					<textarea
						placeholder="Your detailed answer"
						disabled
						className="w-full px-3 py-2 text-sm border border-gray-300 resize-none focus:outline-none"
						rows={4}
					/>
				);

			case "radio":
				return (
					<div className="space-y-2">
						{question.options?.map((option) => (
							<label
								key={option.id}
								className="flex items-center gap-2 text-sm p-2 hover:bg-gray-50 cursor-pointer">
								<input type="radio" name={question.id} disabled className="w-4 h-4" />
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
								className="flex items-center gap-2 text-sm p-2 hover:bg-gray-50 cursor-pointer">
								<input type="checkbox" disabled className="w-4 h-4" />
								<span>{option.label}</span>
							</label>
						))}
					</div>
				);

			case "select":
				return (
					<select disabled className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none">
						<option>Select an option</option>
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
								disabled
								className="w-10 h-10 border border-gray-300 hover:bg-gray-100 hover:border-black transition-colors text-sm font-medium">
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

	if (loading) return <PageLoader />;

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3">
				<Button variant="ghost" size="sm" onClick={() => router.back()}>
					<ArrowLeft className="w-4 h-4" />
				</Button>

				<h1 className="text-xl font-bold">Survey Preview</h1>
			</div>

			<div className="space-y-6">
				<Card className="p-6 text-left border-2 border-black">
					<h2 className="text-2xl font-bold mb-2">{surveyData.title}</h2>
					<p className="text-sm text-gray-600 mb-4">{surveyData.description}</p>
					<div className="inline-block px-4 py-2 bg-black text-white text-xs font-medium">
						Complete this survey and earn {surveyData.reward} {surveyData.rewardType}
					</div>
				</Card>

				<div className="space-y-4">
					{questions.map((question, index) => (
						<Card key={question.id} className="p-5">
							<div className="space-y-3">
								<div>
									<p className="text-sm font-semibold mb-1">
										{index + 1}. {question.title}
										{question.required && <span className="text-red-600 ml-1">*</span>}
									</p>
									{question.description && (
										<p className="text-xs text-gray-600">{question.description}</p>
									)}
								</div>
								<div className="pt-2">{renderQuestion(question)}</div>
							</div>
						</Card>
					))}
				</div>

				<Card className="p-5 text-center bg-gray-50">
					<Button size="lg" disabled>
						Submit Survey
					</Button>
					<p className="text-xs text-gray-600 mt-3">This is a preview. Responses will not be recorded.</p>
				</Card>
			</div>
		</div>
	);
}
