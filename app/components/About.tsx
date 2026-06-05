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
        <div className="flex flex-col gap-16">
            
            {/* FIRST ROW: 12-Column Grid Layout Split (8 Left / 4 Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* LEFT SIDE: Biography + Experience stacked (8 Columns) */}
                <div className="lg:col-span-6 space-y-12">
                    
                    {/* Biography Section */}
                    <div className="bio-content max-w-none pt-5 mb-5">
                        {pageData?.content?.rendered && (
                            <>
                                <div className="flex inline-flex items-center text-3xl font-bold font-mono">

                                <span className="relative pb-1">Life in the C</span>
                                
        
                                <Package className="w-[0.7em] h-[0.7em] stroke-[2.5] text-current mx-[2px] mb-[-3] translate-y-[-1px]" />
                                
    
                                <span className="relative pb-1">de</span>
                                </div>
                                <div
                                    className="mt-5 text-white" 
                                    dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
                                />
                            </>
                        )}
                    </div>

                    {/* EXPERIENCE SECTION */}    
                    <div className="mt-10">
                        <h1 
                            className="relative transition-all duration-200 flex items-center group pb-1 text-3xl font-bold font-mono"
                        >
                                <Blocks className="w-[1em] h-[1em] stroke-[2.5] text-current translate-y-[1px] px-[1px] mb-[3px]" />
                                <span>xperience</span>
                                
                        </h1>
                        <Experience experiences={experiences} />
                    </div>

                </div>

                {/* RIGHT SIDE: Skills + The Playful Interactive Sandbox Anchor (4 Columns) */}
                <div className="lg:col-span-6 pt-5">
                    
                    {/* Skills Section */}
                    <div className="mb-10">
                        <Skills acfData={acf || {}} />
                    </div>

                    {/* We wrap it in a div that handles the sticky behavior */}
                    <div className="lg:sticky lg:top-24">
                        <OrbitalGrid upcomingProjects={upcomingProjects} />
                    </div>
                    
                </div>

            </div>

            {/* SECOND ROW: Photo Gallery (Full Width - 12 Columns Anchor) */}
            <div className="w-full border-t border-zinc-800/60 pt-12 pb-12">
                <div className="flex inline-flex items-center text-3xl font-bold font-mono mb-6">
    
                    <span className="relative pb-1">Life b</span>
                    
            
                    <Compass className="w-[0.7em] h-[0.7em] stroke-[2.5] text-current mx-[2px] mb-[-3] translate-y-[-1px]" />
                    
        
                    <span className="relative pb-1">yond the Code</span>
                </div>
                <PhotoGallery wpData={updates}/>
            </div>
            
        </div>
    );
}