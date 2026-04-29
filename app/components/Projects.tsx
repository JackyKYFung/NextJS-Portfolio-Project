import { getData } from "@/lib/wp";

export function Projects({ projects }: { projects: any[] }) {
//export function Experience({ experiences }: { experiences: any[] })

    //const projects = await getData("project", "orderby=date&order=asc");

    // fetch runs on server before page loads

//  const url = `https://jfunki.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed`;    
//  const res = await fetch(`https://jfunki.com/wp-json/wp/v2/project?_embed&orderby=date&order=asc`, 
//        { next: { revalidate: 3600 }

//    const projects = await res.json();

    console.log("Current Projects Data:", projects);

    return (
        <div className="projects-section">
            <p>Projects section here</p>
            {Array.isArray(projects) && projects.map((project: any) => (
                <article key={project.id} className="project-card">
                    <h1>{project.title.rendered}</h1>
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

                    <div className="case-study-details">
                        <p>{project.acf?.problem}</p>

                        <p>{project.acf?.solution}</p>

                        <p>{project.acf?.results}</p>

                        <p>project thumbnail</p>

                        <img 
                        src={project.acf?.project_thumbnail?.url} 
                        alt={project.acf?.project_thumbnail?.alt || project.title.rendered} 
                        />

                        <img 
                        src={project.acf?.preview_crop?.url} 
                        alt="Preview Crop"
                        />

                        <img 
                        src={project.acf?.full_screenshot?.url} 
                        alt="Full Screenshot"
                        />

                        <p>{project.acf?.snippet_text}</p>

                    </div>

                </article>
            ))}
        </div>
    )
}