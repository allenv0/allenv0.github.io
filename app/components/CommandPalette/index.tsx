"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useDebounce } from "@/hooks/useDebounce";
import { useCommandPalette } from "@/context/CommandPaletteContext";
import { searchItems, SearchItem } from "@/lib/searchIndex";
import { SearchInput } from "./SearchInput";
import { ResultsList } from "./ResultsList";

export function CommandPalette() {
	const { isOpen, setIsOpen, togglePalette, closePalette } =
		useCommandPalette();
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 150);
	const [results, setResults] = useState<SearchItem[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	// Keyboard shortcut: cmd+k or ctrl+k
	useKeyboardShortcut(
		{ key: "k", modifiers: ["meta"], preventDefault: true },
		togglePalette,
	);
	useKeyboardShortcut(
		{ key: "k", modifiers: ["ctrl"], preventDefault: true },
		togglePalette,
	);

	// Close on escape
	useKeyboardShortcut({ key: "Escape", preventDefault: true }, closePalette);

	// Focus input when opened
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Update search results
	useEffect(() => {
		const searchResults = searchItems(debouncedQuery);
		setResults(searchResults);
		setSelectedIndex(0);
	}, [debouncedQuery]);

	// Handle keyboard navigation
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (!isOpen) return;

			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					setSelectedIndex((prev) =>
						prev < results.length - 1 ? prev + 1 : prev,
					);
					break;
				case "ArrowUp":
					e.preventDefault();
					setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
					break;
				case "Enter":
					e.preventDefault();
					if (results[selectedIndex]) {
						handleSelect(results[selectedIndex]);
					}
					break;
			}
		},
		[isOpen, results, selectedIndex],
	);

	const handleSelect = useCallback(
		(item: SearchItem) => {
			setIsOpen(false);
			setQuery("");
			setSelectedIndex(0);

			if (item.href.startsWith("http")) {
				window.open(item.href, "_blank");
			} else {
				router.push(item.href);
			}
		},
		[router],
	);

	const handleQueryChange = useCallback((newQuery: string) => {
		setQuery(newQuery);
	}, []);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
				onClick={closePalette}
			/>

			{/* Command Palette */}
			<div className="fixed left-1/2 top-20 mx-4 w-full max-w-2xl -translate-x-1/2">
				<div className="terminal-panel">
					{/* Terminal Header */}
					<div className="light:border-blue-600/20 flex items-center border-b border-white/20 px-8 py-4 dark:border-white/20">
						<span className="terminal-prompt mr-2">&gt;</span>
						<SearchInput
							ref={inputRef}
							value={query}
							onChange={handleQueryChange}
							onKeyDown={handleKeyDown}
							placeholder="search_commands..."
							className="terminal-input terminal-cursor"
						/>
						<div className="ml-auto pl-4">
							<kbd className="terminal-esc-key light:border-blue-600/40 light:bg-blue-600/10 light:text-blue-600 rounded border bg-black/30 px-2 py-1 font-mono text-xs backdrop-blur-sm dark:border-white/40 dark:bg-white/20 dark:text-white">
								ESC
							</kbd>
						</div>
					</div>

					<ResultsList
						items={results}
						selectedIndex={selectedIndex}
						onSelect={handleSelect}
						query={query}
					/>
				</div>
			</div>
		</div>
	);
}
