"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

export default function RegisterForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		companyName: "",
		contactPerson: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});

		if (formData.password !== formData.confirmPassword) {
			setErrors({ confirmPassword: "Passwords do not match" });
			setLoading(false);
			return;
		}

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push("/client/dashboard");
		} catch {
			setErrors({ submit: "Registration failed" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<Input
				label="Company Name"
				value={formData.companyName}
				onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
				required
				fullWidth
			/>
			<Input
				label="Contact Person"
				value={formData.contactPerson}
				onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
				required
				fullWidth
			/>
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
			<Input
				label="Password"
				type="password"
				value={formData.password}
				onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				required
				fullWidth
			/>
			<Input
				label="Confirm Password"
				type="password"
				value={formData.confirmPassword}
				onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
				required
				fullWidth
				error={errors.confirmPassword}
			/>
			{errors.submit && <p className="text-xs text-red-600">{errors.submit}</p>}
			<Button type="submit" fullWidth disabled={loading}>
				{loading ? <Loader size="sm" /> : "Register"}
			</Button>
		</form>
	);
}
