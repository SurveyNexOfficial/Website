"use client";
import { useRef } from "react";

export default function HomePageTrustedBySection() {
	const ref = useRef(null);

	const trustedBrands = ["Microsoft", "Nike", "Coca-Cola", "Samsung", "Netflix", "Amazon"];

	return (
		<section className="py-20 bg-neutral-100 overflow-hidden flex flex-col gap-8" ref={ref}>
			<h2 className="text-2xl text-center font-semibold text-zinc-900 underline underline-offset-2">
				Trusted by leading brands worldwide
			</h2>

			{/* Marquee container with improved styling */}
			<div className="w-full overflow-hidden flex">
				<ul className="flex gap-12 whitespace-nowrap animate-infiniteScroll">
					{[...trustedBrands, ...trustedBrands, ...trustedBrands, ...trustedBrands, ...trustedBrands].map(
						(brand, index) => (
							<li
								key={index}
								className="text-2xl text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer">
								{brand}
							</li>
						)
					)}
				</ul>
			</div>
		</section>
	);
}
