export type MediaType = "Image" | "Video" | "Audio" | "PDF";

export type ResponseType = "Text" | "Select";

export type SelectType = "Single" | "Multi";

export interface Question {
	id: string;
	question: string;
	responseType: ResponseType;
	allowMedia: boolean;
	allowedMediaTypes: MediaType[];
	maxMediaFiles: number;
	selectType?: SelectType;
	responseOptions: string[];
}

export interface Survey {
	id: string;
	name: string;
	description: string;
	termsAndConditions: string;
	startDate: string;
	endDate: string;
	questions: Question[];
	createdAt: string;
}

export interface SurveyFormData {
	name: string;
	description: string;
	termsAndConditions: string;
	startDate: string;
	endDate: string;
	questions: Question[];
}
