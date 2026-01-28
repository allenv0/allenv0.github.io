import { OrbContainer, Orb } from "@/components/Orb";
import getBlurDataURL from "@/lib/getBlurDataURL";
import mergeMetadata from "@/lib/mergeMetadata";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";

export const metadata = mergeMetadata({
	title: "Books",
	description: "A collection of books",
});

interface Project {
	cover?: string;
	coverAlt?: string;
	noCrop?: boolean;
	description: string;
	links?: Record<string, string>;
}

const projects: Record<string, Project> = {
	"Finite and Infinite Games": {
		cover: "fig.jpg",
		coverAlt: "The Lord of the Rings book cover",
		description:
			"A finite game is played for the purpose of winning, an infinite game for the purpose of continuing the play.",
		links: {

		},
	},
	"The Art and Craft of Problem Solving 1/2/3": {
		cover: "acp.jpg",
		coverAlt: "Pride and Prejudice book cover",
		description: "Math gold.",
		links: {},
	},
	"The Creative Act: A Way of Being": {
		cover: "co.jpg",
		coverAlt: "1984 book cover",
		description:
			"*I just need to finish this so I can move on*",
		links: {
		},
	},
	"The Selfish Gene": {
		cover: "gene.webp",
		coverAlt: "1984 book cover",
		description:
			"*Any altruistic system is inherently unstable, because it is open to abuse by selfish individuals, ready to exploit it.*",
		links: {
		},
	},
	"The Power Broker: Robert Moses and the Fall of New York": {
		cover: "power.jpg",
		coverAlt: "1984 book cover",
		description:
			"His shaping of twentieth-century New York",
		links: {
		},
	},
	"Extreme Ownership": {
		cover: "e.webp",
		coverAlt:
			"To Kill a Mockingbird book cover",
		description: "*Success starts with taking full responsibility—no excuses, no blame—just ownership, discipline, and action*",
		links: {
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

			<h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
							Bookshelf
						</h2>

			<p className="mb-4 max-w-2xl text-lg md:text-xl"></p>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Object.entries(projects).map(ProjectCard)}
			</div>

			<OrbContainer>
				<Orb className="-top-52 left-52 bg-emerald-400/30 dark:bg-emerald-600/30" />
			</OrbContainer>
		</>
	);
}

async function ProjectCard([name, data]: [string, Project]) {
	return (
		<div
			className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-neutral-100/30 backdrop-blur transition-transform ease-in-out hover:scale-[1.01] dark:border-zinc-800 dark:bg-neutral-900/30"
			key={name}
		>
			{data.cover && data.coverAlt && (
							<div className="relative w-full" style={{ paddingBottom: '50%' }}>
								<Image
									alt={data.coverAlt}
									src={"/images/projects/" + data.cover}
									fill
									className="object-contain"
									sizes="(max-width:768px) 100vw, 470px"
									placeholder="blur"
									blurDataURL={await getBlurDataURL(
										"/images/projects/" + data.cover,
									)}
								/>
							</div>
						)}

			<h1 className="px-6 pt-6 text-lg font-bold">{name}</h1>
			<p className="prose grow px-6 dark:prose-invert">
				{data.description}
			</p>

			{data.links && (
				<div className="mt-4 flex flex-row gap-8 px-6 pb-6">
					{Object.entries(data.links).map(([title, href]) => (
						<a
							key={href}
							href={href}
							className="flex flex-row items-center gap-1 font-semibold text-blue-600 hover:underline dark:text-blue-400"
							target="_blank"
						>
							{title} <IconExternalLink size={20} />
						</a>
					))}
				</div>
			)}
		</div>
	);
}