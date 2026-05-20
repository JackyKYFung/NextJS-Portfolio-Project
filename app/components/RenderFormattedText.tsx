import React from "react";
import { motion } from "framer-motion";

export const RenderFormattedText = ({ text }: { text?: string }) => {
    if (!text) return null;

    // render if it is paragraph
    if (text.startsWith("p:")) {
        // 1. Strip the indicator prefix and split the text by newlines
        const paragraphs = text
            .replace("p:", "")
            .split('\n')
            .filter(paragraph => paragraph.trim() !== ""); // Remove empty lines

        return (
            /* 1. Added group/reading-block to establish our reading hover matrix zone */
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

    // render this if it is list
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
                            /* 1. Added 'group/list-item' right here to track per-line hover states */
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
                                        {/* 3. FIXED: Changed 'group-hover/list-block:hover:!text-white' to track the list-item group instead */}
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
}