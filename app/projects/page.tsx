import { Projects } from "../components/Projects";
import { getData } from "@/lib/wp";

export default async function ProjectsPage() {
        const data = await getData("project", "orderby=date&order=asc");
    return (
        <main className="animate-fade-in">
            <h1>Projects</h1>
            {/* passes data to Experience component*/}
            <Projects projects={data} />
        </main>
    )
}