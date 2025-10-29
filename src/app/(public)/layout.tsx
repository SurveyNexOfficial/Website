import Header from "@/components/public/Header/Header";
import Footer from "@/components/public/Footer/Footer";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
