import { Experience } from "../components/Experience";
import { getData } from "@/lib/wp";

export default async function ExperiencePage() {
    const data = await getData("experience", "orderby=date&order=desc");

    return (
        <section>
            <h1 className="animate-fade-in">Experience</h1>
            {/* passes data to Experience component*/}
            <Experience experiences={data} />
        </section>
    )


}