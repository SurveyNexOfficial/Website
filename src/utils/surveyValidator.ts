import { z } from "zod";

const questionSchema = z
	.object({
		id: z.string(),
		question: z.string().min(1, "Question is required"),
		responseType: z.enum(["Text", "Select"]),
		allowMedia: z.boolean(),
		allowedMediaTypes: z.array(z.enum(["Image", "Video", "Audio", "PDF"])),
		maxMediaFiles: z.number().min(0).max(10),
		selectType: z.enum(["Single", "Multi"]).optional(),
		responseOptions: z.array(z.string()).refine((options) => {
			return true;
		}),
	})
	.refine(
		(data) => {
			if (data.allowMedia && data.allowedMediaTypes.length === 0) {
				return false;
			}
			if (data.responseType === "Select") {
				return data.selectType && data.responseOptions.length >= 2;
			}
			return true;
		},
		{
			message: "Invalid question configuration",
		}
	);

export const surveyFormSchema = z
	.object({
		name: z.string().min(1, "Survey name is required"),
		description: z.string().min(1, "Description is required"),
		termsAndConditions: z.string().min(1, "Terms and conditions are required"),
		startDate: z.string().min(1, "Start date is required"),
		endDate: z.string().min(1, "End date is required"),
		questions: z.array(questionSchema).min(1, "At least one question is required"),
	})
	.refine(
		(data) => {
			// End date must be after start date
			return new Date(data.endDate) > new Date(data.startDate);
		},
		{
			message: "End date must be after start date",
			path: ["endDate"],
		}
	);
