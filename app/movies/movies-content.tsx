"use client";

import { useState, useRef, useEffect } from "react";
import { OrbContainer, Orb } from "@/components/Orb";
import Image from "next/image";
import MovieMDX from "@/components/MovieMDX";
import allMovies from "@/lib/movies";

interface Movie {
	cover?: string;
	slug: string;
	coverAlt?: string;
}

const movies: Record<string, Movie> = {
	Sicario: {
		cover: "si.jpeg",
		coverAlt: "Sicario movie poster",
		slug: "sicario",
	},
	Interstellar: {
		cover: "interstellar.jpg",
		coverAlt: "Interstellar movie poster",
		slug: "interstellar",
	},
	"The Social Network": {
		cover: "social.jpeg",
		coverAlt: "The Social Network movie poster",
		slug: "social-network",
	},
	"The Town": {
		cover: "town.jpg",
		coverAlt: "The Social Network movie poster",
		slug: "the-town",
	},
	F1: {
		cover: "f1.webp",
		coverAlt: "F1 movie poster",
		slug: "f1",
	},
	"How to Sell Drugs Online Fast": {
		cover: "drug.jpg",
		coverAlt: "How to Sell Drugs Online Fast movie poster",
		slug: "drugs-online",
	},
	"Spy Game": {
		cover: "spy.jpg",
		coverAlt: "Spy Game movie poster",
		slug: "spy-game",
	},
	Yellowstone: {
		cover: "yellowstone.webp",
		coverAlt: "Yellowstone movie poster",
		slug: "yellowstone",
	},
	Inception: {
		cover: "inception.jpg",
		coverAlt: "Inception movie poster",
		slug: "inception",
	},
	Hero: {
		cover: "hero-2012.jpg",
		coverAlt: "Hero (2012) movie poster",
		slug: "hero",
	},
	"Back to the Future": {
		cover: "backtothefuture.jpeg",
		coverAlt: "Back to the Future movie poster",
		slug: "back-to-the-future",
	},
	RoboCop: {
		cover: "robo.jpg",
		coverAlt: "RoboCop movie poster",
		slug: "robocop",
	},
	"Jurassic Park": {
		cover: "ju.jpg",
		coverAlt: "Jurassic Park movie poster",
		slug: "jurassic-park",
	},
	"Inglorious Basterds": {
		cover: "ig.jpg",
		coverAlt: "Inglorious Basterds movie poster",
		slug: "inglourious-basterds",
	},
	"The Dark Knight": {
		cover: "tdk.jpg",
		coverAlt: "The Dark Knight movie poster",
		slug: "dark-knight",
	},
	Aliens: {
		cover: "aliens-1986.webp",
		coverAlt: "Aliens movie poster",
		slug: "aliens",
	},
	Succession: {
		cover: "succession.jpg",
		coverAlt: "Succession movie poster",
		slug: "succession",
	},
	"Blade Runner 2049": {
		cover: "2049.jpg",
		coverAlt: "Blade Runner 2049 movie poster",
		slug: "blade-runner-2049",
	},
	"Good Will Hunting": {
		cover: "good.jpg",
		coverAlt: "Good Will Hunting movie poster",
		slug: "good-will-hunting",
	},
	Sinner: {
		cover: "sin.png",
		coverAlt: "Interstellar movie poster",
		slug: "interstellar",
	},
	九品芝麻官: {
		cover: "hail.webp",
		coverAlt: "Good Will Hunting movie poster",
		slug: "good-will-hunting",
	},
};

const movieEntries = Object.entries(movies);

// Fake rating data for now (until content collections are built)
const fakeRatings: Record<string, number> = {
	"The Town": 8.1,
	Sicario: 8.2,
	Interstellar: 8.7,
	"The Social Network": 7.8,
	F1: 7.5,
	"How to Sell Drugs Online Fast": 7.2,
	"Spy Game": 7.0,
	Yellowstone: 8.0,
	Inception: 8.8,
	Hero: 7.3,
	"Back to the Future": 8.5,
	RoboCop: 7.4,
	"Jurassic Park": 8.1,
	"Inglorious Basterds": 8.3,
	"The Dark Knight": 9.0,
	Aliens: 8.4,
	Succession: 8.9,
	"Blade Runner 2049": 8.0,
	"Good Will Hunting": 8.0,
	Sinner: 8.7,
};

