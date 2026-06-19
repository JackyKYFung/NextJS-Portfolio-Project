"use client";

import { useState, useEffect } from "react";
import BentoItem from "./BentoItem";
import Lightbox from "./Lightbox";
import { getTagTheme } from "@/lib/tags";
import { decodeHtml } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ProjectGallery({ project }: { project: any }) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSnippetExpanded, setIsSnippetExpanded] = useState(false);
    const { acf } = project;

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        setIsMobile(mediaQuery.matches);

        const handleMqChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", handleMqChange);
        return () => mediaQuery.removeEventListener("change", handleMqChange);
    }, []);

    const moveX = isMobile ? [0, 125, -125, 125, -125, 125, 0] : [0, 70, -70, 70, -70, 70, 0];
    const moveY = isMobile ? [0, -85, 85, -80, 85, -85, 0] : [0, -120, 120, -120, 120, -120, 0];

    const techStack = project._embedded?.['wp:term']
    ?.flat()
    ?.filter((term: any) => {
        const isTechStack = term.taxonomy === 'tech_stack';
        const isNotAllProjects = term.name?.toLowerCase().trim() !== 'all projects';
        return isTechStack && isNotAllProjects;
    }) || [];

    const hasSnippet = acf.snippet_text && acf.snippet_text.trim() !== "";

    return (
        <>
            {/* UNIFIED RESPONSIVE GRID MATRIX: */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 sm:mb-16 items-stretch">
                
                {/* 1. PROJECT THUMBNAIL BOX */}
                <div className={`w-full rounded-3xl overflow-hidden h-[250px] relative group border border-white border-[2px] bg-zinc-950 sm:row-span-2
                    ${hasSnippet 
                        ? "sm:h-full sm:min-h-[366px]" 
                        : "h-full min-h-[320px] sm:min-h-[366px]"
                    }`}
                >
                    <img 
                        src={acf.project_thumbnail?.url} 
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 brightness-[0.2] sm:group-hover:brightness-100 sm:group-hover:scale-105" 
                        alt={project.title.rendered} 
                    />
                    
                    <motion.div
                        animate={{ x: moveX, y: moveY }}
                        transition={{
                            x: { duration: 60, repeat: Infinity, ease: "linear" },
                            y: { duration: 55, repeat: Infinity, ease: "linear" },
                            rotate: { duration: 120, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none sm:group-hover:opacity-0 transition-opacity duration-500"
                    >
                        <div className="px-6 py-4 rounded-xl max-w-[210px] max-h-[200px] text-center bg-black/10 backdrop-blur-[2px]">
                            <h1 className="font-mono [font-size:1.5em] font-black text-white uppercase tracking-tighter text-center leading-8">
                                {decodeHtml(project.title.rendered)}
                            </h1>
                            <div className="my-1 h-[3px] w-[130px] bg-white mx-auto" />
                            <h1 className="font-mono [font-size:2cqw] font-black text-white uppercase tracking-tighter text-center">
                                {decodeHtml(acf.project_description)}
                            </h1>
                        </div>
                    </motion.div>

                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,0,0.03))] bg-[length:100%_4px,3px_100%] opacity-20 sm:group-hover:opacity-0 transition-opacity" />
                </div>

                {/* 2. TECH STACK BOX */}
                <BentoItem className="group bg-zinc-900 rounded-3xl p-4 text-white flex flex-col justify-center transition-all duration-300 border-white/0 border-[2px] hover:border-white/100 h-auto sm:h-[175px] col-span-1 sm:row-start-1 sm:col-start-2">
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4 transition-colors duration-300 group-hover:text-white">
                        Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tag: any, index: number) => (
                            <motion.span 
                                key={tag.id}
                                animate={{ y: [0, -2, 0], x: [0, 20, 0] }}
                                transition={{ duration: 30 + (index % 4), repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: index * 0.2 }}
                                className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full text-black/90 shadow-sm ${getTagTheme(tag.name)}`}
                            >
                                {tag.name}
                            </motion.span>
                        ))}
                    </div>
                </BentoItem>

                {/* 3. LIGHTBOX PREVIEW BOX */}
                <BentoItem 
                    className="hidden sm:block group relative cursor-pointer rounded-3xl overflow-hidden bg-zinc-800 transition-all duration-300 border-white/0 border-[2px] hover:border-white/100 h-auto sm:h-[175px] col-span-1 sm:row-start-2 sm:col-start-2"
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <img src={acf.preview_crop?.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-1 text-white text-xs text-center font-bold uppercase leading-normal underline">View Full Screenshot</span>
                    </div>
                </BentoItem>

                {/* 4. SNIPPET TEXT SECTION */}
                {hasSnippet && (
                    <BentoItem 
                        onClick={() => setIsSnippetExpanded(!isSnippetExpanded)}                
                        className={`bg-black/60 border-2 border-emerald-500/20 backdrop-blur-sm rounded-3xl p-6 pb-7 flex flex-col justify-between cursor-pointer relative group transition-[max-height,border-color,background-color] duration-500 ease-in-out hover:border-emerald-500 hover:bg-black/80
                            ${isSnippetExpanded ? "max-h-[500px]" : "max-h-[110px]"}
                            sm:col-span-2`}
                    >
                        <div className="absolute left-[-7px] top-12 w-3 h-3 bg-black rotate-45 z-10 transition-colors duration-500 ease-in-out
                            border-l-2 border-b-2 border-emerald-500/20
                            group-hover:border-emerald-500" 
                        />

                        <div className="relative z-20 overflow-hidden transition-[max-height] duration-500 ease-in-out">
                            <p className="text-emerald-400 text-xs md:text-sm italic leading-relaxed font-medium">
                                "{acf.snippet_text}"
                            </p>
                        </div>

                        <div className="absolute bottom-[2px] right-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">
                            <span>{isSnippetExpanded ? "Collapse" : "Expand"}</span>
                            <span className={`text-xs font-bold transition-transform duration-300 ${isSnippetExpanded ? "rotate-180" : "group-hover:translate-y-[-2px]"}`}>
                                <ChevronDown />
                            </span>
                        </div>
                    </BentoItem>
                )}
            </div>

            <Lightbox 
                isOpen={isLightboxOpen} 
                onClose={() => setIsLightboxOpen(false)} 
                src={acf.full_screenshot?.url || acf.preview_crop?.url} 
                alt="Full Project View"
            />
        </>
    );
}