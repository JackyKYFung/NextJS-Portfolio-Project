"use client";

import { getTagTheme } from "@/lib/tags";
import Link from 'next/link';
import { motion } from "framer-motion";
import { Frown } from "lucide-react";

export function ProjectCard({ project }: { project: any }) {

    const techStack = project._embedded?.['wp:term']
        ?.flat()
        ?.filter((term: any) => {
            // 1. Only allow terms that belong to the 'tech_stack' taxonomy
            const isActuallyTech = term.taxonomy === 'tech_stack';

            // 2. Explicitly block the "All Projects" name just in case
            const isNotAllProjects = term.name?.toLowerCase().trim() !== 'all projects';

            return isActuallyTech && isNotAllProjects;
        }) || [];

    const backUpIds = project.tech_stack || [];


    return (
        <Link href={`/projects/${project.slug}`} className="block h-full group">
            <article className="project-card">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
                    <div className="md:col-span-3 group relative overflow-hidden rounded-xl lg:hover:bg-gray-900/90 h-60 border">
                        <img 
                            src={project.acf?.project_thumbnail?.url} 
                            className="w-full object-cover transition-all duration-300 lg:group-hover:blur-sm lg:group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 bg-gray-900/0 group-hover:bg-gray-900/70 backdrop-blur-sm">
                            <h1 className="text-2xl font-bold text-white px-4 text-center">
                                {project.title.rendered}
                            </h1>
                        </div>
                    </div>
                    <div className="md:col-span-1 flex flex-wrap gap-2 w-full border p-5 rounded-xl blur-[2px] group-hover:blur-[0] duration-300">
                        {techStack.length > 0 ? (
                            techStack.map((tag: any, index: number) => {

                                const theme = getTagTheme(tag.name);
                                //console.log("Filtered Tech Stack:", tag);

                                return (
                                    <motion.span 
                                    key={tag.id}
                                    // Breathing animation
                                    animate={{
                                        y: [0, 15, 0], // Subtle lift (less than the big boxes)
                                        x: [0, 35, 0],
                                    }}
                                    transition={{
                                        duration: 45 + (index % 15), // Randomized duration
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        ease: "easeInOut",
                                        delay: index * 0.2, // Staggered start times
                                    }}
                                    className={`
                                        relative px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] 
                                        text-black/80 rounded-full shadow-lg inline-block duration-300
                                        bg-gradient-to-br backdrop-blur-md
                                        ${theme}`}
                                        >
                                            {tag.name}
                                    </motion.span>
                                )
                            })
                            ) : backUpIds.length > 0 ? (
                                // If names are missing, show the IDs we saw in your console log
                                backUpIds.map((id: number) => (
                                    <span key={id} className="bg-red-900/10 text-red-400 text-[10px] px-2 py-1 rounded border border-red-900/30">
                                        ID: {id}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-600 text-[10px]">No tags found 
                                <Frown className="inline-block ml-1" size={16}/>
                                </span>
                            )}
                    </div>
                </div>


            </article>
        </Link>
                )
}