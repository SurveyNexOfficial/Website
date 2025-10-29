"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	const pages = [];
	const maxVisible = 5;

	let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
	const endPage = Math.min(totalPages, startPage + maxVisible - 1);

	if (endPage - startPage < maxVisible - 1) {
		startPage = Math.max(1, endPage - maxVisible + 1);
	}

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	return (
		<div className="flex items-center justify-center gap-1 text-xs">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="p-1 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
				<ChevronLeft className="w-4 h-4" />
			</button>

			{startPage > 1 && (
				<>
					<button
						onClick={() => onPageChange(1)}
						className="px-3 py-1 border border-gray-300 hover:bg-gray-100">
						1
					</button>
					{startPage > 2 && <span className="px-2">...</span>}
				</>
			)}

			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-3 py-1 border ${
						page === currentPage ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"
					}`}>
					{page}
				</button>
			))}

			{endPage < totalPages && (
				<>
					{endPage < totalPages - 1 && <span className="px-2">...</span>}
					<button
						onClick={() => onPageChange(totalPages)}
						className="px-3 py-1 border border-gray-300 hover:bg-gray-100">
						{totalPages}
					</button>
				</>
			)}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="p-1 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
				<ChevronRight className="w-4 h-4" />
			</button>
		</div>
	);
}
