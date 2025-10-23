"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical, Plus, Search, Edit, Trash2, FileText } from "lucide-react";
import { format } from "date-fns";
import { Survey } from "../../types/survey";
import { getSurveys, deleteSurvey } from "../../utils/surveyStorage";
import Link from "next/link";

export default function SurveyList() {
	const [surveys, setSurveys] = useState<Survey[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

	useEffect(() => {
		setSurveys(getSurveys());
	}, []);

	const filteredSurveys = surveys.filter(
		(survey) =>
			survey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			survey.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this survey?")) {
			deleteSurvey(id);
			setSurveys(getSurveys());
		}
		setActiveDropdown(null);
	};

	const handleDropdownDotsClick = (id: string) => {
		setActiveDropdown((prev) => (prev === id ? null : id));
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!e.target.closest(".dropdown-container")) {
				setActiveDropdown(null);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-light text-black mb-2">Survey Forms</h1>
					<p className="text-gray-600">Manage your survey forms</p>
				</div>
				<Link
					href="/collect-data/new"
					className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-colors">
					<Plus size={20} />
					Create Survey
				</Link>
			</div>

			{/* Search */}
			<div className="relative mb-8">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
				<input
					type="text"
					placeholder="Search surveys..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
				/>
			</div>

			{/* Survey Cards Grid */}
			{filteredSurveys.length === 0 ? (
				<div className="text-center py-16 flex flex-col gap-4 items-center">
					<p className="text-gray-500 text-lg">No surveys found</p>
					<Link
						href="/collect-data/new"
						className="px-4 py-2 bg-black text-white rounded-sm flex items-center gap-2 justify-center">
						<Plus size={20} />
						Create your first survey
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredSurveys.map((survey) => (
						<div
							key={survey.id}
							className="bg-white border border-gray-200 rounded-sm p-6 hover:shadow-lg transition-shadow">
							{/* Card Header */}
							<div className="flex justify-between items-start mb-4">
								<h3 className="font-medium text-black text-lg truncate flex-1">{survey.name}</h3>
								<div className="relative ml-2 dropdown-container">
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDropdownDotsClick(survey.id);
										}}
										className="p-1 hover:bg-gray-100 rounded">
										<MoreVertical size={16} className="text-gray-600" />
									</button>

									{activeDropdown === survey.id && (
										<div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-sm shadow-lg z-[999999] min-w-[120px]">
											<Link
												href={`/collect-data/${survey.id}/responses`}
												className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 text-sm">
												<FileText size={14} />
												Responses
											</Link>
											<Link
												href={`/collect-data/${survey.id}/edit`}
												className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 text-sm">
												<Edit size={14} />
												Edit
											</Link>
											<button
												onClick={() => handleDelete(survey.id)}
												className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 text-red-600 text-sm">
												<Trash2 size={14} />
												Delete
											</button>
										</div>
									)}
								</div>
							</div>

							{/* Card Content */}
							<div className="space-y-2 mb-4">
								<p className="text-gray-600 text-sm">
									Created: {format(new Date(survey.createdAt), "MMM dd, yyyy")}
								</p>
								<p className="text-gray-600 text-sm">Questions: {survey.questions.length}</p>
								<p className="text-gray-600 text-sm">
									Duration: {format(new Date(survey.startDate), "MMM dd, yyyy")} -{" "}
									{format(new Date(survey.endDate), "MMM dd, yyyy")}
								</p>
							</div>

							<div className="w-full flex items-center">
								{/* Preview Button */}
								<Link
									href={`/collect-data/${survey.id}/preview`}
									className="w-full flex-1 py-2 text-center border border-black text-black hover:bg-black hover:text-white transition-colors rounded-sm">
									Preview Survey
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
