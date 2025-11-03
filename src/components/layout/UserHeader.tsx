import Link from "next/link";
import { Bell, User } from "lucide-react";
import Button from "@/components/ui/Button";

export default function UserHeader() {
	return (
		<header className="border-b border-gray-200 bg-white">
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex items-center justify-between h-14">
					<Link href="/user/home" className="flex items-center gap-x-2 group">
						<div className="w-8 h-8 bg-black group-hover:bg-black/80 transition-colors duration-200 flex items-center justify-center rounded-sm">
							<span className="text-white font-bold text-sm">S</span>
						</div>
						<span className="text-xl font-bold text-black group-hover:text-black/80 transition-colors duration-200">
							SurveyNex
						</span>
					</Link>

					<nav className="hidden md:flex items-center gap-6 text-sm">
						<Link href="/user/opportunity" className="hover:text-gray-600 transition-colors">
							Opportunities
						</Link>
						<Link href="/user/rewards" className="hover:text-gray-600 transition-colors">
							Rewards
						</Link>
						<Link href="/user/references" className="hover:text-gray-600 transition-colors">
							References
						</Link>
					</nav>

					<div className="flex items-center gap-3">
						<button className="p-2 hover:bg-gray-100 transition-colors relative">
							<Bell className="w-4 h-4" />
							<span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
						</button>
						<Link href="/user/profile">
							<Button variant="ghost" size="sm">
								<User className="w-4 h-4 mr-2" />
								Profile
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
