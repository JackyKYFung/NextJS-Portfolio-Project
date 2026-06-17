import React from "react";
import { motion } from "framer-motion";


export const RenderFormattedText = ({ 
    text,
    fallback = "Technical details for this section are coming soon!"
}: { 
    text?: string;
    fallback?: string;
}) => {
    
    // 1. FALLBACK BOUNDARY: If text is undefined, null, or empty whitespace, output the dashed placeholder
    if (!text || text.trim() === "") {
        return (
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-dashed border-white/10 my-4">
                <p className="text-white italic text-sm font-mono tracking-wide">{fallback}</p>
            </div>
        );
    }

    // Render if it is paragraph format
    if (text.startsWith("p:")) {
        const paragraphs = text
            .replace("p:", "")
            .split('\n')
            .filter(paragraph => paragraph.trim() !== ""); 

        return (
            <div className="group/reading-block space-y-4 mb-4">
                {paragraphs.map((para, index) => (
                    <p 
                        key={index} 
                        className="
                            text-zinc-300 leading-relaxed
                            transition-all duration-300 ease-in-out cursor-default origin-left
                            group-hover/reading-block:text-zinc-600 hover:!text-zinc-100 hover:scale-[1.002]
                        "
                    >
                        {para.trim()}
                    </p>
                ))}
            </div>
        );
    }

    // Render this if it is list format
    if (text.startsWith("list:")) {
        const items = text.replace("list:", "").split('\n').filter(line => line.trim());
        return (
            <ul className="group/list-block space-y-6"> 
                {items.map((item, index) => {
                    const [header, ...descParts] = item.split(":");
                    const description = descParts.join(":");

                    return (
                        <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="
                                group/list-item
                                flex items-start gap-4 text-zinc-300 leading-relaxed
                                transition-all duration-300 ease-in-out cursor-default origin-left
                                group-hover/list-block:text-zinc-600
                                hover:!text-zinc-100
                            "
                        >
                            {/* The "Glowy" Bullet */}
                            <span 
                                className="
                                    mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0
                                    transition-all duration-300 ease-in-out
                                    shadow-[0_0_8px_rgba(255,255,255,0.8)]
                                    group-hover/list-block:opacity-40 group-hover/list-block:shadow-none
                                    group-hover/list-block:group-hover/list-item:opacity-100 
                                    group-hover/list-block:group-hover/list-item:shadow-[0_0_12px_rgba(255,255,255,1)]
                                    group-hover/list-block:group-hover/list-item:scale-125
                                " 
                            />
                            
                            <p>
                                {description ? (
                                    <>
                                        <span className="
                                            font-bold text-white font-mono tracking-tight mr-1 
                                            transition-colors duration-300 
                                            group-hover/list-block:text-zinc-500 
                                            group-hover/list-block:group-hover/list-item:!text-white
                                        ">
                                            {header.trim()}:
                                        </span>
                                        {description.trim()}
                                    </>
                                ) : (
                                    item.trim()
                                )}
                            </p>
                        </motion.li>
                    );
                })}
            </ul>
        );
    }

    // 2. SAFETY RECOVERY CATCH: If string exists but lacks a "p:" or "list:" prefix modifier, 
    // fall back to rendering it as a standard paragraph block so text doesn't vanish entirely.
    return (
        <div className="group/reading-block mb-4">
            <p className="text-zinc-300 leading-relaxed transition-all duration-300 ease-in-out cursor-default origin-left group-hover/reading-block:text-zinc-600 hover:!text-zinc-100">
                {text.trim()}
            </p>
        </div>
    );
};