"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import allPosts from "@/lib/posts";

interface TerminalLine {
	type: "input" | "output" | "error" | "system" | "search-result";
	content: string;
	href?: string;
	color?: string;
}

interface SearchResult {
	post: typeof allPosts[0];
	score: number;
}

interface RetroTerminalProps {
	isOpen: boolean;
	onClose: () => void;
}

// Search function for blog posts
function searchPosts(query: string): SearchResult[] {
	if (!query.trim()) return [];

	const queryLower = query.toLowerCase();

	return allPosts
		.map((post) => {
			const titleLower = post.title.toLowerCase();
			const summaryLower = post.summary.toLowerCase();

			let score = 0;

			// Exact title match (highest priority)
			if (titleLower === queryLower) score += 100;
			// Title starts with query
			else if (titleLower.startsWith(queryLower)) score += 80;
			// Title contains query
			else if (titleLower.includes(queryLower)) score += 60;

			// Summary contains query
			if (summaryLower.includes(queryLower)) score += 40;

			// Fuzzy match for title
			if (score === 0) {
				let textIndex = 0;
				let fuzzyScore = 0;
				for (const char of queryLower) {
					const foundIndex = titleLower.indexOf(char, textIndex);
					if (foundIndex === -1) {
						fuzzyScore = 0;
						break;
					}
					fuzzyScore += 10;
					textIndex = foundIndex + 1;
				}
				score += fuzzyScore;
			}

			return { post, score };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 8);
}

const COMMANDS: Record<string, { description: string; action: () => string | null }> = {
	help: {
		description: "Show available commands",
		action: () => null,
	},
	about: {
		description: "Display information about Allen",
		action: () =>
			`Allen Lee — Software Developer & Designer

Building digital experiences at the intersection of
aesthetics and functionality. Based in Taipei.

Type 'blog' to read my posts or 'search <query>' to find content.`,
	},
	blog: {
		description: "Navigate to blog",
		action: () => null,
	},
	search: {
		description: "Search blog posts (usage: search <query>)",
		action: () => null,
	},
	clear: {
		description: "Clear terminal",
		action: () => null,
	},
	exit: {
		description: "Close terminal",
		action: () => null,
	},
};

// Rainbow-colored ASCII art for "Allen"
const WELCOME_ART_LINES = [
	{ text: "    ___    __    ________  ___________", color: "#ff6b6b" },
	{ text: "   /   |  / /   /  _/ __ \\/ ____/ ___/", color: "#feca57" },
	{ text: "  / /| | / /    / // / / / __/  \\__ \\ ", color: "#48dbfb" },
	{ text: " / ___ |/ /____/ // /_/ / /___ ___/ / ", color: "#ff9ff3" },
	{ text: "/_/  |_/_____/___/_____/_____//____/  ", color: "#54a0ff" },
	{ text: "                                       ", color: "#5f27cd" },
];

export function RetroTerminal({ isOpen, onClose }: RetroTerminalProps) {
	const [lines, setLines] = useState<TerminalLine[]>([]);
	const [input, setInput] = useState("");
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	// Initialize welcome message
	useEffect(() => {
		if (isOpen && lines.length === 0) {
			const artLines: TerminalLine[] = WELCOME_ART_LINES.map((line) => ({
				type: "system" as const,
				content: line.text,
				color: line.color,
			}));
			setLines([
				...artLines,
				{ type: "system", content: "Welcome to Allen. Terminal v1.0" },
				{ type: "system", content: 'Type "help" for available commands.' },
				{ type: "system", content: "" },
			]);
		}
	}, [isOpen, lines.length]);

	// Auto-scroll to bottom
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [lines]);

	// Focus input when opened
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;

			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	const executeCommand = useCallback(
		(cmd: string) => {
			const trimmedCmd = cmd.trim().toLowerCase();

			// Add input line
			setLines((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);

			if (!trimmedCmd) return;

			// Add to history
			setHistory((prev) => [...prev, trimmedCmd]);
			setHistoryIndex(-1);

			// Check if it's a number selection for search results
			const num = parseInt(trimmedCmd, 10);
			if (!isNaN(num) && num > 0 && num <= searchResults.length) {
				const selected = searchResults[num - 1];
				if (selected) {
					onClose();
					router.push(`/blog/${selected.post._meta.path}`);
					setSearchResults([]);
					return;
				}
			}

			// Handle commands
			if (trimmedCmd === "help") {
				const helpText = Object.entries(COMMANDS)
					.map(([name, { description }]) => `  ${name.padEnd(12)} ${description}`)
					.join("\n");
				setLines((prev) => [
					...prev,
					{ type: "output", content: "Available commands:" },
					{ type: "output", content: helpText },
				]);
			} else if (trimmedCmd === "clear") {
				setLines([]);
				setSearchResults([]);
			} else if (trimmedCmd === "exit") {
				onClose();
			} else if (trimmedCmd === "blog") {
				onClose();
				router.push("/blog");
			} else if (trimmedCmd.startsWith("search ") || trimmedCmd === "search") {
				const query = cmd.slice(6).trim();
				if (!query) {
					setLines((prev) => [
						...prev,
						{ type: "error", content: "Usage: search <query>" },
						{ type: "output", content: "Example: search AI" },
					]);
				} else {
					const results = searchPosts(query);
					setSearchResults(results);

					if (results.length === 0) {
						setLines((prev) => [
							...prev,
							{ type: "output", content: `No results found for "${query}"` },
						]);
					} else {
						const resultLines: TerminalLine[] = [
							{ type: "output", content: `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${query}":` },
							{ type: "output", content: "" },
						];

						results.forEach(({ post, score }, index) => {
							const relevance = score >= 80 ? "★★★" : score >= 60 ? "★★☆" : "★☆☆";
							resultLines.push({
								type: "search-result",
								content: `  [${index + 1}] ${post.title} ${relevance}`,
								href: `/blog/${post._meta.path}`,
							});
							resultLines.push({
								type: "output",
								content: `      ${post.summary.slice(0, 60)}${post.summary.length > 60 ? "..." : ""}`,
							});
							resultLines.push({ type: "output", content: "" });
						});

						resultLines.push({ type: "output", content: "Type a number (1-8) to open a post." });
						setLines((prev) => [...prev, ...resultLines]);
					}
				}
			} else if (COMMANDS[trimmedCmd]) {
				const result = COMMANDS[trimmedCmd].action();
				if (result) {
					setLines((prev) => [...prev, { type: "output", content: result }]);
				}
			} else {
				setLines((prev) => [
					...prev,
					{ type: "error", content: `Command not found: ${trimmedCmd}` },
					{ type: "error", content: 'Type "help" for available commands.' },
				]);
			}
		},
		[onClose, router, searchResults],
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		executeCommand(input);
		setInput("");
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (historyIndex < history.length - 1) {
				const newIndex = historyIndex + 1;
				setHistoryIndex(newIndex);
				setInput(history[history.length - 1 - newIndex] || "");
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1;
				setHistoryIndex(newIndex);
				setInput(history[history.length - 1 - newIndex] || "");
			} else if (historyIndex === 0) {
				setHistoryIndex(-1);
				setInput("");
			}
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Terminal Container */}
			<div
				className="relative w-full max-w-3xl animate-fade-in"
				role="dialog"
				aria-modal="true"
				aria-label="Retro Terminal"
			>
				{/* Transparent Mac-style Case */}
				<div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-3 shadow-2xl backdrop-blur-xl">
					{/* Inner bezel with subtle depth */}
					<div className="relative rounded-xl border border-white/5 bg-black/40 p-1 shadow-inner">
						{/* CRT Screen Container */}
						<div className="relative overflow-hidden rounded-lg bg-black">
							{/* Screen curvature effect */}
							<div className="pointer-events-none absolute inset-0 z-10 rounded-lg shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />

							{/* Scanlines */}
							<div
								className="pointer-events-none absolute inset-0 z-10 opacity-[0.08]"
								style={{
									backgroundImage:
										"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
								}}
							/>

							{/* Screen glow */}
							<div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />

							{/* Terminal Header */}
							<div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
								<div className="flex items-center gap-2">
									{/* Classic rainbow logo */}
									<div className="flex h-3 w-3 items-center justify-center overflow-hidden rounded-full">
										<div
											className="h-full w-full"
											style={{
												background:
													"conic-gradient(from 0deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #ff6b6b)",
												opacity: 0.8,
											}}
										/>
									</div>
									<span className="ml-2 text-xs font-medium tracking-wide text-white/60">
										Allen.
									</span>
								</div>

								{/* Window controls */}
								<div className="flex items-center gap-1.5">
									<button
										onClick={onClose}
										className="group relative h-3 w-3 rounded-full bg-red-500/80 transition-all hover:bg-red-500 hover:shadow-[0_0_8px_rgba(239,68,68,0.6)]"
										aria-label="Close terminal"
									>
										<span className="absolute inset-0 flex items-center justify-center text-[6px] font-bold text-black/0 transition-all group-hover:text-black/60">
											×
										</span>
									</button>
									<div className="h-3 w-3 rounded-full bg-yellow-500/80" />
									<div className="h-3 w-3 rounded-full bg-green-500/80" />
								</div>
							</div>

							{/* Terminal Content */}
							<div
								ref={terminalRef}
								className="h-[400px] overflow-y-auto p-4 font-mono text-sm"
								onClick={() => inputRef.current?.focus()}
							>
								{/* Terminal lines */}
								{lines.map((line, index) => (
									<div
										key={index}
										className={`whitespace-pre-wrap leading-relaxed ${
											line.type === "input"
												? "text-cyan-400/90"
												: line.type === "error"
													? "text-red-400/90"
													: line.type === "system"
														? line.color
																? ""
																: "text-purple-400/90"
														: line.type === "search-result"
															? "cursor-pointer text-yellow-400/90 hover:text-yellow-300/90 hover:underline"
															: "text-white/80"
										}`}
										style={{
											color: line.color || undefined,
											textShadow: line.color
												? `0 0 8px ${line.color}66`
												: line.type === "input"
														? "0 0 8px rgba(34,211,238,0.4)"
														: line.type === "system"
																? "0 0 8px rgba(168,85,247,0.4)"
																: line.type === "search-result"
																	? "0 0 8px rgba(250,204,21,0.4)"
																	: "0 0 4px rgba(255,255,255,0.2)",
										}}
										onClick={() => {
											if (line.type === "search-result" && line.href) {
												onClose();
												router.push(line.href);
											}
										}}
									>
										{line.content}
									</div>
								))}

								{/* Input line */}
								<form onSubmit={handleSubmit} className="flex items-center gap-2">
									<span className="text-cyan-400/90">{">"}</span>
									<input
										ref={inputRef}
										type="text"
										value={input}
										onChange={(e) => setInput(e.target.value)}
										onKeyDown={handleKeyDown}
										className="flex-1 bg-transparent text-white/90 outline-none"
										style={{
											textShadow: "0 0 4px rgba(255,255,255,0.3)",
											caretColor: "rgba(34,211,238,0.9)",
										}}
										placeholder=""
										autoComplete="off"
										autoCorrect="off"
										autoCapitalize="off"
										spellCheck="false"
									/>
								</form>
							</div>
						</div>
					</div>

					{/* Bottom branding */}
					<div className="mt-2 flex items-center justify-center gap-2">
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
						<span className="text-[10px] tracking-widest text-white/30">
							ALLEN TERMINAL
						</span>
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
					</div>
				</div>

				{/* External glow effect */}
				<div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-b from-purple-500/10 via-transparent to-cyan-500/10 blur-xl" />
			</div>
		</div>
	);
}
