import { Experience } from "../components/Experience";
import { getData } from "@/lib/wp";

export default async function ExperiencePage() {
    const data = await getData("experience", "orderby=date&order=desc");

    return (
        <section>
            <h1 className="experiencePageComp">Experience</h1>
            <Experience experiences={data} />
        </section>
    )


}