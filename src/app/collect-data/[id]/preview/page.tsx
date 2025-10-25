"use client";

import SurveyPreview from "@/components/Survey/SurveyPreview";
import { getSurveyById } from "@/utils/surveyStorage";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function SurveyFormPreviewPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const router = useRouter();

	if (!id) {
		router.replace("/collect-data");
		return;
	}

	const survey = getSurveyById(id);
	if (!survey) {
		router.replace("/collect-data");
		return;
	}

	return (
		<section className="relative min-h-screen py-10 bg-white w-full">
			<SurveyPreview survey={survey} />
		</section>
	);
}
