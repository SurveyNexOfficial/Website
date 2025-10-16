"use client";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function HomePageTestimonialsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const testimonials = [
		{
			name: "Ram Kumar",
			role: "College Student",
			text: "I've earned over $300 in 3 months just during my commute. The surveys are actually interesting!",
			rating: 5,
		},
		{
			name: "Raj Singh",
			role: "Marketing Director, TechCorp",
			text: "SurveyNex delivers high-quality data fast. We got 1000 responses in 2 days with 95% completion rate.",
			rating: 5,
		},
		{
			name: "Smriti Shah",
			role: "Stay-at-home Mom",
			text: "Perfect for earning extra income during nap times. Easy to use and payments are always on time.",
			rating: 5,
		},
	];

	return (
		<section className="py-12 md:py-24 bg-gray-50" ref={ref}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6 }}
						className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						What Our Users Say
					</motion.h2>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
							whileHover={{ scale: 1.03, y: -5 }}
							className="bg-white rounded-sm p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
							<div className="flex mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
								))}
							</div>
							<p className="text-gray-700 mb-6 text-lg leading-relaxed">{`"${testimonial.text}"`}</p>
							<div>
								<div className="font-bold text-gray-900">{testimonial.name}</div>
								<div className="text-gray-600">{testimonial.role}</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
