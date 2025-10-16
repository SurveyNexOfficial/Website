"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function HomePageHowItWorksSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const howItWorksSteps = [
		{
			step: "1",
			title: "Create Your Profile",
			description: "Tell us about yourself to get matched with relevant surveys",
			userAction: "Sign up in 30 seconds",
			businessAction: "Create business account",
		},
		{
			step: "2",
			title: "Get Matched",
			description: "We connect the right surveys with the right people",
			userAction: "Receive survey notifications",
			businessAction: "Launch your survey campaign",
		},
		{
			step: "3",
			title: "Earn & Analyze",
			description: "Users earn rewards, businesses get insights",
			userAction: "Complete surveys, get paid",
			businessAction: "Access real-time data",
		},
	];

	return (
		<section id="how-it-works" className="py-24 bg-white" ref={ref}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6 }}
						className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						How SurveyNex Works
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-xl text-gray-600 max-w-3xl mx-auto">
						A simple, secure process that creates value for everyone
					</motion.p>
				</div>

				<div className="grid md:grid-cols-3 gap-12">
					{howItWorksSteps.map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
							className="grid grid-rows-[auto_auto] text-center group h-full border border-gray-200 rounded-sm py-4">
							<div className="flex flex-col items-center px-4">
								<div className="group-hover:scale-110 group-hover:bg-black group-hover:text-white w-20 h-20 bg-white text-black border border-black rounded-full flex items-center justify-center mb-6 text-2xl font-bold shadow-xl transition-all duration-300 ease-in-out">
									{step.step}
								</div>
								<h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
								<p className="text-gray-600 mb-6 text-lg">{step.description}</p>
							</div>

							<div className="space-y-3 px-4">
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={isInView ? { opacity: 1, x: 0 } : {}}
									transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
									className="bg-gray-50 rounded-sm p-4 border border-gray-100">
									<p className="text-black font-semibold">👤 For Users: {step.userAction}</p>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={isInView ? { opacity: 1, x: 0 } : {}}
									transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
									className="bg-gray-100 rounded-sm p-4 border border-gray-200">
									<p className="text-black font-semibold">🏢 For Businesses: {step.businessAction}</p>
								</motion.div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
