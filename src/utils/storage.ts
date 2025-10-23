import { Form } from "@/types/form";

export const STORAGE_KEYS = {
	FORMS: "questly_forms",
	RESPONSES: "questly_responses",
} as const;

export function getForms(): Form[] {
	if (typeof window === "undefined") return [];

	const stored = localStorage.getItem(STORAGE_KEYS.FORMS);
	return stored ? JSON.parse(stored) : [];
}

export function saveForm(form: Form): void {
	const forms = getForms();
	const existingIndex = forms.findIndex((f) => f.id === form.id);

	if (existingIndex >= 0) {
		forms[existingIndex] = form;
	} else {
		forms.push(form);
	}

	localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(forms));
}

export function getForm(id: string): Form | null {
	const forms = getForms();
	return forms.find((f) => f.id === id) || null;
}

export function deleteForm(id: string): void {
	const forms = getForms().filter((f) => f.id !== id);
	localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(forms));
}

export function generateId(): string {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
