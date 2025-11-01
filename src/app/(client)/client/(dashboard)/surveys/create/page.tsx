"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SurveyFormBuilder from "@/components/client/surveys/SurveyFormBuilder";
import { Question } from "@/types/newSurvey";
import { PageLoader } from "@/components/ui/Loader";

export default function CreateSurveyPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		reward: "",
		rewardType: "points" as "points" | "cash" | "voucher",
		targetResponses: "",
		expiresAt: "",
	});
	const [questions, setQuestions] = useState<Question[]>([]);

	const handleSave = async (updatedQuestions: Question[]) => {
		setQuestions(updatedQuestions);
	};

	const handleSubmit = async (status: "draft" | "active") => {
		setLoading(true);
		try {
			console.log(status);
			await new Promise((resolve) => setTimeout(resolve, 1500));
			router.push("/client/surveys");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <PageLoader />;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Link href="/client/surveys">
						<Button variant="ghost" size="sm">
							<ArrowLeft className="w-4 h-4" />
						</Button>
					</Link>
					<h1 className="text-xl font-bold">Create Survey</h1>
				</div>
				<p className="text-xs text-gray-600">Save as draft to preview before publishing</p>
			</div>

			<Card className="p-5">
				<h2 className="text-sm font-semibold mb-4">Survey Details</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="md:col-span-2">
						<Input
							label="Survey Title"
							placeholder="e.g., Customer Satisfaction Survey"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							required
							fullWidth
						/>
					</div>
					<div className="md:col-span-2">
						<label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
						<textarea
							placeholder="Brief description of the survey"
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
							rows={3}
						/>
					</div>
					<Input
						label="Reward Amount"
						type="number"
						placeholder="100"
						value={formData.reward}
						onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
						required
						fullWidth
					/>
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">Reward Type</label>
						<select
							value={formData.rewardType}
							onChange={(e) =>
								setFormData({
									...formData,
									rewardType: e.target.value as "points" | "cash" | "voucher",
								})
							}
							className="w-full px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
							<option value="points">Points</option>
							<option value="cash">Cash</option>
							<option value="voucher">Voucher</option>
						</select>
					</div>
					<Input
						label="Target Responses"
						type="number"
						placeholder="500"
						value={formData.targetResponses}
						onChange={(e) => setFormData({ ...formData, targetResponses: e.target.value })}
						fullWidth
					/>
					<Input
						label="Expires At"
						type="date"
						value={formData.expiresAt}
						onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
						fullWidth
					/>
				</div>
			</Card>

			<Card className="p-5">
				<h2 className="text-sm font-semibold mb-4">Survey Questions</h2>
				<SurveyFormBuilder initialQuestions={questions} onSave={handleSave} />
			</Card>

			<div className="flex justify-end gap-3">
				<Button variant="outline" onClick={() => handleSubmit("draft")}>
					Save as Draft
				</Button>
				<Button onClick={() => handleSubmit("active")}>Publish Survey</Button>
			</div>
		</div>
	);
}
