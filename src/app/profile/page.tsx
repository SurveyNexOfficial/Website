"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import ProfileSection from "@/components/Profile/ProfileSection";
import MyOpportunitiesSection from "@/components/Profile/MyOpportunitiesSection";
import PasswordSection from "@/components/Profile/PasswordSection";
import RewardsSection from "@/components/Profile/RewardsSection";
import DefaultSection from "@/components/Profile/DefaultSection";
import LeftNavigation from "@/components/Profile/Navigation";
import Header from "@/components/Header/Header";

const Profile = () => {
	const [activeSection, setActiveSection] = useState("profile");
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const renderContent = () => {
		switch (activeSection) {
			case "profile":
				return <ProfileSection />;
			case "opportunities":
				return <MyOpportunitiesSection />;
			case "password":
				return <PasswordSection />;
			case "rewards":
				return <RewardsSection />;
			case "payment":
				return <DefaultSection title="Payment Methods" />;
			case "notifications":
				return <DefaultSection title="Notifications" />;
			case "settings":
				return <DefaultSection title="Account Settings" />;
			default:
				return <ProfileSection />;
		}
	};

	return (
		<section className="relative min-h-screen w-full bg-white py-10">
			<div className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
				<div className="border border-gray-200">
					<div className="lg:hidden bg-white border-b border-neutral-200 p-4">
						<div className="flex items-center justify-between">
							<button
								onClick={() => setIsMobileNavOpen(true)}
								className="p-2 rounded-sm hover:bg-neutral-100">
								<Menu size={20} />
							</button>
						</div>
					</div>

					<div className="flex">
						{/* Left Navigation */}
						<LeftNavigation
							activeSection={activeSection}
							setActiveSection={setActiveSection}
							isMobileOpen={isMobileNavOpen}
							setIsMobileOpen={setIsMobileNavOpen}
						/>

						{/* Main Content */}
						<div className="flex-1 lg:ml-0">
							<div className="p-4 lg:p-8">{renderContent()}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
