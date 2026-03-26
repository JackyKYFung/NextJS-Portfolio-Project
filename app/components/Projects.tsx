//import { useState, useEffect } from 'react';

export async function Projects({ categoryId } : { categoryId: number }) {

    // fetch runs on server before page loads

//  const url = `https://jfunki.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed`;    
    const res = await fetch(`https://jfunki.com/wp-json/wp/v2/project?_embed`, 
        { next: { revalidate: 3600 }
    });

    const projects = await res.json();

    //const [projects, setProjects] = useState([]);
    //const [loading, setLoading] = useState(true);




    /* 
    useEffect(() => {
        const url = `https://jfunki.com/wp-json/wp/v2/project?project_categories=${categoryId}&_embed`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            
            });   
    }, [categoryId]);
    */

    console.log("Current Projects Data:", projects);

    return (
        <div className="projects-section">
            <p>Projects section here</p>
            {Array.isArray(projects) && projects.map((project: any) => (
                <article key={project.id} className="project-card">
                    <h1>{project.title.rendered}</h1>

                    <div className="case-study-details">
                        <p>{project.acf?.problem}</p>

                        <p>{project.acf?.solution}</p>

                        <p>{project.acf?.results}</p>
                    </div>

                </article>
            ))}
        </div>
    )
}