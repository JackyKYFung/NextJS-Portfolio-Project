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
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-center">
                
                {/* Left side: Image div */}
                <div className="lg:order-1 lg:col-span-3 relative w-full min-h-[350px] h-[350px] lg:min-h-[475px] lg:h-[475px] md:h-[400px] md:min-h-[400px] rounded-2xl overflow-hidden bg-black shadow-lg border">
                    <Image 
                        key={activePost.id} 
                        src={activePost.src} 
                        alt={activePost.alt} 
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw" 
                        className="object-contain lg:object-cover animate-in fade-in blur-in duration-700"
                        priority 
                    />
                </div>

                {/* Right side: Controls & Instruction */}
                <div className="lg:order-2 lg:col-span-3 flex flex-col gap-8 justify-center">
                    
                    {/* Caption Section */}
                    <div className="order-1 lg:order-2 h-[80px] lg:h-[120px] flex flex-col justify-start lg:text-left text-center overflow-y-auto no-scrollbar">
                        {activePost?.caption && (
                            <p className="text-md font-medium text-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                "{activePost.caption}"
                            </p>
                        )}
                        <p className="text-sm text-gray-500 mt-auto pt-2">
                            Life Update — 2026
                        </p>
                    </div>

                    {/* Icon nav row */}
                    <div className="order-2 lg:order-1 flex flex-row flex-wrap lg:justify-start justify-center gap-4 pb-2 no-scrollbar">
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

                    {/* Hover instructions */}
                    <div className="order-3 lg:order-none text-sm italic text-center lg:text-left">
                        (Hover over the icons!)
                    </div>

                </div>
            </div>
        </div>
    );

}

