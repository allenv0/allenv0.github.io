"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { orbitingImages } from "@/config";

interface MobileIconRollProps {
	onImageClick?: (imageAlt: string) => void;
}

export function MobileIconRoll({ onImageClick }: MobileIconRollProps) {
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
		container.scrollBy({ left: -200, behavior: "smooth" });
	};

	const scrollRight = () => {
		const container = scrollContainerRef.current;
		if (!container) return;
		container.scrollBy({ left: 200, behavior: "smooth" });
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
		<div className="relative w-full max-w-md px-4 sm:hidden">
			{/* Icon roll container */}
			<div
				className="relative overflow-hidden rounded-2xl"
				style={{
					minHeight: "6rem",
					marginBottom: "1rem",
				}}
			>
				{/* Gradient background */}
				<div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 via-indigo-50/40 to-fuchsia-50/30 dark:from-violet-950/40 dark:via-indigo-950/30 dark:to-fuchsia-950/20" />

				{/* Left scroll button */}
				{canScrollLeft && (
					<button
						onClick={scrollLeft}
						className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200/50 bg-white/90 shadow-lg backdrop-blur-sm dark:border-violet-800/30 dark:bg-zinc-800/90"
						aria-label="Scroll left"
					>
						<svg
							className="h-4 w-4 text-violet-600 dark:text-violet-400"
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
						className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200/50 bg-white/90 shadow-lg backdrop-blur-sm dark:border-violet-800/30 dark:bg-zinc-800/90"
						aria-label="Scroll right"
					>
						<svg
							className="h-4 w-4 text-violet-600 dark:text-violet-400"
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

				{/* Icons row with scroll */}
				<div
					ref={scrollContainerRef}
					className="scrollbar-hide relative flex items-center gap-4 overflow-x-auto overflow-y-hidden"
					style={{
						scrollBehavior: "smooth",
						height: "6rem",
						minHeight: "6rem",
						maxHeight: "6rem",
						paddingTop: "1rem",
						paddingBottom: "1rem",
						paddingLeft: "1.5rem",
						paddingRight: "1.5rem",
					}}
				>
					{orbitingImages.map(({ image, alt }) => (
						<IconItem
							key={alt}
							image={image}
							alt={alt}
							onClick={() => onImageClick?.(alt)}
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
		</div>
	);
}

interface IconItemProps {
	image: string;
	alt: string;
	onClick: () => void;
}

function IconItem({ image, alt, onClick }: IconItemProps) {
	const [isPressed, setIsPressed] = useState(false);

	return (
		<div
			style={{
				width: "3.5rem",
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				gap: "0.25rem",
				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "3.5rem",
					height: "3.5rem",
					overflow: "hidden",
					position: "relative",
				}}
			>
				<button
					style={{
						position: "absolute",
						inset: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
						borderRadius: "0.75rem",
						borderWidth: "2px",
						borderStyle: "solid",
						borderColor: isPressed
							? "rgb(139 92 246)"
							: "rgb(212 212 212 / 0.5)",
						backgroundColor: isPressed
							? "rgb(39 39 42 / 0.7)"
							: "rgb(39 39 42 / 0.5)",
						transition: "background-color 0.15s ease, border-color 0.15s ease",
						cursor: "pointer",
					}}
					onMouseDown={() => setIsPressed(true)}
					onMouseUp={() => setIsPressed(false)}
					onMouseLeave={() => setIsPressed(false)}
					onTouchStart={() => setIsPressed(true)}
					onTouchEnd={() => setIsPressed(false)}
					onClick={onClick}
					aria-label={alt}
				>
					<Image
						src={image}
						alt={alt}
						width={48}
						height={48}
						style={{
							objectFit: "cover",
							width: "100%",
							height: "100%",
						}}
						sizes="48px"
						priority
					/>
				</button>
			</div>
		</div>
	);
}
