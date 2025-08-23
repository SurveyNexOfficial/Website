import { Calendar, ChevronRight, DollarSign, Trophy } from "lucide-react";

const MyOpportunitiesSection = () => {
	const opportunities = [
		{
			id: 1,
			title: "Consumer Product Preferences Survey",
			company: "TechCorp",
			points: 150,
			duration: "15 mins",
			status: "active",
			deadline: "2 days left",
		},
		{
			id: 2,
			title: "Mobile App User Experience Study",
			company: "AppDev Inc",
			points: 200,
			duration: "20 mins",
			status: "completed",
			deadline: "Completed",
		},
		{
			id: 3,
			title: "Brand Awareness Research",
			company: "Marketing Pro",
			points: 100,
			duration: "10 mins",
			status: "pending",
			deadline: "5 days left",
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<h1 className="text-2xl font-bold text-neutral-900">My Opportunities</h1>
				<div className="flex gap-2">
					<select className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900">
						<option>All Status</option>
						<option>Active</option>
						<option>Completed</option>
						<option>Pending</option>
					</select>
				</div>
			</div>

			<div className="space-y-4">
				{opportunities.map((opportunity) => (
					<div key={opportunity.id} className="bg-white rounded-lg border border-neutral-200 p-6">
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
							<div className="flex-1">
								<div className="flex items-start justify-between mb-2">
									<h3 className="text-lg font-medium text-neutral-900">{opportunity.title}</h3>
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											opportunity.status === "active"
												? "bg-green-100 text-green-800"
												: opportunity.status === "completed"
												? "bg-blue-100 text-blue-800"
												: "bg-yellow-100 text-yellow-800"
										}`}>
										{opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
									</span>
								</div>
								<p className="text-neutral-600 mb-3">{opportunity.company}</p>
								<div className="flex flex-wrap gap-4 text-sm text-neutral-600">
									<span className="flex items-center">
										<DollarSign size={14} className="mr-1" />
										{opportunity.points} points
									</span>
									<span className="flex items-center">
										<Calendar size={14} className="mr-1" />
										{opportunity.duration}
									</span>
									<span className="flex items-center">
										<Trophy size={14} className="mr-1" />
										{opportunity.deadline}
									</span>
								</div>
							</div>
							<div className="flex gap-2">
								{opportunity.status === "active" && (
									<button className="px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors">
										Start Survey
									</button>
								)}
								{opportunity.status === "completed" && (
									<button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors">
										View Results
									</button>
								)}
								<button className="p-2 text-neutral-600 hover:text-neutral-900">
									<ChevronRight size={18} />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyOpportunitiesSection;