// Fake description data
const fakeDescriptions: Record<string, string> = {
	"The Town":
		"An exceptionally thrilling, well made crime drama that really works.",
	Sicario:
		"An idealistic FBI agent is enlisted by a government task force to aid in the war against drugs at the border between the U.S. and Mexico.",
	Interstellar:
		"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
	"The Social Network":
		"Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook.",
	F1: "A fictionalized account of the battles between Formula 1 drivers and their teams during the 2016 racing season.",
	"How to Sell Drugs Online Fast":
		"A teenager who starts an online drug business from his bedroom discovers just how quickly the business can grow.",
	"Spy Game":
		"A CIA operative about to retire mentors a rookie agent who's been targeted for assassination.",
	Yellowstone:
		"A drama series following the Dutton family, who controls the largest contiguous ranch in the United States.",
	Inception:
		"A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.",
	Hero: "A king must learn to use power responsibly.",
	"Back to the Future":
		"Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean.",
	RoboCop:
		"A police officer in futuristic Detroit is murdered and revived as a cyborg law enforcer.",
	"Jurassic Park":
		"A paleontologist and a paleobotanist are invited to preview a theme park populated by cloned dinosaurs.",
	"Inglorious Basterds":
		"In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans.",
	"The Dark Knight":
		"When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
	Aliens: "The planet from the first movie has been colonized, but contact is lost. A team of space Marines is sent to investigate.",
	Succession:
		"The Roy family is known for controlling the biggest media and entertainment company in the world. The series follows their drama and power struggles.",
	"Blade Runner 2049":
		"A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.",
	"Good Will Hunting":
		"Will Hunting, a janitor at M.I.T., has a gift for mathematics but needs help from a psychologist to find direction in his life.",
	Sinner: "An epic science fiction film about humanity's journey through space and time.",
	九品芝麻官: "星爺經典無需多言",
};

