import Image from "next/image";
import { OrbContainer, Orb } from "@/components/Orb";
import { IconArrowRight } from "@tabler/icons-react";
import mergeMetadata from "@/lib/mergeMetadata";

export const metadata = mergeMetadata({
	title: "Resume",
	description: "Allen Lee's CV",
});

export default function Page() {
	const projectEntries = Object.entries(projects);

	return (
		<>
			<OrbContainer>
				<Orb className="-top-20 right-0 bg-fuchsia-400/30 dark:bg-fuchsia-600/30" />
				<Orb className="right-86 top-40 bg-cyan-400/30 dark:bg-cyan-600/30" />
			</OrbContainer>

			<div className="flex flex-col items-center">
				<div className="overflow-hidden rounded-[22px] border-2 border-gray-500 bg-neutral-100/30 backdrop-blur dark:border-zinc-800">
					<Image
						src="/images/projects/ale.png"
						alt="Avatar"
						width={200}
						height={200}
						className="object-cover"
					/>
				</div>

				<h1 className="mt-8 text-4xl font-bold">Allen Lee</h1>

				<ul className="mt-6 list-disc pl-3">
					<p>
						Hi, I'm Allen Lee — a generalist engineer,
						interpretability researcher and ex-founder with
						experience in AI, consumer apps. I've led product & ai
						teams at Condé Nast and founded multiple consumer
						companies. I also contribute to open source projects
						sometimes.
					</p>
				</ul>

				<ul className="mt-6 list-disc pl-6">
					<li>Now: AirPosture (viral ai app)</li>
					<li>2024 - 2025: ai drone project for Taiwan gov</li>
					<li>2022 — 2023: CEO & Cofounder at Miurror</li>
					<li>2019 — 2020: Founder of Too Early (acq.)</li>
					<li>
						2017 — 2018 Interim product & AI engineering director /
						advisor to the CEO at Condé Nast International
					</li>
					<li>
						2015 — 2017 Led Al Engineering & Growth at Mobiusbobs
						(Pamily: reached 500M+ views globally)
					</li>
					<li>2013 — 2015 CTO & Cofounder at R42 Robotics</li>
					<li>
						2010 — 2012 Chief security staff to the commander of Air
						Force of Taiwan
					</li>
				</ul>
				<ul className="mt-6 list-disc pl-6">
					<p>Email: allenleexyz@gmail.com</p>
				</ul>
			</div>

			<h1 className="mt-8 text-2xl font-bold"></h1>

			<h2 className="mb-8 text-3xl font-extrabold md:text-4xl">
				Building
			</h2>

			<div className="relative z-10 grid grid-cols-1 gap-6 overflow-visible md:grid-cols-2 lg:grid-cols-2">
				{projectEntries.map(([name, data]) => (
					<ProjectCard key={name} name={name} data={data} />
				))}
			</div>

			<OrbContainer>
				<Orb className="-top-52 left-52 bg-emerald-400/30 dark:bg-emerald-600/30" />
			</OrbContainer>
		</>
	);
}

interface Project {
	cover?: string;
	coverAlt?: string;
	noCrop?: boolean;
	description: string;
	links?: Record<string, string>;
}

