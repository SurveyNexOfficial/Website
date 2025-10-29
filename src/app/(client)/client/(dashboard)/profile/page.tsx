"use client";

import { useState } from "react";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
	const [formData, setFormData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitted:", formData);
	};

	const handleReset = () => {
		setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
	};

	return (
		<div className="border border-gray-400 rounded-sm text-gray-900 bg-white text-sm h-full">
			<div className="grid grid-cols-12 h-full">
				{/* Left Tabs */}
				<div className="col-span-3 border-r border-gray-300 p-3">
					<div className="flex flex-col space-y-1">
						<button
							onClick={() => setActiveTab("profile")}
							className={`text-left px-2 py-1 rounded-sm font-medium ${
								activeTab === "profile" ? "bg-black text-white" : "hover:bg-gray-200 text-gray-800"
							}`}>
							Profile
						</button>
						<button
							onClick={() => setActiveTab("password")}
							className={`text-left px-2 py-1 rounded-sm font-medium ${
								activeTab === "password" ? "bg-black text-white" : "hover:bg-gray-200 text-gray-800"
							}`}>
							Change Password
						</button>
					</div>
				</div>

				{/* Right Content */}
				<div className="col-span-9 p-4">
					{activeTab === "profile" && (
						<div className="space-y-3">
							<h2 className="text-lg font-semibold border-b border-gray-300 pb-1">Profile Information</h2>

							<div className="grid grid-cols-2 gap-3">
								<div>
									<p className="text-xs text-gray-600">Full Name</p>
									<p className="font-semibold">Rahul Sharma</p>
								</div>
								<div>
									<p className="text-xs text-gray-600">Email</p>
									<p className="font-semibold">rahul.sharma@example.com</p>
								</div>
								<div>
									<p className="text-xs text-gray-600">Username</p>
									<p className="font-semibold">rahul_dev</p>
								</div>
								<div>
									<p className="text-xs text-gray-600">Phone</p>
									<p className="font-semibold">+91 9876543210</p>
								</div>
								<div>
									<p className="text-xs text-gray-600">Location</p>
									<p className="font-semibold">Bangalore, India</p>
								</div>
								<div>
									<p className="text-xs text-gray-600">Member Since</p>
									<p className="font-semibold">March 2021</p>
								</div>
							</div>
						</div>
					)}

					{activeTab === "password" && (
						<div className="w-full">
							<h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3">
								Change Password
							</h2>
							<form onSubmit={handleSubmit} className="space-y-3">
								<div>
									<label className="block text-xs text-gray-700 mb-1 font-medium">Old Password</label>
									<input
										type="password"
										name="oldPassword"
										value={formData.oldPassword}
										onChange={handleChange}
										className="w-full border border-gray-400 rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-black"
									/>
								</div>

								<div>
									<label className="block text-xs text-gray-700 mb-1 font-medium">New Password</label>
									<input
										type="password"
										name="newPassword"
										value={formData.newPassword}
										onChange={handleChange}
										className="w-full border border-gray-400 rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-black"
									/>
								</div>

								<div>
									<label className="block text-xs text-gray-700 mb-1 font-medium">
										Confirm Password
									</label>
									<input
										type="password"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleChange}
										className="w-full border border-gray-400 rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-black"
									/>
								</div>

								<div className="flex gap-2 pt-1">
									<button
										type="submit"
										className="px-3 py-1.5 bg-black text-white rounded-sm text-sm hover:bg-gray-800 transition">
										Submit
									</button>
									<button
										type="button"
										onClick={handleReset}
										className="px-3 py-1.5 border border-gray-400 text-gray-800 rounded-sm text-sm hover:bg-gray-200 transition">
										Reset
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
