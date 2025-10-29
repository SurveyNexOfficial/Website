"use client";

import { FileText, Users, TrendingUp, Clock } from "lucide-react";
import StatsCard from "@/components/client/dashboard/StatsCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function ClientDashboardPage() {
	const stats = [
		{ title: "Total Surveys", value: 24, icon: FileText, trend: { value: 12, isPositive: true } },
		{ title: "Total Responses", value: 1247, icon: Users, trend: { value: 8, isPositive: true } },
		{ title: "Active Surveys", value: 8, icon: TrendingUp },
		{ title: "Avg Response Time", value: "3.2m", icon: Clock },
	];

	const recentSurveys = [
		{ id: "1", title: "Customer Satisfaction Q4", responses: 156, status: "active" },
		{ id: "2", title: "Product Feedback Survey", responses: 89, status: "active" },
		{ id: "3", title: "Employee Engagement", responses: 234, status: "closed" },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold">Dashboard</h1>
				<Link href="/client/surveys/create">
					<Button>Create Survey</Button>
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => (
					<StatsCard key={stat.title} {...stat} />
				))}
			</div>

			<Card className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-sm font-semibold">Recent Surveys</h2>
					<Link href="/client/surveys">
						<Button variant="ghost" size="sm">
							View All
						</Button>
					</Link>
				</div>
				<div className="space-y-2">
					{recentSurveys.map((survey) => (
						<div
							key={survey.id}
							className="flex items-center justify-between p-3 hover:bg-gray-50 border border-gray-200">
							<div>
								<p className="text-sm font-medium">{survey.title}</p>
								<p className="text-xs text-gray-600">{survey.responses} responses</p>
							</div>
							<span
								className={`text-xs px-2 py-1 ${
									survey.status === "active"
										? "bg-green-100 text-green-700"
										: "bg-gray-100 text-gray-700"
								}`}>
								{survey.status}
							</span>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
}
