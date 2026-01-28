"use client";
import Link from "next/link";
import { IconBrandGithub, IconBrandX, IconMail, IconBrandInstagram, IconBook, IconHeadphones } from "@tabler/icons-react";

interface HyperlinkButtonsProps {
  show?: boolean;
}

const HyperlinkButtons = ({ show = false }: HyperlinkButtonsProps) => {
  if (!show) return null;

  const links = [
    {
      name: 'github',
      href: 'https://github.com/allenv0',
      icon: IconBrandGithub,
      label: 'GitHub'
    },
    {
      name: 'twitter',
      href: 'https://x.com/allenleexyz',
      icon: IconBrandX,
      label: 'Twitter'
    },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/allen.35mm/',
      icon: IconBrandInstagram,
      label: 'Instagram'
    },
    {
      name: 'airposture',
      href: 'https://www.airposture.pro/',
      icon: IconHeadphones,
      label: 'AirPosture'
    },
    {
      name: 'blog',
      href: '/blog',
      icon: IconBook,
      label: 'Blog'
    },
    {
      name: 'email',
      href: 'mailto:allenleexyz@gmail.com',
      icon: IconMail,
      label: 'Email'
    }
  ];

  return (
    <div className="animate-fade-in fixed left-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3">
      {links.map((link) => {
        const IconComponent = link.icon;
        const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:');

        return (
          <Link
            key={link.name}
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="glass-button flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 md:px-4 md:py-2.5 md:text-base shadow-lg"
            title={link.label}
          >
            <IconComponent
              size={18}
              className="flex-shrink-0 opacity-100"
            />
            <span className="hidden md:inline">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default HyperlinkButtons;