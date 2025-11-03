"use client";

import { useState, useEffect, useCallback } from "react";
import Pagination from "@/components/ui/Pagination";
import OpportunityCard from "@/components/user/opportunities/OpportunityCard";
import OpportunityFilters from "@/components/user/opportunities/OpportunityFilters";
import { PageLoader } from "@/components/ui/Loader";
import { Survey } from "@/types/newSurvey";

export default function AllOpportunitiesPage() {
	const [loading, setLoading] = useState(true);
	const [surveys, setSurveys] = useState<Survey[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [limit, setLimit] = useState(12);
	const [search, setSearch] = useState("");
	const [rewardType, setRewardType] = useState("");
	const [sortBy, setSortBy] = useState("reward");

	const loadOpportunities = useCallback(async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			const mockSurveys: Survey[] = Array.from({ length: limit }, (_, i) => ({
				id: `survey_${i + 1}`,
				clientId: "client_1",
				title: `Survey ${i + 1}: Share Your Opinion`,
				description: "We value your feedback and want to understand your experience better",
				reward: Math.floor(Math.random() * 200) + 50,
				rewardType: ["points", "cash", "voucher"][Math.floor(Math.random() * 3)] as Survey["rewardType"],
				status: "active",
				questions: Array.from({ length: Math.floor(Math.random() * 15) + 5 }),
				totalResponses: Math.floor(Math.random() * 300),
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
		loadOpportunities();
	}, [currentPage, limit, search, rewardType, sortBy, loadOpportunities]);

	if (loading) return <PageLoader />;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-bold">Available Opportunities</h1>
				<p className="text-sm text-gray-600 mt-1">Complete surveys and earn rewards</p>
			</div>

			<div className="flex items-center justify-between">
				<OpportunityFilters
					search={search}
					rewardType={rewardType}
					sortBy={sortBy}
					onSearchChange={setSearch}
					onRewardTypeChange={setRewardType}
					onSortChange={setSortBy}
				/>
				<select
					value={limit}
					onChange={(e) => setLimit(Number(e.target.value))}
					className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
					<option value="6">6 per page</option>
					<option value="12">12 per page</option>
					<option value="24">24 per page</option>
				</select>
			</div>

			{surveys.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-600">No opportunities available at the moment</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{surveys.map((survey) => (
							<OpportunityCard key={survey.id} survey={survey} />
						))}
					</div>

					{totalPages > 1 && (
						<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
					)}
				</>
			)}
		</div>
	);
}
