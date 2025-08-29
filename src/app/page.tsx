import React from "react";
import HomePageHeroSection from "@/components/HomePage/Hero";
import HomePageTrustedBySection from "@/components/HomePage/TrustedBy";
import HomePageHowItWorksSection from "@/components/HomePage/HowItWorks";
import HomePageForUsersSection from "@/components/HomePage/ForUsers";
import HomePageForBusinessesSection from "@/components/HomePage/ForBusinesses";
import HomePageTestimonialsSection from "@/components/HomePage/Testimonials";
import HomePageCtaSection from "@/components/HomePage/CTA";

export default function HomePage() {
	return (
		<>
			{/* Hero Section */}
			<HomePageHeroSection />

			{/* Trusted By Section */}
			<HomePageTrustedBySection />

			{/* How It Works */}
			<HomePageHowItWorksSection />

			{/* For Users Section */}
			<HomePageForUsersSection />

			{/* For Businesses Section */}
			<HomePageForBusinessesSection />

			{/* Testimonials */}
			<HomePageTestimonialsSection />

			{/* Final CTA */}
			<HomePageCtaSection />
		</>
	);
}
