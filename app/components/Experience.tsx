
import { getData } from "@/lib/wp";

export async function Experience() {

    const experiences = await getData("experience", "orderby=date&order=desc");

    //console.log(experiences);

    return (

     
    <section className="text-left mt-10">
        {Array.isArray(experiences) && experiences.map((experience: any) => {

                // Get job details string from ACF 
        const detailsString = experience.acf?.job_details || "";
        console.log("details string", detailsString);
        //Turn retrieved job details string into an array
        const detailsArray = detailsString.split('|')
            .filter((item: string) => item.trim() !== "") // clean up empty items
            .map((item: string) => item.trim());
        console.log("details array", detailsArray);

        return (
                <details 
                    key={experience.id} 
                    className="experience-tab" 
                    style={{
                        border: "1px solid",
                        borderRadius: "10px",
                        padding: "10px",
                    }}>
                    <summary className="experience-title pb-4 cursor-pointer select-none">

                        <div className="summary-content space-y-1">
                            <div className="summary-row flex justify-between items-baseline">
                            <span className="job-title font-semibold">{experience.acf?.job_title}</span>
                            <span className="date text-sm opacity-70">{experience.acf?.time}</span>
                            </div>

                            <div className="company text-sm italic opacity-80 mt-1">
                            {experience.acf?.company}
                            </div>
                        </div>
                    </summary>
                    <div className="experience-details pb-4">
                        <ul style={{
                            listStyle: "disc",
                            paddingLeft: "15px",
                        }}>
                            {detailsArray.map((detail: string, index: number ) => (
                                // string has no ID so use index
                               <li key={`${experience.id}-${index}`}>
                                    {detail}
                               </li> 
                            ))}
                        </ul>
                    </div>
                </details>
            
        )
        
        })}
    </section>
    )
    }