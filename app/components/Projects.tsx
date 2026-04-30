import { getData } from "@/lib/wp";
import { ProjectCard } from "./ProjectCard";

export function Projects({ projects }: { projects: any[] }) {

    return (
        <div className="projects-section">
            {projects.map((project: any) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}