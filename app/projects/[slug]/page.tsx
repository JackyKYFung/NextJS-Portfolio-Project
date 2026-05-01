import { getProjectBySlug } from "@/lib/wp";
import { notFound } from "next/navigation";
import { getTagTheme } from "@/lib/tags";


// 1. Define the helper outside the main component to prevent re-renders
const RenderContent = ({ 
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

export default async function ProjectDetailPage({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {

    const { slug } = await params;

    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const { acf, title } = project;

    return (
        <main className="max-w-6xl mx-auto px-6 py-20 animate-fade-in">
            {/* 1. BENTO HEADER (The Dashboard) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
                
                {/* 2x2 Feature Image */}
                <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden bg-gray-100 h-[400px]">
                    <img 
                        src={acf.project_thumbnail?.url} 
                        alt={title.rendered}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 1x1 Tech Stack Box */}
                <div className="bg-gray-900 rounded-3xl p-8 text-white flex flex-col justify-center">
                    <h4 className="text-xs uppercase tracking-widest text-gray-300 mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {project._embedded?.['wp:term']?.flat().map((tag: any) => {
                            // Filter out the 'All Projects' category if it appears
                            if (tag.name === "All Projects" || tag.taxonomy === "category") return null;

                            return (
                                <span key={tag.id} 
                                className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full text-black/90 ${getTagTheme(tag.name)}`}>
                                    {tag.name}
                                </span>
                                );
                            })}
                    </div>
                </div>

                {/* 1x1 Preview Crop (Lightbox Trigger) */}
                <div className="group relative cursor-pointer rounded-3xl overflow-hidden bg-gray-200">
                    <img 
                        src={acf.preview_crop?.url} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt="Preview Detail"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase">View Full Screenshot</span>
                    </div>
                </div>

                {/* 2x1 Snippet / Description Box */}
                <div className="md:col-span-2 bg-blue-50 rounded-3xl p-8 flex items-center">
                    <p className="text-blue-900 text-lg italic leading-relaxed">
                        "{acf.snippet_text}"
                    </p>
                </div>
            </div>

            {/* 2. THE ENGINEERING CASE STUDY (The Narrative) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-gray-100 pt-16">
                
                {/* Left Sidebar: Title & Metadata */}
                <div className="md:col-span-4">
                    <h1 className="text-4xl font-black mb-4">{title.rendered}</h1>
                    <div className="h-1 w-20 bg-blue-600 mb-8" />
                    
                    {/* You could add Date or Role here */}
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Project Details</p>
                    <p className="text-gray-600 mt-2">Systems Engineering Portfolio</p>
                </div>

                {/* Right Content: Problem, Solution, Results */}
                <div className="md:col-span-8 space-y-16">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">The Problem</h2>
                        <div 
                            className="prose prose-blue max-w-none text-white leading-7"
                            dangerouslySetInnerHTML={{ __html: acf.problem }} 
                        />
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">The Solution</h2>
                        <div 
                            className="prose prose-blue max-w-none text-white leading-7"
                            dangerouslySetInnerHTML={{ __html: acf.solution }} 
                        />
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">Results & Impact</h2>
                        <div 
                            className="prose prose-blue max-w-none text-gray-white leading-7"
                            dangerouslySetInnerHTML={{ __html: acf.results }} 
                        />
                    </section>
                </div>
            </div>
        </main>
    );
}