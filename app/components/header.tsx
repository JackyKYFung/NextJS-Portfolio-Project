"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Atom, FingerprintPattern, HeartHandshake } from "lucide-react";
import ContactDrawer from "@/app/components/ContactSlider"; // Adjust paths based on your folder structure

export function Header() {
    const pathname = usePathname();
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <header className="flex justify-between mb-[30px] content-center">
            <div className="font-bold text-2xl">
                <Link href={'/'}>jfunki</Link>
            </div>

            <nav>
                <ul className="flex gap-7 items-center">
                    
                    {/* ABOUT MENU ITEM */}
                    <li>
                        <Link 
                            href='/about'
                            className={`relative transition-all duration-200 flex items-center group pb-1 ${pathname === "/about" ? "text-white font-bold text-md" : "opacity-80 hover:opacity-100"}`}
                        >
                            {/* LEFT SIDE LETTERS */}
                            <span className={`grid transition-all duration-300 ease-out ${
                                pathname === "/about" 
                                    ? "grid-cols-[1fr] opacity-100" 
                                    : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"
                            }`}>
                                <span className="overflow-hidden whitespace-nowrap">AB</span>
                            </span>
                            
                            {/* CORE ICON ANCHOR */}
                            <FingerprintPattern className="w-[1em] h-[1em] stroke-[2.5] text-current mx-[2px] mb-[3px] shrink-0" />
                            
                            {/* RIGHT SIDE LETTERS */}
                            <span className={`grid transition-all duration-300 ease-out ${
                                pathname === "/about" 
                                    ? "grid-cols-[1fr] opacity-100" 
                                    : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"
                            }`}>
                                <span className="overflow-hidden whitespace-nowrap">UT</span>
                            </span>

                            <span 
                                className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 origin-left ${
                                    pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
                                }`} 
                            />
                        </Link>
                    </li>

                    {/* PROJECTS MENU ITEM */}
                    <li>
                        <Link 
                            href='/projects'
                            className={`relative transition-all duration-200 flex items-center group pb-1 ${pathname === "/projects" ? "text-white font-bold" : "opacity-80 hover:opacity-100"}`}
                        >
                            {/* LEFT SIDE LETTERS */}
                            <span className={`grid transition-all duration-300 ease-out ${
                                pathname === "/projects" 
                                    ? "grid-cols-[1fr] opacity-100" 
                                    : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"
                            }`}>
                                <span className="overflow-hidden whitespace-nowrap">PR</span>
                            </span>

                            {/* CORE ICON ANCHOR */}
                            <Atom className="w-[1em] h-[1em] stroke-[2.5] text-current mx-[2px] mb-[3px] shrink-0" />
                            
                            {/* RIGHT SIDE LETTERS */}
                            <span className={`grid transition-all duration-300 ease-out ${
                                pathname === "/projects" 
                                    ? "grid-cols-[1fr] opacity-100" 
                                    : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"
                            }`}>
                                <span className="overflow-hidden whitespace-nowrap">JECTS</span>
                            </span>

                            <span 
                                className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 origin-left ${
                                    pathname === "/projects" ? "w-full" : "w-0 group-hover:w-full"
                                }`} 
                            />
                        </Link>
                    </li>

                    {/* CONTACT MENU ITEM */}
                    <li>
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className={`relative transition-all duration-200 flex items-center group pb-1 cursor-pointer ${isContactOpen ? "text-white font-bold" : "opacity-80 hover:opacity-100"}`}
                        >
                            {/* LEFT SIDE LETTERS */}
                            <span className={`grid transition-all duration-300 ease-out  ${
                                isContactOpen 
                                    ? "grid-cols-[1fr] opacity-100" 
                                    : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"
                            }`}>
                                <span className="overflow-hidden whitespace-nowrap">C</span>
                            </span>

                            {/* CORE ICON ANCHOR */}
                            <HeartHandshake className="w-[1em] h-[1em] stroke-[2.5] text-current mx-[2px] mb-[3px] shrink-0" />
                            
                            {/* RIGHT SIDE LETTERS */}
                            <span className={`grid transition-all duration-300 ease-out ${
                                isContactOpen 
                                    ? "grid-cols-[1fr] opacity-100" 
                                    : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"
                            }`}>
                                <span className="overflow-hidden whitespace-nowrap">NTACT</span>
                            </span>

                            <span 
                                className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 origin-left ${
                                    isContactOpen ? "w-full" : "w-0 group-hover:w-full"
                                }`} 
                            />
                        </button>
                    </li>

                </ul>
            </nav>

            {/* THE DRAWER COMPONENT HOOK */}
            <ContactDrawer 
                isOpen={isContactOpen} 
                onClose={() => setIsContactOpen(false)} 
            />                        

        </header>
    );
}