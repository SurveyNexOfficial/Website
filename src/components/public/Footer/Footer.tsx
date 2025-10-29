"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
				{/* 1️⃣ Company Info */}
				<div>
					<Link href="/" className="flex items-center space-x-3 group">
						<div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm transition-all duration-200 group-hover:bg-black/80">
							<span className="text-white font-bold text-sm">S</span>
						</div>
						<span className="text-xl font-bold text-black group-hover:text-black/80 transition-colors">
							SurveyNex
						</span>
					</Link>
					<p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-xs">
						Empowering businesses and individuals to collect data, share opinions, and earn rewards.
					</p>
				</div>

				{/* 2️⃣ Main Links */}
				<div>
					<h4 className="text-lg font-semibold text-gray-900 mb-4">Main Links</h4>
					<ul className="space-y-2">
						<li>
							<Link href="/" className="text-gray-600 hover:text-black transition-colors">
								Home
							</Link>
						</li>
						<li>
							<Link href="/questly" className="text-gray-600 hover:text-black transition-colors">
								Questly
							</Link>
						</li>
						<li>
							<Link href="/earn-rewards" className="text-gray-600 hover:text-black transition-colors">
								Earn Rewards
							</Link>
						</li>
						<li>
							<Link href="/collect-data" className="text-gray-600 hover:text-black transition-colors">
								Collect Data
							</Link>
						</li>
					</ul>
				</div>

				{/* 3️⃣ Legal */}
				<div>
					<h4 className="text-lg font-semibold text-gray-900 mb-4">Legal</h4>
					<ul className="space-y-2">
						<li>
							<Link href="/privacy-policy" className="text-gray-600 hover:text-black transition-colors">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link
								href="/terms-and-conditions"
								className="text-gray-600 hover:text-black transition-colors">
								Terms & Conditions
							</Link>
						</li>
					</ul>
				</div>

				{/* 4️⃣ Social + Address */}
				<div>
					<h4 className="text-lg font-semibold text-gray-900 mb-4">Connect</h4>
					<div className="flex space-x-4 mb-4">
						<Link
							href="#"
							aria-label="Facebook"
							className="text-gray-600 hover:text-black transition-colors">
							<Facebook className="w-5 h-5" />
						</Link>
						<Link
							href="#"
							aria-label="Twitter"
							className="text-gray-600 hover:text-black transition-colors">
							<Twitter className="w-5 h-5" />
						</Link>
						<Link
							href="#"
							aria-label="Instagram"
							className="text-gray-600 hover:text-black transition-colors">
							<Instagram className="w-5 h-5" />
						</Link>
						<Link
							href="#"
							aria-label="LinkedIn"
							className="text-gray-600 hover:text-black transition-colors">
							<Linkedin className="w-5 h-5" />
						</Link>
					</div>
					<address className="not-italic text-gray-600 text-sm">
						123 Market Street, Suite 200
						<br />
						San Francisco, CA 94105
						<br />
						contact@surveynex.com
					</address>
				</div>
			</motion.div>

			<div className="border-t border-gray-200 mt-8">
				<p className="text-center text-gray-500 text-sm py-4">
					© {new Date().getFullYear()} SurveyNex. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
