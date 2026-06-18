import { getProjectBySlug } from "@/lib/wp";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectGallery from "@/app/components/ProjectGallery";
import ProjectDetailsSwitcher from "@/app/components/ProjectDetailsSwitcher";

type Props = {
    params: Promise<{ slug: string }>;
};

// Next.js will run this automatically on the server before rendering the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {}; // Fallback to global metadata if project doesn't exist
    }

    const title = project.title?.rendered || "Project Overview";
    
    // Fallback logic: use your thumbnail/featured image, otherwise fall back to a default asset
    const imageUrl = project.featured_image_url || "https://jfunki.com/og-image.jpg";

    return {
        title: `${title} | Jacky Fung`,
        description: `Explore the development and architectural details of ${title}, built by full-stack developer Jacky Fung.`,
        openGraph: {
            title: `${title} | Jacky Fung`,
            description: `Project overview and codebase insights for ${title}.`,
            url: `https://jfunki.com/projects/${slug}`,
            siteName: "Jacky Fung Portfolio",
            images: [
                {
                    url: imageUrl,
                },
            ],
            type: "article",
        },
    };
}

export default async function ProjectDetailPage({ 
    params 
}: Props) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const { acf, title } = project;

    return (
        <main className="max-w-6xl mx-auto py-10 pt-0 sm:pt-10 animate-fade-in">
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