export default function UserFooter() {
	return (
		<footer className="border-t border-gray-200 py-4 px-6 bg-white">
			<div className="max-w-7xl mx-auto text-center">
				<p className="text-xs text-gray-600">© {new Date().getFullYear()} SurveyNex. All rights reserved.</p>
			</div>
		</footer>
	);
}
