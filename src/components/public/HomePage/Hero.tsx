"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrambleText from "../Animations/Scramble";

export default function HomePageHeroSection() {
	const stats = [
		{ number: "2M+", label: "Survey Responses" },
		{ number: "15K+", label: "Active Users" },
		{ number: "500+", label: "Partner Brands" },
		{ number: "98%", label: "Data Accuracy" },
	];

	const [activeTab, setActiveTab] = useState("users");
	const [hasAnimated, setHasAnimated] = useState(false);

	// Mark as animated after first render
	useEffect(() => {
		if (!hasAnimated) setHasAnimated(true);
	}, [hasAnimated]);

	return (
		<section className="relative min-h-screen w-full bg-white py-10 px-5">
			<div className="relative z-10 max-w-7xl w-full mx-auto h-full">
				<div className="h-full w-full flex items-center">
					<div className="flex-1 w-full space-y-6">
						<div className="text-center p-4 flex flex-col justify-center items-center gap-6 text-gray-600">
							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
								viewport={{ once: true }}
								className="text-5xl md:text-7xl font-bold  leading-tight">
								{/* <span className="text-gray-900">
									Your <span className="underline underline-offset-2">Opinion</span>
								</span>
								<span className="">
									<span> Has </span>
									<span className="underline underline-offset-2">Value</span>
								</span> */}
								<span className="text-gray-900">Your </span>
								<ScrambleText text="Opinion" className="underline underline-offset-2 text-gray-900" />
								<span> Has </span>
								<ScrambleText text="Value" className="underline underline-offset-2" />
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								viewport={{ once: true }}
								className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
								The trusted platform where <strong className="">people earn real money</strong> for
								sharing opinions and <strong className="">businesses get quality data</strong> they can
								trust.
							</motion.p>

							{/* Tab Switcher */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								viewport={{ once: true }}
								className="mx-auto w-fit flex flex-col sm:flex-row gap-4 rounded-sm relative bg-transparent">
								<button
									className={`px-8 py-4 rounded-sm transition-colors border z-5 focus:outline-none ${
										activeTab === "users" ? "border-gray-400 text-black" : "border-neutral-200"
									}`}
									onClick={() => setActiveTab("users")}>
									I want to earn money
								</button>
								<button
									className={`px-8 py-4 rounded-sm transition-colors border z-5 focus:outline-none ${
										activeTab === "businesses" ? "border-gray-400 text-black" : "border-neutral-200"
									}`}
									onClick={() => setActiveTab("businesses")}>
									I want to collect data
								</button>
							</motion.div>

							{/* Dynamic CTAs */}
							<motion.div
								key={activeTab}
								initial={{ opacity: 0, y: 20 }}
								animate={
									hasAnimated
										? { opacity: 1, y: 0, transition: { duration: 0 } } // skip animation after first
										: {
												opacity: 1,
												y: 0,
												transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
										  }
								}
								transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
								className="space-y-6">
								{activeTab === "users" ? (
									<div className="space-y-4">
										<button className="px-12 py-5 bg-black rounded-sm text-white text-xl font-bold hover:shadow-2xl transition-shadow">
											Start Earning Today - It’s Free
											<ArrowRight className="w-6 h-6 inline-block ml-3" />
										</button>
										<p className="">
											<span className="font-semibold text-black">$5 Welcome Bonus</span> • No
											credit card required • Instant payouts
										</p>
									</div>
								) : (
									<div className="space-y-4">
										<button className="px-12 py-5 bg-black rounded-sm text-white text-xl font-bold hover:shadow-2xl transition-shadow">
											Launch Your First Survey
											<ArrowRight className="w-6 h-6 inline-block ml-3" />
										</button>
										<p className="">
											<span className="font-semibold text-black">Free Trial</span> • 100 responses
											included • Setup in minutes
										</p>
									</div>
								)}
							</motion.div>
						</div>

						{/* Stats Section */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true, amount: 0.2 }}
							className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
							{stats.map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ delay: 1.2 + index * 0.1, duration: 0.5, ease: "easeOut" }}
									viewport={{ once: true }}
									className="text-center p-8 rounded-sm border border-neutral-200 group hover:bg-neutral-100 transition-all duration-200 hover:scale-105">
									<div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
										{stat.number}
									</div>
									<div className="font-medium group-hover:text-black">{stat.label}</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
