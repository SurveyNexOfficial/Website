"use client";

import LoginForm from "@/components/LoginForm/LoginForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { useEffect, useState } from "react";

type AuthMode = "login" | "register";

function formatLocalDate() {
	const date = new Date(); // Local time from browser

	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const dayName = days[date.getDay()];

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12 || 12; // 12-hour format

	return `${dayName}, ${day}.${month}.${year}, ${hours}:${minutes} ${ampm}`;
}

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
		<div className="bg-gray-50 h-screen overflow-hidden flex flex-col">
			<div className="w-full border-b border-gray-200 shadow-sm px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-2">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">S</span>
							</div>
							<span className="text-xl font-bold bg-black bg-clip-text text-transparent">SurveyNex</span>
						</div>
						<div>
							<span className="text-gray-700">{formatLocalDate()}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="flex-1 flex flex-col p-4">
				<div className="max-w-lg w-full mx-auto h-[600px] bg-white shadow-sm p-4 rounded-md flex flex-col gap-4">
					<div className="shrink-0">
						<div className="flex bg-gray-100 p-1 rounded-xl gap-2">
							<button
								onClick={() => changeAuthMode("login")}
								className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
									authMode === "login"
										? "bg-white text-black shadow-sm"
										: "text-gray-600 hover:text-black"
								}`}>
								Login
							</button>
							<button
								onClick={() => changeAuthMode("register")}
								className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
									authMode === "register"
										? "bg-white text-black shadow-sm"
										: "text-gray-600 hover:text-black"
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
