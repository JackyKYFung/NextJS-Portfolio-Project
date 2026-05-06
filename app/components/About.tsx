"use client";

import { Skills } from "@/app/components/Skills";

interface AboutProps {
    pageData: any;
}

export function About({ pageData }: AboutProps) {

    const acf = pageData?.acf;

    return (
        <div className="about-layout-container grid grid-cols-1 lg:grid-cols-[2fr_3fr] lg:gap-5 items-start">
            {/* Render your bio description from WordPress standard editor */}
            {pageData?.content?.rendered && (
                
                <div 
                    className="bio-content prose max-w-none pt-5"
                
                >
                    <h1 className="font-bold">About Me</h1>
                    <div
                        className="mt-5" 
                        dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} 
                    />
                    </div>
            )}

            {/* Pass acfData safely to Skills */}
            <Skills acfData={acf || {}} />
        </div>
        
    )
}