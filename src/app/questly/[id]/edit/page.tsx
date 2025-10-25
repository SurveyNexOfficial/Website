import FormBuilder from "@/components/Questly/FormBuilder";

interface EditFormPageProps {
	params: {
		id: string;
	};
}

export default function EditFormPage({ params }: EditFormPageProps) {
	return (
		<section className="relative min-h-screen w-full bg-white py-10">
			<FormBuilder formId={params.id} />
		</section>
	);
}
