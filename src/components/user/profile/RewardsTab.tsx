"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gift, Calendar, Check, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

interface UserReward {
	id: string;
	title: string;
	description: string;
	points: number;
	claimedAt: Date;
	redeemedAt?: Date;
	code?: string;
	status: "claimed" | "redeemed" | "expired";
	expiresAt?: Date;
}

export default function RewardsTab() {
	const [loading, setLoading] = useState(true);
	const [rewards, setRewards] = useState<UserReward[]>([]);
	const [filter, setFilter] = useState<"all" | "claimed" | "redeemed" | "expired">("all");

	useEffect(() => {
		loadRewards();
	}, [filter]);

	const loadRewards = async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			const mockData: UserReward[] = [
				{
					id: "1",
					title: "$10 Amazon Gift Card",
					description: "Amazon shopping voucher",
					points: 1000,
					claimedAt: new Date("2024-11-10"),
					redeemedAt: new Date("2024-11-12"),
					code: "AMZN-XXXX-YYYY-ZZZZ",
					status: "redeemed",
				},
				{
					id: "2",
					title: "$5 Starbucks Voucher",
					description: "Coffee voucher",
					points: 500,
					claimedAt: new Date("2024-11-05"),
					code: "SBUX-AAAA-BBBB-CCCC",
					status: "claimed",
					expiresAt: new Date("2024-12-31"),
				},
				{
					id: "3",
					title: "$25 PayPal Cash",
					description: "Direct PayPal transfer",
					points: 2500,
					claimedAt: new Date("2024-10-20"),
					redeemedAt: new Date("2024-10-21"),
					status: "redeemed",
				},
				{
					id: "4",
					title: "$10 Movie Ticket",
					description: "Cinema voucher",
					points: 1000,
					claimedAt: new Date("2024-09-15"),
					status: "expired",
					expiresAt: new Date("2024-10-15"),
				},
			];
			setRewards(mockData);
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

	const filteredRewards = rewards.filter((reward) => {
		if (filter === "all") return true;
		return reward.status === filter;
	});

	const totalClaimed = rewards.length;
	const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0);
	const activeRewards = rewards.filter((r) => r.status === "claimed").length;

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
					<p className="text-xs text-gray-600">Total Claimed</p>
					<p className="text-2xl font-bold mt-1">{totalClaimed}</p>
				</div>
				<div className="p-4 border border-gray-200">
					<p className="text-xs text-gray-600">Points Spent</p>
					<p className="text-2xl font-bold mt-1">{totalPoints}</p>
				</div>
				<div className="p-4 border border-gray-200">
					<p className="text-xs text-gray-600">Active Rewards</p>
					<p className="text-2xl font-bold mt-1">{activeRewards}</p>
				</div>
			</div>

			<div className="flex gap-2">
				<Button variant={filter === "all" ? "primary" : "outline"} size="sm" onClick={() => setFilter("all")}>
					All
				</Button>
				<Button
					variant={filter === "claimed" ? "primary" : "outline"}
					size="sm"
					onClick={() => setFilter("claimed")}>
					Active
				</Button>
				<Button
					variant={filter === "redeemed" ? "primary" : "outline"}
					size="sm"
					onClick={() => setFilter("redeemed")}>
					Redeemed
				</Button>
				<Button
					variant={filter === "expired" ? "primary" : "outline"}
					size="sm"
					onClick={() => setFilter("expired")}>
					Expired
				</Button>
			</div>

			<div className="space-y-2">
				{filteredRewards.length === 0 ? (
					<div className="text-center py-8 text-sm text-gray-600">No rewards found</div>
				) : (
					filteredRewards.map((reward) => (
						<div key={reward.id} className="p-4 border border-gray-200">
							<div className="flex items-start gap-3">
								<div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
									<Gift className="w-5 h-5" />
								</div>
								<div className="flex-1">
									<div className="flex items-start justify-between mb-2">
										<div>
											<h3 className="text-sm font-semibold">{reward.title}</h3>
											<p className="text-xs text-gray-600">{reward.description}</p>
										</div>
										<span
											className={`text-xs px-2 py-1 ${
												reward.status === "redeemed"
													? "bg-green-100 text-green-700"
													: reward.status === "claimed"
													? "bg-blue-100 text-blue-700"
													: "bg-red-100 text-red-700"
											}`}>
											{reward.status === "redeemed" ? (
												<span className="flex items-center gap-1">
													<Check className="w-3 h-3" />
													Redeemed
												</span>
											) : reward.status === "claimed" ? (
												<span className="flex items-center gap-1">
													<Clock className="w-3 h-3" />
													Active
												</span>
											) : (
												"Expired"
											)}
										</span>
									</div>

									<div className="space-y-2">
										<div className="flex items-center gap-4 text-xs text-gray-600">
											<div className="flex items-center gap-1">
												<Calendar className="w-3 h-3" />
												<span>Claimed: {formatDate(reward.claimedAt)}</span>
											</div>
											{reward.redeemedAt && (
												<div className="flex items-center gap-1">
													<Check className="w-3 h-3" />
													<span>Redeemed: {formatDate(reward.redeemedAt)}</span>
												</div>
											)}
											{reward.expiresAt && reward.status === "claimed" && (
												<div className="flex items-center gap-1">
													<Clock className="w-3 h-3" />
													<span>Expires: {formatDate(reward.expiresAt)}</span>
												</div>
											)}
										</div>

										{reward.code && reward.status === "claimed" && (
											<div className="p-2 bg-gray-50 border border-gray-300">
												<p className="text-xs text-gray-600 mb-1">Reward Code:</p>
												<p className="text-sm font-mono font-bold">{reward.code}</p>
											</div>
										)}

										<div className="text-xs">
											<span className="text-gray-600">Points Used:</span>
											<span className="font-bold text-black ml-1">{reward.points}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{filteredRewards.length > 0 && (
				<div className="text-center pt-4">
					<Link href="/user/rewards">
						<Button variant="outline" size="sm">
							Browse More Rewards
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
