import { FormElement } from "./form";

export interface DragItem {
	type: FormElement["type"];
	label: string;
}

export interface BuilderState {
	selectedElementId: string | null;
	isDragging: boolean;
}
