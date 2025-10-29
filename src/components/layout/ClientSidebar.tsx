"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
	{ title: "Dashboard", href: "/client/dashboard" },
	{ title: "Surveys", href: "/client/surveys" },
];

export default function ClientSidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 bg-white border-r border-gray-200 flex flex-col max-h-screen">
			<div className="border-b border-gray-200">
				<div className="flex items-center justify-start p-4 h-14">
					<Link href="/" className="flex items-center gap-x-2 group">
						<div className="w-8 h-8 bg-black group-hover:bg-black/80 transition-colors duration-200 flex items-center justify-center rounded-sm">
							<span className="text-white font-bold text-sm">S</span>
						</div>
						<span className="text-xl font-bold text-black group-hover:text-black/80 transition-colors duration-200">
							SurveyNex
						</span>
					</Link>
				</div>
			</div>
			<div className="flex-1 overflow-y-auto">
				<ul className="flex flex-col gap-y-2 p-2">
					{navLinks.map((navLink, index) => {
						const isActivePath = pathname === navLink.href;
						return (
							<li
								key={index}
								className={`flex rounded-sm ${isActivePath ? "bg-gray-100" : "hover:bg-gray-100"}`}>
								<Link href={navLink.href} className="w-full px-2 py-2">
									{navLink.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="border-t border-gray-200">
				<div className="flex justify-center items-center h-10 px-4">
					<p className="text-xs text-gray-600">© {new Date().getFullYear()} SurveyNex.</p>
				</div>
			</div>
		</aside>
	);
}
