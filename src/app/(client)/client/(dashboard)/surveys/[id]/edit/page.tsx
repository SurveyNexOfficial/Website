"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Eye, FileDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import SurveyFormBuilder from "@/components/client/surveys/SurveyFormBuilder";
import { Question } from "@/types/newSurvey";
import { PageLoader } from "@/components/ui/Loader";

export default function EditSurveyPage() {
	const router = useRouter();
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		reward: "",
		rewardType: "points" as "points" | "cash" | "voucher",
		targetResponses: "",
		expiresAt: "",
		status: "draft" as "draft" | "active" | "paused" | "closed",
		totalResponses: 0,
	});
	const [questions, setQuestions] = useState<Question[]>([]);

	const loadSurvey = useCallback(async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Mock data
			setFormData({
				title: "Customer Satisfaction Survey",
				description: "Help us improve our services",
				reward: "100",
				rewardType: "points",
				targetResponses: "500",
				expiresAt: "2025-12-31",
				status: "active",
				totalResponses: 156,
			});
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

	const handleSave = async (updatedQuestions: Question[]) => {
		setQuestions(updatedQuestions);
		setSaving(true);
		try {
			console.log(saving);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setEditMode(false);
		} catch (error) {
			console.error(error);
		} finally {
			setSaving(false);
		}
	};

	const handleExport = (format: "csv" | "excel" | "json") => {
		console.log(`Exporting survey in ${format} format`);
	};

	if (loading) return <PageLoader />;

	const accordionItems = questions.map((q, index) => ({
		id: q.id,
		title: `${index + 1}. ${q.title} ${q.required ? "*" : ""}`,
		content: (
			<div className="space-y-2">
				<p className="text-xs text-gray-600">Type: {q.type}</p>
				{q.description && <p className="text-xs">{q.description}</p>}
				{q.options && (
					<div className="mt-2">
						<p className="text-xs font-medium mb-1">Options:</p>
						<ul className="text-xs space-y-1 pl-4">
							{q.options.map((opt) => (
								<li key={opt.id}>• {opt.label}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		),
	}));

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Button variant="ghost" size="sm" onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4" />
					</Button>
					<div>
						<h1 className="text-xl font-bold">{formData.title}</h1>
						<p className="text-xs text-gray-600">
							{formData.totalResponses} responses • {formData.status}
						</p>
					</div>
				</div>
				<div className="flex gap-2">
					<Link href={`/client/surveys/${params.id}/preview`}>
						<Button variant="outline" size="sm">
							<Eye className="w-4 h-4 mr-2" />
							Preview
						</Button>
					</Link>
					<Link href={`/client/surveys/${params.id}/responses`}>
						<Button size="sm">View Responses</Button>
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="p-4">
					<h3 className="text-xs font-semibold mb-3">Survey Stats</h3>
					<div className="space-y-3">
						<div>
							<p className="text-xs text-gray-600">Total Responses</p>
							<p className="text-lg font-bold">{formData.totalResponses}</p>
						</div>
						<div>
							<p className="text-xs text-gray-600">Target</p>
							<p className="text-lg font-bold">{formData.targetResponses}</p>
						</div>
						<div>
							<p className="text-xs text-gray-600">Completion Rate</p>
							<p className="text-lg font-bold">
								{Math.round((formData.totalResponses / Number(formData.targetResponses)) * 100)}%
							</p>
						</div>
					</div>
				</Card>

				<Card className="lg:col-span-2 p-4">
					<h3 className="text-xs font-semibold mb-3">Export Survey</h3>
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
				</Card>
			</div>

			{!editMode ? (
				<Card className="p-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-sm font-semibold">Survey Questions</h2>
						<Button size="sm" onClick={() => setEditMode(true)}>
							Edit Questions
						</Button>
					</div>
					<Accordion items={accordionItems} />
				</Card>
			) : (
				<Card className="p-5">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-sm font-semibold">Edit Questions</h2>
						<Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
							Cancel
						</Button>
					</div>
					<SurveyFormBuilder initialQuestions={questions} onSave={handleSave} />
				</Card>
			)}
		</div>
	);
}
