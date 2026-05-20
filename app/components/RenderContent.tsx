import React from "react";

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
            /* We add the class 'focus-reading-block' so we can target it in our CSS file */
            className="prose prose-invert max-w-none text-zinc-300 leading-relaxed focus-reading-block"
            dangerouslySetInnerHTML={{ __html: html }} 
        />
    );
};