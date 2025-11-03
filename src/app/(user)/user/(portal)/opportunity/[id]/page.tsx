"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Award, FileText, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/Loader";

export default function SingleOpportunityPage() {
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [survey, setSurvey] = useState({
		title: "",
		description: "",
		reward: 0,
		rewardType: "points" as "points" | "cash" | "voucher",
		questionsCount: 0,
		estimatedTime: 0,
		expiresAt: "",
		totalResponses: 0,
		targetResponses: 0,
	});

	useEffect(() => {
		loadSurvey();
	}, [params.id]);

	const loadSurvey = async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			setSurvey({
				title: "Customer Satisfaction Survey",
				description:
					"We value your feedback and want to understand your experience with our products and services. Your honest opinions will help us improve and serve you better. This survey should take approximately 5-7 minutes to complete.",
				reward: 150,
				rewardType: "points",
				questionsCount: 12,
				estimatedTime: 6,
				expiresAt: "2025-12-31",
				totalResponses: 245,
				targetResponses: 500,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	if (loading) return <PageLoader />;

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3">
				<Link href="/user/opportunities">
					<Button variant="ghost" size="sm">
						<ArrowLeft className="w-4 h-4" />
					</Button>
				</Link>
				<h1 className="text-xl font-bold">Opportunity Details</h1>
			</div>

			<div className="w-full space-y-6">
				<Card className="p-6 border-2 border-black">
					<div className="space-y-4">
						<div>
							<h2 className="text-2xl font-bold mb-2">{survey.title}</h2>
							<p className="text-sm text-gray-600 leading-relaxed">{survey.description}</p>
						</div>

						<div className="flex items-center gap-6 py-4 border-y border-gray-200">
							<div className="flex items-center gap-2">
								<Award className="w-5 h-5" />
								<div>
									<p className="text-xs text-gray-600">Reward</p>
									<p className="text-sm font-bold">
										{survey.reward} {survey.rewardType}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="w-5 h-5" />
								<div>
									<p className="text-xs text-gray-600">Duration</p>
									<p className="text-sm font-bold">{survey.estimatedTime} minutes</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<FileText className="w-5 h-5" />
								<div>
									<p className="text-xs text-gray-600">Questions</p>
									<p className="text-sm font-bold">{survey.questionsCount}</p>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between text-xs">
								<span className="text-gray-600">Progress</span>
								<span className="font-medium">
									{survey.totalResponses} / {survey.targetResponses} responses
								</span>
							</div>
							<div className="w-full bg-gray-200 h-2">
								<div
									className="bg-black h-2"
									style={{
										width: `${(survey.totalResponses / survey.targetResponses) * 100}%`,
									}}
								/>
							</div>
						</div>

						{survey.expiresAt && (
							<div className="flex items-center gap-2 text-xs text-gray-600">
								<Calendar className="w-4 h-4" />
								<span>Expires on {formatDate(survey.expiresAt)}</span>
							</div>
						)}
					</div>
				</Card>

				<Card className="p-6">
					<h3 className="text-sm font-semibold mb-3">What to Expect</h3>
					<ul className="space-y-2 text-sm text-gray-600">
						<li className="flex items-start gap-2">
							<span className="text-black font-bold">•</span>
							<span>Answer all questions honestly and completely</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-black font-bold">•</span>
							<span>Some questions may require detailed responses</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-black font-bold">•</span>
							<span>Your responses are confidential and anonymous</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-black font-bold">•</span>
							<span>Rewards will be credited within 24 hours of completion</span>
						</li>
					</ul>
				</Card>

				<div className="flex justify-center">
					<Link href={`/user/opportunity/${params.id}/fill`}>
						<Button size="lg">Start Survey</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
