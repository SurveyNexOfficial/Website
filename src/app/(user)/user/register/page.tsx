import Link from "next/link";
import UserRegisterForm from "@/components/user/auth/RegisterForm";
import UserFooter from "@/components/layout/UserFooter";

export default function UserRegisterPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex-1 flex items-center justify-center px-6 py-12">
				<div className="w-full max-w-sm space-y-6">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Create Account</h1>
						<p className="text-sm text-gray-600 mt-1">Join and start earning rewards</p>
					</div>

					<UserRegisterForm />

					<p className="text-center text-xs text-gray-600">
						<span>Already have an account?</span>
						<Link href="/user/login" className="text-black font-medium hover:underline">
							Login here
						</Link>
					</p>
				</div>
			</div>
			<UserFooter />
		</div>
	);
}
