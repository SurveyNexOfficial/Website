"use client";

import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

const PasswordSection: React.FC = () => {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwords, setPasswords] = useState({
		current: "",
		new: "",
		confirm: "",
	});
	const [validations, setValidations] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
		match: false,
	});

	const handlePasswordChange = (field: string, value: string) => {
		const newPasswords = { ...passwords, [field]: value };
		setPasswords(newPasswords);

		if (field === "new" || field === "confirm") {
			setValidations({
				length: newPasswords.new.length >= 8,
				uppercase: /[A-Z]/.test(newPasswords.new),
				lowercase: /[a-z]/.test(newPasswords.new),
				number: /\d/.test(newPasswords.new),
				match: newPasswords.new === newPasswords.confirm && newPasswords.new.length > 0,
			});
		}
	};

	const isFormValid = Object.values(validations).every(Boolean) && passwords.current.length > 0;

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-semibold text-gray-900">Change Password</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Password Form */}
				<div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-6">Update Password</h2>

					<div className="space-y-4">
						{/* Current Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
							<div className="relative">
								<input
									type={showCurrentPassword ? "text" : "password"}
									value={passwords.current}
									onChange={(e) => handlePasswordChange("current", e.target.value)}
									className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700"
									placeholder="Enter current password"
								/>
								<button
									type="button"
									onClick={() => setShowCurrentPassword(!showCurrentPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
									{showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						{/* New Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
							<div className="relative">
								<input
									type={showNewPassword ? "text" : "password"}
									value={passwords.new}
									onChange={(e) => handlePasswordChange("new", e.target.value)}
									className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700"
									placeholder="Enter new password"
								/>
								<button
									type="button"
									onClick={() => setShowNewPassword(!showNewPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
									{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? "text" : "password"}
									value={passwords.confirm}
									onChange={(e) => handlePasswordChange("confirm", e.target.value)}
									className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700"
									placeholder="Confirm new password"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
									{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						<button
							className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-sm
								${isFormValid ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-500 cursor-not-allowed"}
							`}
							onClick={() => console.log("Password update triggered")}
							disabled={!isFormValid}>
							Update Password
						</button>
					</div>
				</div>

				{/* Password Requirements */}
				<div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
					<h2 className="text-lg font-medium text-gray-900 mb-4">Password Requirements</h2>
					<div className="space-y-3">
						{[
							{ key: "length", label: "At least 8 characters", valid: validations.length },
							{ key: "uppercase", label: "One uppercase letter", valid: validations.uppercase },
							{ key: "lowercase", label: "One lowercase letter", valid: validations.lowercase },
							{ key: "number", label: "One number", valid: validations.number },
							{ key: "match", label: "Passwords match", valid: validations.match },
						].map((req) => (
							<div key={req.key} className="flex items-center">
								{req.valid ? (
									<CheckCircle className="text-gray-900 mr-2" size={16} />
								) : (
									<AlertCircle className="text-gray-400 mr-2" size={16} />
								)}
								<span className={`text-sm ${req.valid ? "text-gray-900" : "text-gray-500"}`}>
									{req.label}
								</span>
							</div>
						))}
					</div>

					<div className="mt-6 pt-6 border-t border-gray-200">
						<h3 className="font-medium text-gray-900 mb-2">Security Tips</h3>
						<ul className="text-sm text-gray-600 space-y-1">
							<li>• Use a unique password for this account</li>
							<li>• Consider using a password manager</li>
							<li>• Do not share your password</li>
							<li>• Update your password regularly</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasswordSection;
