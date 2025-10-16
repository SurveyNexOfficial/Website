"use client";
import { Clock, DollarSign, Play, Target } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function HomePageForUsersSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

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
		<section id="for-users" className="py-24 bg-gray-50" ref={ref}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6 }}
							className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
							Turn Your Spare Time Into <span className="text-gray-500">Real Money</span>
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-xl text-gray-700 mb-10 leading-relaxed">
							Join thousands of people already earning <strong>$50-300+ per month</strong> by sharing
							their opinions on products, services, and trends that matter.
						</motion.p>

						<div className="space-y-8">
							{userBenefits.map((benefit, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -30 }}
									animate={isInView ? { opacity: 1, x: 0 } : {}}
									transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
									whileHover={{ scale: 1.02 }}
									className="flex items-start space-x-6 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
									<div className="w-14 h-14 bg-black flex items-center justify-center text-white shadow-lg">
										{benefit.icon}
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
										<p className="text-gray-700 text-lg mb-2">{benefit.desc}</p>
										<span className="text-black font-semibold">{benefit.highlight}</span>
									</div>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.5 }}
							className="mt-10 flex flex-col sm:flex-row gap-4">
							<motion.button
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								className="px-10 py-4 bg-black text-white text-lg font-bold rounded-sm hover:shadow-xl transition-shadow">
								Start Earning Now
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="px-10 py-4 border-2 border-gray-300 text-black text-lg font-bold rounded-sm hover:bg-gray-100 transition-colors flex items-center justify-center">
								<Play className="w-5 h-5 mr-2" />
								Watch How It Works
							</motion.button>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="bg-white p-4 md:p-8 shadow-2xl border border-gray-100">
						<div className="bg-gray-50 p-6">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-xl font-bold text-gray-900">Current Survey</h3>
								<span className="bg-gray-100 text-gray-800 px-3 py-1 text-sm font-semibold">
									$3.50 Reward
								</span>
							</div>

							<div className="mb-6">
								<div className="flex justify-between text-sm text-gray-600 mb-2">
									<span>Progress</span>
									<span>3 of 8 questions</span>
								</div>
								<div className="w-full bg-gray-200 h-3">
									<motion.div
										initial={{ width: 0 }}
										animate={isInView ? { width: "37.5%" } : {}}
										transition={{ duration: 1, delay: 0.8 }}
										className="bg-gradient-to-r from-gray-400 to-gray-700 h-3"></motion.div>
								</div>
							</div>

							<div className="space-y-4">
								{["⭐ Extremely satisfied", "😊 Very satisfied", "😐 Somewhat satisfied"].map(
									(option, idx) => (
										<motion.div
											key={idx}
											initial={{ opacity: 0, y: 10 }}
											animate={isInView ? { opacity: 1, y: 0 } : {}}
											transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
											whileHover={{ scale: 1.02 }}
											className="bg-white p-4 border-2 border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
											<span className="font-medium">{option}</span>
										</motion.div>
									)
								)}
							</div>

							<div className="mt-6 flex items-center justify-between text-sm">
								<span className="text-gray-600">Time remaining</span>
								<span className="font-bold text-gray-600">2 min 30sec</span>
							</div>
						</div>

						<div className="mt-6 p-4 bg-gray-50">
							<div className="flex items-center justify-between">
								<span className="text-gray-800 font-semibold">Monthly Earnings</span>
								<span className="text-2xl font-bold text-gray-600">$127.50</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
