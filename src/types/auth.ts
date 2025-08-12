import { z } from "zod/v4";

export type FormFieldVariant = "email" | "password" | "text" | "tel";

export const loginSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(1, "Name is required")
			.min(2, "Name must be at least 2 characters")
			.max(50, "Name must be less than 50 characters"),
		email: z.email("Please enter a valid email address"),
		phone: z
			.string()
			.min(1, "Phone number is required")
			.regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
			.min(10, "Phone number must be at least 10 digits"),
		password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export type FieldError = {
	message?: string;
};
