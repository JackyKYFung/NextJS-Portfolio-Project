import { About } from "../components/About";
import { getPageBySlug, getLifeUpdates, getData } from "@/lib/wp";

export default async function AboutPage() {

    // use Promise to execute data fetching for both components, or else 
    // the second one would start only when the first is done
    const [pageData, updates] = await Promise.all([
        getPageBySlug("about"),
        getLifeUpdates()
    ]);
    
    const expData = await getData("experience", "orderby=date&order=desc");

    // when fetching pages by filtering through a slug, WP may send back a JSON 
    // array instead of JSON object beacuse it doesn't know if database contain 
    // duplicate slug. So we use a rawPageObject to verify and break it up 
    // if the returned response was a JSON Array.  
    
    const rawPageObject = Array.isArray(pageData) ? pageData[0] : pageData;
    const upcomingProjData = rawPageObject?.acf?.upcoming_projects || "";

    return (
        <main className="animate-fade-in">
            <About 
                pageData={pageData} 
                updates={updates} 
                experiences={expData} 
                upcomingProjects={upcomingProjData}    
            />
        </main>
    )
}