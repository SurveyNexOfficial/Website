import { mockForm, mockResponses } from "@/data/responses";
import ResponseCard from "@/components/public/ResponseCard/ResponseCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function ResponsesPage({ params }: PageProps) {
	const { id: formId } = await params;

	const form = mockForm;
	const responses = mockResponses;

	return (
		<section className="min-h-screen w-full py-10 bg-white relative">
			<div className="max-w-7xl mx-auto w-full">
				{/* Header */}
				<div className="mb-12">
					{/* Header */}
					<div className="flex items-center gap-4 mb-8">
						<Link href={"/collect-data"} className="p-2 bg-gray-100 rounded-sm hover:cursor-pointer">
							<ArrowLeft className="text-gray-700" />
						</Link>
						<h1 className="text-4xl font-semibold text-black mb-2">{form.title}</h1>
					</div>
					{form.description && <p className="text-lg text-black/60 mt-2">{form.description}</p>}
					<div className="mt-6 flex items-center gap-4 text-sm text-black/40">
						<span>{responses.length} responses</span>
					</div>
				</div>

				{/* Responses List */}
				{responses.length > 0 ? (
					<div className="space-y-4">
						{responses.map((response) => (
							<ResponseCard key={response.id} response={response} formId={formId} />
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<p className="text-black/40">No responses yet</p>
					</div>
				)}
			</div>
		</section>
	);
}
