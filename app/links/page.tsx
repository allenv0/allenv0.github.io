import { OrbContainer, Orb } from "@/components/Orb";
import getBlurDataURL from "@/lib/getBlurDataURL";
import mergeMetadata from "@/lib/mergeMetadata";
import { IconExternalLink, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";

export const metadata = mergeMetadata({
	title: "Links",
	description: "A collection of useful links for builders",
});

interface LinkItem {
	cover?: string;
	coverAlt?: string;
	noCrop?: boolean;
	description: string;
	links?: Record<string, string>;
}

const linkItems: Record<string, LinkItem> = {
	Pmarca: {
		cover: "lemotsh.jpeg",
		coverAlt: "AirPosture app interface",
		description: "AirPosture",
		links: {
			Link: "https://pmarchive.com/",
		},
	},
	"Startup Playbook": {
		cover: "lemotsh.jpeg",
		coverAlt: "YTTL interface",
		description: "Startup Playbook by Sam Altman",
		links: {
			Link: "https://playbook.samaltman.com/",
		},
	},
	Craft: {
		cover: "lemotsh.jpeg",
		coverAlt: "GitHub profile",
		description: "Crafy by paulstamatiou",
		links: {
			Link: "https://paulstamatiou.com/craft",
		},
	},
};

export default function Page() {
	return (
		<>
			<OrbContainer>
				<Orb className="-top-20 right-0 bg-fuchsia-400/30 dark:bg-fuchsia-600/30" />
				<Orb className="right-86 top-40 bg-cyan-400/30 dark:bg-cyan-600/30" />
			</OrbContainer>

			<h2 className="mb-4 text-3xl font-extrabold md:text-4xl">Links</h2>

			<p className="mb-4 max-w-2xl text-lg md:text-xl">
				A collection of useful links for builders
			</p>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Object.entries(linkItems).map(LinkCard)}
			</div>

			<OrbContainer>
				<Orb className="-top-52 left-52 bg-emerald-400/30 dark:bg-emerald-600/30" />
			</OrbContainer>
		</>
	);
}

async function LinkCard([name, data]: [string, LinkItem]) {
	const isGif = data.cover?.endsWith(".gif");

	return (
		<div
			className="group overflow-hidden rounded-[46px] border-4 border-white/50 bg-white shadow-xl transition-all hover:shadow-md dark:border-zinc-800/50 dark:bg-zinc-900/50"
			key={name}
		>
			{data.cover && (
				<div className="relative h-48 w-full overflow-hidden rounded-t-[46px] bg-gray-100 dark:bg-zinc-800">
					<Image
						src={`/images/projects/${data.cover}`}
						alt={data.coverAlt || name}
						fill
						className="object-cover"
						unoptimized={isGif}
						sizes="(max-width:768px) 100vw, 470px"
						placeholder="blur"
						blurDataURL={await getBlurDataURL(
							"/images/projects/" + data.cover,
						)}
					/>
				</div>
			)}
			<div className="p-6">
				<h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
					{name}
				</h3>
				<p className="mb-4 text-zinc-600 dark:text-zinc-400">
					{data.description}
				</p>
				<div className="flex flex-wrap gap-2">
					{Object.entries(data.links || {}).map(([text, href]) => (
						<a
							key={text + href}
							href={href}
							target={
								href.startsWith("http") ? "_blank" : "_self"
							}
							rel={
								href.startsWith("http")
									? "noopener noreferrer"
									: undefined
							}
							className="glass-button-sm flex items-center gap-1 px-3 py-1.5 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400"
						>
							{text}
							<IconArrowRight className="ml-0.5" size={12} />
						</a>
					))}
					{Object.keys(data.links || {}).length === 0 && (
						<span className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-500 dark:bg-zinc-800/50 dark:text-zinc-400">
							Coming soon
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
