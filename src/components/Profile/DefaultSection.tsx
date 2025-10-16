const DefaultSection = ({ title }: { title: string }) => (
	<div className="space-y-6">
		<h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
		<div className="bg-white rounded-sm border border-neutral-200 p-6">
			<p className="text-neutral-600">This section is under development.</p>
		</div>
	</div>
);

export default DefaultSection;
