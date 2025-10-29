"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Form } from "@/types/form";
import { deleteForm, getForms } from "@/utils/storage";
import { FileText, Trash2 } from "lucide-react";

export default function FormListings() {
	const [forms, setForms] = useState<Form[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		setForms(getForms());
	}, []);

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this form?")) {
			deleteForm(id);
			setForms(getForms());
		}
	};

	const filteredForms = forms.filter((form) => form.title.toLowerCase().includes(searchTerm.toLowerCase()));

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<section className="relative min-h-screen w-full bg-white py-10 px-5">
			<div className="max-w-7xl w-full mx-auto h-full">
				<div className="flex flex-col gap-5">
					<div className="flex items-center justify-between">
						<h3 className="font-bold text-4xl text-center">Questly</h3>
						<Link
							href="/questly/new"
							className="inline-flex items-center bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-colors">
							Create Form
						</Link>
					</div>

					<div className="flex items-center gap-2">
						<input
							type="text"
							placeholder="Search forms..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
						/>
					</div>

					{filteredForms.length === 0 && (
						<div className="text-center py-20 flex flex-col gap-4">
							<div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
								<FileText size={32} className="text-gray-400" />
							</div>
							<div className="flex flex-col gap-0.5">
								<h3 className="text-xl font-medium text-gray-900">No forms yet</h3>
								<p className="text-gray-600">Create your first form to get started</p>
							</div>
							<Link
								href="/questly/new"
								className="max-w-sm w-full text-center mx-auto bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-colors">
								Create Form
							</Link>
						</div>
					)}

					{filteredForms.length !== 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{filteredForms.map((form) => (
								<div
									key={form.id}
									className="bg-white border border-gray-200 rounded-sm hover:shadow-md transition-shadow group">
									<div className="flex flex-col gap-4 p-4">
										<div className="flex items-center justify-between">
											<h3 className="text-lg font-medium text-black group-hover:text-gray-700 line-clamp-2">
												{form.title}
											</h3>
										</div>

										<div className="text-sm text-gray-500">
											<span>{form.elements.length} questions</span>
											<span className="mx-2">•</span>
											<span>Updated {formatDate(form.updatedAt)}</span>
										</div>

										<div className="flex items-center gap-2">
											<Link
												href={`/questly/${form.id}/edit`}
												className="flex-1 text-center px-4 py-2 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors text-sm font-medium">
												Edit
											</Link>

											<Link
												href={`/questly/${form.id}/preview`}
												className="flex-1 text-center px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors text-sm font-medium">
												Preview
											</Link>

											<button
												onClick={() => handleDelete(form.id)}
												className="p-2 bg-red-100 text-red-600 hover:bg-red-50 rounded-sm transition-colors text-sm font-medium">
												<Trash2 size={20} />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
