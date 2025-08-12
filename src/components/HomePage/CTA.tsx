export default function HomePageCtaSection() {
	return (
		<section className="py-24 bg-black">
			<div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
				<h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Get Started?</h2>
				<p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
					Join the platform that&apos;s transforming how opinions become insights
				</p>

				<div className="flex flex-col sm:flex-row gap-6 justify-center">
					<button className="px-12 py-5 bg-white text-gray-900 text-xl font-bold rounded-2xl hover:bg-gray-100 transform hover:-translate-y-1 transition-all shadow-xl">
						💰 Start Earning Money
					</button>
					<button className="px-12 py-5 bg-transparent border-3 border-white text-white text-xl font-bold rounded-2xl hover:bg-white hover:text-gray-900 transform hover:-translate-y-1 transition-all">
						📊 Launch Your Survey
					</button>
				</div>

				<p className="text-white/80 mt-8">
					No credit card required • Free to start • Join 15,000+ satisfied users
				</p>
			</div>
		</section>
	);
}
