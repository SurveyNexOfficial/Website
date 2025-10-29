import ClientHeader from "@/components/layout/ClientHeader";
import ClientSidebar from "@/components/layout/ClientSidebar";

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen flex">
			<ClientSidebar />
			<main className="flex-1 flex flex-col bg-gray-50">
				<ClientHeader />
				<div className="overflow-y-auto flex-1 px-6 py-6">{children}</div>
			</main>
		</div>
	);
}
