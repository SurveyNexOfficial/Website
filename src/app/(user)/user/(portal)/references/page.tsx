"use client";

import { useState } from "react";
import { Copy, Check, Users, Gift } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ReferencesPage() {
	const [copied, setCopied] = useState(false);
	const [email, setEmail] = useState("");
	const [sending, setSending] = useState(false);

	const referralCode = "REF2024XYZ";
	const referralLink = `https://platform.com/register?ref=${referralCode}`;
	const totalReferrals = 12;
	const earnedPoints = 600;

	const handleCopy = () => {
		navigator.clipboard.writeText(referralLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleSendInvite = async (e: React.FormEvent) => {
		e.preventDefault();
		setSending(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setEmail("");
		} catch (error) {
			console.error(error);
		} finally {
			setSending(false);
		}
	};

	const recentReferrals = [
		{ name: "Alice Johnson", points: 50, date: "2024-11-15", status: "completed" },
		{ name: "Bob Smith", points: 50, date: "2024-11-10", status: "completed" },
		{ name: "Carol White", points: 0, date: "2024-11-05", status: "pending" },
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-bold">Refer Friends</h1>
				<p className="text-sm text-gray-600 mt-1">Earn rewards by inviting friends</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card className="p-5">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-xs text-gray-600">Total Referrals</p>
							<p className="text-3xl font-bold mt-1">{totalReferrals}</p>
						</div>
						<Users className="w-8 h-8 text-gray-400" />
					</div>
				</Card>

				<Card className="p-5">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-xs text-gray-600">Points Earned</p>
							<p className="text-3xl font-bold mt-1">{earnedPoints}</p>
						</div>
						<Gift className="w-8 h-8 text-gray-400" />
					</div>
				</Card>
			</div>

			<Card className="p-5">
				<h2 className="text-sm font-semibold mb-3">Your Referral Link</h2>
				<div className="flex gap-2">
					<Input value={referralLink} readOnly fullWidth />
					<Button variant="outline" onClick={handleCopy}>
						{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
					</Button>
				</div>
				<p className="text-xs text-gray-600 mt-2">
					{"Share this link with your friends. You'll earn 50 points when they complete their first survey."}
				</p>
			</Card>

			<Card className="p-5">
				<h2 className="text-sm font-semibold mb-3">Send Invitation via Email</h2>
				<form onSubmit={handleSendInvite} className="flex gap-2">
					<Input
						type="email"
						placeholder="friend@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						fullWidth
					/>
					<Button type="submit" disabled={sending}>
						{sending ? "Sending..." : "Send"}
					</Button>
				</form>
			</Card>

			<Card className="p-5">
				<h2 className="text-sm font-semibold mb-4">Recent Referrals</h2>
				<div className="space-y-2">
					{recentReferrals.map((referral, index) => (
						<div key={index} className="flex items-center justify-between p-3 border border-gray-200">
							<div>
								<p className="text-sm font-medium">{referral.name}</p>
								<p className="text-xs text-gray-600">{referral.date}</p>
							</div>
							<div className="text-right">
								<p className="text-sm font-bold">
									{referral.points > 0 ? `+${referral.points} pts` : "-"}
								</p>
								<span
									className={`text-xs px-2 py-0.5 ${
										referral.status === "completed"
											? "bg-green-100 text-green-700"
											: "bg-yellow-100 text-yellow-700"
									}`}>
									{referral.status}
								</span>
							</div>
						</div>
					))}
				</div>
			</Card>

			<Card className="p-5 bg-gray-50">
				<h2 className="text-sm font-semibold mb-2">How It Works</h2>
				<ul className="space-y-2 text-sm text-gray-600">
					<li className="flex items-start gap-2">
						<span className="text-black font-bold">1.</span>
						<span>Share your unique referral link with friends</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-black font-bold">2.</span>
						<span>They sign up using your link</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-black font-bold">3.</span>
						<span>Once they complete their first survey, you both earn 50 points</span>
					</li>
				</ul>
			</Card>
		</div>
	);
}
