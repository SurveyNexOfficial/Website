"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
// import "./Header.css";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed w-full z-50 transition-all duration-300 ${
				scrollY > 50 ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
			}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">S</span>
						</div>
						<span className="text-xl font-bold bg-black bg-clip-text text-transparent">SurveyNex</span>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<a href="#how-it-works" className="text-gray-800 hover:text-black transition-colors">
							How it Works
						</a>
						<a href="#for-users" className="text-gray-800 hover:text-black transition-colors">
							For Users
						</a>
						<a href="#for-businesses" className="text-gray-800 hover:text-black transition-colors">
							For Businesses
						</a>
						<button className="px-4 py-2 text-black border border-gray-300 rounded-lg hover:bg-black hover:text-white transition-colors">
							Sign In
						</button>
						<button className="px-4 py-2 bg-black text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
							Get Started
						</button>
					</nav>

					{/* Mobile menu button */}
					<button
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label="Toggle navigation menu">
						{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="md:hidden bg-white border-t py-4">
						<div className="flex flex-col space-y-4">
							<a
								href="#how-it-works"
								className="text-gray-800 hover:text-black transition-colors"
								onClick={() => setIsMenuOpen(false)}>
								How it Works
							</a>
							<a
								href="#for-users"
								className="text-gray-800 hover:text-black transition-colors"
								onClick={() => setIsMenuOpen(false)}>
								For Users
							</a>
							<a
								href="#for-businesses"
								className="text-gray-800 hover:text-black transition-colors"
								onClick={() => setIsMenuOpen(false)}>
								For Businesses
							</a>
							<button className="px-4 py-2 text-black border border-gray-300 rounded-lg w-fit transition-colors hover:bg-black hover:text-white">
								Sign In
							</button>
							<button className="px-4 py-2 bg-black text-white rounded-lg w-fit hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
								Get Started
							</button>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Header;
