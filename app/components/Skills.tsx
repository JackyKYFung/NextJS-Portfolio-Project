"use client";

import { useMemo, useState, useEffect } from "react";

// Define the type of ACF Data so Typescript knows what fields to expect
interface ACFSkillsData {
    wordpress?: string;
    payments?: string;
    frontend?: string;
    performance?: string;
    hosting?: string;
    design?: string;
    [key: string]: string | undefined;
}

interface SkillsProps {
    acfData: ACFSkillsData;
}

export function Skills({ acfData }: SkillsProps) {

    const [mounted, setMounted] = useState(false);

    //console.log("=== RAW ACF DATA RECEIVED BY SKILLS COMPONENT ===", acfData);

    useEffect(() => {
        setMounted(true);
    }, []);

    const randomizedSkills = useMemo(() => {
        if (!acfData) return [];

        const categoryMap = [
            { field: "wordpress", cat: "wordpress" },
            { field: "payment", cat: "payments" },
            { field: "frontend", cat: "frontend" },
            { field: "performance", cat: "performance" },
            { field: "hosting", cat: "hosting" },
            { field: "design", cat: "design" },
        ];

        let allSkills: Array<{ name: string; category: string }> = [];

        categoryMap.forEach(({ field, cat }) => {
            const rawString = acfData[field] || "";

            if (rawString) {
                const skillsArray = rawString
                    .split("|") // <-- splitting the skills term by | in the array
                    .map((item: string) => item.trim())
                    .filter((item: string) => item !== "");

                    skillsArray.forEach((skiillName: string) => {
                        allSkills.push ({
                            name: skiillName,
                            category: cat
                        });
                    });
            }
        });

    return allSkills.sort(() => Math.random() - 0.5);
}, [acfData]);

if (!mounted) {
return (
    <section className="opacity-0">
        <div className="tech-section font-bold">Technical Skills</div>
    </section>
    );
}

    return (
<section className="animate-fade-in">


            <div className="skills-wrapper grid grid-cols-[110px_1fr] max-w-fit mx-auto lg:max-w-none mt-5 lg:mt-0 py-5 border rounded-xl ">
               {/* Sidebar */}
                <h1 className="mb-5 items-end text-right font-bold">My Skills</h1>
                <div className="self-center pl-5 mb-5">
                    <p className="text-center text-xs opacity-80">(The skills are sort randomly on load!)</p>
                </div>
                <nav className="skill-categories flex flex-col items-end border-r border-black/10 ">
                    {["wordpress", "payments", "frontend", "performance", "hosting", "design"].map((cat) => (
                        <button 
                            key={cat}
                            className="skill-category font-bold w-fit capitalize text-sm mb-2 opacity-80 hover:opacity-100 transition-opacity" 
                            data-cat={cat}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>

                {/* skills showcase section */}
                <div className="skills pl-5 max-w-none lg:max-w-83  flex flex-wrap">
                    {randomizedSkills.map((item, index) => (
                        <span 
                            key={`${item.name}-${index}`}
                            data-cat={item.category}
                            className="inline-block px-2 py-1 text-sm rounded cursor-default transition-all duration-300 "
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>

    )
}