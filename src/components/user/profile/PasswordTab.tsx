"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

export default function PasswordTab() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (formData.newPassword !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
		} catch {
			setError("Failed to update password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 max-w-md">
			<Input
				label="Current Password"
				type="password"
				value={formData.currentPassword}
				onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
				required
				fullWidth
			/>
			<Input
				label="New Password"
				type="password"
				value={formData.newPassword}
				onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
				required
				fullWidth
			/>
			<Input
				label="Confirm New Password"
				type="password"
				value={formData.confirmPassword}
				onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
				required
				fullWidth
				error={error}
			/>
			<Button type="submit" disabled={loading}>
				{loading ? <Loader size="sm" /> : "Update Password"}
			</Button>
		</form>
	);
}