export function MoviesContent() {
	const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Check scroll position
	const checkScroll = () => {
		const container = scrollContainerRef.current;
		if (!container) return;

		setCanScrollLeft(container.scrollLeft > 0);
		setCanScrollRight(
			container.scrollLeft <
				container.scrollWidth - container.clientWidth,
		);
		setScrollProgress(
			container.scrollLeft /
				(container.scrollWidth - container.clientWidth || 1),
		);
	};

	// Scroll functions
	const scrollLeft = () => {
		const container = scrollContainerRef.current;
		if (!container) return;
		container.scrollBy({ left: -300, behavior: "smooth" });
	};

	const scrollRight = () => {
		const container = scrollContainerRef.current;
		if (!container) return;
		container.scrollBy({ left: 300, behavior: "smooth" });
	};

	// Update scroll state on scroll
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		// Reset scroll position to 0 on mount with a small delay
		setTimeout(() => {
			container.scrollLeft = 0;
		}, 100);

		const handleScroll = () => checkScroll();
		container.addEventListener("scroll", handleScroll);

		// Initial check
		checkScroll();

		// Recheck on window resize
		window.addEventListener("resize", checkScroll);

		return () => {
			container.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", checkScroll);
		};
	}, []);

	return (
		<>
			<OrbContainer>
				<Orb className="-top-20 right-0 bg-fuchsia-400/30 dark:bg-fuchsia-600/30" />
				<Orb className="right-86 top-40 bg-cyan-400/30 dark:bg-cyan-600/30" />
			</OrbContainer>

			<div
				className="mx-auto max-w-6xl px-4 pt-8"
				style={{ transition: "none !important" }}
			>
				{/* DVD Shelf Display */}
				<div
					className="relative"
					style={{
						minHeight: "10rem",
						transition: "none !important",
					}}
				>
					{/* Main shelf with spines */}
					<div
						className="dvd-row-static relative overflow-hidden rounded-2xl"
						style={{
							height: "11.5rem",
							minHeight: "11.5rem",
							maxHeight: "11.5rem",
							marginBottom: "1.5rem",
							transition: "none !important",
						}}
					>
						{/* Gradient shelf background - matches site design */}
						<div className="dvd-row-static absolute inset-0 bg-gradient-to-br from-violet-50/60 via-indigo-50/40 to-fuchsia-50/30 dark:from-violet-950/40 dark:via-indigo-950/30 dark:to-fuchsia-950/20" />

						{/* Left scroll button */}
						{canScrollLeft && (
							<button
								onClick={scrollLeft}
								className="dvd-row-static group absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200/50 bg-white/90 shadow-lg backdrop-blur-sm dark:border-violet-800/30 dark:bg-zinc-800/90"
								style={{ transition: "none !important" }}
								aria-label="Scroll left"
							>
								<svg
									className="dvd-row-static h-5 w-5 text-violet-600 dark:text-violet-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
						)}

						{/* Right scroll button */}
						{canScrollRight && (
							<button
								onClick={scrollRight}
								className="dvd-row-static group absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200/50 bg-white/90 shadow-lg backdrop-blur-sm dark:border-violet-800/30 dark:bg-zinc-800/90"
								style={{ transition: "none !important" }}
								aria-label="Scroll right"
							>
								<svg
									className="dvd-row-static h-5 w-5 text-violet-600 dark:text-violet-400"
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
							</button>
						)}

						{/* Movies row with scroll - COMPLETELY STATIC */}
						<div
							ref={scrollContainerRef}
							className="scrollbar-hide relative flex items-center gap-4 overflow-x-auto overflow-y-hidden"
							style={{
								scrollBehavior: "smooth",
								height: "11.5rem",
								minHeight: "11.5rem",
								maxHeight: "11.5rem",
								paddingTop: "1.5rem",
								paddingBottom: "1.5rem",
								paddingLeft: "2rem",
								paddingRight: "2rem",
								contain: "strict",
								position: "relative",
							}}
						>
							{movieEntries.map(([name, data], index) => (
								<DVDItem
									key={name}
									name={name}
									data={data}
									isFirst={index === 0}
									isSelected={selectedMovie === name}
									onClick={() => setSelectedMovie(name)}
								/>
							))}
						</div>

						{/* Scroll progress indicator */}
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-200/30 dark:bg-violet-800/20">
							<div
								className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 dark:from-violet-400 dark:to-indigo-400"
								style={{ width: `${scrollProgress * 100}%` }}
							/>
						</div>
					</div>

					{/* Full cover and description display below shelf */}
					<div className="mt-12 flex min-h-[400px] flex-col items-center justify-center px-4 pb-8">
						{selectedMovie ? (
							<div
								key={selectedMovie}
								className="flex w-full flex-col items-center gap-8 sm:w-auto"
							>
								{/* Full cover */}
								{movies[selectedMovie].cover && (
									<div className="group relative inline-block overflow-hidden rounded-xl border-4 border-white/50 bg-white shadow-2xl dark:border-zinc-700/50 dark:bg-zinc-900">
										<Image
											src={`/images/movies/${movies[selectedMovie].cover}`}
											alt={
												movies[selectedMovie]
													.coverAlt || selectedMovie
											}
											width={256}
											height={384}
											className="rounded-lg"
											sizes="(max-width: 256px) 100vw, 256px"
										/>
										{/* Glossy overlay effect */}
										<div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									</div>
								)}

								{/* Movie info */}
								<div className="max-w-2xl text-center">
									<h3 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
										{selectedMovie}
									</h3>

									{/* Beautiful star rating display */}
									{(() => {
										const rating =
											fakeRatings[selectedMovie] || 7.5;
										const starsOutOfFive = rating / 2;
										const fullStars =
											Math.floor(starsOutOfFive);
										const hasHalfStar =
											starsOutOfFive % 1 >= 0.5;

										return (
											<div className="mb-6 flex items-center justify-center gap-2">
												<div className="flex">
													{Array.from({
														length: fullStars,
													}).map((_, i) => (
														<svg
															key={`full-${i}`}
															className="h-8 w-8"
															viewBox="0 0 24 24"
															style={{
																filter: "drop-shadow(0 2px 4px rgb(251 191 36 / 0.3))",
															}}
														>
															<path
																d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
																fill="#fbbf24"
																stroke="#f59e0b"
																strokeWidth="0.5"
															/>
														</svg>
													))}
													{hasHalfStar && (
														<svg
															className="h-8 w-8"
															viewBox="0 0 24 24"
															style={{
																filter: "drop-shadow(0 2px 4px rgb(251 191 36 / 0.3))",
															}}
														>
															<defs>
																<linearGradient id="detail-half-star">
																	<stop
																		offset="50%"
																		stopColor="#fbbf24"
																	/>
																	<stop
																		offset="50%"
																		stopColor="rgb(212 212 212 / 0.3)"
																	/>
																</linearGradient>
															</defs>
															<path
																d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
																fill="url(#detail-half-star)"
																stroke="rgb(212 212 212 / 0.5)"
																strokeWidth="0.5"
															/>
														</svg>
													)}
													{Array.from({
														length:
															5 -
															fullStars -
															(hasHalfStar
																? 1
																: 0),
													}).map((_, i) => (
														<svg
															key={`empty-${i}`}
															className="h-8 w-8"
															viewBox="0 0 24 24"
														>
															<path
																d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
																fill="none"
																stroke="rgb(212 212 212 / 0.5)"
																strokeWidth="1"
															/>
														</svg>
													))}
												</div>
												<span className="text-2xl font-bold text-amber-400">
													{rating}/10
												</span>
											</div>
										);
									})()}

									{/* Rating and description */}
									<div className="space-y-4">
										{/* Description text - MDX rendered */}
										<div className="prose prose-zinc max-w-none text-left dark:prose-invert">
											<p>
												{fakeDescriptions[
													selectedMovie
												] ||
													"A compelling film that showcases powerful storytelling and memorable performances."}
											</p>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="flex flex-col items-center gap-4 text-zinc-400 dark:text-zinc-600">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
									<svg
										className="h-8 w-8"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
										/>
									</svg>
								</div>
								<p className="text-lg">
									Click a DVD to see details
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			<OrbContainer>
				<Orb className="-top-52 left-52 bg-emerald-400/30 dark:bg-emerald-600/30" />
			</OrbContainer>
		</>
	);
}

interface DVDItemProps {
	name: string;
	data: Movie;
	isSelected: boolean;
	isFirst?: boolean;
	onClick: () => void;
}

function DVDItem({
	name,
	data,
	isSelected,
	isFirst = false,
	onClick,
}: DVDItemProps) {
	const [isHovered, setIsHovered] = useState(false);
	const rating = fakeRatings[name] || 7.5;
	const starsOutOfFive = rating / 2;
	const fullStars = Math.floor(starsOutOfFive);
	const hasHalfStar = starsOutOfFive % 1 >= 0.5;

	return (
		<div
			style={{
				width: "3rem",
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				gap: "0.25rem",
				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "3rem",
					height: "9rem",
					overflow: "hidden",
					position: "relative",
				}}
			>
				<div
					style={{
						position: "absolute",
						inset: 0,
						display: "flex",
						cursor: "pointer",
						overflow: "hidden",
						borderRadius: "0.5rem",
						borderWidth: "2px",
						borderStyle: "solid",
						borderColor: isSelected
							? "rgb(139 92 246)"
							: isHovered
								? "rgb(129 140 248 / 0.8)"
								: "rgb(212 212 212 / 0.5)",
						backgroundColor: isSelected
							? "rgb(39 39 42 / 0.7)"
							: isHovered
								? "rgb(39 39 42 / 0.6)"
								: "rgb(39 39 42 / 0.5)",
						transition: "none",
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={onClick}
					onKeyPress={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							onClick();
						}
					}}
					role="button"
					tabIndex={0}
					aria-pressed={isSelected}
				>
					{/* Left half - cover image */}
					{data.cover && (
						<div
							style={{
								position: "relative",
								height: "100%",
								width: "50%",
								overflow: "hidden",
							}}
						>
							<Image
								src={`/images/movies/${data.cover}`}
								alt={data.coverAlt || name}
								fill
								style={{ objectFit: "cover" }}
								sizes="48px"
								priority
							/>
						</div>
					)}

					{/* Right half - title */}
					<div
						style={{
							display: "flex",
							height: "100%",
							width: "50%",
							alignItems: "center",
							justifyContent: "center",
							overflow: "hidden",
							background:
								"linear-gradient(135deg, rgb(76 29 149 / 0.95) 0%, rgb(55 48 163 / 0.95) 50%, rgb(30 27 75 / 0.95) 100%)",
							padding: "0.375rem",
						}}
					>
						<span
							style={{
								display: "block",
								userSelect: "none",
								textAlign: "center",
								fontSize: "11px",
								fontWeight: "bold",
								lineHeight: "1.25",
								color: "rgb(250 245 255)",
								writingMode: "vertical-rl",
								textOrientation: "mixed",
							}}
						>
							{name}
						</span>
					</div>

					{/* Static highlight overlay */}
					<div
						style={{
							position: "absolute",
							inset: 0,
							borderRadius: "0.5rem",
							background:
								"linear-gradient(to top, transparent, rgb(255 255 255 / 0.1))",
							opacity: 0.3,
							pointerEvents: "none",
						}}
					/>

					{/* Selected indicator */}
					{isSelected && (
						<div
							style={{
								position: "absolute",
								right: "0.25rem",
								top: "0.25rem",
								height: "0.5rem",
								width: "0.5rem",
								borderRadius: "9999px",
								backgroundColor: "rgb(139 92 246)",
								boxShadow:
									"0 10px 15px -3px rgb(139 92 246 / 0.5)",
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
