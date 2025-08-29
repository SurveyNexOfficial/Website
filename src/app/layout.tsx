import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SurveyNex",
	description:
		"We created SurveyNex to change the way feedback works by making it easier, fairer, and more rewarding for everyone involved. Our platform allows everyday users to participate in surveys from trusted brands, researchers, and organisations, and get rewarded for simply sharing their views. No lengthy processes. No confusing steps. Just real people giving real opinions, and getting something valuable in return.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black flex flex-col`}>
				<Header />
				<main className="pt-32 flex flex-col flex-1">{children}</main>
			</body>
		</html>
	);
}
