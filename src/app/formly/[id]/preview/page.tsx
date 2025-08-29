"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/types/form";
import FormPreview from "@/components/Formly/FormPreview";
import { getForm } from "@/utils/storage";

interface PreviewPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function PreviewPage({ params }: PreviewPageProps) {
	const router = useRouter();
	const { id } = use(params);
	const [form, setForm] = useState<Form | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const foundForm = getForm(id);
		if (!foundForm) {
			router.push("/formly");
			return;
		}

		setForm(foundForm);
		setLoading(false);
	}, [id, router]);

	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
			</div>
		);
	}

	if (!form) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<button
								onClick={() => router.push(`/formly/${form.id}/edit`)}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>

							<div>
								<h1 className="text-xl font-semibold">{form.title}</h1>
								<p className="text-sm text-gray-600">Form Preview</p>
							</div>
						</div>

						<div className="flex items-center space-x-3">
							<button
								onClick={() => router.push(`/formly/${form.id}/edit`)}
								className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
								Edit Form
							</button>

							<button
								onClick={() => {
									// This would generate a shareable URL in a real app
									const url = `${window.location.origin}/f/${form.id}`;
									navigator.clipboard.writeText(url);
									alert("Form URL copied to clipboard!");
								}}
								className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
								Share
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Preview Content */}
			<div className="max-w-2xl mx-auto px-6 py-12">
				<FormPreview form={form} />
			</div>
		</div>
	);
}
