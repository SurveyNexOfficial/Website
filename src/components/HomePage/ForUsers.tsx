import { Clock, DollarSign, Play, Target } from "lucide-react";

export default function HomePageForUsersSection() {
	const userBenefits = [
		{
			icon: <DollarSign className="w-6 h-6" />,
			title: "Real Cash Rewards",
			desc: "Earn $1-5 per completed survey",
			highlight: "Instant PayPal payouts",
		},
		{
			icon: <Clock className="w-6 h-6" />,
			title: "Quick & Easy",
			desc: "Most surveys take 2-5 minutes",
			highlight: "No lengthy commitments",
		},
		{
			icon: <Target className="w-6 h-6" />,
			title: "Matched to You",
			desc: "Get surveys that match your profile",
			highlight: "Higher completion rates",
		},
	];

	return (
		<section id="for-users" className="py-24 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
							Turn Your Spare Time Into <span className="text-gray-500">Real Money</span>
						</h2>
						<p className="text-xl text-gray-700 mb-10 leading-relaxed">
							Join thousands of people already earning <strong>$50-300+ per month</strong> by sharing
							their opinions on products, services, and trends that matter.
						</p>

						<div className="space-y-8">
							{userBenefits.map((benefit, index) => (
								<div
									key={index}
									className="flex items-start space-x-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
									<div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
										{benefit.icon}
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
										<p className="text-gray-700 text-lg mb-2">{benefit.desc}</p>
										<span className="text-black font-semibold">{benefit.highlight}</span>
									</div>
								</div>
							))}
						</div>

						<div className="mt-10 flex flex-col sm:flex-row gap-4">
							<button className="px-10 py-4 bg-black text-white text-lg font-bold rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all">
								Start Earning Now
							</button>
							<button className="px-10 py-4 border-2 border-gray-300 text-black text-lg font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center">
								<Play className="w-5 h-5 mr-2" />
								Watch How It Works
							</button>
						</div>
					</div>

					<div className="bg-white rounded-3xl p-4 md:p-8 shadow-2xl">
						<div className="bg-gray-50 rounded-2xl p-6">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-xl font-bold text-gray-900">Current Survey</h3>
								<span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
									$3.50 Reward
								</span>
							</div>

							<div className="mb-6">
								<div className="flex justify-between text-sm text-gray-600 mb-2">
									<span>Progress</span>
									<span>3 of 8 questions</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-gradient-to-r from-gray-400 to-gray-700 h-3 rounded-full"
										style={{ width: "37.5%" }}></div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="bg-white rounded-xl p-4 border-2 border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
									<span className="font-medium">⭐ Extremely satisfied</span>
								</div>
								<div className="bg-white rounded-xl p-4 border-2 border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
									<span className="font-medium">😊 Very satisfied</span>
								</div>
								<div className="bg-white rounded-xl p-4 border-2 border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
									<span className="font-medium">😐 Somewhat satisfied</span>
								</div>
							</div>

							<div className="mt-6 flex items-center justify-between text-sm">
								<span className="text-gray-600">Time remaining</span>
								<span className="font-bold text-gray-600">2 min 30sec</span>
							</div>
						</div>

						<div className="mt-6 p-4 bg-gray-50 rounded-xl">
							<div className="flex items-center justify-between">
								<span className="text-gray-800 font-semibold">Monthly Earnings</span>
								<span className="text-2xl font-bold text-gray-600">$127.50</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
