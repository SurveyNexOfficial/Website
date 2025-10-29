import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "bordered" | "elevated";
}

export default function Card({ className = "", variant = "default", children, ...props }: CardProps) {
	const variants = {
		default: "bg-white border border-gray-200",
		bordered: "bg-white border-2 border-black",
		elevated: "bg-white shadow-md",
	};

	const classes = `
    ${variants[variant]}
    ${className}
  `
		.trim()
		.replace(/\s+/g, " ");

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
