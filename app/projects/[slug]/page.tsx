import { getProjectBySlug } from "@/lib/wp";
import { notFound } from "next/navigation";
import ProjectGallery from "@/app/components/ProjectGallery";
import { RenderContent } from "@/app/components/RenderContent";  // Move your helper to a file

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
            {/* Pass only the necessary data to the Client Component */}
            <ProjectGallery project={project} />

            {/* Case Study Content stays on the Server */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-zinc-800 pt-16">
                <div className="md:col-span-4">
                    <h1 className="text-4xl font-black mb-4 text-white">{title.rendered}</h1>
                    <div className="h-1 w-20 bg-blue-600 mb-8" />
                    <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Project Details</p>
                    <p className="text-zinc-400 mt-2">{acf.project_description}</p>
                </div>

                <div className="md:col-span-8 space-y-16">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">The Problem</h2>
                        <RenderContent html={acf.problem} />
                    </section>
                    
                    <section>
                        <h2 className="text-xl font-bold text-blue-600 mb-4 uppercase tracking-tighter">The Solution</h2>
                        <RenderContent html={acf.solution} />
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-blue-600 mb-4 uppercase tracking-tighter">Results & Impact</h2>
                        <RenderContent html={acf.results} />
                    </section>
                </div>
            </div>
        </main>
    );
}