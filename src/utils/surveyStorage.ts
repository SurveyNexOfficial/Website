import { Survey } from "../types/survey";

const STORAGE_KEY = "surveys";

export const getSurveys = (): Survey[] => {
	if (typeof window === "undefined") return [];
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : [];
};

export const saveSurvey = (survey: Survey): void => {
	if (typeof window === "undefined") return;
	const surveys = getSurveys();
	const existingIndex = surveys.findIndex((s) => s.id === survey.id);

	if (existingIndex >= 0) {
		surveys[existingIndex] = survey;
	} else {
		surveys.push(survey);
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys));
};

export const deleteSurvey = (id: string): void => {
	if (typeof window === "undefined") return;
	const surveys = getSurveys();
	const filtered = surveys.filter((s) => s.id !== id);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getSurveyById = (id: string): Survey | null => {
	const surveys = getSurveys();
	return surveys.find((s) => s.id === id) || null;
};
