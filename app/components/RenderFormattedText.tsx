import React from "react";
import { motion } from "framer-motion";

export const RenderFormattedText = ({ text }: {text?: string}) => {
    if (!text) return null;

    // render this if it is paragraph
    if (text.startsWith("p:")) {
        // 1. Strip the prefix and split the text by newlines
        const paragraphs = text
            .replace("p:", "")
            .split('\n')
            .filter(paragraph => paragraph.trim() !== ""); // Remove empty lines

        return (
            <div className="space-y-4 mb-4">
                {paragraphs.map((para, index) => (
                    <p 
                        key={index} 
                        className="text-zinc-300 leading-relaxed"
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
        <ul className="space-y-6"> {/* Matches your reqs spacing */}
            {items.map((item, index) => {
                const [header, ...descParts] = item.split(":");
                const description = descParts.join(":");

                return (
                    <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-4 text-zinc-300 leading-relaxed" // Added leading-relaxed
                    >
                        {/* The "Glowy" Bullet */}
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] shrink-0" />
                        
                        <p>
                            {description ? (
                                <>
                                    <span className="font-bold text-white font-mono tracking-tight mr-1">
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