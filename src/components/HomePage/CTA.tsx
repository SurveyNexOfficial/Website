"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function HomePageCtaSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<section className="py-24 bg-black" ref={ref}>
			<div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-4xl md:text-6xl font-bold text-white mb-8">
					Ready to Get Started?
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
					Join the platform that&apos;s transforming how opinions become insights
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="flex flex-col sm:flex-row gap-6 justify-center">
					<motion.button
						whileHover={{ scale: 1.02, y: -2 }}
						whileTap={{ scale: 0.98 }}
						className="px-12 py-5 bg-white text-gray-900 text-xl font-bold rounded-sm hover:bg-gray-100 transition-colors shadow-xl">
						💰 Start Earning Money
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.02, y: -2 }}
						whileTap={{ scale: 0.98 }}
						className="px-12 py-5 bg-transparent border-2 border-white text-white text-xl font-bold rounded-sm hover:bg-white hover:text-gray-900 transition-colors">
						📊 Launch Your Survey
					</motion.button>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-white/80 mt-8">
					No credit card required • Free to start • Join 15,000+ satisfied users
				</motion.p>
			</div>
		</section>
	);
}
