"use client";

import LoginForm from "@/components/LoginForm/LoginForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useEffect, useState } from "react";

type AuthMode = "login" | "register";

export default function LoginRegisterPage() {
	const [authMode, setAuthMode] = useState<AuthMode>("login");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

	useEffect(() => {
		const url = new URL(window.location.href);
		const mode = url.searchParams.get("mode") as AuthMode | null;
		if (mode === "login" || mode === "register") {
			setAuthMode(mode);
		}
	}, []);

	const changeAuthMode = (mode: AuthMode) => {
		if (mode === authMode) return;
		setIsTransitioning(true);

		const url = new URL(window.location.href);
		url.searchParams.set("mode", mode);
		window.history.pushState({}, "", url.toString());

		setTimeout(() => {
			setAuthMode(mode);
			setIsTransitioning(false);
		}, 150);
	};

	const handleLogin = () => {
		alert("Login handler function!");
	};

	const handleRegister = () => {
		alert("Register handler function!");
	};

	const handleLoginWithGoogle = () => {
		alert("Login with google handler function!");
	};

	const handleSignUpWithGoogle = () => {
		alert("Sign Up with google handler function!");
	};

	return (
		<div className="flex flex-col">
			<div className="flex-1 flex flex-col p-4">
				<div className="max-w-lg w-full mx-auto bg-white shadow-sm border border-gray-100 p-4 rounded-sm flex flex-col gap-4">
					<div className="shrink-0">
						<div className="flex p-1 rounded-sm gap-2">
							<button
								onClick={() => changeAuthMode("login")}
								className={`flex-1 px-4 py-2 rounded-sm font-semibold transition-all duration-300 border ${
									authMode === "login"
										? "bg-white text-black shadow-md border-gray-200"
										: "text-gray-600 hover:text-black border-gray-100"
								}`}>
								Login
							</button>
							<button
								onClick={() => changeAuthMode("register")}
								className={`flex-1 px-4 py-2 rounded-sm font-semibold transition-all duration-300 border ${
									authMode === "register"
										? "bg-white text-black shadow-md border-gray-200"
										: "text-gray-600 hover:text-black border-gray-100"
								}`}>
								Register
							</button>
						</div>
					</div>

					<div className="flex-1 overflow-hidden">
						<div
							className={`h-full transition-all duration-300 ease-in-out ${
								isTransitioning
									? "opacity-0 transform translate-x-4"
									: "opacity-100 transform translate-x-0"
							}`}>
							<div className="h-full overflow-y-auto overflow-x-hidden">
								{authMode === "login" ? (
									<LoginForm
										onSubmit={handleLogin}
										onGoogleLogin={handleLoginWithGoogle}
										onSwitchToRegister={() => changeAuthMode("register")}
										isLoading={isLoading}
									/>
								) : (
									<RegisterForm
										onGoogleRegister={handleSignUpWithGoogle}
										onSubmit={handleRegister}
										onSwitchToLogin={() => changeAuthMode("login")}
										isLoading={isLoading}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
