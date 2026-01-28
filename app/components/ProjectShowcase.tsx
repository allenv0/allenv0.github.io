"use client";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/config";

interface ProjectShowcaseProps {
  show?: boolean;
}

const ProjectShowcase = ({ show = false }: ProjectShowcaseProps) => {
  if (!show) return null;

  return (
    <div className="mx-auto mt-8 grid w-full grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-8">
      {featuredProjects.map((project) => (
        <ProjectCard
          key={project.name}
          project={[project.name, project]}
        />
      ))}
    </div>
  );
};

export default ProjectShowcase;