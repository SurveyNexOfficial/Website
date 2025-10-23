"use client";
import { Clock, DollarSign, Play, Target } from "lucide-react";
import { useRef } from "react";

export default function HomePageForUsersSection() {
	const ref = useRef(null);

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
		<>
			<section id="for-users" className="py-24 bg-neutral-50" ref={ref}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
								Turn Your Spare Time Into <span className="text-neutral-500">Real Money</span>
							</h2>
							<p className="text-xl text-neutral-700 mb-10 leading-relaxed">
								Join thousands of people already earning{" "}
								<strong className="text-black">$50-300+ per month</strong> by sharing their opinions on
								products, services, and trends that matter.
							</p>

							<div className="space-y-8">
								{userBenefits.map((benefit, index) => (
									<div
										key={index}
										className="flex items-start space-x-6 bg-white p-6 shadow-lg hover:shadow-xl transition-all border border-neutral-200 rounded-sm">
										<div className="w-14 h-14 bg-black flex items-center justify-center text-white shadow-lg rounded-sm">
											{benefit.icon}
										</div>
										<div>
											<h3 className="text-xl font-bold text-neutral-900 mb-2">{benefit.title}</h3>
											<p className="text-neutral-700 text-lg mb-2">{benefit.desc}</p>
											<span className="text-black font-semibold">{benefit.highlight}</span>
										</div>
									</div>
								))}
							</div>

							<div className="mt-10 flex flex-col sm:flex-row gap-4">
								<button className="px-10 py-4 bg-black text-white text-lg font-bold rounded-sm hover:shadow-xl transition-all">
									Start Earning Now
								</button>
								<button className="px-10 py-4 border-2 border-neutral-300 text-black text-lg font-bold rounded-sm hover:bg-neutral-100 transition-all flex items-center justify-center">
									<Play className="w-5 h-5 mr-2" />
									Watch How It Works
								</button>
							</div>
						</div>

						<div className="bg-white p-4 md:p-8 shadow-2xl border border-neutral-200 rounded-sm">
							<div className="bg-neutral-50 p-6 rounded-sm">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-xl font-bold text-neutral-900">Current Survey</h3>
									<span className="bg-neutral-100 text-neutral-800 px-3 py-1 text-sm font-semibold rounded-sm">
										$3.50 Reward
									</span>
								</div>

								<div className="mb-6">
									<div className="flex justify-between text-sm text-neutral-600 mb-2">
										<span>Progress</span>
										<span>3 of 8 questions</span>
									</div>
									<div className="w-full bg-neutral-200 h-3 rounded-sm overflow-hidden">
										<div className="bg-gradient-to-r from-neutral-600 to-black h-3"></div>
									</div>
								</div>

								<div className="space-y-4">
									{["⭐ Extremely satisfied", "😊 Very satisfied", "😐 Somewhat satisfied"].map(
										(option, idx) => (
											<div
												key={idx}
												className="bg-white p-4 border-2 border-neutral-200 cursor-pointer hover:border-neutral-400 transition-all rounded-sm">
												<span className="font-medium">{option}</span>
											</div>
										)
									)}
								</div>

								<div className="mt-6 flex items-center justify-between text-sm">
									<span className="text-neutral-600">Time remaining</span>
									<span className="font-bold text-neutral-600">2 min 30sec</span>
								</div>
							</div>

							<div className="mt-6 p-4 bg-neutral-50 rounded-sm">
								<div className="flex items-center justify-between">
									<span className="text-neutral-800 font-semibold">Monthly Earnings</span>
									<span className="text-2xl font-bold text-neutral-900">{0}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
