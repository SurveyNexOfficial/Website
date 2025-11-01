"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import SurveyCard from "@/components/client/surveys/SurveyCard";
import SurveyFilters from "@/components/client/surveys/SurveyFilters";
import Modal from "@/components/ui/Modal";
import { PageLoader } from "@/components/ui/Loader";
import { Survey, SurveyFilters as Filters } from "@/types/newSurvey";

export default function SurveysPage() {
	const [loading, setLoading] = useState(true);
	const [surveys, setSurveys] = useState<Survey[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [limit, setLimit] = useState(12);
	const [filters, setFilters] = useState<Filters>({
		sortBy: "createdAt",
		sortOrder: "desc",
	});
	const [deleteModal, setDeleteModal] = useState<string | null>(null);

	const loadSurveys = useCallback(async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			// Mock data
			const mockSurveys: Survey[] = Array.from({ length: limit }, (_, i) => ({
				id: `survey_${i + 1}`,
				clientId: "client_1",
				title: `Survey ${i + 1}: Customer Feedback`,
				description: "Help us understand your experience with our product and services",
				reward: 100,
				rewardType: "points",
				status: ["draft", "active", "paused", "closed"][Math.floor(Math.random() * 4)] as
					| "draft"
					| "active"
					| "paused"
					| "closed",
				questions: [],
				totalResponses: Math.floor(Math.random() * 500),
				targetResponses: 500,
				createdAt: new Date(Date.now() - Math.random() * 10000000000),
				updatedAt: new Date(),
			}));
			setSurveys(mockSurveys);
			setTotalPages(5);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [limit]);

	useEffect(() => {
		loadSurveys();
	}, [currentPage, limit, filters, loadSurveys]);

	const handleDelete = async (id: string) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			setSurveys(surveys.filter((s) => s.id !== id));
			setDeleteModal(null);
		} catch (error) {
			console.error(error);
		}
	};

	if (loading) return <PageLoader />;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold">All Surveys</h1>
				<Link href="/client/surveys/create">
					<Button>
						<Plus className="w-4 h-4 mr-2" />
						Create Survey
					</Button>
				</Link>
			</div>

			<div className="flex items-center justify-between">
				<SurveyFilters filters={filters} onFilterChange={setFilters} />
				<select
					value={limit}
					onChange={(e) => setLimit(Number(e.target.value))}
					className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
					<option value="6">6 per page</option>
					<option value="12">12 per page</option>
					<option value="24">24 per page</option>
					<option value="48">48 per page</option>
				</select>
			</div>

			{surveys.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-600 mb-4">No surveys found</p>
					<Link href="/client/surveys/create">
						<Button>Create Your First Survey</Button>
					</Link>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{surveys.map((survey) => (
							<SurveyCard key={survey.id} survey={survey} onDelete={(id) => setDeleteModal(id)} />
						))}
					</div>

					{totalPages > 1 && (
						<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
					)}
				</>
			)}

			<Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Survey" size="sm">
				<div className="space-y-4">
					<p className="text-sm">
						Are you sure you want to delete this survey? This action cannot be undone.
					</p>
					<div className="flex justify-end gap-2">
						<Button variant="outline" onClick={() => setDeleteModal(null)}>
							Cancel
						</Button>
						<Button variant="danger" onClick={() => deleteModal && handleDelete(deleteModal)}>
							Delete
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
