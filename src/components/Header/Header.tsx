"use client";

import React, { useState, useEffect, useRef } from "react";
import { LogIn, LogOut, Menu, User, UserCircle, UserPlus, X } from "lucide-react";
import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const navLinks = [
	{ title: "Home", href: "/" },
	{ title: "Questly", href: "/questly" },
	{ title: "Earn Rewards", href: "/earn-rewards" },
	{ title: "Collect Data", href: "/collect-data" },
];

const Header = () => {
	const pathname = usePathname();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			// Check if the click is outside the dropdown component
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		}

		// Attach the event listener to the document
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup function to remove the event listener when the component unmounts
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<>
			<header className={`${styles.header} ${scrollY > 50 || isMenuOpen ? "shadow-md" : ""}`}>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="px-3">
					<div className="flex justify-between items-center py-3">
						{/* Logo */}
						<Link href="/" className="flex items-center space-x-3 group">
							<div className="w-8 h-8 bg-black group-hover:bg-black/80 transition-colors duration-200 flex items-center justify-center rounded-sm">
								<span className="text-white font-bold text-sm">S</span>
							</div>
							<span className="text-xl font-bold text-black group-hover:text-black/80 transition-colors duration-200">
								SurveyNex
							</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center space-x-2">
							<div className="flex items-center gap-4">
								{navLinks.map((navLink, key) => (
									<Link
										href={navLink.href}
										className={`${styles.navItem} ${
											pathname === navLink.href ? `${styles.active}` : ""
										}`}
										key={key}>
										{navLink.title}
									</Link>
								))}
							</div>
							<div ref={dropdownRef} className="relative">
								{/* Dropdown toggle button */}
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center gap-2 p-2 rounded-full focus:outline-none"
									aria-expanded={isDropdownOpen}
									aria-label="Toggle user menu">
									{/* Icon for the button */}
									<UserCircle className="w-7 h-7 text-black" />
								</button>

								{/* Dropdown content, only renders when open */}
								{isDropdownOpen && (
									<ul
										className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col gap-1 z-50 min-w-[200px] w-max`}>
										{isLoggedIn ? (
											<>
												{/* Li elements will now take full width because of flex-col on the ul */}
												<li className="w-full">
													<Link
														href="/profile"
														className="flex items-center justify-start gap-2 w-full px-4 py-4 hover:bg-gray-100 transition-colors duration-200">
														<User className="w-4 h-4" /> Profile
													</Link>
												</li>
												<li>
													<hr className="text-gray-200" />
												</li>
												<li className="w-full">
													<button className="flex items-center justify-start gap-2 w-full px-4 py-4 hover:bg-gray-100 transition-colors duration-200">
														<LogOut className="w-4 h-4" /> Logout
													</button>
												</li>
											</>
										) : (
											<>
												{/* Li elements will now take full width because of flex-col on the ul */}
												<li className="w-full">
													<Link
														href="/auth?mode=login"
														className="flex items-center justify-start gap-2 w-full px-4 py-4 hover:bg-gray-100 transition-colors duration-200 ">
														<LogIn className="w-4 h-4" /> Login
													</Link>
												</li>
												<li>
													<hr className="text-gray-200" />
												</li>
												<li className="w-full">
													<Link
														href="/auth?mode=register"
														className="flex items-center justify-start gap-2 w-full px-4 py-4 hover:bg-gray-100 transition-colors duration-200">
														<UserPlus className="w-4 h-4" /> Sign Up
													</Link>
												</li>
											</>
										)}
									</ul>
								)}
							</div>
						</nav>

						{/* Mobile menu button */}
						<button
							className="lg:hidden"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label="Toggle navigation menu">
							{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>

					{/* Mobile Navigation */}
					{isMenuOpen && (
						<nav className="lg:hidden bg-white border-t border-gray-200 overflow-hidden">
							<div className="flex flex-col space-y-4 py-6">
								{navLinks.map((navLink, key) => (
									<div key={key}>
										<Link
											onClick={() => setIsMenuOpen(false)}
											href={navLink.href}
											className={`${styles.mobileNavItem} ${
												navLink.href === pathname ? `${styles.active}` : ""
											}`}>
											{navLink.title}
										</Link>
									</div>
								))}
								{isLoggedIn ? (
									<>
										<Link
											href="/profile"
											className="text-gray-800 hover:text-black transition-colors px-4">
											Profile
										</Link>
										<Link
											href="#"
											onClick={() => setIsLoggedIn(false)}
											className="text-gray-800 hover:text-black transition-colors px-4">
											Logout
										</Link>
									</>
								) : (
									<>
										<Link
											href="/auth?mode=login"
											className="px-6 py-2 rounded-sm text-black border border-black w-fit">
											Sign In
										</Link>
										<Link
											href="/auth?mode=register"
											className="px-6 py-2 rounded-sm bg-black text-white w-fit">
											Get Started
										</Link>
									</>
								)}
							</div>
						</nav>
					)}
				</motion.div>
			</header>
			{isMenuOpen && <div className="fixed inset-0 bg-black/45"></div>}
		</>
	);
};

export default Header;
