import { X, Clock, Users, Calendar, DollarSign, CheckCircle } from "lucide-react";
import { Opportunity } from "@/types/opportunity";
import { useEffect, useRef } from "react";

interface OpportunityModalProps {
	opportunity: Opportunity;
	isOpen: boolean;
	onClose: () => void;
}

export default function OpportunityModal({ opportunity, isOpen, onClose }: OpportunityModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const progressPercentage = (opportunity.currentParticipants / opportunity.participantsNeeded) * 100;

	return (
		<div className="fixed inset-0 bg-black/50 bg-blur-lg flex items-center justify-center p-4 z-[1000]">
			<div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto" ref={modalRef}>
				{/* Header */}
				<div className="flex justify-between items-start p-6 border-b border-gray-200">
					<div>
						<h2 className="text-xl font-semibold text-gray-900 mb-1">{opportunity.name}</h2>
						<p className="text-gray-600">
							by <span className="font-medium text-gray-800">{opportunity.brandName}</span>
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full border border-gray-300 transition-colors">
						<X className="w-5 h-5 text-gray-400" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Key Info Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-sm">
						<div className="flex items-center gap-2">
							<DollarSign className="w-4 h-4 text-gray-600" />
							<div>
								<p className="text-xs text-gray-500">Reward</p>
								<p className="font-semibold text-gray-900">{opportunity.rewards} points</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-gray-600" />
							<div>
								<p className="text-xs text-gray-500">Deadline</p>
								<p className="font-semibold text-gray-900">
									{new Date(opportunity.deadline).toLocaleDateString()}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Clock className="w-4 h-4 text-gray-600" />
							<div>
								<p className="text-xs text-gray-500">Duration</p>
								<p className="font-semibold text-gray-900">{opportunity.estimatedTime} min</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Users className="w-4 h-4 text-gray-600" />
							<div>
								<p className="text-xs text-gray-500">Participants</p>
								<p className="font-semibold text-gray-900">
									{opportunity.currentParticipants}/{opportunity.participantsNeeded}
								</p>
							</div>
						</div>
					</div>

					{/* Progress Bar */}
					<div>
						<div className="flex justify-between text-sm text-gray-600 mb-2">
							<span>Survey Progress</span>
							<span>{Math.round(progressPercentage)}% filled</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-gray-700 h-2 rounded-full transition-all duration-300"
								style={{ width: `${progressPercentage}%` }}></div>
						</div>
					</div>

					{/* Description */}
					<div>
						<h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
						<p className="text-gray-700 leading-relaxed">{opportunity.description}</p>
					</div>

					{/* Requirements */}
					<div>
						<h3 className="text-lg font-medium text-gray-900 mb-3">Requirements</h3>
						<ul className="space-y-2">
							{opportunity.requirements.map((req, index) => (
								<li key={index} className="flex items-center gap-2">
									<CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
									<span className="text-gray-700">{req}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Terms and Conditions */}
					<div>
						<h3 className="text-lg font-medium text-gray-900 mb-3">Terms & Conditions</h3>
						<ul className="space-y-2">
							{opportunity.termsAndConditions.map((term, index) => (
								<li key={index} className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
									<span className="text-gray-700 text-sm">{term}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Additional Info */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
						<div>
							<span className="text-gray-500">Category:</span>
							<span className="ml-2 font-medium text-gray-900">{opportunity.category}</span>
						</div>
						<div>
							<span className="text-gray-500">Difficulty:</span>
							<span className="ml-2 font-medium text-gray-900">{opportunity.difficulty}</span>
						</div>
						<div>
							<span className="text-gray-500">Status:</span>
							<span className="ml-2 font-medium text-gray-900">{opportunity.status}</span>
						</div>
						<div>
							<span className="text-gray-500">Posted:</span>
							<span className="ml-2 font-medium text-gray-900">
								{new Date(opportunity.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
					<button
						onClick={onClose}
						className="px-4 py-2 text-gray-700 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
						Close
					</button>
					<button className="px-6 py-2 bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-colors">
						Apply Now
					</button>
				</div>
			</div>
		</div>
	);
}
