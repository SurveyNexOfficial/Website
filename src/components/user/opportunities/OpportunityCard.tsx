import Link from "next/link";
import { Clock, Award, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Survey } from "@/types/newSurvey";

interface OpportunityCardProps {
	survey: Survey;
}

export default function OpportunityCard({ survey }: OpportunityCardProps) {
	const estimatedTime = Math.ceil((survey.questions?.length || 0) * 0.5);

	return (
		<Card className="p-4 hover:shadow-md transition-shadow">
			<div className="space-y-3">
				<div>
					<h3 className="text-sm font-semibold mb-1">{survey.title}</h3>
					<p className="text-xs text-gray-600 line-clamp-2">{survey.description}</p>
				</div>

				<div className="flex items-center gap-4 text-xs text-gray-600">
					<div className="flex items-center gap-1">
						<Clock className="w-3 h-3" />
						<span>{estimatedTime} min</span>
					</div>
					<div className="flex items-center gap-1">
						<Award className="w-3 h-3" />
						<span className="font-semibold text-black">
							{survey.reward} {survey.rewardType}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between pt-2 border-t border-gray-200">
					<div className="text-xs text-gray-600">{survey.questions?.length || 0} questions</div>
					<Link href={`/user/opportunity/${survey.id}`}>
						<Button size="sm">
							View Details
							<ArrowRight className="w-3 h-3 ml-1" />
						</Button>
					</Link>
				</div>
			</div>
		</Card>
	);
}
