import { ProjectCard } from "./ProjectCard";

export function Projects({ projects }: { projects: any[] }) {

    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ))}
    </div>
    );
}