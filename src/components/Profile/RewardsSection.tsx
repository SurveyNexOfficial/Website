const RewardsSection = () => {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-neutral-900">Rewards & Points</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-4">
					<div className="bg-white rounded-sm border border-neutral-200 p-6">
						<h2 className="text-lg font-semibold text-neutral-900 mb-4">Available Rewards</h2>
						<div className="space-y-4">
							{[
								{ name: "Amazon Gift Card", points: 500, value: "$5" },
								{ name: "PayPal Cash", points: 1000, value: "$10" },
								{ name: "Spotify Premium (1 month)", points: 800, value: "$9.99" },
							].map((reward, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 border border-neutral-200 rounded-sm">
									<div>
										<h3 className="font-medium text-neutral-900">{reward.name}</h3>
										<p className="text-sm text-neutral-600">
											{reward.points} points • {reward.value}
										</p>
									</div>
									<button className="px-4 py-2 bg-neutral-900 text-white rounded-sm hover:bg-neutral-800 transition-colors text-sm">
										Redeem
									</button>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div className="bg-white rounded-sm border border-neutral-200 p-6">
						<h2 className="text-lg font-semibold text-neutral-900 mb-4">Current Balance</h2>
						<div className="text-center">
							<p className="text-3xl font-bold text-neutral-900">1,250</p>
							<p className="text-neutral-600">Available Points</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RewardsSection;
