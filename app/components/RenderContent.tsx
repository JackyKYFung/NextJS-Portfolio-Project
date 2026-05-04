import React from "react";

// 1. Move the helper to its own file 
export const RenderContent = ({ 
    html, 
    fallback = "Technical details for this section are coming soon!" 
}: { 
    html?: string; 
    fallback?: string; 
}) => {
    if (!html || html.trim() === "") {
        return (
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-dashed border-white/10">
                <p className="text-zinc-500 italic text-sm">{fallback}</p>
            </div>
        );
    }

    return (
        <div 
            className="prose prose-invert prose-blue max-w-none text-zinc-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }} 
        />
    );
};
