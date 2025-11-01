export type QuestionType = "text" | "textarea" | "radio" | "checkbox" | "select" | "rating" | "date";

export interface QuestionOption {
	id: string;
	label: string;
	value: string;
}

export interface Question {
	id: string;
	surveyId: string;
	type: QuestionType;
	title: string;
	description?: string;
	required: boolean;
	options?: QuestionOption[];
	order: number;
}

export interface Survey {
	id: string;
	clientId: string;
	title: string;
	description: string;
	reward: number;
	rewardType: "points" | "cash" | "voucher";
	status: "draft" | "active" | "paused" | "closed";
	questions: Question[];
	totalResponses: number;
	targetResponses?: number;
	createdAt: Date;
	updatedAt: Date;
	expiresAt?: Date;
}

export interface SurveyFilters {
	status?: Survey["status"];
	search?: string;
	sortBy?: "createdAt" | "title" | "totalResponses";
	sortOrder?: "asc" | "desc";
}
