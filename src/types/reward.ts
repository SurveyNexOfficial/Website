export interface Reward {
	id: string;
	title: string;
	description: string;
	points: number;
	type: "voucher" | "cash" | "gift";
	available: number;
	imageUrl?: string;
	expiresAt?: Date;
}

export interface UserReward {
	id: string;
	userId: string;
	rewardId: string;
	reward: Reward;
	claimedAt: Date;
	redeemedAt?: Date;
	code?: string;
	status: "claimed" | "redeemed" | "expired";
}
