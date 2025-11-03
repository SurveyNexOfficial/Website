import UserHeader from "@/components/layout/UserHeader";
import UserFooter from "@/components/layout/UserFooter";

export default function UserPortalLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col">
			<UserHeader />
			<main className="flex-1 bg-gray-50">
				<div className="max-w-7xl mx-auto px-6 py-6">{children}</div>
			</main>
			<UserFooter />
		</div>
	);
}
