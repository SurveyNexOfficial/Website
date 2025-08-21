export interface Opportunity {
	id: string;
	name: string;
	brandName: string;
	deadline: string;
	rewards: number;
	description: string;
	termsAndConditions: string[];
	requirements: string[];
	estimatedTime: number; // in minutes
	category: string;
	difficulty: "Easy" | "Medium" | "Hard";
	participantsNeeded: number;
	currentParticipants: number;
	status: "Active" | "Ending Soon" | "Closed";
	createdAt: string;
}
