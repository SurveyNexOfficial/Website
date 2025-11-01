"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import ResponseTable from "@/components/client/responses/ResponseTable";
import { PageLoader } from "@/components/ui/Loader";
import { SurveyResponse } from "@/types/response";

export default function ResponsesPage() {
	const router = useRouter();
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [responses, setResponses] = useState<SurveyResponse[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [sortBy, setSortBy] = useState<"completedAt" | "timeSpent">("completedAt");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [surveyTitle, setSurveyTitle] = useState("");

	const loadResponses = useCallback(async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			// Mock data
			setSurveyTitle("Customer Satisfaction Survey");
			const mockResponses: SurveyResponse[] = Array.from({ length: 10 }, (_, i) => ({
				id: `resp_${Date.now()}_${i}`,
				surveyId: params.id as string,
				userId: `user_${i}`,
				userName: `User ${i + 1}`,
				userEmail: `user${i + 1}@example.com`,
				responses: [],
				completedAt: new Date(Date.now() - Math.random() * 10000000000),
				timeSpent: Math.floor(Math.random() * 300) + 60,
			}));
			setResponses(mockResponses);
			setTotalPages(5);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [params.id]);

	useEffect(() => {
		loadResponses();
	}, [params.id, currentPage, sortBy, sortOrder, loadResponses]);

	const handleExportAll = (format: "csv" | "excel" | "json") => {
		console.log(`Exporting all responses in ${format} format`);
	};

	const handleExportSingle = (responseId: string, format: "csv" | "excel" | "json") => {
		console.log(`Exporting response ${responseId} in ${format} format`);
	};

	if (loading) return <PageLoader />;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Button onClick={() => router.back()} variant="ghost" size="sm">
						<ArrowLeft className="w-4 h-4" />
					</Button>
					<div>
						<h1 className="text-xl font-bold">Survey Responses</h1>
						<p className="text-xs text-gray-600">{surveyTitle}</p>
					</div>
				</div>
			</div>

			<Card className="p-4">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2 text-xs">
							<span className="text-gray-600">Sort by:</span>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as "completedAt" | "timeSpent")}
								className="px-2 py-1 border border-gray-300 text-xs">
								<option value="completedAt">Date</option>
								<option value="timeSpent">Time Spent</option>
							</select>
							<select
								value={sortOrder}
								onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
								className="px-2 py-1 border border-gray-300 text-xs">
								<option value="desc">Newest First</option>
								<option value="asc">Oldest First</option>
							</select>
						</div>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={() => handleExportAll("csv")}>
							<FileDown className="w-3 h-3 mr-1" />
							CSV
						</Button>
						<Button variant="outline" size="sm" onClick={() => handleExportAll("excel")}>
							<FileDown className="w-3 h-3 mr-1" />
							Excel
						</Button>
						<Button variant="outline" size="sm" onClick={() => handleExportAll("json")}>
							<FileDown className="w-3 h-3 mr-1" />
							JSON
						</Button>
					</div>
				</div>

				<ResponseTable surveyId={params.id as string} responses={responses} onExport={handleExportSingle} />

				{totalPages > 1 && (
					<div className="mt-4">
						<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
					</div>
				)}
			</Card>

			<div className="text-xs text-gray-600 text-center">
				Showing {responses.length} of {totalPages * 10} total responses
			</div>
		</div>
	);
}
