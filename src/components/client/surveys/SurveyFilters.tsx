"use client";

import { Search } from "lucide-react";
import { SurveyFilters as Filters, Survey } from "@/types/newSurvey";

interface SurveyFiltersProps {
	filters: Filters;
	onFilterChange: (filters: Filters) => void;
}

export default function SurveyFilters({ filters, onFilterChange }: SurveyFiltersProps) {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<div className="flex-1 min-w-[200px]">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
					<input
						type="text"
						placeholder="Search surveys..."
						value={filters.search || ""}
						onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
						className="w-full pl-10 pr-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
					/>
				</div>
			</div>

			<select
				value={filters.status || ""}
				onChange={(e) => onFilterChange({ ...filters, status: e.target.value as Survey["status"] })}
				className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
				<option value="">All Status</option>
				<option value="draft">Draft</option>
				<option value="active">Active</option>
				<option value="paused">Paused</option>
				<option value="closed">Closed</option>
			</select>

			<select
				value={filters.sortBy || "createdAt"}
				onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as Filters["sortBy"] })}
				className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
				<option value="createdAt">Date Created</option>
				<option value="title">Title</option>
				<option value="totalResponses">Responses</option>
			</select>

			<select
				value={filters.sortOrder || "desc"}
				onChange={(e) => onFilterChange({ ...filters, sortOrder: e.target.value as Filters["sortOrder"] })}
				className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
				<option value="desc">Descending</option>
				<option value="asc">Ascending</option>
			</select>
		</div>
	);
}
