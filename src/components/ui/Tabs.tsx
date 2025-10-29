"use client";

import { useState } from "react";

interface Tab {
	id: string;
	label: string;
	content: React.ReactNode;
}

interface TabsProps {
	tabs: Tab[];
	defaultTab?: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
	const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

	return (
		<div>
			<div className="border-b border-gray-300">
				<div className="flex gap-4">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
								activeTab === tab.id
									? "border-black text-black"
									: "border-transparent text-gray-600 hover:text-black"
							}`}>
							{tab.label}
						</button>
					))}
				</div>
			</div>
			<div className="mt-4">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
		</div>
	);
}
