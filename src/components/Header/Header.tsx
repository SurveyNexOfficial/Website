"use client";

import React, { useState, useEffect } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
	{ title: "Home", href: "/" },
	{ title: "Formly", href: "/formly" },
	{ title: "For Users", href: "/users" },
	{ title: "For Businesses", href: "/businesses" },
];

const Header = () => {
	const pathname = usePathname();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className={`fixed border-b top-0 left-0 w-full z-[999] transition-all duration-300 ${
					scrollY > 50 || isMenuOpen
						? "border-gray-200 bg-white/95 backdrop-blur-md shadow-sm"
						: "border-transparent bg-white"
				}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-5">
						{/* Logo */}
						<Link href="/" className="flex items-center space-x-3">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
								<span className="text-white font-bold text-sm">S</span>
							</motion.div>
							<span className="text-xl font-bold text-black">SurveyNex</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center space-x-10">
							<div className="flex items-center gap-8">
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
							<div className="flex items-center gap-4">
								{isLoggedIn ? (
									<>
										<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
											<Link href="/profile" className="p-2 border border-black">
												<User size={20} />
											</Link>
										</motion.div>
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => setIsLoggedIn(false)}
											className="p-2 border border-black hover:cursor-pointer">
											<LogOut size={20} />
										</motion.button>
									</>
								) : (
									<>
										<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
											<Link
												href="/auth?mode=login"
												className="px-6 py-2 rounded-sm text-black border border-black hover:bg-black hover:text-white transition-colors duration-200">
												Sign In
											</Link>
										</motion.div>
										<motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
											<Link
												href="/auth?mode=register"
												className="px-6 py-2 rounded-sm bg-black text-white hover:shadow-lg transition-shadow duration-200">
												Get Started
											</Link>
										</motion.div>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="px-4 py-2 text-xs rounded-sm bg-black text-white border-black border hover:cursor-pointer"
											onClick={() => setIsLoggedIn(true)}>
											Dummy Login
										</motion.button>
									</>
								)}
							</div>
						</nav>

						{/* Mobile menu button */}
						<motion.button
							whileTap={{ scale: 0.9 }}
							className="lg:hidden"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label="Toggle navigation menu">
							{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</motion.button>
					</div>

					{/* Mobile Navigation */}
					<AnimatePresence>
						{isMenuOpen && (
							<motion.nav
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								className="lg:hidden bg-white border-t border-gray-200 overflow-hidden">
								<motion.div
									initial={{ y: -20 }}
									animate={{ y: 0 }}
									transition={{ delay: 0.1 }}
									className="flex flex-col space-y-4 py-6">
									{navLinks.map((navLink, key) => (
										<motion.div
											key={key}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: key * 0.1 }}>
											<Link
												onClick={() => setIsMenuOpen(false)}
												href={navLink.href}
												className={`${styles.mobileNavItem} ${
													navLink.href === pathname ? `${styles.active}` : ""
												}`}>
												{navLink.title}
											</Link>
										</motion.div>
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
											<Link
												href="#"
												className="px-6 py-2 rounded-sm text-black border border-black w-fit"
												onClick={() => setIsLoggedIn(true)}>
												Dummy Login
											</Link>
										</>
									)}
								</motion.div>
							</motion.nav>
						)}
					</AnimatePresence>
				</div>
			</motion.header>
			{isMenuOpen && <div className="fixed inset-0 bg-black/45"></div>}
		</>
	);
};

export default Header;
