"use client";
import { useRef } from "react";

export default function HomePageCtaSection() {
	const ref = useRef(null);

	return (
		<section className="py-24 bg-black" ref={ref}>
			<div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
				<h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Get Started?</h2>
				<p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
					Join the platform that&apos;s transforming how opinions become insights
				</p>

				<div className="flex flex-col sm:flex-row gap-6 justify-center">
					<button className="px-12 py-5 bg-white text-neutral-900 text-xl font-bold rounded-sm hover:bg-neutral-100 transition-all shadow-xl">
						💰 Start Earning Money
					</button>
					<button className="px-12 py-5 bg-transparent border-2 border-white text-white text-xl font-bold rounded-sm transition-all">
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
