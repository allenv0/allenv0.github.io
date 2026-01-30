"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "./components/HeroSection";
import ProjectShowcase from "./components/ProjectShowcase";
import SocialButtons from "./components/SocialButtons";
import StyledStrong from "./components/StyledStrong";
import { CraftyNotification } from "./components/CraftyNotification";

export default function Page() {
	const [showProjectCards, setShowProjectCards] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const [macPosition, setMacPosition] = useState<"center" | "top">("center");
	const [showEmailNotification, setShowEmailNotification] = useState(false);
	const [showOrbit, setShowOrbit] = useState(true);
	const router = useRouter();

	const handleOrbitingImageClick = (imageAlt: string) => {
		// Check if the clicked image is Air8 or AL or tt or Movies
		if (imageAlt === "Air8") {
			// Navigate to AirPosture website
			window.open("https://www.airposture.pro/", "_blank");
		} else if (imageAlt === "AL") {
			// Navigate to Horus website
			window.open("https://www.instagram.com/allen.35mm/", "_blank");
		} else if (imageAlt === "TT") {
			// Navigate to blog page
			router.push("/blog");
		} else if (imageAlt === "Movies") {
			// Navigate to movies page
			router.push("/movies");
		}

		// Navigate to GitHub profile
		else if (imageAlt === "GitHub") {
			window.open("https://github.com/allenv0", "_blank");
		}
		// Navigate to X/Twitter profile
		else if (imageAlt === "Ale Dev") {
			window.open("https://x.com/allenleexyz", "_blank");
		}
		// Copy email to clipboard
		else if (imageAlt === "LAM") {
			const copyEmail = async () => {
				try {
					await navigator.clipboard.writeText(
						"allenleexyz@gmail.com",
					);
					console.log("Email copied to clipboard!");
					setShowEmailNotification(true);
				} catch (err) {
					// Fallback for older browsers
					const textArea = document.createElement("textarea");
					textArea.value = "allenleexyz@gmail.com";
					document.body.appendChild(textArea);
					textArea.select();
					document.execCommand("copy");
					document.body.removeChild(textArea);
					console.log("Email copied to clipboard!");
					setShowEmailNotification(true);
				}
			};
			copyEmail();
		}
		// Navigate to SoundCloud track
		else if (imageAlt === "Lemotsh") {
			window.open(
				"https://www.youtube.com/watch?v=UL-sRoVO7dY",
				"_blank",
			);
		}
	};

	const handleMacClick = () => {
		// Toggle orbit visibility when mac is clicked
		setShowOrbit((prev) => !prev);

		// Only allow folding back if UI is currently expanded
		if (showProjectCards || showButtons) {
			setShowProjectCards(false);
			setShowButtons(false);
			setMacPosition("center"); // Move mac back to center
		}
	};

	return (
		<>
			<HeroSection
				macPosition={macPosition}
				showOrbit={showOrbit}
				onOrbitingImageClick={handleOrbitingImageClick}
				onMacClick={handleMacClick}
			/>
			<ProjectShowcase show={showProjectCards} />
			<SocialButtons show={showButtons} />
			<CraftyNotification
				show={showEmailNotification}
				onHide={() => setShowEmailNotification(false)}
			/>
		</>
	);
}
