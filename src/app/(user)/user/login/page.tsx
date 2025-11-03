import Link from "next/link";
import UserLoginForm from "@/components/user/auth/LoginForm";
import UserFooter from "@/components/layout/UserFooter";

export default function UserLoginPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex-1 flex items-center justify-center px-6 py-12">
				<div className="w-full max-w-sm space-y-6">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Welcome Back</h1>
						<p className="text-sm text-gray-600 mt-1">Login to start earning rewards</p>
					</div>

					<UserLoginForm />

					<p className="text-center text-xs text-gray-600">
						<span>{"Don't have an account? "}</span>
						<Link href="/user/register" className="text-black font-medium hover:underline">
							Register here
						</Link>
					</p>
				</div>
			</div>
			<UserFooter />
		</div>
	);
}
