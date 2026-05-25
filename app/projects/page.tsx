import { Projects } from "../components/Projects";
import { getData } from "@/lib/wp";

export default async function ProjectsPage() {
    const data = await getData("project", "orderby=date&order=desc");

    // FRONTEND FALLBACK SORT: Guarantees descending order (newest first)
    // by comparing the ISO date strings returned from WordPress
    const sortedProjects = [...data].sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <main className="animate-fade-in">
            {/* Pass the explicitly sorted data instead */}
            <Projects projects={sortedProjects} />
        </main>
    )
}