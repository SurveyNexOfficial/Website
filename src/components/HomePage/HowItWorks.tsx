export default function HomePageHowItWorksSection() {
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
		<section id="how-it-works" className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How SurveyNex Works</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						A simple, secure process that creates value for everyone
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-12">
					{howItWorksSteps.map((step, index) => (
						<div key={index} className="grid grid-rows-[auto_auto] text-center group h-full">
							{/* Top Section */}
							<div className="flex flex-col items-center px-4">
								<div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-xl group-hover:shadow-2xl transition-shadow">
									{step.step}
								</div>
								<h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
								<p className="text-gray-600 mb-6 text-lg">{step.description}</p>
							</div>

							{/* Bottom Section */}
							<div className="space-y-3 px-4">
								<div className="bg-blue-50 rounded-xl p-4">
									<p className="text-blue-700 font-semibold">👤 For Users: {step.userAction}</p>
								</div>
								<div className="bg-indigo-50 rounded-xl p-4">
									<p className="text-indigo-700 font-semibold">
										🏢 For Businesses: {step.businessAction}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
