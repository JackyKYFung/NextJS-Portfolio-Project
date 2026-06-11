"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Atom, FingerprintPattern, Ghost, HeartHandshake, Hamburger, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { triggerContactSlider } from "@/app/components/RootClientWrapper";
import { isExternal } from 'util/types';

export function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Current Page Display on Mobile
    const getCurrentPageIndicator = () => {
        switch (pathname) {
            case "/about":
                return (
                    <div className="flex items-center gap-1 text-md font-bold font-mono text-white  px-3 py-1 rounded-md border border-[2px] backdrop-blur-md">
                        <span>AB</span>
                        <FingerprintPattern className="w-[1.2em] h-[1.2em] stroke-[2.5]" />
                        <span>UT</span>
                    </div>
                );
            case "/projects":
                return (
                    <div className="flex items-center gap-1 text-md font-bold font-mono text-white  px-3 py-1 rounded-md border border-[2px] backdrop-blur-md">
                        <span>PR</span>
                        <Atom className="w-[1.2em] h-[1.2em] stroke-[2.5]" />
                        <span>JECTS</span>
                    </div>
                );
            default:
                return null;
        }
    };

    // Grouping text-left, text-right, icons, element types (link/buttons) 
    // and action types into one array for organization
    const navItems = [
        { href: '/about', labelLeft: 'AB', labelRight: 'UT', icon: FingerprintPattern, type: 'link' },
        { href: '/projects', labelLeft: 'PR', labelRight: 'JECTS', icon: Atom, type: 'link' },
        { id: 'contact', labelLeft: 'C', labelRight: 'NTACT', icon: HeartHandshake, type: 'button', action: triggerContactSlider },
        { href: 'https://jfunki.com/wp-content/uploads/2026/06/Jacky-Fung-Resume-Web-Developer.pdf', labelLeft: 'MY RESU', labelRight: 'É', icon: Ghost, type: 'link', isExternal: true }
    ];

    return (
        <header className="relative w-full mb-[30px] z-50">
            {/* CORE GRID DESKTOP + MOBILE NAVIGATION BAR CONTAINER */}
            <div className="flex justify-between items-center w-full h-12">
                
                {/* Desktop Logo */}
                <div className="font-bold text-2xl z-50 font-mono tracking-tight">
                    <Link href={'/'} onClick={() => setIsMobileMenuOpen(false)}>jfunki</Link>
                </div>

                {/* Page indicator on Mobile Layout */}
                <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-50">
                    {!isMobileMenuOpen && getCurrentPageIndicator()}
                </div>

                {/* Standard Desktop Navbar */}
                <nav className="hidden md:block">
                    <ul className="flex gap-7 items-center">
                        {navItems.map((item, index) => {
                            const IconComponent = item.icon;
                            // Cleaned up active conditions to strip internal state tracking
                            const isActive = pathname === item.href;
                            
                            if (item.type === 'link' && item.href) {
                                return (
                                    <li key={index}>
                                        <Link 
                                            href={item.href} 
                                            target={item.isExternal ? "_blank" : undefined}
                                            rel={item.isExternal ? "noopener noreferrer" : undefined}
                                            className={`relative transition-all duration-200 flex items-center group p-3 pt-0 text-sm ${isActive ? "text-white font-black" : "opacity-80 hover:opacity-100"}`}>
                                            <span className={`grid transition-all duration-300 ease-out ${isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"}`}>
                                                <span className="overflow-hidden whitespace-nowrap">{item.labelLeft}</span>
                                            </span>
                                            <IconComponent className="w-[1.3em] h-[1.3em] stroke-[2.5] text-current mx-[2px] shrink-0" />
                                            <span className={`grid transition-all duration-300 ease-out ${isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"}`}>
                                                <span className="overflow-hidden whitespace-nowrap">{item.labelRight}</span>
                                            </span>
                                        </Link>
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={index}>
                                        <button onClick={item.action} className={`relative transition-all duration-200 flex items-center group p-3 pt-0 cursor-pointer text-sm opacity-80 hover:opacity-100`}>
                                            <span className={`grid transition-all duration-300 ease-out ${isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"}`}>
                                                <span className="overflow-hidden whitespace-nowrap">{item.labelLeft}</span>
                                            </span>
                                            <IconComponent className="w-[1.3em] h-[1.3em] stroke-[2.5] text-current mx-[2px] mb-[1px] shrink-0" />
                                            <span className={`grid transition-all duration-300 ease-out ${isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0 group-hover:grid-cols-[1fr] group-hover:opacity-100"}`}>
                                                <span className="overflow-hidden whitespace-nowrap">{item.labelRight}</span>
                                            </span>
                                        </button>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </nav>

                {/* Burger menu icon on mobile */}
                <div className="md:hidden z-50">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation menu layer"
                        className="p-2 text-white/90 hover:text-white focus:outline-none transition-transform active:scale-95 cursor-pointer"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-7 h-7 stroke-[2]" />
                        ) : (
                            <Hamburger className="w-7 h-7 stroke-[2] hover:scale-115 transition-all" /> 
                        )}
                    </button>
                </div>
            </div>

            {/* Blurred backdrop overlay when slider is open*/}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="fixed inset-0 w-screen h-screen bg-zinc-950/80 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-6 md:hidden"
                    >
                        <nav className="w-full max-w-xs">
                            <motion.ul 
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                                }}
                                className="flex flex-col gap-6 items-center justify-center w-full"
                            >
                                {navItems.map((item, index) => {
                                    const IconComponent = item.icon;
                                    const isItemActive = pathname === item.href;

                                    const childAnimationVariants = {
                                        open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
                                        closed: { opacity: 0, y: 15, scale: 0.98 }
                                    };

                                    if (item.type === 'link' && item.href) {
                                        return (
                                            <motion.li key={index} variants={childAnimationVariants} className="w-full text-center">
                                                <Link 
                                                    href={item.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                                                    target={item.isExternal ? "_blank" : undefined}
                                                    className={`flex items-center justify-center text-2xl font-bold font-mono py-3 border-b border-white/5 w-full ${isItemActive ? "text-white" : "text-zinc-400"}`}
                                                >
                                                    <span>{item.labelLeft}</span>
                                                    <IconComponent className={`w-[1.1em] h-[1.1em] stroke-[2.5] mx-1 shrink-0 ${isItemActive ? "text-white" : "text-zinc-500"}`} />
                                                    <span>{item.labelRight}</span>
                                                </Link>
                                            </motion.li>
                                        );
                                    } else {
                                        return (
                                            <motion.li key={index} variants={childAnimationVariants} className="w-full text-center">
                                                <button 
                                                    onClick={() => {
                                                        setIsMobileMenuOpen(false);
                                                        if (item.action) item.action();
                                                    }}
                                                    className="flex items-center justify-center text-2xl font-bold font-mono py-3 border-b border-white/5 w-full text-zinc-400 cursor-pointer"
                                                >
                                                    <span>{item.labelLeft}</span>
                                                    <IconComponent className="w-[1.1em] h-[1.1em] stroke-[2.5] mx-1 text-zinc-500 shrink-0" />
                                                    <span>{item.labelRight}</span>
                                                </button>
                                            </motion.li>
                                        );
                                    }
                                })}
                            </motion.ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}