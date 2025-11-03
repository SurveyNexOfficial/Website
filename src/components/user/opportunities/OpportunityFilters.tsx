"use client";

import { Search } from "lucide-react";

interface OpportunityFiltersProps {
	search: string;
	rewardType: string;
	sortBy: string;
	onSearchChange: (value: string) => void;
	onRewardTypeChange: (value: string) => void;
	onSortChange: (value: string) => void;
}

export default function OpportunityFilters({
	search,
	rewardType,
	sortBy,
	onSearchChange,
	onRewardTypeChange,
	onSortChange,
}: OpportunityFiltersProps) {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<div className="flex-1 min-w-[200px]">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
					<input
						type="text"
						placeholder="Search opportunities..."
						value={search}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-10 pr-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
					/>
				</div>
			</div>

			<select
				value={rewardType}
				onChange={(e) => onRewardTypeChange(e.target.value)}
				className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
				<option value="">All Rewards</option>
				<option value="points">Points</option>
				<option value="cash">Cash</option>
				<option value="voucher">Voucher</option>
			</select>

			<select
				value={sortBy}
				onChange={(e) => onSortChange(e.target.value)}
				className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black">
				<option value="reward">Highest Reward</option>
				<option value="newest">Newest First</option>
				<option value="shortest">Shortest Duration</option>
			</select>
		</div>
	);
}
