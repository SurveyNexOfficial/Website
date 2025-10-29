"use client";

import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface ScrambleTextProps {
	text: string;
	speed?: number;
	className?: string;
}

export default function ScrambleText({ text, speed = 40, className }: ScrambleTextProps) {
	const [displayText, setDisplayText] = useState(text);
	const [isHovering, setIsHovering] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isHovering) {
			intervalRef.current = setInterval(() => {
				setDisplayText(
					text
						.split("")
						.map((char) => (char === " " ? " " : letters[Math.floor(Math.random() * letters.length)]))
						.join("")
				);
			}, speed);
		} else {
			if (intervalRef.current) clearInterval(intervalRef.current);
			setDisplayText(text);
		}

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isHovering, text, speed]);

	return (
		<motion.span
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className={className}>
			{displayText}
		</motion.span>
	);
}
