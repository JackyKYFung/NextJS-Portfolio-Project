"use client";

import { useState } from "react";
import BentoItem from "./BentoItem";
import Lightbox from "./Lightbox";
import { getTagTheme } from "@/lib/tags";
import { decodeHtml } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectGallery({ project }: { project: any }) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const { acf } = project;

    const techStack = project._embedded?.['wp:term']
    ?.flat()
    ?.filter((term: any) => {
        const isTechStack = term.taxonomy === 'tech_stack';
        const isNotAllProjects = term.name?.toLowerCase().trim() !== 'all projects';
        return isTechStack && isNotAllProjects;
    }) || [];

    const [isSnippetExpanded, setIsSnippetExpanded] = useState(false);
    const hasSnippet = acf.snippet_text && acf.snippet_text.trim() !== "";


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
                <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden h-[320px] relative group border border-white border-[2px]">
                    
                    {/* 1. The Background Image with Dimming Logic */}
                    <img 
                        src={acf.project_thumbnail?.url} 
                        className="w-full h-full object-cover transition-all duration-700 brightness-[0.2] group-hover:brightness-100 group-hover:scale-110" 
                        alt={project.title.rendered} 
                    />

                    {/* 2. The "Fish Tank" Floating Title Block */}
                    <motion.div
                        animate={{
                            // Randomized keyframes for a more "wandering" path
                            x: [0, 80, -80, 80, -80, 80, 0], 
                            y: [0, -90, 90, -80, 90, -90, 0],

                        }}
                        transition={{
                            // X and Y wandering speed
                            x: { duration: 60, repeat: Infinity, ease: "linear" },
                            y: { duration: 55, repeat: Infinity, ease: "linear" },
                            // Rotation speed (independent of X/Y for more chaos)
                            rotate: { duration: 120, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500"
                    >
                        <div className="px-6 py-4 rounded-xl max-w-[210px] max-h-[200px] text-center">
                            <h1 className="font-mono [font-size:1.5em] font-black text-white  uppercase tracking-tighter text-center leading-8">
                                {decodeHtml(project.title.rendered)}
                            </h1>
                            <div className="my-1 h-[3px] w-[130px] bg-white mx-auto"
                            >
                               </div>
                            <h1 className="font-mono [font-size:2cqw] font-black text-white  uppercase tracking-tighter text-center">
                                {decodeHtml(acf.project_description)}
                            </h1>
                        </div>
                    </motion.div>

                    {/* 3. Optional: Subtle scanline overlay to match your developer vibe */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,0,0.03))] bg-[length:100%_4px,3px_100%] opacity-20 group-hover:opacity-0 transition-opacity" />
                    </div>

                {/* Tech Stack Box */}
                <BentoItem className={`bg-zinc-900 rounded-3xl p-6 text-white flex flex-col justify-center transition-all duration-300 ${
                    hasSnippet 
                        ? "md:col-span-1 h-full" 
                        : "md:col-span-2 h-[152px]" 
                }`}>
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tag: any, index: number) => (
                                <motion.span 
                                    key={tag.id}
                                    // Breathing animation
                                    animate={{
                                        y: [0, -2, 0], // Subtle lift (less than the big boxes)
                                        x: [0, 20, 0],
                                    }}
                                    transition={{
                                        duration: 30 + (index % 4), // Randomized duration
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        ease: "easeInOut",
                                        delay: index * 0.2, // Staggered start times
                                    }}
                                    className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full text-black/90 shadow-sm ${getTagTheme(tag.name)}`}
                                >
                                    {tag.name}
                                </motion.span>
                            ))}
                        </div>
                </BentoItem>

                {/* Lightbox Trigger */}
                <BentoItem 
                    className={`group relative cursor-pointer rounded-3xl overflow-hidden bg-zinc-800 transition-all duration-300 ${
                    hasSnippet 
                        ? "md:col-span-1 h-full" 
                        : "md:col-span-2 h-[152px]"
                    }`}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <img src={acf.preview_crop?.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-1 text-white text-xs text-center font-bold uppercase leading-normal underline">View Full Screenshot</span>
                    </div>
                </BentoItem>

                {/* Snippet Text only show if not empty */}
                {acf.snippet_text && acf.snippet_text.trim() !== "" && (
                <BentoItem 
                    onClick={() => setIsSnippetExpanded(!isSnippetExpanded)}                
                    className={`md:col-span-2 md:col-start-3 bg-black/60 border-2 border-emerald-500/20 backdrop-blur-sm rounded-3xl p-6 pb-7 flex flex-col justify-between cursor-pointer relative group transition-[max-height,border-color,background-color] duration-500 ease-in-out hover:border-emerald-500 hover:bg-black/80 ${
                        isSnippetExpanded ? "max-h-[500px]" : "max-h-[110px]"
                    }`}
                >
                    {/* Speech Bubble Arrow Tail */}
                    <div className="absolute left-[-7px] top-12 w-3 h-3 bg-black rotate-45 z-10 transition-colors duration-500 ease-in-out
                        border-l-2 border-b-2 border-emerald-500/20
                        group-hover:border-emerald-500" 
                    />

                    {/* Text Container - FIX: Kept overflow-hidden permanently and animated its max-height */}
                    <div 
                        className={`relative z-20 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                            isSnippetExpanded ? "max-h-[400px]" : "max-h-[104px]"
                        }`}
                    >
                        <p className="text-emerald-400 text-xs md:text-sm italic leading-relaxed font-medium">
                            "{acf.snippet_text}"
                        </p>
                    </div>

                    {/* Interactive Hint Indicator */}
                    <div className="absolute bottom-[2px] right-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">
                        <span>{isSnippetExpanded ? "Collapse" : "Expand Summary"}</span>
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