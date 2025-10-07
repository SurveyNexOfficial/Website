import Link from "next/link";
import { format } from "date-fns";
import { ResponseWithAnswers } from "@/types/form";
import { ChevronRight } from "lucide-react";

interface ResponseCardProps {
	response: ResponseWithAnswers;
	formId: string;
}

export default function ResponseCard({ response, formId }: ResponseCardProps) {
	const formattedDate = format(new Date(response.submittedAt), "MMM dd, yyyy");
	const formattedTime = format(new Date(response.submittedAt), "hh:mm a");

	return (
		<Link
			href={`/businesses/${formId}/responses/${response.id}`}
			className="block border border-black/10 hover:border-black/30 transition-colors">
			<div className="p-6">
				<div className="flex items-center justify-between">
					<div className="flex-1">
						<div className="flex items-center gap-4 mb-2">
							<span className="text-sm font-medium text-black/60">
								Response #{response.id.split("-")[1]}
							</span>
							<span className="text-sm text-black/40">•</span>
							<span className="text-sm text-black/60">{formattedDate}</span>
						</div>

						{response.respondentEmail && <p className="text-base text-black">{response.respondentEmail}</p>}

						<p className="text-sm text-black/40 mt-1">{formattedTime}</p>
					</div>

					<ChevronRight className="w-5 h-5 text-black/40" />
				</div>
			</div>
		</Link>
	);
}
