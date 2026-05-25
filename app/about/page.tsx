import { About } from "../components/About";
import { getPageBySlug, getLifeUpdates, getData } from "@/lib/wp";

export default async function AboutPage() {

    // use Promise to execute data fetching for both components, or else 
    // the second one would start only when the first is done
    const [pageData, updates] = await Promise.all([
        getPageBySlug("about"),
        getLifeUpdates()
    ]);
    
    //console.log("SERVER-SIDE FETCH RESULT:", JSON.stringify(pageData, null, 2));

    const expData = await getData("experience", "orderby=date&order=desc");


    return (
        <main className="animate-fade-in">
            <About pageData={pageData} updates={updates} experiences={expData} />
        </main>
    )
}