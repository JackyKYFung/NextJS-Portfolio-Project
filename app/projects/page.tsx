import { Projects } from "../components/Projects";
import { getData } from "@/lib/wp";

export default async function ProjectsPage() {
        const data = await getData("project", "orderby=date&order=asc");
    return (
        <section>
            <h1 className="animate-fade-in">Experience</h1>
            {/* passes data to Experience component*/}
            <Projects projects={data} />
        </section>
    )
}