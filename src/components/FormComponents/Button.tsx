interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	isLoading?: boolean;
	children: React.ReactNode;
}

export default function Button({
	variant = "primary",
	isLoading = false,
	children,
	className = "",
	disabled,
	...props
}: ButtonProps) {
	const getButtonStyles = () => {
		const baseStyles =
			"w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-0 disabled:cursor-not-allowed";

		switch (variant) {
			case "primary":
				return `${baseStyles} bg-black text-white hover:bg-gray-900 active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-500`;
			case "secondary":
				return `${baseStyles} bg-white text-black border-2 border-gray-200 hover:border-gray-300 active:scale-[0.98] disabled:bg-gray-50 disabled:text-gray-400`;
			default:
				return baseStyles;
		}
	};

	return (
		<button className={`${getButtonStyles()} ${className}`} disabled={disabled || isLoading} {...props}>
			{isLoading ? (
				<div className="flex items-center justify-center space-x-2">
					<div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
					<span>Loading...</span>
				</div>
			) : (
				children
			)}
		</button>
	);
}
