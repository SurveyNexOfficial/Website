import FormBuilder from "@/components/Formly/FormBuilder";

interface EditFormPageProps {
	params: {
		id: string;
	};
}

export default function EditFormPage({ params }: EditFormPageProps) {
	return <FormBuilder formId={params.id} />;
}
