"use client";

import { getTagTheme } from "@/lib/tags";
import Link from 'next/link';
import { motion } from "framer-motion";
import { Wrench, Shirt, SquareTerminal, Frown } from "lucide-react";


// Quick mapping helper to assign the icon symbol based on project type
const getCardTypeIcon = (slug: string = "") => {
    if (slug.includes('jfunki')) return { label: 'Profile', icon: <SquareTerminal size={16} className="text-blue-400" /> };
    if (slug.includes('catalog')) return { label: 'Catalog', icon: <Shirt size={16} className="text-amber-400" /> };
    if (slug.includes('core')) return { label: 'Maintenance', icon: <Wrench size={16} className="text-violet-400" /> };

    return { label: 'Project', icon: <SquareTerminal size={16} className="text-emerald-400" /> };
};




export function ProjectCard({ project }: { project: any }) {
    const techStack = project._embedded?.['wp:term']
        ?.flat()
        ?.filter((term: any) => {
            const isActuallyTech = term.taxonomy === 'tech_stack';
            const isNotAllProjects = term.name?.toLowerCase().trim() !== 'all projects';
            return isActuallyTech && isNotAllProjects;
        }) || [];

    const backUpIds = project.tech_stack || [];

    const cardType = getCardTypeIcon(project.slug);

    return (
        <Link 
        href={`/projects/${project.slug}`} 
        className="block w-full max-w-[90%] sm:max-w-full md:max-w-full mx-auto h-full group"
    >
            
            {/* DESKTOP HOVER LAYOUT (Kept clean for md screens and up) */}
            <article className="hidden md:block relative w-full aspect-square rounded-2xl border-2 border-white bg-zinc-900 overflow-hidden transition-all duration-500 hover:border-emerald-500 shadow-xl">
                {/* 1. Project Thumbnail Background */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <img 
                        src={project.acf?.project_thumbnail?.url} 
                        className="w-full h-full object-cover opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-10 group-hover:blur-[2px]"
                        alt={project.title?.rendered}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/80 transition-colors duration-500" />
                </div>

                {/* 2. Floating Tech Stack Layer */}
                <div className="absolute inset-0 p-6 flex flex-wrap content-start gap-2 z-10 transition-all duration-500 pointer-events-none group-hover:blur-[3px] group-hover:opacity-30">
                    {techStack.map((tag: any, index: number) => (
                        <motion.span 
                            key={tag.id}
                            animate={{ y: [0, 22, 0], x: [0, 32, 0] }}
                            transition={{ duration: 35 + (index % 10), repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: index * 0.15 }}
                            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black/90 rounded-full shadow-md inline-block bg-gradient-to-br backdrop-blur-md ${getTagTheme(tag.name)}`}
                        >
                            {tag.name}
                        </motion.span>
                    ))}
                </div>

                {/* 3. Project Title Layer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-y-2 group-hover:translate-y-0">
                    <h1 className="text-xl md:text-2xl font-bold text-white text-center font-mono tracking-wide drop-shadow-md">
                        {project.title.rendered}
                    </h1>
                    <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 rounded-full backdrop-blur-sm">
                        Inspect Project →
                    </span>
                </div>
            </article>


            {/* MOBILE TRADING CARD LAYOUT (Activates on everything below md breakpoint) */}
            <article className="block md:hidden w-full bg-zinc-900 border-2 border-white  rounded-3xl py-3 px-5 flex flex-col gap-3 shadow-2xl border-[7px] relative overflow-hidden active:border-emerald-500 transition-colors duration-300">
                
                {/* Header Section (Card Name & Sub-details bar) */}
                <div className="flex items-center justify-between pb-1.5 px-0.5">
                    <h2 className="text-[14px] font-mono font-bold text-white uppercase tracking-tight truncate max-w-[85%]">
                        {project.acf?.project_description}
                    </h2>
                    <div className="flex items-center gap-1 text-zinc-500 text-[10px] font-mono uppercase tracking-wider">
                        {cardType.icon}
                    </div>
                </div>

                {/* Main Image Frame (The Pokemon Illustration Frame) */}
                <div className="w-full aspect-[4/3]  overflow-hidden border-[3px] border-white bg-zinc-950 relative">
                    <img 
                        src={project.acf?.project_thumbnail?.url} 
                        className="w-full h-full object-cover" 
                        alt={project.title?.rendered} 
                    />
                    {/* Subtle Scanline Holographic Foil overlay effect to give it a collectible card sheen */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-40" />
                </div>

                {/* Meta Attributes Bar (The card description strip under the picture) */}
                <div className=" rounded-sm px-2 text-center">
                    <p className="text-xl font-bold font-mono text-white uppercase tracking-normal truncate">
                        {project.title?.rendered}
                    </p>
                </div>

                {/* Attack Section (The Dynamic Tech Stack Box) */}
                <div className="flex-1 bg-zinc-950 rounded-xl p-3 border border-zinc-800 flex flex-col gap-2 min-h-[100px] justify-center">
                    
                    <div className="flex flex-wrap gap-1.5">
                        {techStack.length > 0 ? (
                            techStack.map((tag: any) => {
                                const theme = getTagTheme(tag.name);
                                return (
                                    <span 
                                        key={tag.id}
                                        className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black/90 rounded-md shadow-sm ${theme}`}
                                    >
                                        {tag.name}
                                    </span>
                                );
                            })
                        ) : backUpIds.length > 0 ? (
                            backUpIds.map((id: number) => (
                                <span key={id} className="bg-zinc-900 text-zinc-400 font-mono text-[9px] px-2 py-0.5 rounded border border-zinc-800">
                                    SYS_ID: {id}
                                </span>
                            ))
                        ) : (
                            <span className="text-zinc-600 text-[10px] font-mono flex items-center gap-1 py-2">
                                NO SYSTEMS DETECTED <Frown size={10}/>
                            </span>
                        )}
                    </div>
                </div>

                {/* Card Footer Metric Strip */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-100 px-1 pt-0.5 border-t border-zinc-900">
                    <span>jfunki</span>
                    <span className="text-emerald-500 font-bold uppercase tracking-widest">View Details</span>
                </div>

            </article>
        </Link>
    );
}