import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className = "", label, error, fullWidth = false, ...props }, ref) => {
		const inputClasses = `
      w-full px-3 py-1.5 text-sm bg-white border border-gray-300 
      focus:outline-none focus:ring-1 focus:ring-black focus:border-black
      disabled:bg-gray-100 disabled:cursor-not-allowed
      ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
      ${className}
    `
			.trim()
			.replace(/\s+/g, " ");

		return (
			<div className={fullWidth ? "w-full" : ""}>
				{label && <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>}
				<input ref={ref} className={inputClasses} {...props} />
				{error && <p className="mt-1 text-xs text-red-600">{error}</p>}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
