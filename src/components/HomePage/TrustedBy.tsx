export default function HomePageTrustedBySection() {
	const trustedBrands = ["Microsoft", "Nike", "Coca-Cola", "Samsung", "Netflix", "Amazon"];

	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-lg font-semibold text-gray-600 mb-8">Trusted by leading brands worldwide</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 items-center">
					{trustedBrands.map((brand, index) => (
						<div
							key={index}
							className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
							{brand}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
