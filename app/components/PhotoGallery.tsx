"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MountainSnow, Coffee, Cat, Cloud, LucideIcon, Frown, Flower, Road, Train, Heart, TowerControl } from "lucide-react";

const IconMap: Record<string, LucideIcon> = {
    MountainSnow, Coffee, Cat, Cloud, Road, Flower, Train, Heart, TowerControl,
};

export default function PhotoGallery({ wpData = [] }: { wpData: any[]}) {
    
    const [shuffledUpdates, setShuffledUpdates] = useState<any[]>([]);
    const [activePost, setActivePost] = useState<any>(null);

    useEffect(() => {
    //format the data first
    const formatted = wpData.map((item) => ({
        id: item.id,
        //The ?. prevents "undefined" crash
        src: item.acf?.image?.url,
        alt: item.acf?.caption || "No Caption Provided :(",
        caption: item.acf?.caption,
        iconSlug: item.acf?.icon_slug,
        //use the slug to find component, fallback to Frown
        Icon: IconMap[item.acf?.icon_slug] || Frown,
    })).filter(post => post.src); // filter out posts that lack image

    const randomized = [...formatted].sort(() => Math.random() - 0.5);

    setShuffledUpdates(randomized);
    setActivePost(randomized[0]); // set the first time in randomized array as active

    }, [wpData]);

    // Don't render until the client has shuffled the data to avoid mismatch
    if (!shuffledUpdates.length || !activePost) return null;

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                
                {/* LEFT COLUMN: Image (60% width on desktop) */}
                <div className="lg:col-span-3 relative w-full h-[400px] md:h-[500px] lg:h-[600px] min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden bg-black shadow-lg">
                    <Image 
                        key={activePost.id} 
                        src={activePost.src} 
                        alt={activePost.alt} 
                        fill 
                        className="object-contain animate-in fade-in blur-in duration-700"
                        priority 
                    />
                </div>

                {/* RIGHT COLUMN: Controls & Text (40% width on desktop) */}
                <div className="lg:col-span-2 flex flex-col gap-8 justify-center">
                    
                    {/* ICON NAVIGATION ROW - Adjusted for sidebar alignment */}
                    <div className="flex flex-row flex-wrap lg:justify-start justify-center gap-6 pb-2 no-scrollbar">
                        {shuffledUpdates.map((post) => {
                            const isActive = activePost?.id === post.id;
                            return (
                                <button
                                    key={post.id}
                                    onClick={() => setActivePost(post)}
                                    onMouseEnter={() => setActivePost(post)}
                                    className={`transition-all duration-300 outline-none ${
                                        isActive 
                                        ? "text-white scale-110" 
                                        : "text-gray-400 hover:text-gray-600"
                                    }`}
                                >
                                    <post.Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                                </button>
                            );
                        })}
                    </div>

                    {/* CAPTION SECTION */}
                    <div className="h-[100px] lg:h-[120px] flex flex-col justify-start lg:text-left text-center overflow-y-auto no-scrollbar">
                        {activePost?.caption && (
                            <p className="text-md font-medium text-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                "{activePost.caption}"
                            </p>
                        )}
                        <p className="text-sm text-gray-500 mt-auto pt-2">
                            Life Update — 2026
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );

}

