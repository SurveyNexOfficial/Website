"use client";
import SurveyForm from "@/components/Survey/SurveyForm";
import { Survey } from "@/types/survey";
import { getSurveyById, saveSurvey } from "@/utils/surveyStorage";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function EditSurveyFormPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const router = useRouter();

	if (!id) {
		router.replace("/businesses");
		return;
	}

	const survey = getSurveyById(id);
	if (!survey) {
		router.replace("/businesses");
		return;
	}

	const onSave = (data: Survey) => {
		saveSurvey(data);
		router.replace("/businesses");
	};

	return <SurveyForm onSave={onSave} survey={survey} />;
}
