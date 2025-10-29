import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/public/FormComponents/InputField";
import Button from "@/components/public/FormComponents/Button";
import { RegisterFormData, registerSchema } from "@/types/auth";
import Link from "next/link";
import GoogleButton from "../FormComponents/GoogleButton";

interface RegisterFormProps {
	onSubmit: (data: RegisterFormData) => void;
	onSwitchToLogin: () => void;
	onGoogleRegister: () => void;
	isLoading?: boolean;
	className?: string;
}

export default function RegisterForm(props: RegisterFormProps) {
	const { onGoogleRegister, onSubmit, onSwitchToLogin, className, isLoading } = props;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: "onSubmit",
	});

	const handleFormSubmit = async (data: RegisterFormData) => {
		try {
			await onSubmit(data);
		} catch (error) {
			console.error("Register error:", error);
		}
	};

	return (
		<div className={`flex flex-col gap-4 animate-slideIn ${className}`}>
			<div className="flex flex-col gap-y-6">
				<div className="flex flex-col gap-y-4">
					<InputField
						{...register("name")}
						label="Full name"
						variant="text"
						placeholder="Enter your full name"
						error={errors.name}
					/>

					<InputField
						{...register("email")}
						label="Email address"
						variant="email"
						placeholder="Enter your email"
						error={errors.email}
					/>

					<InputField
						{...register("phone")}
						label="Phone number"
						variant="tel"
						placeholder="Enter your phone number"
						error={errors.phone}
					/>

					<InputField
						{...register("password")}
						label="Password"
						variant="password"
						placeholder="Create a password"
						error={errors.password}
						showPasswordToggle
					/>

					<InputField
						{...register("confirmPassword")}
						label="Confirm password"
						variant="password"
						placeholder="Confirm your password"
						error={errors.confirmPassword}
						showPasswordToggle
					/>
				</div>

				<div className="flex items-center">
					<input
						id="terms"
						name="terms"
						type="checkbox"
						required
						className="h-4 w-4 text-black focus:ring-0 border-gray-300 rounded"
					/>
					<label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
						<span>I agree to the</span>
						<Link href="#" className="text-black hover:text-gray-700 font-medium">
							<span>Terms of Service</span>
						</Link>
						<span>and</span>
						<Link href="#" className="text-black hover:text-gray-700 font-medium">
							<span>Privacy Policy</span>
						</Link>
					</label>
				</div>

				<Button
					type="button"
					variant="primary"
					isLoading={isLoading || isSubmitting}
					disabled={isLoading || isSubmitting}
					onClick={handleSubmit(handleFormSubmit)}>
					Create account
				</Button>
			</div>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-200" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-4 bg-white text-gray-600">Or continue with</span>
				</div>
			</div>

			<GoogleButton handleClick={onGoogleRegister} />

			<div className="text-center">
				<span className="text-gray-600">Already have an account? </span>
				<button
					type="button"
					onClick={onSwitchToLogin}
					className="font-semibold text-black hover:text-gray-700 transition-colors">
					Sign in
				</button>
			</div>
		</div>
	);
}
