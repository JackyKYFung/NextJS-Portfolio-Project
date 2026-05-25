"use client";
import { useState } from "react";

// data passed over from experience/page.tsx is added into the experiences array
export function Experience({ experiences }: { experiences: any[] }) {
    //use state to track the id of the opened accordion
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setActiveId(activeId === id ? null : id);
        //console.log (activeId);
    }

    return (

     
    <section className="text-left mt-5 animate-fade-in border-[2px]rounded-3xl">
        {Array.isArray(experiences) && experiences.map((experience: any) => {

                // Get job details string from ACF 
        const detailsString = experience.acf?.job_details || "";
        //console.log("details string", detailsString);
        //Turn retrieved job details string into an array
        const detailsArray = detailsString.split('|')
            .filter((item: string) => item.trim() !== "") // clean up empty items
            .map((item: string) => item.trim());
        //console.log("details array", detailsArray);
        const isOpen = activeId === experience.id;

        return (
                // The accordion heading
                <div 
                    key={experience.id} 
                    className={`experience-tab overflow-hidden transition-all duration-300 rounded-xl hover:bg-zinc-500/20 border-2             
                        ${isOpen 
                            ? "border-white shadow-md" : "border-black/0"                     
                        }
                    `}>
                    <div 
                        className="experience-title py-5 px-5 cursor-pointer w-full text-left"
                        onClick={() => toggleAccordion(experience.id)}
                        >

                        <div className="summary-content flex flex-wrap w-full">
                            <div className="summary-row flex flex-row justify-between items-baseline w-full">
                            <span className="job-title font-semibold]">
                                {experience.acf?.job_title}
                            </span>
                            <span className="date text-sm opacity-70 whitespace-nowrap">
                                {experience.acf?.time}</span>
                            </div>

                            <div className="company text-sm italic opacity-80 mt-1 text-left">
                                {experience.acf?.company}
                            </div>
                        </div>
                    </div>
                    
                    {/* the expandable part of the accordion */}
                    
                    <div 
                        className={`grid transition-all duration-300 ease-in-out ${ isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0" } `}
                        >
                        <div className="overflow-hidden">        
                            <ul className="p-5 space-y-2 pt-0"
                                style={{
                                    listStyle: "disc",
                                    paddingLeft: "35px"

                                }}>
                            
                                {detailsArray.map((detail: string, index: number ) => (
                                    // string has no ID so use index
                                <li key={`${experience.id}-${index}`}>
                                        {detail}
                                </li> 
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            
        )
        
        })}
    </section>
    )
    }