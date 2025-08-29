export interface FormElement {
	id: string;
	type: "text" | "textarea" | "radio" | "checkbox" | "select" | "email" | "number";
	label: string;
	placeholder?: string;
	required: boolean;
	options?: string[]; // for radio, checkbox, select
	validation?: {
		minLength?: number;
		maxLength?: number;
		pattern?: string;
	};
}

export interface Form {
	id: string;
	title: string;
	description?: string;
	elements: FormElement[];
	createdAt: string;
	updatedAt: string;
	settings: {
		showOneQuestionPerPage: boolean;
		allowMultipleSubmissions: boolean;
	};
}

export interface FormResponse {
	id: string;
	formId: string;
	responses: Record<string, string | string[]>;
	submittedAt: string;
}
