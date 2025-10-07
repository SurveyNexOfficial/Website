import { Form, ResponseWithAnswers } from "@/types/form";

export const mockForm: Form = {
	id: "form-1",
	title: "Customer Feedback Survey",
	description: "Help us improve our services by sharing your feedback",
	elements: [
		{
			id: "elem-1",
			type: "text",
			label: "Full Name",
			placeholder: "Enter your name",
			required: true,
		},
		{
			id: "elem-2",
			type: "email",
			label: "Email Address",
			placeholder: "your@email.com",
			required: true,
		},
		{
			id: "elem-3",
			type: "radio",
			label: "How satisfied are you with our service?",
			required: true,
			options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
		},
		{
			id: "elem-4",
			type: "checkbox",
			label: "Which features do you use most?",
			required: false,
			options: ["Dashboard", "Reports", "Analytics", "Export", "API Access"],
		},
		{
			id: "elem-5",
			type: "select",
			label: "How did you hear about us?",
			required: true,
			options: ["Search Engine", "Social Media", "Friend Referral", "Advertisement", "Other"],
		},
		{
			id: "elem-6",
			type: "textarea",
			label: "Additional Comments",
			placeholder: "Share your thoughts...",
			required: false,
		},
	],
	createdAt: "2025-09-15T10:00:00Z",
	updatedAt: "2025-09-20T14:30:00Z",
	settings: {
		showOneQuestionPerPage: false,
		allowMultipleSubmissions: false,
	},
};

export const mockResponses: ResponseWithAnswers[] = [
	{
		id: "resp-1",
		formId: "form-1",
		submittedAt: "2025-10-05T09:15:00Z",
		respondentEmail: "john.doe@example.com",
		answers: [
			{ responseId: "resp-1", elementId: "elem-1", value: "John Doe" },
			{ responseId: "resp-1", elementId: "elem-2", value: "john.doe@example.com" },
			{ responseId: "resp-1", elementId: "elem-3", value: "Very Satisfied" },
			{ responseId: "resp-1", elementId: "elem-4", value: ["Dashboard", "Reports", "Analytics"] },
			{ responseId: "resp-1", elementId: "elem-5", value: "Search Engine" },
			{ responseId: "resp-1", elementId: "elem-6", value: "Great service! Keep up the good work." },
		],
	},
	{
		id: "resp-2",
		formId: "form-1",
		submittedAt: "2025-10-04T14:30:00Z",
		respondentEmail: "sarah.smith@example.com",
		answers: [
			{ responseId: "resp-2", elementId: "elem-1", value: "Sarah Smith" },
			{ responseId: "resp-2", elementId: "elem-2", value: "sarah.smith@example.com" },
			{ responseId: "resp-2", elementId: "elem-3", value: "Satisfied" },
			{ responseId: "resp-2", elementId: "elem-4", value: ["Dashboard", "Export"] },
			{ responseId: "resp-2", elementId: "elem-5", value: "Friend Referral" },
			{
				responseId: "resp-2",
				elementId: "elem-6",
				value: "The interface could be more intuitive, but overall it's good.",
			},
		],
	},
	{
		id: "resp-3",
		formId: "form-1",
		submittedAt: "2025-10-03T11:45:00Z",
		respondentEmail: "mike.wilson@example.com",
		answers: [
			{ responseId: "resp-3", elementId: "elem-1", value: "Mike Wilson" },
			{ responseId: "resp-3", elementId: "elem-2", value: "mike.wilson@example.com" },
			{ responseId: "resp-3", elementId: "elem-3", value: "Neutral" },
			{ responseId: "resp-3", elementId: "elem-4", value: ["API Access"] },
			{ responseId: "resp-3", elementId: "elem-5", value: "Social Media" },
			{ responseId: "resp-3", elementId: "elem-6", value: "" },
		],
	},
];
