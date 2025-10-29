import { Award, Bell, CreditCard, Lock, Settings, Target, User, X } from "lucide-react";

type TNavigationProps = {
	activeSection: string;
	setActiveSection: (value: string) => void;
	isMobileOpen: boolean;
	setIsMobileOpen: (value: boolean) => void;
};

const LeftNavigation = ({ activeSection, setActiveSection, isMobileOpen, setIsMobileOpen }: TNavigationProps) => {
	const navigationItems = [
		{ id: "profile", label: "Profile", icon: User },
		{ id: "opportunities", label: "My Opportunities", icon: Target },
		{ id: "rewards", label: "Rewards & Points", icon: Award },
		{ id: "password", label: "Change Password", icon: Lock },
		{ id: "payment", label: "Payment Methods", icon: CreditCard },
		{ id: "notifications", label: "Notifications", icon: Bell },
		{ id: "settings", label: "Account Settings", icon: Settings },
	];

	return (
		<>
			{/* Mobile Overlay */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{/* Navigation Sidebar */}
			<div
				className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 
        transform transition-transform duration-200 ease-in-out lg:transform-none
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
				{/* Mobile Header */}
				<div className="flex items-center justify-between p-4 lg:hidden border-b border-neutral-200">
					<h2 className="text-lg font-semibold text-neutral-900">Menu</h2>
					<button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-sm hover:bg-neutral-100">
						<X size={20} />
					</button>
				</div>

				{/* Navigation Items */}
				<nav className="p-4">
					<div className="space-y-1">
						{navigationItems.map((item) => {
							const Icon = item.icon;
							return (
								<button
									key={item.id}
									onClick={() => {
										setActiveSection(item.id);
										setIsMobileOpen(false);
									}}
									className={`
                    w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-sm transition-colors
                    ${activeSection === item.id ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100"}
                  `}>
									<Icon size={18} className="mr-3 flex-shrink-0" />
									{item.label}
								</button>
							);
						})}
					</div>
				</nav>
			</div>
		</>
	);
};

export default LeftNavigation;
