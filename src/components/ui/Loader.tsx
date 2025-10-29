export default function Loader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
	const sizes = {
		sm: "w-4 h-4 border-2",
		md: "w-8 h-8 border-2",
		lg: "w-12 h-12 border-3",
	};

	return (
		<div className="flex items-center justify-center">
			<div className={`${sizes[size]} border-gray-300 border-t-black rounded-full animate-spin`} />
		</div>
	);
}

export function PageLoader() {
	return (
		<div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
			<Loader size="lg" />
		</div>
	);
}
