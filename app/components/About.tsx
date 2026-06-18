"use client";

import { Skills } from "@/app/components/Skills";
import PhotoGallery from "@/app/components/PhotoGallery";
import OrbitalGrid from "./OrbitalGrid";
import { Experience } from "./Experience";
import { Blocks, Package , Compass} from "lucide-react";

interface AboutProps {
    pageData: any;
    updates: any[];
    experiences: any[];
    upcomingProjects: string;
}

export function About({ pageData, updates, experiences, upcomingProjects }: AboutProps) {
    const acf = pageData?.acf;

    return (
        <div className="flex flex-col gap-16 py-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* left side: Biography + Experience */}
                <div className="lg:col-span-6 space-y-12">
                    
                    {/* Biography Section */}
                    <div className="bio-content max-w-none mb-5">
                        {pageData?.content?.rendered && (
                            <>
                                <div className="flex flex-wrap items-baseline text-2xl sm:text-3xl font-bold font-mono mb-6 gap-x-4">
                                    <span>Life in the</span>
                                    <span className="whitespace-nowrap flex items-baseline">
                                        C
                                        <Package className="w-[0.7em] h-[0.7em] stroke-[2.5] self-center mx-[2px] translate-y-[2px]" />
                                        de
                                    </span>
                                </div>
                                <div
                                    className="mt-5 text-white" 
                                    dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
                                />
                            </>
                        )}
                    </div>

                    {/* Experience Section */}    
                    <div className="mt-10">
                        <div className="flex flex-wrap items-baseline text-2xl sm:text-3xl font-bold font-mono mb-6 gap-x-4">
                            
                            <span className="whitespace-nowrap flex items-baseline">
                            <Blocks className="w-[1em] h-[1em] stroke-[2.5] self-center mx-[2px] translate-y-[-2px]" />
                                xperience
                            </span>
                        </div>
                        <Experience experiences={experiences} />
                    </div>

                </div>

                {/* Right Side: Skills + Upcoming Projects */}
                <div className="lg:col-span-6 pt-5">
                    
                    {/* Skills Section */}
                    <div className="mb-10">
                        <Skills acfData={acf || {}} />
                    </div>

                    <div className="lg:sticky lg:top-24">
                        <OrbitalGrid upcomingProjects={upcomingProjects} />
                    </div>
                    
                </div>

            </div>

            {/* Photo Gallery Section */}
            <div className="w-full border-t border-zinc-800/60 pt-12 pb-12">
                <div className="flex flex-wrap items-baseline text-2xl sm:text-3xl font-bold font-mono mb-6 gap-x-4">
                    <span>Life</span>
                    <span className="whitespace-nowrap flex items-baseline">
                        b
                        <Compass className="w-[0.7em] h-[0.7em] stroke-[2.5] self-center mx-[2px] translate-y-[1px]" />
                        yond
                    </span>
                    <span className="whitespace-nowrap">the Code</span>
                </div>
                <PhotoGallery wpData={updates}/>
            </div>
            
        </div>
    );
}