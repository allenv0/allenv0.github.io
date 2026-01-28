"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { orbitingImages } from "@/config";

interface OrbitingImagesProps {
	isVisible: boolean;
	onImageClick?: (imageAlt: string) => void;
}

const OrbitingImages = ({ isVisible, onImageClick }: OrbitingImagesProps) => {
	const [rotation, setRotation] = useState(0);
	const [orbitRadius, setOrbitRadius] = useState(200);
	const [imageSize, setImageSize] = useState(80);
	const [isMobile, setIsMobile] = useState(false);
	const animationFrameRef = useRef<number>();
	const lastTimeRef = useRef<number>(0);
	const timeRef = useRef<number>(0);

	// Responsive orbit radius and image size
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 640;
			setIsMobile(mobile);

			if (mobile) {
				setOrbitRadius(166); // 144 * 1.15 = 165.6 ≈ 166
				setImageSize(45); // 50 * 0.9 = 45 (10% smaller)
			} else if (window.innerWidth < 768) {
				setOrbitRadius(207); // 180 * 1.15 = 207
				setImageSize(63); // 70 * 0.9 = 63 (10% smaller)
			} else {
				setOrbitRadius(276); // 240 * 1.15 = 276
				setImageSize(72); // 80 * 0.9 = 72 (10% smaller)
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Enhanced easing function for smooth acceleration/deceleration
	const easeInOutSine = (t: number): number => {
		return -(Math.cos(Math.PI * t) - 1) / 2;
	};

	// Optimized animation using requestAnimationFrame with variable speeds and easing
	useEffect(() => {
		if (!isVisible) return;

		const animate = (currentTime: number) => {
			if (!lastTimeRef.current) {
				lastTimeRef.current = currentTime;
				timeRef.current = 0;
			}

			const deltaTime = currentTime - lastTimeRef.current;
			timeRef.current += deltaTime;

			if (deltaTime >= (isMobile ? 32 : 50)) {
				// ~30fps on mobile, ~20fps on desktop
				// Variable base rotation speed with time-based easing
				const baseSpeed = isMobile ? 0.05 : 0.12;
				const easedSpeed =
					baseSpeed * (1 + Math.sin(timeRef.current * 0.001) * 0.3);
				setRotation((prev) => (prev + easedSpeed) % 360);
				lastTimeRef.current = currentTime;
			}

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isVisible, isMobile]);

	// Enhanced position calculations with visual effects
	const positions = useMemo(() => {
		return orbitingImages.map(
			({
				angle,
				image,
				alt,
				speedMultiplier,
				orbitRadiusMultiplier,
				scaleRange,
				opacityRange,
				rotationSpeed,
				orbitOffset,
			}) => {
				// Variable rotation with individual speed multipliers
				const adjustedRotation =
					rotation * speedMultiplier + orbitOffset;
				const radians = ((angle + adjustedRotation) * Math.PI) / 180;

				// Variable orbit radius for depth perception
				const adjustedOrbitRadius = orbitRadius * orbitRadiusMultiplier;
				const x = Math.cos(radians) * adjustedOrbitRadius;
				const y = Math.sin(radians) * adjustedOrbitRadius;

				// Enhanced visual effects calculations
				const normalizedPosition = (adjustedRotation % 360) / 360;

				// Use the scale range from configuration - calculate based on position
				const [minScale, maxScale] = scaleRange;
				const currentScale = minScale + (maxScale - minScale) * 0.5; // Use middle value of scale range

				// Full opacity - no transparency variations
				const currentOpacity = 1.0;

				// Individual icon rotation
				const iconRotation = adjustedRotation * rotationSpeed;

				// Z-index for layering (icons at top appear in front)
				const zIndex = Math.floor(y + adjustedOrbitRadius);

				return {
					key: alt,
					image,
					alt,
					scale: currentScale,
					opacity: currentOpacity,
					iconRotation,
					zIndex,
					style: {
						transform: `
            translate(${x + orbitRadius - imageSize / 2}px, ${y + orbitRadius - imageSize / 2}px)
            scale(${currentScale})
            rotate(${iconRotation}deg)
          `,
						left: 0,
						top: 0,
						zIndex,
						transition: "none", // Disable CSS transitions for smooth JS animation
					},
					x,
					y,
				};
			},
		);
	}, [rotation, orbitRadius, imageSize]);

	const handleImageClick = (imageAlt: string) => {
		if (onImageClick) {
			onImageClick(imageAlt);
		}
	};

	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<div
				className="relative"
				style={{
					width: `${orbitRadius * 2}px`,
					height: `${orbitRadius * 2}px`,
					willChange: "transform", // Hardware acceleration hint
				}}
			>
				{isVisible &&
					positions.map(({ key, image, alt, style, scale, iconRotation }) => (
						<div key={key} className="absolute" style={style}>
							<Image
								src={image}
								alt={alt}
								width={imageSize}
								height={imageSize}
								className={`rounded-lg ${onImageClick ? "cursor-pointer transition-transform hover:scale-105" : ""}`}
								loading="eager"
								priority
								onClick={() => handleImageClick(alt)}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default OrbitingImages;
