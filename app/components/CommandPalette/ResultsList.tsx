"use client";

import { SearchItem } from "@/lib/searchIndex";

interface ResultsListProps {
	items: SearchItem[];
	selectedIndex: number;
	onSelect: (item: SearchItem) => void;
	query: string;
}

export function ResultsList({
	items,
	selectedIndex,
	onSelect,
	query,
}: ResultsListProps) {
	if (items.length === 0 && query) {
		return (
			<div className="terminal-prompt px-8 py-8 text-center font-mono">
				&gt; No results found for "{query}"
			</div>
		);
	}

	if (items.length === 0 && !query) {
		return (
			<div className="terminal-prompt px-8 py-8 text-center font-mono">
				&gt; Type a command or search...
			</div>
		);
	}

	return (
		<div className="max-h-96 overflow-y-auto">
			<div className="py-2">
				{items.map((item, index) => (
					<ResultItem
						key={item.id}
						item={item}
						isSelected={index === selectedIndex}
						onClick={() => onSelect(item)}
					/>
				))}
			</div>
		</div>
	);
}

interface ResultItemProps {
	item: SearchItem;
	isSelected: boolean;
	onClick: () => void;
}

function ResultItem({ item, isSelected, onClick }: ResultItemProps) {
	// Determine prompt level based on item type or hierarchy
	const getPrompt = () => {
		if (item.type === "page") return ">>>";
		if (item.type === "post") return ">>";
		if (item.type === "project") return ">>";
		return ">";
	};

	return (
		<button
			onClick={onClick}
			className={`terminal-result group flex w-full items-center px-8 py-3 text-left transition-all duration-300 ${isSelected ? "selected" : ""} `}
		>
			<div className="flex min-w-0 flex-1 items-center">
				<span className="terminal-prompt mr-2 flex-shrink-0">
					{getPrompt()}
				</span>
				<div className="min-w-0 flex-1">
					<div className="light:group-hover:text-blue-700 truncate text-sm transition-colors group-hover:text-purple-300 dark:group-hover:text-gray-200">
						{item.title}
					</div>
					{item.description && (
						<div className="light:text-gray-500 mt-0.5 truncate text-xs opacity-70 dark:text-gray-400">
							{item.description}
						</div>
					)}
				</div>
			</div>
			<div className="ml-4">
				<svg
					className={`light:text-gray-600 h-3 w-3 text-purple-600 transition-all duration-200 dark:text-white ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</div>
		</button>
	);
}
