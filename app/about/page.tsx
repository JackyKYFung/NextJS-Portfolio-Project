import { About } from "../components/About";
import { getPageBySlug } from "@/lib/wp";

export default async function AboutPage() {

    const pageData = await getPageBySlug("about"); 
    
    //console.log("SERVER-SIDE FETCH RESULT:", JSON.stringify(pageData, null, 2));

    return (
        <main className="animate-fade-in">
            <About pageData={pageData} />
        </main>
    )
}