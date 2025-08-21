import { Clock, Users, Calendar, DollarSign } from "lucide-react";
import { Opportunity } from "@/types/opportunity";

interface OpportunityCardProps {
	opportunity: Opportunity;
	onViewDetails: (opportunity: Opportunity) => void;
}

export default function OpportunityCard({ opportunity, onViewDetails }: OpportunityCardProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "Active":
				return "text-accent-green";
			case "Ending Soon":
				return "text-accent-red";
			case "Closed":
				return "text-gray-400";
			default:
				return "text-gray-600";
		}
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Easy":
				return "text-accent-green bg-green-50 border-green-200";
			case "Medium":
				return "text-accent-blue bg-blue-50 border-blue-200";
			case "Hard":
				return "text-accent-red bg-red-50 border-red-200";
			default:
				return "text-gray-600 bg-gray-50 border-gray-200";
		}
	};

	const progressPercentage = (opportunity.currentParticipants / opportunity.participantsNeeded) * 100;

	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
			<div className="flex justify-between items-start mb-4 border-b pb-4 border-gray-200">
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-gray-900 mb-1">{opportunity.name}</h3>
					<p className="text-gray-600 text-sm">
						by <span className="font-medium text-gray-800">{opportunity.brandName}</span>
					</p>
				</div>
				<div className="flex items-center gap-2">
					<span
						className={`text-xs font-medium px-2 py-1 rounded-full border ${getDifficultyColor(
							opportunity.difficulty
						)}`}>
						{opportunity.difficulty}
					</span>
					<span className={`text-xs font-medium ${getStatusColor(opportunity.status)}`}>
						{opportunity.status}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<DollarSign className="w-4 h-4" />
					<span className="font-medium text-gray-900">{opportunity.rewards}</span>
					<span>points</span>
				</div>

				<div className="flex items-center gap-2 text-sm text-gray-600">
					<Calendar className="w-4 h-4" />
					<span>{opportunity.deadline}</span>
				</div>

				<div className="flex items-center gap-2 text-sm text-gray-600">
					<Clock className="w-4 h-4" />
					<span>{opportunity.estimatedTime}min</span>
				</div>

				<div className="flex items-center gap-2 text-sm text-gray-600">
					<Users className="w-4 h-4" />
					<span>
						{opportunity.currentParticipants}/{opportunity.participantsNeeded}
					</span>
				</div>
			</div>

			<div className="mb-4">
				<div className="flex justify-between text-xs text-gray-500 mb-1">
					<span>Progress</span>
					<span>{Math.round(progressPercentage)}%</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2">
					<div
						className="bg-gray-700 h-2 rounded-full transition-all duration-300"
						style={{ width: `${progressPercentage}%` }}></div>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-sm text-gray-600">
					<span className="font-medium text-gray-800">{opportunity.category}</span>
				</div>

				<button
					onClick={() => onViewDetails(opportunity)}
					className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200">
					View Details
				</button>
			</div>
		</div>
	);
}
