import { getData } from "@/lib/wp";

export function ProjectCard({ project }: { project: any }) {

    const techStack = project._embedded?.['wp:term']
        ?.flat() // Combines all term arrays (categories, tags, tech_stacks) into one
        ?.filter((term: any) => term.taxonomy === 'tech_stack') || [];

    const backUpIds = project.tech_stack || [];

    return (
        <article className="project-card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
                <div className="md:col-span-3 group relative overflow-hidden rounded-xl lg:hover:bg-gray-900/90 h-60">
                    <img 
                        src={project.acf?.project_thumbnail?.url} 
                        className="w-full object-cover transition-all duration-300 lg:group-hover:blur-sm lg:group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/0 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:bg-gray-900/60 lg:group-hover:backdrop-blur-md">
                        <h1 className="text-lg font-bold text-white px-4 text-center">
                            {project.title.rendered}
                        </h1>
                    </div>
                </div>
                <div className="md:col-span-1">
                    {techStack.length > 0 ? (
                        techStack.map((tag: any) => (
                            <span 
                                key={tag.id} 
                                className="bg-gray-800 text-gray-200 text-[10px] px-2 py-1 rounded border border-gray-700"
                            >
                                {tag.name}
                            </span>
                        ))
                        ) : backUpIds.length > 0 ? (
                            // If names are missing, show the IDs we saw in your console log
                            backUpIds.map((id: number) => (
                                <span key={id} className="bg-red-900/10 text-red-400 text-[10px] px-2 py-1 rounded border border-red-900/30">
                                    ID: {id}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-600 text-[10px]">No tags found</span>
                        )}
                </div>
            </div>


        </article>
                )
}