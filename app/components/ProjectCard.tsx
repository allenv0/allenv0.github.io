"use client";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { Project } from "@/config";

interface ProjectCardProps {
  project: [string, Project];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [name, data] = project;
  const isGif = data.cover?.endsWith(".gif");

  return (
    <div className="group overflow-hidden rounded-[46px] border-4 border-white/50 bg-white shadow-xl transition-all hover:shadow-md dark:border-zinc-800/50 dark:bg-zinc-900/50">
      {data.cover && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-[46px] bg-gray-100 dark:bg-zinc-800">
          <Image
            src={`/images/projects/${data.cover}`}
            alt={data.coverAlt || name}
            fill
            className="object-cover"
            unoptimized={isGif}
          />
        </div>
      )}
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-zinc-800">
            <Image
              src={
                name === "AirPosture"
                  ? "/images/projects/Air8.png"
                  : name === "YTTL"
                    ? "/images/projects/ht3.png"
                    : "/images/projects/ht3.png"
              }
              alt=""
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {name}
          </h3>
        </div>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {data.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(data.links || {}).map(([text, href]) => (
            <a
              key={text + href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-button flex items-center gap-1 px-3 py-1 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 md:px-5 md:py-1.5 md:text-sm ${
                text === " iOS App"
                  ? "scale-110 text-xs md:text-sm"
                  : text === " iOS Beta Link"
                    ? "text-[6px] md:text-xs"
                    : "text-xs md:text-sm"
              }`}
            >
              {text}
              <IconArrowRight className="ml-0.5" size={12} />
            </a>
          ))}
          {Object.keys(data.links || {}).length === 0 && (
            <span className="glass-button flex items-center gap-1 px-3 py-1 text-[8px] font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 md:px-5 md:py-1.5 md:text-xs">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;