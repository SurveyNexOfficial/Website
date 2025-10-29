import React from "react";
import HomePageHeroSection from "@/components/public/HomePage/Hero";
import HomePageTrustedBySection from "@/components/public/HomePage/TrustedBy";
import HomePageHowItWorksSection from "@/components/public/HomePage/HowItWorks";
import HomePageForUsersSection from "@/components/public/HomePage/ForUsers";
import HomePageForBusinessesSection from "@/components/public/HomePage/ForBusinesses";
import HomePageTestimonialsSection from "@/components/public/HomePage/Testimonials";
import HomePageCtaSection from "@/components/public/HomePage/CTA";
import FadeInOnScroll from "@/components/public/Animations/FadeInOnScroll";

export default function HomePage() {
	return (
		<>
			<FadeInOnScroll>
				{/* Hero Section */}
				<HomePageHeroSection />
				<div className="h-6 w-full border bg-[repeating-linear-gradient(-45deg,#545454_0px,#545454_0.9px,transparent_1.2px,transparent_20px)] border-b border-[#545454] outline-none animate-[slide_20s_linear_infinite]"></div>
			</FadeInOnScroll>

			<FadeInOnScroll delay={0.2}>
				{/* Trusted By Section */}
				<HomePageTrustedBySection />
				<div className="h-6 w-full border bg-[repeating-linear-gradient(-45deg,#545454_0px,#545454_0.9px,transparent_1.2px,transparent_20px)] border-b border-[#545454] outline-none animate-[slide_20s_linear_infinite]"></div>
			</FadeInOnScroll>

			<FadeInOnScroll delay={0.2}>
				{/* How It Works */}
				<HomePageHowItWorksSection />
				<div className="h-6 w-full border bg-[repeating-linear-gradient(-45deg,#545454_0px,#545454_0.9px,transparent_1.2px,transparent_20px)] border-b border-[#545454] outline-none animate-[slide_20s_linear_infinite]"></div>
			</FadeInOnScroll>

			<FadeInOnScroll delay={0.2}>
				{/* For Users Section */}
				<HomePageForUsersSection />
				<div className="h-6 w-full border bg-[repeating-linear-gradient(-45deg,#545454_0px,#545454_0.9px,transparent_1.2px,transparent_20px)] border-b border-[#545454] outline-none animate-[slide_20s_linear_infinite]"></div>
			</FadeInOnScroll>

			<FadeInOnScroll delay={0.2}>
				{/* For Businesses Section */}
				<HomePageForBusinessesSection />
				<div className="h-6 w-full border bg-[repeating-linear-gradient(-45deg,#545454_0px,#545454_0.9px,transparent_1.2px,transparent_20px)] border-b border-[#545454] outline-none animate-[slide_20s_linear_infinite]"></div>
			</FadeInOnScroll>

			<FadeInOnScroll delay={0.2}>
				{/* Testimonials */}
				<HomePageTestimonialsSection />
				<div className="h-6 w-full border bg-[repeating-linear-gradient(-45deg,#545454_0px,#545454_0.9px,transparent_1.2px,transparent_20px)] border-b border-[#545454] outline-none animate-[slide_20s_linear_infinite]"></div>
			</FadeInOnScroll>

			<FadeInOnScroll delay={0.2}>
				{/* Final CTA */}
				<HomePageCtaSection />
			</FadeInOnScroll>
		</>
	);
}
