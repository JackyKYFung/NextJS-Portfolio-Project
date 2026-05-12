"use client";

import { useState } from "react";
import BentoItem from "./BentoItem";
import Lightbox from "./Lightbox";
import { getTagTheme } from "@/lib/tags";
import { motion } from "framer-motion";

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
                            x: [0, 90, -90, 90, -80, 90, 0], 
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
                        <div className="px-6 py-4 rounded-xl max-w-[200px]">
                        <h1 className="font-mono text-2xl font-black text-white  uppercase tracking-tighter text-center">
                            {project.title.rendered}
                        </h1>
                        </div>
                    </motion.div>

                    {/* 3. Optional: Subtle scanline overlay to match your developer vibe */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,0,0.03))] bg-[length:100%_4px,3px_100%] opacity-20 group-hover:opacity-0 transition-opacity" />
                    </div>

                {/* Tech Stack Box */}
                <BentoItem className="bg-zinc-900 rounded-3xl p-3 text-white flex flex-col justify-center">
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tag: any, index: number) => (
                                <motion.span 
                                    key={tag.id}
                                    // Breathing animation
                                    animate={{
                                        y: [0, -2, 0], // Subtle lift (less than the big boxes)
                                    }}
                                    transition={{
                                        duration: 4 + (index % 4), // Randomized duration
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
                    className="group relative cursor-pointer rounded-3xl overflow-hidden bg-zinc-800"
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <img src={acf.preview_crop?.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase underline">View Full Screenshot</span>
                    </div>
                </BentoItem>

                <BentoItem className="md:col-span-2 bg-blue-50 rounded-3xl p-8 flex items-center">
                    <p className="text-blue-900 text-lg italic leading-relaxed font-medium">"{acf.snippet_text}"</p>
                </BentoItem>
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