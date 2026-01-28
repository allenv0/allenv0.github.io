"use client";

import { OrbContainer, Orb } from "@/components/Orb";
import Image from "next/image";

interface IconItem {
	cover: string;
	coverAlt: string;
	filename: string;
	description?: string;
}

const iconItems: Record<string, IconItem> = {
	ALE: {
		cover: "ALE-iOS.png",
		coverAlt: "ALE iOS icon",
		filename: "ALE-iOS.png",
		description: "Allen Lee with Beats",
	},
	"Wormhole-iOS": {
		cover: "Cued-iOS.png",
		coverAlt: "Cued iOS icon",
		filename: "Cued-iOS.png",
		description: "AI Book camera app",
	},
	Cued: {
		cover: "Cues-Silver.png",
		coverAlt: "Cues Silver icon",
		filename: "Cues-Silver.png",
		description: "AI Memory",
	},
	"Horus-Terminal": {
		cover: "h3.png",
		coverAlt: "H terminal icon",
		filename: "h3.png",
		description: "Horus CLI",
	},
	"Horus-Terminal2": {
		cover: "h.png",
		coverAlt: "H terminal icon",
		filename: "h3.png",
		description: "Horus CLI",
	},
	"Stealth coding ai": {
		cover: "lam.png",
		coverAlt: "H terminal icon",
		filename: "h3.png",
		description: "stealth",
	},
	"AI-Powered Finder": {
		cover: "mac.png",
		coverAlt: "H terminal icon",
		filename: "h3.png",
		description: "stealth",
	},
	AirPosture: {
		cover: "air.png",
		coverAlt: "H terminal icon",
		filename: "h3.png",
		description: "AirPods as AI Posture Coach",
	},
};

const iconEntries = Object.entries(iconItems);

export function IconsContent() {
	return (
		<>
			<OrbContainer>
				<Orb className="-top-20 right-0 bg-fuchsia-400/30 dark:bg-fuchsia-600/30" />
				<Orb className="right-86 top-40 bg-cyan-400/30 dark:bg-cyan-600/30" />
			</OrbContainer>

			<div className="mx-auto max-w-7xl px-4">
				<h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
					Icon Gallery
				</h2>

				<p className="mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
					A collection of iOS/ macOS icons of the applications I have
					created.
				</p>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{iconEntries.map(IconCard)}
				</div>
			</div>

			<OrbContainer>
				<Orb className="-top-52 left-52 bg-emerald-400/30 dark:bg-emerald-600/30" />
			</OrbContainer>
		</>
	);
}

function IconCard([name, data]: [string, IconItem]) {
	return (
		<div
			className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-neutral-100/30 backdrop-blur transition-all duration-500 hover:scale-[1.08] hover:shadow-2xl dark:border-zinc-800 dark:bg-neutral-900/30 dark:hover:border-violet-500/80 dark:hover:shadow-violet-500/20"
			key={name}
		>
			<div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
				<Image
					src={`/images/icns/${data.cover}`}
					alt={data.coverAlt || name}
					fill
					className="object-contain p-8 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
					sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
			</div>

			<div className="flex flex-1 flex-col p-4">
				<h3 className="mb-1 truncate text-center text-sm font-semibold text-zinc-900 dark:text-white">
					{name}
				</h3>

				{data.description && (
					<p className="mb-3 truncate text-center text-xs text-zinc-600 dark:text-zinc-400">
						{data.description}
					</p>
				)}
			</div>
		</div>
	);
}
