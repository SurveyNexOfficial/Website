import { BarChart3, CheckCircle, Globe, UserCheck } from "lucide-react";

export default function HomePageForBusinessesSection() {
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
		<section id="for-businesses" className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-8 shadow-2xl">
						<h3 className="text-2xl font-bold mb-6 text-gray-900">Survey Performance Dashboard</h3>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
							<div className="bg-white rounded-xl p-4 shadow-lg">
								<div className="text-2xl font-bold text-indigo-600 mb-1">1,247</div>
								<div className="text-sm text-gray-600">Responses</div>
							</div>
							<div className="bg-white rounded-xl p-4 shadow-lg">
								<div className="text-2xl font-bold text-green-600 mb-1">94.2%</div>
								<div className="text-sm text-gray-600">Completion Rate</div>
							</div>
							<div className="bg-white rounded-xl p-4 shadow-lg">
								<div className="text-2xl font-bold text-blue-600 mb-1">2.3min</div>
								<div className="text-sm text-gray-600">Avg. Time</div>
							</div>
							<div className="bg-white rounded-xl p-4 shadow-lg">
								<div className="text-2xl font-bold text-purple-600 mb-1">98.7%</div>
								<div className="text-sm text-gray-600">Data Quality</div>
							</div>
						</div>

						<div className="bg-white rounded-xl p-4 shadow-lg">
							<h4 className="font-semibold mb-4 text-gray-900">Security & Compliance</h4>
							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<CheckCircle className="w-5 h-5 text-green-600" />
									<span className="text-sm">SOC 2 Type II Certified</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="w-5 h-5 text-green-600" />
									<span className="text-sm">GDPR & CCPA Compliant</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="w-5 h-5 text-green-600" />
									<span className="text-sm">End-to-end Encryption</span>
								</div>
								<div className="flex items-center space-x-3">
									<CheckCircle className="w-5 h-5 text-green-600" />
									<span className="text-sm">Real-time Fraud Detection</span>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
							Get <span className="text-indigo-600">Quality Data</span> You Can Trust
						</h2>
						<p className="text-xl text-gray-600 mb-10 leading-relaxed">
							Access our community of <strong>verified, engaged users</strong> to gather reliable insights
							for market research, product development, and business decisions.
						</p>

						<div className="space-y-8">
							{businessBenefits.map((benefit, index) => (
								<div
									key={index}
									className="flex items-start space-x-6 bg-indigo-50 rounded-2xl p-6 shadow-lg">
									<div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center text-white shadow-lg">
										{benefit.icon}
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
										<p className="text-gray-600 text-lg mb-2">{benefit.desc}</p>
										<span className="text-indigo-600 font-semibold">{benefit.highlight}</span>
									</div>
								</div>
							))}
						</div>

						<div className="mt-10 flex flex-col sm:flex-row gap-4">
							<button className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-lg font-bold rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all">
								Start Free Trial
							</button>
							<button className="px-10 py-4 border-2 border-indigo-600 text-indigo-600 text-lg font-bold rounded-2xl hover:bg-indigo-50 transition-all">
								Schedule Demo
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
