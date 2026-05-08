"use client";
import { useState } from "react";
import Image from "next/image";
import { MountainSnow, Coffee, Cat, Hotel, Cloud, LucideIcon, Frown } from "lucide-react";

const IconMap: Record<string, LucideIcon> = {
    mountainsnow: MountainSnow,
    coffee: Coffee,
    cat: Cat,
    hotel: Hotel,
    cloud: Cloud,
};

export default function PhotoGallery({ wpData = [] }: { wpData: any[]}) {
    
    console.log("First item ACF data:", wpData[0]?.acf);
    // Format incoming WP data
    const photos = wpData.map((item) => ({
        id: item.id,
        //The ?. prevents "undefined" crash
        src: item.acf?.image?.url,
        alt: item.acf?.caption || "No Caption Provided :(",
        //use the slug to find component, fallback to Frown
        Icon: IconMap[item.acf?.icon_slug] || Frown,
    }));

    const [activePhoto, setActivePhoto] = useState(photos[0]);

    if (!photos.length) return null;

    return (
        <div>
            <div className="relative h-64 w-full overflow-hidden rounded-xl"> 
                <Image 
                    src={activePhoto.src} 
                    alt={activePhoto.alt} 
                    fill 
                    className="object-cover" 
                    loading="eager"
                />
                
                <activePhoto.Icon className="absolute top-2 right-2 z-10" />
            </div>
        </div>
    );



}

