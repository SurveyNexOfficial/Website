import FormBuilder from "@/components/public/Questly/FormBuilder";

interface EditFormPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function EditFormPage({ params }: EditFormPageProps) {
	const { id } = await params;

	return (
		<section className="relative min-h-screen w-full bg-white py-10">
			<FormBuilder formId={id} />
		</section>
	);
}
