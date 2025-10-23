import FormBuilder from "@/components/questly/FormBuilder";

interface EditFormPageProps {
	params: {
		id: string;
	};
}

export default function EditFormPage({ params }: EditFormPageProps) {
	return <FormBuilder formId={params.id} />;
}
