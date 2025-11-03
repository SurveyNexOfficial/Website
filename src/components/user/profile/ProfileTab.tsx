"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

export default function ProfileTab() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		phone: "+1234567890",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 max-w-md">
			<div className="grid grid-cols-2 gap-3">
				<Input
					label="First Name"
					value={formData.firstName}
					onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
					required
					fullWidth
				/>
				<Input
					label="Last Name"
					value={formData.lastName}
					onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
					required
					fullWidth
				/>
			</div>
			<Input
				label="Email"
				type="email"
				value={formData.email}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				required
				fullWidth
			/>
			<Input
				label="Phone"
				type="tel"
				value={formData.phone}
				onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
				fullWidth
			/>
			<Button type="submit" disabled={loading}>
				{loading ? <Loader size="sm" /> : "Save Changes"}
			</Button>
		</form>
	);
}
