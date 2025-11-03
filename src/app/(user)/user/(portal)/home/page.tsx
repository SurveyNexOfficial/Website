"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, TrendingUp, CheckCircle, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/Loader";

export default function UserDashboardPage() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadDashboard();
	}, []);

	const loadDashboard = async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
		} finally {
			setLoading(false);
		}
	};

	const stats = [
		{ title: "Total Points", value: "2,450", icon: Award, color: "text-blue-600" },
		{ title: "Completed Surveys", value: "24", icon: CheckCircle, color: "text-green-600" },
		{ title: "Available Surveys", value: "12", icon: Clock, color: "text-orange-600" },
		{ title: "Rewards Claimed", value: "8", icon: TrendingUp, color: "text-purple-600" },
	];

	const recentOpportunities = [
		{ id: "1", title: "Customer Satisfaction Survey", reward: 100, duration: "5 min" },
		{ id: "2", title: "Product Feedback Survey", reward: 150, duration: "8 min" },
		{ id: "3", title: "Service Quality Assessment", reward: 120, duration: "6 min" },
	];

	if (loading) return <PageLoader />;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-bold">Dashboard</h1>
				<p className="text-sm text-gray-600 mt-1">{"Welcome back! Here's your overview"}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<Card key={stat.title} className="p-4">
							<div className="flex items-start justify-between">
								<div>
									<p className="text-xs text-gray-600">{stat.title}</p>
									<p className="text-2xl font-bold mt-1">{stat.value}</p>
								</div>
								<div className={`p-2 bg-gray-100 ${stat.color}`}>
									<Icon className="w-5 h-5" />
								</div>
							</div>
						</Card>
					);
				})}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="p-4">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-sm font-semibold">Available Opportunities</h2>
						<Link href="/user/home">
							<Button variant="ghost" size="sm">
								View All
							</Button>
						</Link>
					</div>
					<div className="space-y-2">
						{recentOpportunities.map((opp) => (
							<div
								key={opp.id}
								className="flex items-center justify-between p-3 hover:bg-gray-50 border border-gray-200">
								<div className="flex-1">
									<p className="text-sm font-medium">{opp.title}</p>
									<p className="text-xs text-gray-600">{opp.duration}</p>
								</div>
								<div className="text-right">
									<p className="text-sm font-bold">{opp.reward} pts</p>
									<Link href={`/user/opportunity/${opp.id}`}>
										<Button variant="ghost" size="sm">
											View
										</Button>
									</Link>
								</div>
							</div>
						))}
					</div>
				</Card>

				<Card className="p-4">
					<h2 className="text-sm font-semibold mb-4">Quick Actions</h2>
					<div className="space-y-3">
						<Link href="/user/opportunity">
							<Button variant="outline" fullWidth className="justify-start">
								Browse All Opportunities
							</Button>
						</Link>
						<Link href="/user/rewards">
							<Button variant="outline" fullWidth className="justify-start">
								View Available Rewards
							</Button>
						</Link>
						<Link href="/user/references">
							<Button variant="outline" fullWidth className="justify-start">
								Refer Friends
							</Button>
						</Link>
					</div>
				</Card>
			</div>
		</div>
	);
}
