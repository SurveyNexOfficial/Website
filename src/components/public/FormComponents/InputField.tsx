import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { FormFieldVariant, FieldError } from "@/types/auth";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: FieldError;
	variant?: FormFieldVariant;
	showPasswordToggle?: boolean;
}

export default function InputField({
	label,
	error,
	variant = "text",
	showPasswordToggle = false,
	className = "",
	...props
}: InputFieldProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const getIcon = () => {
		switch (variant) {
			case "email":
				return <Mail className="w-5 h-5 text-gray-400" />;
			case "password":
				return <Lock className="w-5 h-5 text-gray-400" />;
			case "tel":
				return <Phone className="w-5 h-5 text-gray-400" />;
			default:
				return <User className="w-5 h-5 text-gray-400" />;
		}
	};

	const inputType =
		variant === "password" && !showPassword
			? "password"
			: variant === "password" && showPassword
			? "text"
			: variant === "tel"
			? "tel"
			: variant === "email"
			? "email"
			: "text";

	return (
		<div className="flex flex-col gap-2">
			<label className="text-sm text-gray-900 font-medium">{label}</label>
			<div className="relative group">
				<div className="absolute inset-y-0 left-0 px-4 flex items-center justify-center pointer-events-none">
					{getIcon()}
				</div>

				<input
					className={`w-full py-4 px-12 border border-gray-200 bg-white rounded-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black transition-all duration-300 ease-in-out hover:border-gray-400 
                        ${error ? "border-red-500 focus:border-red-500" : ""}
                        ${isFocused ? "border-black" : ""}
                        ${className}`}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					{...props}
				/>

				{showPasswordToggle && variant === "password" && (
					<button
						type="button"
						className="absolute inset-y-0 right-0 px-4 flex items-center justify-center"
						onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? (
							<EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
						) : (
							<Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
						)}
					</button>
				)}
			</div>

			{error && <p className="text-sm text-red-600 animate-fadeIn">{error.message}</p>}
		</div>
	);
}
