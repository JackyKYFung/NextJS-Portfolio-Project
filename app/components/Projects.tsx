import { ProjectCard } from "./ProjectCard";

export function Projects({ projects }: { projects: any[] }) {

    return (
        <div className="projects-section flex flex-col gap-15">
            {projects.map((project: any) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}