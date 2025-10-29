import Link from "next/link";
import LoginForm from "@/components/client/auth/LoginForm";
import ClientFooter from "@/components/layout/ClientFooter";

export default function ClientLoginPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex-1 flex items-center justify-center px-6 py-12">
				<div className="w-full max-w-sm space-y-6">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Client Login</h1>
						<p className="text-sm text-gray-600 mt-1">Access your survey dashboard</p>
					</div>

					<LoginForm />

					<p className="text-center text-xs text-gray-600">
						<span>Dont have an account? </span>
						<Link href="/client/register" className="text-black font-medium hover:underline">
							Register here
						</Link>
					</p>
				</div>
			</div>
			<ClientFooter />
		</div>
	);
}
