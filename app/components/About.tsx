"use client";

import { Skills } from "@/app/components/Skills";

interface AboutProps {
    pageData: any;
}

export function About({ pageData }: AboutProps) {

    const acf = pageData?.acf;

    return (
        <div className="about-layout-container">
            {/* Render your bio description from WordPress standard editor */}
            {pageData?.content?.rendered && (
                <div 
                    className="bio-content prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
                />
            )}

            {/* Pass acfData safely to Skills */}
            <Skills acfData={acf || {}} />
        </div>
        
    )
}