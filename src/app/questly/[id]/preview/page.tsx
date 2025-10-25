"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/types/form";
import FormPreview from "@/components/Questly/FormPreview";
import { getForm } from "@/utils/storage";
import { ArrowLeft } from "lucide-react";

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
			router.push("/questly");
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
		<section className="min-h-screen py-10 w-full bg-white">
			{/* Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-7xl w-full mx-auto pb-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<button
								onClick={() => router.back()}
								className="p-2 bg-gray-100 rounded-sm hover:cursor-pointer">
								<ArrowLeft className="text-gray-700" />
							</button>

							<div>
								<h1 className="text-xl font-semibold">{form.title}</h1>
								<p className="text-sm text-gray-600">Form Preview</p>
							</div>
						</div>

						<div className="flex items-center space-x-3">
							<button
								onClick={() => router.push(`/questly/${form.id}/edit`)}
								className="px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
								Edit Form
							</button>

							<button
								onClick={() => {
									// This would generate a shareable URL in a real app
									const url = `${window.location.origin}/f/${form.id}`;
									navigator.clipboard.writeText(url);
									alert("Form URL copied to clipboard!");
								}}
								className="px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors">
								Share
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Preview Content */}
			<div className="max-w-7xl w-full mx-auto py-6">
				<FormPreview form={form} />
			</div>
		</section>
	);
}
