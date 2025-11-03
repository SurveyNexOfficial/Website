"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Copy, Check, Calendar, Award, UserCheck, UserX } from "lucide-react";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

interface Referral {
	id: string;
	name: string;
	email: string;
	joinedAt: Date;
	completedSurveys: number;
	earnedPoints: number;
	status: "active" | "inactive" | "pending";
}

export default function ReferencesTab() {
	const [loading, setLoading] = useState(true);
	const [referrals, setReferrals] = useState<Referral[]>([]);
	const [copied, setCopied] = useState(false);
	const [filter, setFilter] = useState<"all" | "active" | "pending">("all");

	const referralCode = "REF2024XYZ";
	const referralLink = `https://platform.com/register?ref=${referralCode}`;

	useEffect(() => {
		loadReferrals();
	}, [filter]);

	const loadReferrals = async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			const mockData: Referral[] = [
				{
					id: "1",
					name: "Alice Johnson",
					email: "alice@example.com",
					joinedAt: new Date("2024-11-15"),
					completedSurveys: 5,
					earnedPoints: 50,
					status: "active",
				},
				{
					id: "2",
					name: "Bob Smith",
					email: "bob@example.com",
					joinedAt: new Date("2024-11-10"),
					completedSurveys: 8,
					earnedPoints: 50,
					status: "active",
				},
				{
					id: "3",
					name: "Carol White",
					email: "carol@example.com",
					joinedAt: new Date("2024-11-05"),
					completedSurveys: 0,
					earnedPoints: 0,
					status: "pending",
				},
				{
					id: "4",
					name: "David Brown",
					email: "david@example.com",
					joinedAt: new Date("2024-10-28"),
					completedSurveys: 12,
					earnedPoints: 50,
					status: "active",
				},
				{
					id: "5",
					name: "Emma Wilson",
					email: "emma@example.com",
					joinedAt: new Date("2024-10-20"),
					completedSurveys: 3,
					earnedPoints: 50,
					status: "active",
				},
			];
			setReferrals(mockData);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(referralLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const filteredReferrals = referrals.filter((ref) => {
		if (filter === "all") return true;
		return ref.status === filter;
	});

	const totalReferrals = referrals.length;
	const activeReferrals = referrals.filter((r) => r.status === "active").length;
	const totalEarned = referrals.reduce((sum, r) => sum + r.earnedPoints, 0);

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
					<p className="text-xs text-gray-600">Total Referrals</p>
					<p className="text-2xl font-bold mt-1">{totalReferrals}</p>
				</div>
				<div className="p-4 border border-gray-200">
					<p className="text-xs text-gray-600">Active Referrals</p>
					<p className="text-2xl font-bold mt-1">{activeReferrals}</p>
				</div>
				<div className="p-4 border border-gray-200">
					<p className="text-xs text-gray-600">Points Earned</p>
					<p className="text-2xl font-bold mt-1">{totalEarned}</p>
				</div>
			</div>

			<div className="p-4 bg-gray-50 border border-gray-200">
				<p className="text-xs text-gray-600 mb-2">Your Referral Code</p>
				<div className="flex gap-2">
					<div className="flex-1 px-3 py-2 bg-white border border-gray-300 text-sm font-mono">
						{referralCode}
					</div>
					<Button variant="outline" onClick={handleCopy}>
						{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
					</Button>
				</div>
			</div>

			<div className="flex gap-2">
				<Button variant={filter === "all" ? "primary" : "outline"} size="sm" onClick={() => setFilter("all")}>
					All
				</Button>
				<Button
					variant={filter === "active" ? "primary" : "outline"}
					size="sm"
					onClick={() => setFilter("active")}>
					Active
				</Button>
				<Button
					variant={filter === "pending" ? "primary" : "outline"}
					size="sm"
					onClick={() => setFilter("pending")}>
					Pending
				</Button>
			</div>

			<div className="space-y-2">
				{filteredReferrals.length === 0 ? (
					<div className="text-center py-8 text-sm text-gray-600">No referrals found</div>
				) : (
					filteredReferrals.map((referral) => (
						<div key={referral.id} className="p-4 border border-gray-200">
							<div className="flex items-start justify-between mb-2">
								<div className="flex-1">
									<h3 className="text-sm font-semibold">{referral.name}</h3>
									<p className="text-xs text-gray-600">{referral.email}</p>
								</div>
								<span
									className={`text-xs px-2 py-1 flex items-center gap-1 ${
										referral.status === "active"
											? "bg-green-100 text-green-700"
											: referral.status === "pending"
											? "bg-yellow-100 text-yellow-700"
											: "bg-gray-100 text-gray-700"
									}`}>
									{referral.status === "active" ? (
										<>
											<UserCheck className="w-3 h-3" />
											Active
										</>
									) : referral.status === "pending" ? (
										<>
											<UserX className="w-3 h-3" />
											Pending
										</>
									) : (
										"Inactive"
									)}
								</span>
							</div>

							<div className="grid grid-cols-3 gap-3 text-xs">
								<div>
									<p className="text-gray-600 mb-1">Joined</p>
									<div className="flex items-center gap-1">
										<Calendar className="w-3 h-3" />
										<span className="font-medium">{formatDate(referral.joinedAt)}</span>
									</div>
								</div>
								<div>
									<p className="text-gray-600 mb-1">Surveys</p>
									<p className="font-bold text-black">{referral.completedSurveys}</p>
								</div>
								<div>
									<p className="text-gray-600 mb-1">Points Earned</p>
									<div className="flex items-center gap-1">
										<Award className="w-3 h-3" />
										<span className="font-bold text-black">
											{referral.earnedPoints > 0 ? `+${referral.earnedPoints}` : "0"}
										</span>
									</div>
								</div>
							</div>

							{referral.status === "pending" && (
								<p className="text-xs text-gray-600 mt-2 p-2 bg-yellow-50 border border-yellow-200">
									Waiting for first survey completion to earn referral bonus
								</p>
							)}
						</div>
					))
				)}
			</div>

			{filteredReferrals.length > 0 && (
				<div className="text-center pt-4">
					<Link href="/user/references">
						<Button variant="outline" size="sm">
							View Referral Page
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