const projects: Record<string, Project> = {
	AirPosture: {
		cover: "air-ban.png",
		coverAlt: "Quoter's logo, a speech bubble with three dots inside.",
		description: "AirPods as AI Posture Coach",
		links: {
			iOS: "https://www.airposture.pro/",
		},
	},
	"Past Projects / Inc": {
		description: "",
		noCrop: true,
	},
	Horus: {
		cover: "2048.png",
		coverAlt: "Quoter's logo, a speech bubble with three dots inside.",
		description: "(2025-paused) Visual Context Engine for Claude Code",
		links: {
			Website: "https://horuscli.vercel.app/",
		},
	},
	YTTL: {
		cover: "New-yttl.gif",
		coverAlt: "Quoter's logo, a speech bubble with three dots inside.",
		description:
			"(2024) Perplexity for YouTube lists (Paused due to YT's parsing policy)",
		links: {
			"CLI Source Code": "https://github.com/allenv0/YTTL-TUI",
		},
	},

	Pensieve: {
		cover: "pensieve.gif",
		coverAlt:
			"A text input that says 'Ask me anything' with a submit button.",
		description: "(2023) OpenAI-CLIP-based photo search on macOS",
		links: {},
	},
	"Miurror iOS": {
		cover: "miudemo.gif",
		coverAlt:
			"A text input that says 'Ask me anything' with a submit button.",
		description:
			"(2022) A messenger app that shows you the facial reactions of your friends in virtual avatars when they read/reply to your message",
		links: {
			"Demo & Deck": "https://www.allenleee.com/blog/miurror",
		},
	},
	"Homie iOS Widget": {
		cover: "homie.jpeg",
		coverAlt:
			"A text input that says 'Ask me anything' with a submit button.",
		description: "(2023) iMessage/Call your homie on iPhone homescreen",
		links: {
			Demo: "https://player.vimeo.com/video/841198005?h=8c9e772448",
		},
	},
	"Pamily (Mobiusbobs)": {
		cover: "pamily.jpeg",
		coverAlt:
			"Most followed vc publication on Medium (beat a16z, Sequoia, Accel, Lightspeed…)",
		description:
			"Tiktok for Pets before Tiktok was a thing. Reached 500M+ views globally. Funded by YouTube cofounder. (failed)",
		links: {},
	},
	"Too Early": {
		cover: "77.png",
		coverAlt:
			"Most followed vc publication on Medium (beat a16z, Sequoia, Accel, Lightspeed…)",
		description:
			"(2020 sold to 7 Ventures) The most followed vc publication on Medium (beat a16z, Sequoia, Accel, Lightspeed…)",
		links: {},
	},
	"Brains (IPFS-Based Digital Brains Network)": {
		cover: "brains.gif",
		coverAlt:
			"Most followed vc publication on Medium (beat a16z, Sequoia, Accel, Lightspeed…)",
		description:
			"(Archived in 2020) Inspired by Ghost in the Shell (攻殻機動隊 シェルのゴースト), I believe the future of collective intelligence is a composable knowledge base network. (community fork)",
		links: {
			Forks: "https://github.com/search?q=brains+allenlee&type=code",
		},
	},
	"Project X": {
		cover: "drone.jpeg",
		coverAlt:
			"A text input that says 'Ask me anything' with a submit button.",
		description: "(2014) Swarm drones near Taipei 101",
		links: {
			Video: "https://vimeo.com/111901733",
		},
	},
	Batdrone: {
		cover: "droneg0v.jpeg",
		coverAlt:
			"A text input that says 'Ask me anything' with a submit button.",
		description: "(2014) G0V Hacking Conference demo with Milu and Kevin",
		links: {
			HackPad: "https://g0v.hackpad.tw/BatDrone--BB8UPY6SPCD",
		},
	},
	"Arch Lab": {
		cover: "archi.png",
		coverAlt:
			"A text input that says 'Ask me anything' with a submit button.",
		description: "(2010-2013) Pre-2010 EDM Production Studio",
		links: {
			Tracks: "https://soundcloud.com/archilab",
		},
	},
	"Logo Designs": {
		cover: "logos.png",
		coverAlt:
			"A text input that says 'Ask me anything' with a submit button.",
		description: "(2013-Now)iOS/macOS App logo design",
		links: {
			"View Gallery": "/icons",
		},
	},
};

interface ProjectCardProps {
	name: string;
	data: Project;
}

function ProjectCard({ name, data }: ProjectCardProps) {
	if (name === "Past Projects / Inc") {
		return (
			<div className="col-span-full mb-4 mt-8 px-4">
				<h2 className="text-2xl font-extrabold md:text-3xl lg:text-4xl">
					{name}
				</h2>
			</div>
		);
	}

	return (
		<div className="group overflow-hidden rounded-[46px] border-4 border-white/50 bg-white shadow-xl transition-all hover:shadow-md dark:border-zinc-800/50 dark:bg-zinc-900/50">
			{data.cover && data.coverAlt && (
				<div className="relative h-48 w-full overflow-hidden rounded-t-[46px] bg-gray-100 dark:bg-zinc-800">
					<Image
						alt={data.coverAlt}
						src={"/images/projects/" + data.cover}
						fill
						className={
							data.noCrop ? "object-contain" : "object-cover"
						}
						sizes="(max-width:768px) 100vw, 470px"
					/>
				</div>
			)}

			<div className="p-6">
				<h1 className="text-2xl font-bold">{name}</h1>
				<p className="prose mt-2 grow dark:prose-invert">
					{data.description}
				</p>

				{data.links && (
					<div className="mt-4 flex flex-wrap gap-2">
						{Object.entries(data.links).map(([title, href]) => {
							const isInternal = href.startsWith("/");
							return (
								<a
									key={href}
									href={href}
									target={isInternal ? undefined : "_blank"}
									className="glass-button flex items-center gap-1 px-3 py-1 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 md:px-5 md:py-1.5 md:text-sm"
								>
									{title}
									<IconArrowRight
										className="ml-0.5"
										size={12}
									/>
								</a>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
