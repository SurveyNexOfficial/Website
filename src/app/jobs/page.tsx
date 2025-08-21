"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import sampleOpportunities from "@/data/opportunities";
import OpportunitiesTable from "@/components/JobsPage/OpportunityTable/OpportunityTable";
import { Opportunity } from "@/types/opportunity";
import Header from "@/components/Header/Header";

export default function JobsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");

	// Get unique categories for filter
	const categories = ["All", ...Array.from(new Set(sampleOpportunities.map((opp) => opp.category)))];
	const statuses = ["All", "Active", "Ending Soon", "Closed"];

	// Filter opportunities based on search and filters
	const filteredOpportunities = sampleOpportunities.filter((opportunity: Opportunity) => {
		const matchesSearch =
			opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			opportunity.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			opportunity.category.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesCategory = selectedCategory === "All" || opportunity.category === selectedCategory;
		const matchesStatus = selectedStatus === "All" || opportunity.status === selectedStatus;

		return matchesSearch && matchesCategory && matchesStatus;
	});

	return (
		<section className="bg-white">
			<Header />
			{/* Filters Section */}
			<div className="max-w-7xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Search */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								type="text"
								placeholder="Search opportunities..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none"
							/>
						</div>

						{/* Category Filter */}
						<div className="relative">
							<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none appearance-none bg-white">
								{categories.map((category) => (
									<option key={category} value={category}>
										{category === "All" ? "All Categories" : category}
									</option>
								))}
							</select>
						</div>

						{/* Status Filter */}
						<div>
							<select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none appearance-none bg-white">
								{statuses.map((status) => (
									<option key={status} value={status}>
										{status === "All" ? "All Status" : status}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Active Filters Display */}
					{(searchTerm || selectedCategory !== "All" || selectedStatus !== "All") && (
						<div className="mt-4 flex flex-wrap gap-2">
							{searchTerm && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
									Search: {searchTerm}
									<button
										onClick={() => setSearchTerm("")}
										className="ml-1 text-gray-400 hover:text-gray-600">
										×
									</button>
								</span>
							)}
							{selectedCategory !== "All" && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
									Category: {selectedCategory}
									<button
										onClick={() => setSelectedCategory("All")}
										className="ml-1 text-gray-400 hover:text-gray-600">
										×
									</button>
								</span>
							)}
							{selectedStatus !== "All" && (
								<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
									Status: {selectedStatus}
									<button
										onClick={() => setSelectedStatus("All")}
										className="ml-1 text-gray-400 hover:text-gray-600">
										×
									</button>
								</span>
							)}
						</div>
					)}
				</div>

				{/* Results */}
				{filteredOpportunities.length > 0 ? (
					<OpportunitiesTable opportunities={filteredOpportunities} />
				) : (
					<div className="text-center py-12">
						<div className="text-gray-400 mb-4">
							<Search className="w-12 h-12 mx-auto" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
						<p className="text-gray-600">
							Try adjusting your search criteria or filters to find more opportunities.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
