"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

export default function LoginForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});

		try {
			// API call simulation
			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push("/client/dashboard");
		} catch {
			setErrors({ submit: "Invalid credentials" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Input
				label="Email"
				type="email"
				value={formData.email}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				required
				fullWidth
				error={errors.email}
			/>
			<Input
				label="Password"
				type="password"
				value={formData.password}
				onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				required
				fullWidth
				error={errors.password}
			/>
			{errors.submit && <p className="text-xs text-red-600">{errors.submit}</p>}
			<Button type="submit" fullWidth disabled={loading}>
				{loading ? <Loader size="sm" /> : "Login"}
			</Button>
		</form>
	);
}
