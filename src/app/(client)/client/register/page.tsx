import Link from "next/link";
import RegisterForm from "@/components/client/auth/RegisterForm";
import ClientFooter from "@/components/layout/ClientFooter";

export default function ClientRegisterPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex-1 flex items-center justify-center px-6 py-12">
				<div className="w-full max-w-sm space-y-6">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Client Registration</h1>
						<p className="text-sm text-gray-600 mt-1">Create surveys for your business</p>
					</div>

					<RegisterForm />

					<p className="text-center text-xs text-gray-600">
						Already have an account?{" "}
						<Link href="/client/login" className="text-black font-medium hover:underline">
							Login here
						</Link>
					</p>
				</div>
			</div>
			<ClientFooter />
		</div>
	);
}
