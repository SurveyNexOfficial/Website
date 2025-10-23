"use client";

import SurveyForm from "@/components/Survey/SurveyForm";
import { Survey } from "@/types/survey";
import { saveSurvey } from "@/utils/surveyStorage";
import { useRouter } from "next/navigation";

export default function NewSurveyForm() {
	const router = useRouter();
	const onSave = (data: Survey) => {
		saveSurvey(data);
		router.replace("/collect-data");
	};

	return <SurveyForm onSave={onSave} />;
}
