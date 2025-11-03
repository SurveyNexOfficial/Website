"use client";

import { useState, useEffect } from "react";
import { Gift, Award } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { PageLoader } from "@/components/ui/Loader";
import { Reward } from "@/types/reward";

export default function RewardsPage() {
	const [loading, setLoading] = useState(true);
	const [rewards, setRewards] = useState<Reward[]>([]);
	const [userPoints, setUserPoints] = useState(2450);
	const [claimModal, setClaimModal] = useState<Reward | null>(null);
	const [claiming, setClaiming] = useState(false);

	useEffect(() => {
		loadRewards();
	}, []);

	const loadRewards = async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			const mockRewards: Reward[] = [
				{
					id: "1",
					title: "$10 Amazon Gift Card",
					description: "Redeem your points for an Amazon gift card",
					points: 1000,
					type: "voucher",
					available: 50,
				},
				{
					id: "2",
					title: "$25 PayPal Cash",
					description: "Direct cash transfer to your PayPal account",
					points: 2500,
					type: "cash",
					available: 25,
				},
				{
					id: "3",
					title: "$5 Starbucks Voucher",
					description: "Enjoy a coffee on us",
					points: 500,
					type: "voucher",
					available: 100,
				},
				{
					id: "4",
					title: "$50 Shopping Voucher",
					description: "Use at major retail stores",
					points: 5000,
					type: "voucher",
					available: 15,
				},
			];
			setRewards(mockRewards);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleClaim = async (reward: Reward) => {
		setClaiming(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setUserPoints(userPoints - reward.points);
			setClaimModal(null);
		} catch (error) {
			console.error(error);
		} finally {
			setClaiming(false);
		}
	};

	if (loading) return <PageLoader />;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-bold">Available Rewards</h1>
					<p className="text-sm text-gray-600 mt-1">Redeem your points for exciting rewards</p>
				</div>
			</div>

			<Card className="p-5 bg-black text-white">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm opacity-80">Your Points</p>
						<p className="text-3xl font-bold mt-1">{userPoints.toLocaleString()}</p>
					</div>
					<Award className="w-12 h-12 opacity-50" />
				</div>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{rewards.map((reward) => {
					const canClaim = userPoints >= reward.points;
					return (
						<Card key={reward.id} className="p-4">
							<div className="space-y-3">
								<div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
									<Gift className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-sm font-semibold mb-1">{reward.title}</h3>
									<p className="text-xs text-gray-600">{reward.description}</p>
								</div>
								<div className="flex items-center justify-between pt-2 border-t border-gray-200">
									<div>
										<p className="text-xs text-gray-600">Points Required</p>
										<p className="text-sm font-bold">{reward.points.toLocaleString()}</p>
									</div>
									<Button size="sm" disabled={!canClaim} onClick={() => setClaimModal(reward)}>
										Claim
									</Button>
								</div>
								<p className="text-xs text-gray-600">{reward.available} available</p>
							</div>
						</Card>
					);
				})}
			</div>

			{claimModal && (
				<Modal isOpen={!!claimModal} onClose={() => setClaimModal(null)} title="Claim Reward" size="sm">
					<div className="space-y-4">
						<div>
							<h3 className="text-sm font-semibold mb-1">{claimModal.title}</h3>
							<p className="text-xs text-gray-600">{claimModal.description}</p>
						</div>
						<div className="p-3 bg-gray-50 border border-gray-200">
							<div className="flex items-center justify-between text-sm">
								<span>Points Required:</span>
								<span className="font-bold">{claimModal.points.toLocaleString()}</span>
							</div>
							<div className="flex items-center justify-between text-sm mt-2">
								<span>Your Points:</span>
								<span className="font-bold">{userPoints.toLocaleString()}</span>
							</div>
							<div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-gray-300">
								<span>After Claim:</span>
								<span className="font-bold">{(userPoints - claimModal.points).toLocaleString()}</span>
							</div>
						</div>
						<div className="flex gap-2">
							<Button variant="outline" onClick={() => setClaimModal(null)} fullWidth>
								Cancel
							</Button>
							<Button onClick={() => handleClaim(claimModal)} disabled={claiming} fullWidth>
								{claiming ? "Claiming..." : "Confirm"}
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}
