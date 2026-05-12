import { getProjectBySlug } from "@/lib/wp";
import { notFound } from "next/navigation";
import ProjectGallery from "@/app/components/ProjectGallery";
import ProjectDetailsSwitcher from "@/app/components/ProjectDetailsSwitcher"; // New Component

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
        <main className="max-w-6xl mx-auto py-10 animate-fade-in">
            {/* Gallery at the top */}
            <ProjectGallery project={project} />

            {/* Pass the ACF data and Title to the Client Switcher */}
            <ProjectDetailsSwitcher 
                acf={acf} 
                title={title.rendered} 
            />
        </main>
    );
}