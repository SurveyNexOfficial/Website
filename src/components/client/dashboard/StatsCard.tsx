import { LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";

interface StatsCardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
	trend?: {
		value: number;
		isPositive: boolean;
	};
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
	return (
		<Card className="p-4">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-xs text-gray-600">{title}</p>
					<p className="text-2xl font-bold mt-1">{value}</p>
					{trend && (
						<p className={`text-xs mt-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
							{trend.isPositive ? "+" : ""}
							{trend.value}% from last month
						</p>
					)}
				</div>
				<div className="p-2 bg-gray-100">
					<Icon className="w-5 h-5" />
				</div>
			</div>
		</Card>
	);
}
