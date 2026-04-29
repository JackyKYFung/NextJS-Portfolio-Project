import { getData } from "@/lib/wp";

export function Projects({ projects }: { projects: any[] }) {

    console.log("Current Projects Data:", projects);

    return (
        <div className="projects-section">
            {Array.isArray(projects) && projects.map((project: any) => (
                <article key={project.id} className="project-card">
                    {project._embedded?.['wp:term']?.[1]?.map((tag: any) => (
                    <span key={tag.id} className={`tag-pill tag-${tag.slug}`} 
                        style={{
                            fontWeight: "600",
                            padding: "5px 5px",
                            border: "1px solid",
                            marginRight: "5px",
                        }}>
                        {tag.name} 
                    </span> 
                ))}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
                        <div className="md:col-span-3 group relative overflow-hidden rounded-xl lg:hover:bg-gray-900/90 h-60">
                            <img 
                                src={project.acf?.project_thumbnail?.url} 
                                className="w-full object-cover transition-all duration-300 lg:group-hover:blur-sm lg:group-hover:scale-105"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/0 transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:bg-gray-900/60 lg:group-hover:backdrop-blur-md">
                                <h1 className="text-lg font-bold text-white px-4 text-center">{project.title.rendered}</h1>
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <p>stack tags here</p>
                        </div>
                    </div>


                </article>
            ))}
        </div>
    )
}