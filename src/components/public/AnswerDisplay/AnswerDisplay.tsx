import { FormElement, QuestionResponse } from "@/types/form";

interface AnswerDisplayProps {
	element: FormElement;
	answer: QuestionResponse;
}

export default function AnswerDisplay({ element, answer }: AnswerDisplayProps) {
	const renderAnswer = () => {
		// For text-based inputs (text, textarea, email, number)
		if (["text", "textarea", "email", "number"].includes(element.type)) {
			return (
				<div className="mt-3">
					<p className="text-base text-black">{answer.value || "—"}</p>
				</div>
			);
		}

		// For radio buttons
		if (element.type === "radio" && element.options) {
			return (
				<div className="mt-4 space-y-2">
					{element.options.map((option) => {
						const isSelected = answer.value === option;
						return (
							<div
								key={option}
								className={`px-4 py-3 border ${
									isSelected
										? "border-black bg-black text-white"
										: "border-black/10 bg-white text-black"
								}`}>
								<p className="text-sm">{option}</p>
							</div>
						);
					})}
				</div>
			);
		}

		// For checkboxes
		if (element.type === "checkbox" && element.options) {
			const selectedValues = Array.isArray(answer.value) ? answer.value : [answer.value];
			return (
				<div className="mt-4 space-y-2">
					{element.options.map((option) => {
						const isSelected = selectedValues.includes(option);
						return (
							<div
								key={option}
								className={`px-4 py-3 border ${
									isSelected
										? "border-black bg-black text-white"
										: "border-black/10 bg-white text-black"
								}`}>
								<p className="text-sm">{option}</p>
							</div>
						);
					})}
				</div>
			);
		}

		// For select/dropdown
		if (element.type === "select" && element.options) {
			return (
				<div className="mt-4 space-y-2">
					{element.options.map((option) => {
						const isSelected = answer.value === option;
						return (
							<div
								key={option}
								className={`px-4 py-3 border ${
									isSelected
										? "border-black bg-black text-white"
										: "border-black/10 bg-white text-black"
								}`}>
								<p className="text-sm">{option}</p>
							</div>
						);
					})}
				</div>
			);
		}

		return null;
	};

	return (
		<div className="py-8 border-b border-black/10 last:border-b-0">
			<div className="flex items-start gap-2">
				<p className="text-sm font-medium text-black">
					{element.label}
					{element.required && <span className="text-black/40 ml-1">*</span>}
				</p>
			</div>
			{renderAnswer()}
		</div>
	);
}
