"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
	id: string;
	title: string;
	content: React.ReactNode;
}

interface AccordionProps {
	items: AccordionItem[];
	allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
	const [openItems, setOpenItems] = useState<string[]>([]);

	const toggleItem = (id: string) => {
		if (allowMultiple) {
			setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
		} else {
			setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
		}
	};

	return (
		<div className="space-y-2">
			{items.map((item) => {
				const isOpen = openItems.includes(item.id);
				return (
					<div key={item.id} className="border border-gray-300">
						<button
							onClick={() => toggleItem(item.id)}
							className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-left hover:bg-gray-50 transition-colors">
							<span>{item.title}</span>
							<ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
						</button>
						{isOpen && <div className="px-4 py-3 border-t border-gray-300 text-sm">{item.content}</div>}
					</div>
				);
			})}
		</div>
	);
}
