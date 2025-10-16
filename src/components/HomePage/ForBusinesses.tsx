"use client";
import { BarChart3, CheckCircle, Globe, UserCheck } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function HomePageForBusinessesSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const businessBenefits = [
		{
			icon: <UserCheck className="w-6 h-6" />,
			title: "Verified Responses",
			desc: "All users are identity-verified",
			highlight: "99.2% response validity",
		},
		{
			icon: <BarChart3 className="w-6 h-6" />,
			title: "Real-Time Analytics",
			desc: "Live dashboards with instant insights",
			highlight: "Export data anytime",
		},
		{
			icon: <Globe className="w-6 h-6" />,
			title: "Global Reach",
			desc: "Access audiences in 50+ countries",
			highlight: "Demographic targeting",
		},
	];

	return (
		<section id="for-businesses" className="py-24 bg-white" ref={ref}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6 }}
						className="bg-gray-50 p-8 shadow-2xl border border-gray-100">
						<h3 className="text-2xl font-bold mb-6 text-gray-900">Survey Performance Dashboard</h3>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
							{[
								{ value: "1,247", label: "Responses" },
								{ value: "94.2%", label: "Completion Rate" },
								{ value: "2.3min", label: "Avg. Time" },
								{ value: "98.7%", label: "Data Quality" },
							].map((stat, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={isInView ? { opacity: 1, scale: 1 } : {}}
									transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
									whileHover={{ scale: 1.05 }}
									className="bg-white p-4 shadow-lg border border-gray-100">
									<div className="text-2xl font-bold text-black mb-1">{stat.value}</div>
									<div className="text-sm text-gray-600">{stat.label}</div>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="bg-white p-4 shadow-lg border border-gray-100">
							<h4 className="font-semibold mb-4 text-gray-900">Security & Compliance</h4>
							<div className="space-y-3">
								{[
									"SOC 2 Type II Certified",
									"GDPR & CCPA Compliant",
									"End-to-end Encryption",
									"Real-time Fraud Detection",
								].map((item, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, x: -20 }}
										animate={isInView ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
										className="flex items-center space-x-3">
										<CheckCircle className="w-5 h-5 text-gray-600" />
										<span className="text-sm">{item}</span>
									</motion.div>
								))}
							</div>
						</motion.div>
					</motion.div>

					<div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6 }}
							className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
							Get <span className="text-gray-600">Quality Data</span> You Can Trust
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-xl text-gray-600 mb-10 leading-relaxed">
							Access our community of <strong>verified, engaged users</strong> to gather reliable insights
							for market research, product development, and business decisions.
						</motion.p>

						<div className="space-y-8">
							{businessBenefits.map((benefit, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: 30 }}
									animate={isInView ? { opacity: 1, x: 0 } : {}}
									transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
									whileHover={{ scale: 1.02 }}
									className="flex items-start space-x-6 bg-gray-50 p-6 shadow-lg border border-gray-100">
									<div className="w-14 h-14 bg-black flex items-center justify-center text-white shadow-lg">
										{benefit.icon}
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
										<p className="text-gray-600 text-lg mb-2">{benefit.desc}</p>
										<span className="text-gray-600 font-semibold">{benefit.highlight}</span>
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
								Start Free Trial
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="px-10 py-4 border-2 border-black text-black text-lg font-bold rounded-sm hover:bg-black hover:text-white transition-colors">
								Schedule Demo
							</motion.button>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
