"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CraftyNotificationProps {
	show: boolean;
	onHide: () => void;
}

export function CraftyNotification({ show, onHide }: CraftyNotificationProps) {
	const [copiedText, setCopiedText] = useState("allenleexyz@gmail.com");
	const [bubbles, setBubbles] = useState<
		{
			id: number;
			size: number;
			left: number;
			delay: number;
			duration: number;
		}[]
	>([]);

	// Generate random bubbles for liquid effect
	useEffect(() => {
		if (show) {
			const newBubbles = Array.from({ length: 15 }, (_, i) => ({
				id: i,
				size: Math.random() * 20 + 10,
				left: Math.random() * 100,
				delay: Math.random() * 2,
				duration: Math.random() * 4 + 2,
			}));
			setBubbles(newBubbles);

			const timer = setTimeout(() => {
				onHide();
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [show, onHide]);

	if (!show) return null;

	return (
		<div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
			{/* Liquid background with animated blobs */}
			<div className="absolute inset-0 overflow-hidden rounded-3xl">
				{bubbles.map((bubble) => (
					<div
						key={bubble.id}
						className="animate-float-up absolute rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl"
						style={{
							width: `${bubble.size}px`,
							height: `${bubble.size}px`,
							left: `${bubble.left}%`,
							bottom: "-10%",
							animationDelay: `${bubble.delay}s`,
							animationDuration: `${bubble.duration}s`,
						}}
					/>
				))}
			</div>

			{/* Main liquid glass container */}
			<div className="relative transform overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 shadow-2xl backdrop-blur-xl">
				{/* Animated liquid gradient overlay */}
				<div className="absolute inset-0 opacity-30"></div>

				{/* Glass shine effect */}
				<div className="absolute left-0 top-0 h-32 w-24 -translate-x-1/2 -translate-y-1/2 rotate-12 transform rounded-full bg-white/30 blur-xl"></div>
				<div className="absolute bottom-0 right-0 h-32 w-24 translate-x-1/2 translate-y-1/2 rotate-12 transform rounded-full bg-white/20 blur-xl"></div>

				{/* Content container */}
				<div className="relative p-8">
					{/* Liquid icon container */}
					<div className="mb-4 flex justify-center">
						<div className="relative h-16 w-16">
							{/* Liquid background for icon */}
							<div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 blur-lg"></div>

							{/* Glass morphism container for icon */}
							<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-gray-600/50 bg-gradient-to-br from-gray-700/30 to-gray-900/30 shadow-xl backdrop-blur-md">
								<Image
									src="/images/projects/al.png"
									alt="AL"
									fill
									className="object-contain p-1"
								/>
							</div>

							{/* Floating droplets around icon */}
							<div className="absolute -left-2 -top-2 h-3 w-3 animate-bounce rounded-full bg-blue-300/60 blur-sm"></div>
							<div className="absolute -bottom-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-purple-300/60 blur-sm"></div>
							<div className="absolute -right-2 top-0 h-2 w-2 animate-ping rounded-full bg-cyan-300/60 blur-sm"></div>
						</div>
					</div>

					{/* Text content with glass effect */}
					<div className="text-center">
						<h3 className="mb-2 bg-gradient-to-r from-white/95 to-gray-300 bg-clip-text text-2xl font-bold text-transparent drop-shadow-lg">
							Email Copied!
						</h3>
						<p className="text-sm font-medium text-gray-300">
							{copiedText}
						</p>
					</div>

					{/* Liquid droplets at the bottom */}
					<div className="mt-6 flex justify-center gap-2">
						<div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 blur-sm"></div>
						<div
							className="h-4 w-4 animate-bounce rounded-full bg-gradient-to-r from-purple-400/50 to-pink-400/50 blur-sm"
							style={{ animationDelay: "0.2s" }}
						></div>
						<div
							className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-cyan-400/50 to-blue-400/50 blur-sm"
							style={{ animationDelay: "0.4s" }}
						></div>
					</div>
				</div>

				{/* Liquid glass edge effect */}
				<div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/30 to-transparent blur-md"></div>
			</div>

			<style jsx>{`
				@keyframes float-up {
					0% {
						transform: translateY(0) rotate(0deg);
						opacity: 0;
					}
					10% {
						opacity: 0.7;
					}
					90% {
						opacity: 0.7;
					}
					100% {
						transform: translateY(-300px) rotate(360deg);
						opacity: 0;
					}
				}

				.animate-float-up {
					animation: float-up linear infinite;
				}
			`}</style>
		</div>
	);
}
