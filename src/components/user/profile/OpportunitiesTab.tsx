"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

interface CompletedOpportunity {
	id: string;
	title: string;
	completedAt: Date;
	timeSpent: number;
	reward: number;
	rewardType: string;
	status: "completed" | "pending" | "rewarded";
}

export default function OpportunitiesTab() {
	const [loading, setLoading] = useState(true);
	const [opportunities, setOpportunities] = useState<CompletedOpportunity[]>([]);
	const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

	useEffect(() => {
		loadOpportunities();
	}, [filter]);

	const loadOpportunities = async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			const mockData: CompletedOpportunity[] = [
				{
					id: "1",
					title: "Customer Satisfaction Survey",
					completedAt: new Date("2024-11-15"),
					timeSpent: 320,
					reward: 150,
					rewardType: "points",
					status: "rewarded",
				},
				{
					id: "2",
					title: "Product Feedback Survey",
					completedAt: new Date("2024-11-10"),
					timeSpent: 280,
					reward: 120,
					rewardType: "points",
					status: "rewarded",
				},
				{
					id: "3",
					title: "Service Quality Assessment",
					completedAt: new Date("2024-11-05"),
					timeSpent: 240,
					reward: 100,
					rewardType: "points",
					status: "pending",
				},
				{
					id: "4",
					title: "User Experience Research",
					completedAt: new Date("2024-10-28"),
					timeSpent: 420,
					reward: 200,
					rewardType: "points",
					status: "rewarded",
				},
				{
					id: "5",
					title: "Market Research Survey",
					completedAt: new Date("2024-10-20"),
					timeSpent: 360,
					reward: 180,
					rewardType: "points",
					status: "rewarded",
				},
			];
			setOpportunities(mockData);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}m ${secs}s`;
	};

	const filteredOpportunities = opportunities.filter((opp) => {
		if (filter === "all") return true;
		return opp.status === filter || (filter === "completed" && opp.status === "rewarded");
	});

	const totalCompleted = opportunities.filter((o) => o.status !== "pending").length;
	const totalEarned = opportunities.filter((o) => o.status === "rewarded").reduce((sum, o) => sum + o.reward, 0);

	if (loading) {
		return (
			<div className="py-12">
				<Loader />
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="p-4 border border-gray-200">
					<p className="text-xs text-gray-600">Total Completed</p>
					<p className="text-2xl font-bold mt-1">{totalCompleted}</p>
				</div>
				<div className="p-4 border border-gray-200">
					<p className="text-xs text-gray-600">Total Earned</p>
					<p className="text-2xl font-bold mt-1">{totalEarned} points</p>
				</div>
				<div className="p-4 border border-gray-200">
					<p className="text-xs text-gray-600">Pending Rewards</p>
					<p className="text-2xl font-bold mt-1">
						{opportunities.filter((o) => o.status === "pending").length}
					</p>
				</div>
			</div>

			<div className="flex gap-2">
				<Button variant={filter === "all" ? "primary" : "outline"} size="sm" onClick={() => setFilter("all")}>
					All
				</Button>
				<Button
					variant={filter === "completed" ? "primary" : "outline"}
					size="sm"
					onClick={() => setFilter("completed")}>
					Completed
				</Button>
				<Button
					variant={filter === "pending" ? "primary" : "outline"}
					size="sm"
					onClick={() => setFilter("pending")}>
					Pending
				</Button>
			</div>

			<div className="space-y-2">
				{filteredOpportunities.length === 0 ? (
					<div className="text-center py-8 text-sm text-gray-600">No opportunities found</div>
				) : (
					filteredOpportunities.map((opp) => (
						<div key={opp.id} className="p-4 border border-gray-200 hover:bg-gray-50">
							<div className="flex items-start justify-between mb-2">
								<div className="flex-1">
									<h3 className="text-sm font-semibold">{opp.title}</h3>
									<div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
										<div className="flex items-center gap-1">
											<Calendar className="w-3 h-3" />
											<span>{formatDate(opp.completedAt)}</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock className="w-3 h-3" />
											<span>{formatTime(opp.timeSpent)}</span>
										</div>
										<div className="flex items-center gap-1">
											<Award className="w-3 h-3" />
											<span className="font-semibold text-black">
												{opp.reward} {opp.rewardType}
											</span>
										</div>
									</div>
								</div>
								<span
									className={`text-xs px-2 py-1 ${
										opp.status === "rewarded"
											? "bg-green-100 text-green-700"
											: opp.status === "pending"
											? "bg-yellow-100 text-yellow-700"
											: "bg-gray-100 text-gray-700"
									}`}>
									{opp.status === "rewarded" ? "Rewarded" : "Pending"}
								</span>
							</div>
						</div>
					))
				)}
			</div>

			{filteredOpportunities.length > 0 && (
				<div className="text-center pt-4">
					<Link href="/user/opportunities">
						<Button variant="outline" size="sm">
							Browse More Opportunities
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
