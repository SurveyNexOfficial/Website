"use client";

import Link from "next/link";
import { Bell, LogOut, User, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ClientHeader() {
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const profileDropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
				setIsProfileDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const closeProfileDropdown = () => setIsProfileDropdownOpen(false);

	return (
		<header className="sticky top-0 left-0 right-0 w-full border-b border-gray-200 bg-white">
			<div className="flex items-center px-4 h-14">
				<div className="flex items-center gap-3 ml-auto">
					<button className="p-2 hover:bg-gray-100 transition-colors">
						<Bell className="w-5 h-5" />
					</button>

					<div ref={profileDropdownRef} className="relative">
						<button
							onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
							aria-expanded={isProfileDropdownOpen}
							aria-controls="profile-dropdown"
							className="p-2">
							<UserCircle className="w-6 h-6" />
						</button>

						{isProfileDropdownOpen && (
							<ul
								id="profile-dropdown"
								className="absolute right-0 border border-gray-300 rounded-sm bg-white shadow-md z-10 w-48">
								<li>
									<Link
										onClick={closeProfileDropdown}
										href="/client/profile"
										className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100">
										<User className="w-4 h-4 mr-2" />
										Profile
									</Link>
								</li>
								<li className="border-b border-gray-200"></li>
								<li>
									<Link
										onClick={closeProfileDropdown}
										href="#"
										className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100">
										<LogOut className="w-4 h-4 mr-2" />
										Logout
									</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
