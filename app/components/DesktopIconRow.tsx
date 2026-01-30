"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { orbitingImages } from "@/config";

interface DesktopIconRowProps {
	onImageClick?: (imageAlt: string) => void;
}

export function DesktopIconRow({ onImageClick }: DesktopIconRowProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [scrollProgress, setScrollProgress] = useState(0);

	const handleIconClick = (alt: string) => {
		if (alt === "Movies") {
			router.push("/movies");
		} else {
			onImageClick?.(alt);
		}
	};

	// Track scroll progress
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const progress =
				container.scrollLeft /
				(container.scrollWidth - container.clientWidth || 1);
			setScrollProgress(progress);
		};

		container.addEventListener("scroll", handleScroll);

		// Initial check
		handleScroll();

		// Recheck on window resize
		window.addEventListener("resize", handleScroll);

		return () => {
			container.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

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
						const desiredOrder = ["TT", "Air8", "LAM", "Movies", "AL", "GitHub", "Ale Dev"];

						// Create a map for quick lookup
						const imageMap = new Map(
							orbitingImages.map(item => [item.alt, item])
						);

						// Return items in the desired order
						return desiredOrder
							.filter(alt => imageMap.has(alt))
							.map(alt => imageMap.get(alt)!)
							.map(({ image, alt }) => (
								<DesktopIconItem
									key={alt}
									image={image}
									alt={alt}
									onClick={() => handleIconClick(alt)}
								/>
							));
					})()}
				</div>

				{/* Scroll progress indicator */}
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-200/30 dark:bg-violet-800/20">
					<div
						className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 dark:from-violet-400 dark:to-indigo-400"
						style={{ width: `${scrollProgress * 100}%` }}
					/>
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
				className="overflow-hidden rounded-2xl border-2 border-zinc-300/50 bg-transparent transition-all duration-300 hover:border-violet-400/80 hover:bg-zinc-800/70 hover:scale-110 hover:shadow-xl hover:shadow-violet-500/20 dark:border-zinc-600/50 dark:hover:border-violet-400/60"
				style={{
					width: "5rem",
					height: "5rem",
					position: "relative",
				}}
			>
				<Image
					src={image}
					alt={alt}
					fill
					className="object-cover transition-transform duration-300 hover:scale-110"
					sizes="80px"
					priority
				/>
				<button
					onClick={onClick}
					className="absolute inset-0 z-10"
					aria-label={alt}
				/>
			</div>
		</div>
	);
}
