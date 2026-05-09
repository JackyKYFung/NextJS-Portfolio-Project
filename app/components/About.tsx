"use client";

import { Skills } from "@/app/components/Skills";
import PhotoGallery from "@/app/components/PhotoGallery";

interface AboutProps {
    pageData: any;
    updates: any[];
}

export function About({ pageData, updates }: AboutProps) {

    const acf = pageData?.acf;

return (
        <div className="flex flex-col gap-12">
            
            {/* FIRST ROW: Bio (Left) + Skills (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                
                {/* Biography Section */}
                <div className="bio-content prose max-w-none pt-5">
                    {pageData?.content?.rendered && (
                        <>
                            <h1 className="font-bold text-3xl">About Me</h1>
                            <div
                                className="mt-5" 
                                dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
                            />
                        </>
                    )}
                </div>

                {/* Skills Section */}
                <div className="pt-5">
                    <Skills acfData={acf || {}} />
                </div>
            </div>

            {/* SECOND ROW: Photo Gallery (Full Width) */}
            <div className="w-full">
                <h2 className="text-2xl font-bold mb-6">Life Beyond the Code</h2>
                <PhotoGallery wpData={updates}/>
            </div>
            
        </div>
    )
}