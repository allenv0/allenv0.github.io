"use client";
import { socialLinks } from "@/config";
import Link from "next/link";

interface SocialButtonsProps {
  show?: boolean;
}

const SocialButtons = ({ show = false }: SocialButtonsProps) => {
  if (!show) return null;

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-4">
      {socialLinks.map((link) => {
        const IconComponent = link.icon;
        const isExternal = link.href.startsWith('http');

        return (
          <Link
            key={link.name}
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="glass-button flex items-center gap-1 px-3 py-1 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 md:px-5 md:py-1.5 md:text-sm"
          >
            <IconComponent
              size={12}
              className="flex-shrink-0 opacity-100"
            />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SocialButtons;