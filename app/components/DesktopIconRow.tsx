"use client";

import { useRef } from "react";
import Image from "next/image";
import { orbitingImages } from "@/config";

interface DesktopIconRowProps {
	onImageClick?: (imageAlt: string) => void;
}

export function DesktopIconRow({ onImageClick }: DesktopIconRowProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	return (
		<div className="relative w-full max-w-3xl px-4 hidden md:block">
			{/* Icon row container */}
			<div
				className="relative overflow-hidden rounded-3xl"
				style={{
					minHeight: "5.6rem",
					marginTop: "2rem",
					marginBottom: "1rem",
				}}
			>
				{/* Gradient background */}
				<div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-indigo-50/60 to-fuchsia-50/50 dark:from-violet-950/60 dark:via-indigo-950/50 dark:to-fuchsia-950/40 shadow-xl" />

				{/* Icons row with auto-scroll */}
				<div
					ref={scrollContainerRef}
					className="scrollbar-hide relative flex items-center gap-6 overflow-x-auto overflow-y-hidden"
					style={{
						height: "5.6rem",
						minHeight: "5.6rem",
						maxHeight: "5.6rem",
						paddingTop: "1rem",
						paddingBottom: "1rem",
						paddingLeft: "2rem",
						paddingRight: "2rem",
					}}
				>
					{(() => {
						// Define the desired order
						const desiredOrder = ["Air8", "AL", "TT", "LAM", "GitHub", "Ale Dev"];

						// Create a map for quick lookup
						const imageMap = new Map(
							orbitingImages.map(item => [item.alt, item])
						);

						// Return items in the desired order, filtering out Lemotsh and Movies
						return desiredOrder
							.filter(alt => imageMap.has(alt))
							.map(alt => imageMap.get(alt)!)
							.map(({ image, alt }) => (
								<DesktopIconItem
									key={alt}
									image={image}
									alt={alt}
									onClick={() => onImageClick?.(alt)}
								/>
							));
					})()}
				</div>

				{/* Scroll progress indicator */}
				<div className="absolute bottom-0 left-0 right-0 h-1.5 bg-violet-200/40 dark:bg-violet-800/30">
					<div className="h-full w-full bg-gradient-to-r from-violet-500 to-indigo-500 animate-pulse dark:from-violet-400 dark:to-indigo-400" />
				</div>
			</div>
		</div>
	);
}

interface DesktopIconItemProps {
	image: string;
	alt: string;
	onClick: () => void;
}

function DesktopIconItem({ image, alt, onClick }: DesktopIconItemProps) {
	return (
		<div
			style={{
				width: "5rem",
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				gap: "0.5rem",
				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "5rem",
					height: "5rem",
					overflow: "hidden",
					position: "relative",
				}}
			>
				<button
					onClick={onClick}
					className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-zinc-300/50 bg-zinc-900/50 transition-all duration-300 hover:border-violet-400/80 hover:bg-zinc-800/70 hover:scale-110 hover:shadow-xl hover:shadow-violet-500/20 dark:border-zinc-600/50 dark:hover:border-violet-400/60"
					aria-label={alt}
				>
					<Image
						src={image}
						alt={alt}
						width={64}
						height={64}
						className="transition-transform duration-300 group-hover:scale-110"
						style={{
							objectFit: "cover",
						}}
						sizes="64px"
						priority
					/>
					{/* Hover glow effect */}
					<div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-500/0 via-violet-500/0 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:from-violet-500/10 group-hover:via-violet-500/5 group-hover:to-violet-500/0 group-hover:opacity-100" />
				</button>
			</div>
		</div>
	);
}
