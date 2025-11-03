"use client";

import Card from "@/components/ui/Card";
import Tabs from "@/components/ui/Tabs";
import OpportunitiesTab from "@/components/user/profile/OpportunitiesTab";
import PasswordTab from "@/components/user/profile/PasswordTab";
import ProfileTab from "@/components/user/profile/ProfileTab";
import ReferencesTab from "@/components/user/profile/ReferencesTab";
import RewardsTab from "@/components/user/profile/RewardsTab";

export default function UserProfilePage() {
	const tabs = [
		{
			id: "profile",
			label: "Profile",
			content: <ProfileTab />,
		},
		{
			id: "password",
			label: "Change Password",
			content: <PasswordTab />,
		},
		{
			id: "opportunities",
			label: "My Opportunities",
			content: <OpportunitiesTab />,
		},
		{
			id: "my-rewards",
			label: "My Rewards",
			content: <RewardsTab />,
		},
		{
			id: "my-references",
			label: "My References",
			content: <ReferencesTab />,
		},
	];

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-bold">Profile Settings</h1>

			<Card className="p-5">
				<Tabs tabs={tabs} />
			</Card>
		</div>
	);
}
