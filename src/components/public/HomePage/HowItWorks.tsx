"use client";
import { useRef } from "react";
import { motion } from "motion/react";

export default function HomePageHowItWorksSection() {
	const ref = useRef(null);
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
		<section className="py-16 bg-white" ref={ref}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
				<div className="text-center flex flex-col gap-y-2">
					<h2 className="text-3xl md:text-5xl font-bold text-neutral-900">How SurveyNex Works</h2>
					<p className="text-lg text-neutral-600 max-w-3xl mx-auto">
						A simple, secure process that creates value for everyone
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-4">
					{howItWorksSteps.map((step, index) => (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 + index * 0.2, duration: 0.5, ease: "easeOut" }}
							key={index}
							className="group h-full p-4 text-center rounded-sm border border-neutral-200 transition-transform duration-300 ease-out hover:scale-[1.03] hover:border-transparent hover:bg-gradient-to-r hover:from-zinc-500 hover:via-stone-600 hover:to-zinc-900">
							<div className="flex flex-col items-center gap-4">
								<div className="w-20 h-20 bg-white text-black border-2 border-black rounded-full flex items-center justify-center text-2xl font-bold transition-colors duration-300 ease-in-out group-hover:bg-black group-hover:text-white group-hover:border-white">
									{step.step}
								</div>
								<div>
									<h3 className="text-2xl font-bold text-neutral-900 transition-colors duration-300 ease-in-out group-hover:text-white">
										{step.title}
									</h3>
									<p className="text-neutral-600 text-base transition-colors duration-300 ease-in-out group-hover:text-neutral-200">
										{step.description}
									</p>
								</div>
							</div>

							<div className="space-y-4 mt-4">
								<div className="bg-neutral-50 rounded-sm p-4 border border-neutral-200 transition-colors duration-300 ease-in-out group-hover:bg-black/20 group-hover:border-white/20">
									<p className="text-black font-semibold text-sm transition-colors duration-300 ease-in-out group-hover:text-white">
										👤 For Users: {step.userAction}
									</p>
								</div>
								<div className="bg-neutral-50 rounded-sm p-4 border border-neutral-300 transition-colors duration-300 ease-in-out group-hover:bg-black/20 group-hover:border-white/20">
									<p className="text-black font-semibold text-sm transition-colors duration-300 ease-in-out group-hover:text-white">
										🏢 For Businesses: {step.businessAction}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
