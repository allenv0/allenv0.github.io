"use client";
import Image from "next/image";
import { OrbContainer, Orb } from "@/components/Orb";
import OrbitingImages from "./OrbitingImages";
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

      <div className={`relative flex justify-center ${macPosition === "center" ? "mb-4 mt-[20vh]" : "mb-4"}`}>
        {/* Orbiting images */}
        <OrbitingImages isVisible={showOrbit} onImageClick={onOrbitingImageClick} />

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

      {macPosition === "top" && (
        <div className="mx-auto max-w-[400px] space-y-2 text-center text-lg md:text-xl lg:text-xl"></div>
      )}
    </>
  );
};

export default HeroSection;