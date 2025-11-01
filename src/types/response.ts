export interface QuestionResponse {
	questionId: string;
	questionTitle: string;
	questionType: string;
	answer: string | string[];
}

export interface SurveyResponse {
	id: string;
	surveyId: string;
	userId: string;
	userName: string;
	userEmail: string;
	responses: QuestionResponse[];
	completedAt: Date;
	timeSpent: number;
}

export interface ResponseFilters {
	sortBy?: "completedAt" | "timeSpent";
	sortOrder?: "asc" | "desc";
	dateFrom?: Date;
	dateTo?: Date;
}
