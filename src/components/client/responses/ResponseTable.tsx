"use client";

import { Eye, FileDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { SurveyResponse } from "@/types/response";

interface ResponseTableProps {
	surveyId: string;
	responses: SurveyResponse[];
	onExport: (responseId: string, format: "csv" | "excel" | "json") => void;
}

export default function ResponseTable({ surveyId, responses, onExport }: ResponseTableProps) {
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}m ${secs}s`;
	};

	return (
		<div className="border border-gray-200">
			<div className="overflow-x-auto">
				<table className="w-full text-xs">
					<thead className="bg-gray-50 border-b border-gray-200">
						<tr>
							<th className="px-4 py-3 text-left font-semibold">Response ID</th>
							<th className="px-4 py-3 text-left font-semibold">User</th>
							<th className="px-4 py-3 text-left font-semibold">Email</th>
							<th className="px-4 py-3 text-left font-semibold">Completed At</th>
							<th className="px-4 py-3 text-left font-semibold">Time Spent</th>
							<th className="px-4 py-3 text-right font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody>
						{responses.map((response) => (
							<tr key={response.id} className="border-b border-gray-200 hover:bg-gray-50">
								<td className="px-4 py-3 font-mono">{response.id.slice(0, 8)}</td>
								<td className="px-4 py-3">{response.userName}</td>
								<td className="px-4 py-3 text-gray-600">{response.userEmail}</td>
								<td className="px-4 py-3 text-gray-600">{formatDate(response.completedAt)}</td>
								<td className="px-4 py-3 text-gray-600">{formatTime(response.timeSpent)}</td>
								<td className="px-4 py-3">
									<div className="flex items-center justify-end gap-2">
										<Link href={`/client/surveys/${surveyId}/responses/${response.id}`}>
											<Button variant="ghost" size="sm">
												<Eye className="w-3 h-3" />
											</Button>
										</Link>
										<div className="relative group">
											<Button variant="ghost" size="sm">
												<FileDown className="w-3 h-3" />
											</Button>
											<div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white border border-gray-300 shadow-lg z-10">
												<button
													onClick={() => onExport(response.id, "csv")}
													className="block w-full px-3 py-1.5 text-left hover:bg-gray-100 whitespace-nowrap">
													CSV
												</button>
												<button
													onClick={() => onExport(response.id, "excel")}
													className="block w-full px-3 py-1.5 text-left hover:bg-gray-100 whitespace-nowrap">
													Excel
												</button>
												<button
													onClick={() => onExport(response.id, "json")}
													className="block w-full px-3 py-1.5 text-left hover:bg-gray-100 whitespace-nowrap">
													JSON
												</button>
											</div>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
