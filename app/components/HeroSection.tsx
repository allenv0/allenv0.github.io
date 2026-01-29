"use client";
import Image from "next/image";
import { OrbContainer, Orb } from "@/components/Orb";
import { DesktopIconRow } from "./DesktopIconRow";
import { MobileIconRoll } from "./MobileIconRoll";
import { siteConfig } from "@/config";

interface HeroSectionProps {
  macPosition: "center" | "top";
  showOrbit: boolean;
  onOrbitingImageClick?: (imageAlt: string) => void;
  onMacClick?: () => void;
}

const HeroSection = ({ macPosition, showOrbit, onOrbitingImageClick, onMacClick }: HeroSectionProps) => {
  return (
    <>
      <OrbContainer>
        <Orb className="-top-62 left-62 bg-purple-400/30 dark:bg-purple-600/30" />
      </OrbContainer>

      <div className={`relative flex justify-center ${macPosition === "center" ? "mb-4" : "mb-4"}`}>
        {/* Central mac image */}
        <div className="relative z-10">
          <Image
            src={siteConfig.centralImage.src}
            alt={siteConfig.centralImage.alt}
            width={siteConfig.centralImage.width}
            height={siteConfig.centralImage.height}
            className={`${macPosition === "center" ? "animate-float" : "animate-float"} ${onMacClick ? "cursor-pointer" : ""} md:scale-100 scale-[48%]`}
            priority
            onClick={onMacClick}
          />
        </div>
      </div>

      {/* Desktop icon row - visible on desktop/tablet */}
      <DesktopIconRow onImageClick={onOrbitingImageClick} />

      {/* Mobile icon roll - only visible on mobile, at bottom, with click handlers */}
      <MobileIconRoll onImageClick={onOrbitingImageClick} />

      {macPosition === "top" && (
        <div className="mx-auto max-w-[400px] space-y-2 text-center text-lg md:text-xl lg:text-xl"></div>
      )}
    </>
  );
};

export default HeroSection;