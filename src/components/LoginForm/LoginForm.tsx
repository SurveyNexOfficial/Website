import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/FormComponents/InputField";
import Button from "@/components/FormComponents/Button";
import { LoginFormData, loginSchema } from "@/types/auth";
import GoogleButton from "../FormComponents/GoogleButton";

interface LoginFormProps {
	onSubmit: (data: LoginFormData) => void;
	onSwitchToRegister: () => void;
	onGoogleLogin: () => void;
	isLoading?: boolean;
	className?: string;
}

export default function LoginForm(props: LoginFormProps) {
	const { onGoogleLogin, onSubmit, onSwitchToRegister, className, isLoading } = props;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: "onSubmit",
	});

	const handleForgotPassword = () => {
		alert("Forgot password handler function!");
	};

	const handleFormSubmit = async (data: LoginFormData) => {
		try {
			await onSubmit(data);
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div className={`flex flex-col gap-4 animate-slideIn ${className}`}>
			<div className="flex flex-col gap-y-6">
				<div className="flex flex-col gap-y-4">
					<InputField
						{...register("email")}
						label="Email address"
						variant="email"
						placeholder="Enter your email"
						error={errors.email}
					/>

					<InputField
						{...register("password")}
						label="Password"
						variant="password"
						placeholder="Enter your password"
						error={errors.password}
						showPasswordToggle
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							className="h-4 w-4 text-black focus:ring-0 border-gray-300 rounded"
						/>
						<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
							Remember me
						</label>
					</div>

					<button
						onClick={handleForgotPassword}
						type="button"
						className="text-sm text-black hover:text-gray-700 font-medium transition-colors">
						Forgot password?
					</button>
				</div>

				<Button
					type="button"
					variant="primary"
					isLoading={isLoading || isSubmitting}
					disabled={isLoading || isSubmitting}
					onClick={handleSubmit(handleFormSubmit)}>
					Sign in
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

			<GoogleButton handleClick={onGoogleLogin} />

			<div className="text-center">
				<span className="text-gray-600">New to SurveyNex? </span>
				<button
					type="button"
					onClick={onSwitchToRegister}
					className="font-semibold text-black hover:text-gray-700 transition-colors">
					Create an account
				</button>
			</div>
		</div>
	);
}
