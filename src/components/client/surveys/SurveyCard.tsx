import Link from "next/link";
import { Edit, Trash2, BarChart, Eye } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Survey } from "@/types/newSurvey";

interface SurveyCardProps {
	survey: Survey;
	onDelete: (id: string) => void;
}

export default function SurveyCard({ survey, onDelete }: SurveyCardProps) {
	const statusColors = {
		draft: "bg-gray-100 text-gray-700",
		active: "bg-green-100 text-green-700",
		paused: "bg-yellow-100 text-yellow-700",
		closed: "bg-red-100 text-red-700",
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<Card className="p-4 hover:shadow-md transition-shadow">
			<div className="flex items-start justify-between mb-3">
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-1">
						<Link href={`/client/surveys/${survey.id}`}>
							<h3 className="text-sm font-semibold hover:underline">{survey.title}</h3>
						</Link>
						<span className={`text-xs px-2 py-0.5 ${statusColors[survey.status]}`}>{survey.status}</span>
					</div>
					<p className="text-xs text-gray-600 line-clamp-2">{survey.description}</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-200 text-xs">
				<div>
					<p className="text-gray-600">Responses</p>
					<p className="font-semibold">
						{survey.totalResponses}
						{survey.targetResponses && ` / ${survey.targetResponses}`}
					</p>
				</div>
				<div>
					<p className="text-gray-600">Reward</p>
					<p className="font-semibold">
						{survey.reward} {survey.rewardType}
					</p>
				</div>
				<div>
					<p className="text-gray-600">Created</p>
					<p className="font-semibold">{formatDate(survey.createdAt)}</p>
				</div>
				<div>
					<p className="text-gray-600">Questions</p>
					<p className="font-semibold">{survey.questions?.length || 0}</p>
				</div>
			</div>

			<div className="flex items-center justify-end gap-2 mt-3">
				<Link href={`/client/surveys/${survey.id}/preview`}>
					<Button variant="ghost" size="sm">
						<Eye className="w-3 h-3 mr-1" />
						Preview
					</Button>
				</Link>
				<Link href={`/client/surveys/${survey.id}/responses`}>
					<Button variant="ghost" size="sm">
						<BarChart className="w-3 h-3 mr-1" />
						Responses
					</Button>
				</Link>
				<Link href={`/client/surveys/${survey.id}/edit`}>
					<Button variant="ghost" size="sm">
						<Edit className="w-3 h-3 mr-1" />
						Edit
					</Button>
				</Link>
				<Button variant="ghost" size="sm" onClick={() => onDelete(survey.id)}>
					<Trash2 className="w-3 h-3 text-red-600" />
				</Button>
			</div>
		</Card>
	);
}
