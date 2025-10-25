"use client";

import { motion } from "framer-motion";

export default function FadeInOnScroll({
	children,
	delay = 0,
	direction = "up",
}: Readonly<{
	children: React.ReactNode;
	delay?: number;
	direction?: "up" | "down" | "left" | "right";
}>) {
	const directions = {
		up: { y: 50 },
		down: { y: -50 },
		left: { x: 50 },
		right: { x: -50 },
	};

	return (
		<motion.div
			initial={{ opacity: 0, ...directions[direction] }}
			whileInView={{ opacity: 1, y: 0, x: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.6, delay }}>
			{children}
		</motion.div>
	);
}
