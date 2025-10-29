import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className = "", variant = "primary", size = "md", fullWidth = false, disabled, children, ...props }, ref) => {
		const baseStyles =
			"inline-flex items-center justify-center font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

		const variants = {
			primary: "bg-black text-white border-black hover:bg-gray-800 focus:ring-gray-400",
			secondary: "bg-gray-100 text-black border-gray-300 hover:bg-gray-200 focus:ring-gray-400",
			outline: "bg-white text-black border-black hover:bg-black hover:text-white focus:ring-gray-400",
			ghost: "bg-transparent text-black border-transparent hover:bg-gray-100 focus:ring-gray-400",
			danger: "bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-400",
		};

		const sizes = {
			sm: "px-3 py-1.5 text-xs",
			md: "px-4 py-2 text-sm",
			lg: "px-6 py-2.5 text-base",
		};

		const classes = `
      ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `
			.trim()
			.replace(/\s+/g, " ");

		return (
			<button ref={ref} className={classes} disabled={disabled} {...props}>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;
