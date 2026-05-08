import { About } from "../components/About";
import { getPageBySlug, getLifeUpdates } from "@/lib/wp";

export default async function AboutPage() {

    // use Promise to execute data fetching for both components, or else 
    // the second one would start only when the first is done
    const [pageData, updates] = await Promise.all([
        getPageBySlug("about"),
        getLifeUpdates()
    ]);
    
    //console.log("SERVER-SIDE FETCH RESULT:", JSON.stringify(pageData, null, 2));

    return (
        <main className="animate-fade-in">
            <About pageData={pageData} updates={updates} />
        </main>
    )
}