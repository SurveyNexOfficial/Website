"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileDown, User, Mail, Clock, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/Loader";
import { SurveyResponse } from "@/types/response";

export default function ResponsePage() {
	const router = useRouter();
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState<SurveyResponse | null>(null);

	const loadResponse = useCallback(async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			// Mock data
			setResponse({
				id: params.responseId as string,
				surveyId: params.id as string,
				userId: "user_123",
				userName: "John Doe",
				userEmail: "john.doe@example.com",
				completedAt: new Date(),
				timeSpent: 245,
				responses: [
					{
						questionId: "q1",
						questionTitle: "How satisfied are you with our service?",
						questionType: "radio",
						answer: "Very Satisfied",
					},
					{
						questionId: "q2",
						questionTitle: "What features do you use most?",
						questionType: "checkbox",
						answer: ["Dashboard", "Reports", "Analytics"],
					},
					{
						questionId: "q3",
						questionTitle: "Any additional feedback?",
						questionType: "textarea",
						answer: "Great platform! Would love to see more customization options.",
					},
				],
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [params]);

	useEffect(() => {
		loadResponse();
	}, [loadResponse]);

	const handleExport = (format: "csv" | "excel" | "json") => {
		console.log(`Exporting response in ${format} format`);
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins} minutes ${secs} seconds`;
	};

	const renderAnswer = (answer: string | string[]) => {
		if (Array.isArray(answer)) {
			return (
				<ul className="list-disc list-inside space-y-1">
					{answer.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			);
		}
		return <p>{answer}</p>;
	};

	if (loading) return <PageLoader />;
	if (!response) return <div>Response not found</div>;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Button variant="ghost" size="sm" onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4" />
					</Button>
					<div>
						<h1 className="text-xl font-bold">Response Details</h1>
						<p className="text-xs text-gray-600 font-mono">{response.id}</p>
					</div>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
						<FileDown className="w-3 h-3 mr-1" />
						CSV
					</Button>
					<Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
						<FileDown className="w-3 h-3 mr-1" />
						Excel
					</Button>
					<Button variant="outline" size="sm" onClick={() => handleExport("json")}>
						<FileDown className="w-3 h-3 mr-1" />
						JSON
					</Button>
				</div>
			</div>

			<Card className="p-4">
				<h2 className="text-sm font-semibold mb-3">Respondent Information</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
					<div className="flex items-center gap-2">
						<User className="w-4 h-4 text-gray-600" />
						<div>
							<p className="text-xs text-gray-600">Name</p>
							<p className="font-medium">{response.userName}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Mail className="w-4 h-4 text-gray-600" />
						<div>
							<p className="text-xs text-gray-600">Email</p>
							<p className="font-medium">{response.userEmail}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Calendar className="w-4 h-4 text-gray-600" />
						<div>
							<p className="text-xs text-gray-600">Completed At</p>
							<p className="font-medium">{formatDate(response.completedAt)}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="w-4 h-4 text-gray-600" />
						<div>
							<p className="text-xs text-gray-600">Time Spent</p>
							<p className="font-medium">{formatTime(response.timeSpent)}</p>
						</div>
					</div>
				</div>
			</Card>

			<Card className="p-4">
				<h2 className="text-sm font-semibold mb-4">Responses</h2>
				<div className="space-y-5">
					{response.responses.map((item, index) => (
						<div key={item.questionId} className="pb-5 border-b border-gray-200 last:border-0 last:pb-0">
							<p className="text-sm font-medium mb-2">
								{index + 1}. {item.questionTitle}
							</p>
							<div className="text-sm text-gray-700 bg-gray-50 p-3 border-l-2 border-black">
								{renderAnswer(item.answer)}
							</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
}
