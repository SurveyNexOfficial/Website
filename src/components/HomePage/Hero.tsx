"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function HomePageHeroSection() {
	const stats = [
		{ number: "2M+", label: "Survey Responses" },
		{ number: "15K+", label: "Active Users" },
		{ number: "500+", label: "Partner Brands" },
		{ number: "98%", label: "Data Accuracy" },
	];

	const [activeTab, setActiveTab] = useState("users");

	return (
		<section className="pb-20 px-4 sm:px-6 lg:px-8 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
						Your Opinion <span className="text-gray-500">Has Value</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.8 }}
						className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
						The trusted platform where <strong>people earn real money</strong> for sharing opinions and{" "}
						<strong>businesses get quality data</strong> they can trust.
					</motion.p>

					{/* Tab Switcher */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1.0 }}
						className="inline-flex sm:flex-row flex-col gap-4 p-2 shadow-sm mb-8 rounded-sm">
						<button
							onClick={() => setActiveTab("users")}
							className={`px-8 py-4 font-semibold transition-all rounded-sm ${
								activeTab === "users"
									? "bg-white text-black shadow-sm shadow-gray-500"
									: "text-gray-600 hover:text-black"
							}`}>
							💰 I Want to Earn Money
						</button>
						<button
							onClick={() => setActiveTab("businesses")}
							className={`px-8 py-4 font-semibold transition-all rounded-sm ${
								activeTab === "businesses"
									? "bg-white text-black shadow-sm shadow-gray-500"
									: "text-gray-600 hover:text-black"
							}`}>
							📊 I Need Survey Data
						</button>
					</motion.div>

					{/* Dynamic CTAs based on active tab */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1.2 }}
						className="space-y-6">
						{activeTab === "users" ? (
							<div className="space-y-4">
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									className="px-12 py-5 bg-black rounded-sm text-white text-xl font-bold hover:shadow-2xl transition-shadow">
									<span>Start Earning Today - Its Free</span>
									<ArrowRight className="w-6 h-6 inline-block ml-3" />
								</motion.button>
								<p className="text-gray-600">
									<span className="font-semibold">$5 Welcome Bonus</span> • No credit card required •
									Instant payouts
								</p>
							</div>
						) : (
							<div className="space-y-4">
								<motion.button
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									className="px-12 py-5 bg-black rounded-sm text-white text-xl font-bold hover:shadow-2xl transition-shadow">
									Launch Your First Survey
									<ArrowRight className="w-6 h-6 inline-block ml-3" />
								</motion.button>
								<p className="text-gray-600">
									<span className="font-semibold text-black">Free Trial</span> • 100 responses
									included • Setup in minutes
								</p>
							</div>
						)}
					</motion.div>
				</div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1.4 }}
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
							whileHover={{ scale: 1.05 }}
							className="text-center bg-white border border-gray-200 p-8 shadow-md hover:shadow-xl transition-shadow rounded-sm">
							<div className="text-3xl md:text-4xl font-bold text-black mb-2">{stat.number}</div>
							<div className="text-gray-600 font-medium">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
