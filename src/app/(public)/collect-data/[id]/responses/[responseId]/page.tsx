import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { mockForm, mockResponses } from "@/data/responses";
import AnswerDisplay from "@/components/public/AnswerDisplay/AnswerDisplay";

interface PageProps {
	params: Promise<{ id: string; responseId: string }>;
}

export default async function ResponseDetailPage({ params }: PageProps) {
	const { id: formId, responseId } = await params;

	// In real app, fetch form and specific response based on IDs
	const form = mockForm;
	const response = mockResponses.find((r) => r.id === responseId);

	if (!response) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<p className="text-black/40">Response not found</p>
			</div>
		);
	}

	const formattedDate = format(new Date(response.submittedAt), "MMMM dd, yyyy");
	const formattedTime = format(new Date(response.submittedAt), "hh:mm a");

	return (
		<section className="min-h-screen w-full py-10 relative bg-white">
			<div className="max-w-7xl mx-auto w-full">
				{/* Back Button */}
				<Link
					href={`/collect-data/${formId}/responses`}
					className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black mb-8 transition-colors">
					<ArrowLeft className="w-4 h-4" />
					Back to responses
				</Link>

				{/* Header */}
				<div className="mb-12">
					<h1 className="text-4xl font-semibold text-black mb-2">{form.title}</h1>
					{form.description && <p className="text-lg text-black/60 mt-2">{form.description}</p>}
					<div className="mt-6 pt-6 border-t border-black/10">
						<div className="flex flex-col gap-1">
							<p className="text-sm text-black/40">Submitted on</p>
							<p className="text-base text-black">
								{formattedDate} at {formattedTime}
							</p>
							{response.respondentEmail && (
								<p className="text-sm text-black/60 mt-2">{response.respondentEmail}</p>
							)}
						</div>
					</div>
				</div>

				{/* Answers */}
				<div className="border border-black/10">
					<div className="px-8 py-4 border-b border-black/10 bg-black/[0.02]">
						<h2 className="text-lg font-medium text-black">Responses</h2>
					</div>
					<div className="px-8">
						{form.elements.map((element) => {
							const answer = response.answers.find((a) => a.elementId === element.id);
							if (!answer) return null;

							return <AnswerDisplay key={element.id} element={element} answer={answer} />;
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
