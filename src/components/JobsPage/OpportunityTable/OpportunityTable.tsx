import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Opportunity } from "@/types/opportunity";
import OpportunityCard from "@/components/JobsPage/OpportunityCard/OpportunityCard";
import OpportunityModal from "@/components/JobsPage/OpportunityModal/OpportunityModal";

interface OpportunitiesTableProps {
	opportunities: Opportunity[];
}

export default function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const itemsPerPage = 6;

	const paginatedOpportunities = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return opportunities.slice(startIndex, endIndex);
	}, [opportunities, currentPage, itemsPerPage]);

	const totalPages = Math.ceil(opportunities.length / itemsPerPage);

	const handleViewDetails = (opportunity: Opportunity) => {
		setSelectedOpportunity(opportunity);
		setIsModalOpen(true);
		document.body.style = "overflow:hidden";
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedOpportunity(null);
		document.body.style = "overflow:auto";
	};

	const handlePrevPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;

		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	};

	return (
		<div className="space-y-6">
			{/* Results Header */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-semibold text-gray-900">Available Opportunities</h2>
					<p className="text-gray-600 mt-1">
						Showing {(currentPage - 1) * itemsPerPage + 1}-
						{Math.min(currentPage * itemsPerPage, opportunities.length)} of {opportunities.length}{" "}
						opportunities
					</p>
				</div>
			</div>

			{/* Opportunities Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{paginatedOpportunities.map((opportunity) => (
					<OpportunityCard key={opportunity.id} opportunity={opportunity} onViewDetails={handleViewDetails} />
				))}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-center space-x-2 mt-8">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 1}
						className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
						<ChevronLeft className="w-4 h-4 mr-1" />
						Previous
					</button>

					{getPageNumbers().map((pageNumber) => (
						<button
							key={pageNumber}
							onClick={() => setCurrentPage(pageNumber)}
							className={`px-3 py-2 text-sm font-medium rounded-sm ${
								currentPage === pageNumber
									? "bg-gray-900 text-white"
									: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
							}`}>
							{pageNumber}
						</button>
					))}

					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
						Next
						<ChevronRight className="w-4 h-4 ml-1" />
					</button>
				</div>
			)}

			{/* Modal */}
			{selectedOpportunity && (
				<OpportunityModal opportunity={selectedOpportunity} isOpen={isModalOpen} onClose={handleCloseModal} />
			)}
		</div>
	);
}
