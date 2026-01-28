"use client";

import Link from "next/link";
import { OrbContainer, Orb } from "@/components/Orb";
import allPosts from "@/lib/posts";
import { useState } from "react";

type Category = "all" | "blog" | "notes";

export default function BlogClient() {
	const [activeTab, setActiveTab] = useState<Category>("all");

	const filteredPosts = allPosts.filter((post) => {
		if (activeTab === "all") return true;
		return post.category === activeTab;
	});

	const blogCount = allPosts.filter((p) => p.category === "blog").length;
	const notesCount = allPosts.filter((p) => p.category === "notes").length;

	const tabs = [
		{ id: "all" as Category, label: "All", count: allPosts.length },
		{ id: "blog" as Category, label: "Blog", count: blogCount },
		{ id: "notes" as Category, label: "Notes", count: notesCount },
	];

	return (
		<>
			<OrbContainer>
				<Orb className="-top-52 left-52 bg-purple-400/30 dark:bg-purple-600/30 max-md:-top-32 max-md:left-32" />
			</OrbContainer>

			<h1 className="mb-8 text-2xl font-bold tracking-tight">Blog & Notes</h1>

			{/* Beautiful Tabs */}
			<div className="mb-8">
				<div className="inline-flex rounded-2xl bg-zinc-100/80 p-1.5 shadow-sm backdrop-blur-sm dark:bg-zinc-800/60">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`
								relative rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200
								${activeTab === tab.id
									? "bg-white text-zinc-900 shadow-md dark:bg-zinc-700 dark:text-white"
									: "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
								}
							`}
						>
							<span className="flex items-center gap-2">
								{tab.label}
								<span className={`
									rounded-full px-2.5 py-0.5 text-xs font-semibold
									${activeTab === tab.id
										? "bg-zinc-100 text-zinc-600 dark:bg-zinc-600 dark:text-zinc-300"
										: "bg-zinc-200/60 text-zinc-500 dark:bg-zinc-700/60 dark:text-zinc-400"
									}
								`}>
									{tab.count}
								</span>
							</span>
						</button>
					))}
				</div>
			</div>

			<div className="relative z-10 space-y-1" style={{ minHeight: `${allPosts.length * 60}px` }}>
				{filteredPosts.map((post) => (
					<Link
						href={"/blog/" + post._meta.path}
						className="group relative -mx-4 block rounded-lg bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-800/50"
						key={post._meta.path}
					>
						<div className="flex items-center gap-3">
							<h2 className="flex-1 text-base font-medium text-zinc-900 transition-colors group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-white">
								{post.title}
							</h2>

							<div className="flex-shrink-0 text-zinc-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
								<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
								</svg>
							</div>
						</div>
					</Link>
				))}
			</div>

			<OrbContainer>
				<Orb className="bg-emerald-400/30 dark:bg-emerald-600/30" />
				<Orb className="left-72 top-16 bg-cyan-400/30 dark:bg-cyan-600/30" />
			</OrbContainer>
		</>
	);
}
