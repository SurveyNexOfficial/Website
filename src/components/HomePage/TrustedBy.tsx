"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function HomePageTrustedBySection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });

	const trustedBrands = ["Microsoft", "Nike", "Coca-Cola", "Samsung", "Netflix", "Amazon"];

	return (
		<section className="py-16 bg-gray-50 overflow-hidden" ref={ref}>
			<div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-lg font-semibold text-gray-600 mb-8">
					Trusted by leading brands worldwide
				</motion.h2>

				{/* Marquee container */}
				<div className="relative w-full overflow-hidden">
					<motion.div
						initial={{ x: 0 }}
						animate={{ x: ["0%", "-50%"] }}
						transition={{
							repeat: Infinity,
							repeatType: "loop",
							duration: 10,
							ease: "linear",
						}}
						className="flex space-x-16 text-2xl font-bold text-gray-400 whitespace-nowrap">
						{/* Duplicate array for seamless looping */}
						{[...trustedBrands, ...trustedBrands, ...trustedBrands, ...trustedBrands, ...trustedBrands].map(
							(brand, index) => (
								<div key={index} className="hover:text-gray-600 transition-colors cursor-pointer">
									{brand}
								</div>
							)
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
