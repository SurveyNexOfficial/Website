"use client";
import { BarChart3, CheckCircle, Globe, UserCheck } from "lucide-react";
import { useRef } from "react";

export default function HomePageForBusinessesSection() {
	const ref = useRef(null);

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
		<>
			<section id="for-businesses" className="py-24 bg-white" ref={ref}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div className="bg-neutral-50 p-8 shadow-2xl border border-neutral-200 rounded-sm">
							<h3 className="text-2xl font-bold mb-6 text-neutral-900">Survey Performance Dashboard</h3>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
								{[
									{ value: "1,247", label: "Responses" },
									{ value: "94.2%", label: "Completion Rate" },
									{ value: "2.3min", label: "Avg. Time" },
									{ value: "98.7%", label: "Data Quality" },
								].map((stat, idx) => (
									<div
										key={idx}
										className="bg-white p-4 shadow-lg border border-neutral-200 rounded-sm">
										<div className="text-2xl font-bold text-black mb-1">{stat.value}</div>
										<div className="text-sm text-neutral-600">{stat.label}</div>
									</div>
								))}
							</div>

							<div className="bg-white p-4 shadow-lg border border-neutral-200 rounded-sm">
								<h4 className="font-semibold mb-4 text-neutral-900">Security & Compliance</h4>
								<div className="space-y-3">
									{[
										"SOC 2 Type II Certified",
										"GDPR & CCPA Compliant",
										"End-to-end Encryption",
										"Real-time Fraud Detection",
									].map((item, idx) => (
										<div key={idx} className="flex items-center space-x-3">
											<CheckCircle className="w-5 h-5 text-neutral-600" />
											<span className="text-sm">{item}</span>
										</div>
									))}
								</div>
							</div>
						</div>

						<div>
							<h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
								Get <span className="text-neutral-600">Quality Data</span> You Can Trust
							</h2>
							<p className="text-xl text-neutral-600 mb-10 leading-relaxed">
								Access our community of <strong className="text-black">verified, engaged users</strong>{" "}
								to gather reliable insights for market research, product development, and business
								decisions.
							</p>

							<div className="space-y-8">
								{businessBenefits.map((benefit, index) => (
									<div
										key={index}
										className="flex items-start space-x-6 bg-neutral-50 p-6 shadow-lg border border-neutral-200 rounded-sm">
										<div className="w-14 h-14 bg-black flex items-center justify-center text-white shadow-lg rounded-sm">
											{benefit.icon}
										</div>
										<div>
											<h3 className="text-xl font-bold text-neutral-900 mb-2">{benefit.title}</h3>
											<p className="text-neutral-600 text-lg mb-2">{benefit.desc}</p>
											<span className="text-neutral-900 font-semibold">{benefit.highlight}</span>
										</div>
									</div>
								))}
							</div>

							<div className="mt-10 flex flex-col sm:flex-row gap-4">
								<button className="px-10 py-4 bg-black text-white text-lg font-bold rounded-sm hover:shadow-xl transition-all">
									Start Free Trial
								</button>
								<button className="px-10 py-4 border-2 border-black text-black text-lg font-bold rounded-sm transition-all">
									Schedule Demo
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
