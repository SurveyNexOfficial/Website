"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function HomePageHeroSection() {
	const stats = [
		{ number: "2M+", label: "Survey Responses" },
		{ number: "15K+", label: "Active Users" },
		{ number: "500+", label: "Partner Brands" },
		{ number: "98%", label: "Data Accuracy" },
	];

	const [activeTab, setActiveTab] = useState("users");

	return (
		<section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
						Your Opinion <span className="bg-gray-500 bg-clip-text text-transparent">Has Value</span>
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
						The trusted platform where <strong>people earn real money</strong> for sharing opinions and{" "}
						<strong>businesses get quality data</strong> they can trust.
					</p>

					{/* Tab Switcher */}
					<div className="inline-flex bg-white rounded-2xl p-2 shadow-xl mb-8 border">
						<button
							onClick={() => setActiveTab("users")}
							className={`px-8 py-4 rounded-xl font-semibold transition-all ${
								activeTab === "users"
									? "bg-white text-black shadow-lg"
									: "text-gray-600 hover:text-black"
							}`}>
							💰 I Want to Earn Money
						</button>
						<button
							onClick={() => setActiveTab("businesses")}
							className={`px-8 py-4 rounded-xl font-semibold transition-all ${
								activeTab === "businesses"
									? "bg-white text-black shadow-lg"
									: "text-gray-600 hover:text-black"
							}`}>
							📊 I Need Survey Data
						</button>
					</div>

					{/* Dynamic CTAs based on active tab */}
					<div className="space-y-6">
						{activeTab === "users" ? (
							<div className="space-y-4">
								<button className="px-12 py-5 bg-black text-white text-xl font-bold rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
									<span>Start Earning Today - Its Free</span>
									<ArrowRight className="w-6 h-6 inline-block ml-3" />
								</button>
								<p className="text-gray-600">
									<span className="font-semibold">$5 Welcome Bonus</span> • No credit
									card required • Instant payouts
								</p>
							</div>
						) : (
							<div className="space-y-4">
								<button className="px-12 py-5 bg-black text-white text-xl font-bold rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
									Launch Your First Survey
									<ArrowRight className="w-6 h-6 inline-block ml-3" />
								</button>
								<p className="text-gray-600">
									<span className="font-semibold text-black">Free Trial</span> • 100 responses
									included • Setup in minutes
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
							<div className="text-3xl md:text-4xl font-bold bg-black bg-clip-text text-transparent mb-2">
								{stat.number}
							</div>
							<div className="text-gray-600 font-medium">{stat.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
