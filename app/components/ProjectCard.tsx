"use client";

import { getTagTheme } from "@/lib/tags";
import Link from 'next/link';
import { motion } from "framer-motion";
import { Frown } from "lucide-react";

export function ProjectCard({ project }: { project: any }) {
    const techStack = project._embedded?.['wp:term']
        ?.flat()
        ?.filter((term: any) => {
            const isActuallyTech = term.taxonomy === 'tech_stack';
            const isNotAllProjects = term.name?.toLowerCase().trim() !== 'all projects';
            return isActuallyTech && isNotAllProjects;
        }) || [];

    const backUpIds = project.tech_stack || [];

console.log(`--- DIAGNOSING PROJECT: ${project?.title?.rendered || 'No Title'} ---`);
console.log("1. Does ACF Exist?:", !!project?.acf);
console.log("2. What is project_thumbnail value?:", project?.acf?.project_thumbnail);
console.log("3. Does _embedded Exist?:", !!project?._embedded);
console.log("4. Does wp:featuredmedia Exist?:", !!project?._embedded?.['wp:featuredmedia']);

    return (
        <Link href={`/projects/${project.slug}`} className="block w-full h-full group">
            <article className="relative w-full aspect-square rounded-2xl border border-white border-[2px] bg-zinc-500 overflow-hidden transition-all duration-500 hover:border-emerald-500 shadow-xl">
                
                {/* 1. Project Thumbnail Background */}
                <div className="absolute inset-0 w-full h-full z-0">
<img 
    src={project.acf?.project_thumbnail?.url} 
    className="w-full h-full object-cover opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-10 group-hover:blur-[2px]"
    alt={project.title?.rendered}
/>
                    {/* Ambient Overlay to darken the image slightly on rest, and deeply on hover */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/80 transition-colors duration-500" />
                </div>

                {/* 2. Floating Tech Stack Layer (Sharp on rest, blurs out on hover) */}
                <div className="absolute inset-0 p-6 flex flex-wrap content-start gap-2 z-10 transition-all duration-500 pointer-events-none group-hover:blur-[3px] group-hover:opacity-30">
                    {techStack.length > 0 ? (
                        techStack.map((tag: any, index: number) => {
                            const theme = getTagTheme(tag.name);
                            return (
                                <motion.span 
                                    key={tag.id}
                                    animate={{
                                        y: [0, 22, 0],
                                        x: [0, 32, 0],
                                    }}
                                    transition={{
                                        duration: 35 + (index % 10),
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        ease: "easeInOut",
                                        delay: index * 0.15,
                                    }}
                                    className={`
                                        px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] 
                                        text-black/90 rounded-full shadow-md inline-block
                                        bg-gradient-to-br backdrop-blur-md 
                                        ${theme}`}
                                >
                                    {tag.name}
                                </motion.span>
                            );
                        })
                    ) : backUpIds.length > 0 ? (
                        backUpIds.map((id: number) => (
                            <span key={id} className="bg-red-900/20 text-red-400 text-[9px] px-2 py-0.5 rounded border border-red-900/30 font-mono">
                                ID: {id}
                            </span>
                        ))
                    ) : (
                        <span className="text-zinc-500 text-[9px] font-mono flex items-center gap-1">
                            SYSTEM_EMPTY <Frown size={12}/>
                        </span>
                    )}
                </div>

                {/* 3. Project Title Layer (Hidden/Transparent on rest, fades in sharply on hover) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-y-2 group-hover:translate-y-0">
                    <h1 className="text-xl md:text-2xl font-bold text-white text-center font-mono tracking-wide drop-shadow-md">
                        {project.title.rendered}
                    </h1>
                    <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 rounded-full backdrop-blur-sm">
                        Inspect Case Study →
                    </span>
                </div>

            </article>
        </Link>
    );
}