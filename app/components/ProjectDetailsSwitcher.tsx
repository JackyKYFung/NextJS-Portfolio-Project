"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressStepper from "./ProgressStepper";
import { RenderFormattedText } from "./RenderFormattedText";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STAGES = ["problem", "goal", "reqs", "solution", "results"];

const STAGE_LABELS: Record<string, string> = {
    problem: "The Problem",
    goal: "The Goal",
    reqs: "Core Requirements",
    solution: "The Solution",
    results: "Results & Impact"
};

export default function ProjectDetailsSwitcher({ acf, title }: { acf: any, title: string }) {
    const [activeTab, setActiveTab] = useState("problem");
    const currentIndex = STAGES.indexOf(activeTab);

    const scrollToContentTop = () => {
        const targetElement = document.getElementById("details-content");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleNext = () => {
        if (currentIndex < STAGES.length - 1) {
            setActiveTab(STAGES[currentIndex + 1]);
            scrollToContentTop();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setActiveTab(STAGES[currentIndex - 1]);
            scrollToContentTop();
        }
    };

    return (
        <div id="details-content" className="grid grid-cols-1 sm:grid-cols-12 gap-0 border-t border-zinc-800 pt-8 sm:pt-16">
            
            {/* 1. SIDEBAR STEPPER CONTAINER: Hidden on mobile, pops in at 640px and up (sm:block) */}
            <aside className="hidden sm:block sm:col-span-5 self-start">
               <ProgressStepper activeId={activeTab} onSelect={setActiveTab} />
            </aside>

            {/* Content Display Columns */}
            <div className="sm:col-span-7 text-[16px] flex flex-col justify-between">
                
                {/* 2. DYNAMIC STAGE TITLE: Displays on screens 640px or smaller (block sm:hidden) */}
                <div className="block sm:hidden mb-6 pb-2 border-b border-zinc-900">
                    <h3 className="font-mono text-lg tracking-[0.2em] uppercase font-bold text-white">
                        {STAGE_LABELS[activeTab]}
                    </h3>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex-1 text-zinc-300"
                    >
                        {activeTab === "problem" && <section><RenderFormattedText text={acf.problem} /></section>}
                        {activeTab === "goal" && <section><RenderFormattedText text={acf.goal} /></section>}
                        {activeTab === "reqs" && <section><RenderFormattedText text={acf.core_requirements} /></section>}
                        {activeTab === "solution" && <section><RenderFormattedText text={acf.solution} /></section>}
                        {activeTab === "results" && <section><RenderFormattedText text={acf.results} /></section>}
                    </motion.div>
                </AnimatePresence>

{/* 3. VERTI-STACK FOOTER NAV: Locked to screens 640px or smaller (flex sm:hidden) */}
<div className="flex flex-col gap-3 mt-3 pt-6 border-t border-zinc-900 sm:hidden">
    
    {/* NEXT BTN LAYER */}
    {currentIndex < STAGES.length - 1 && (
    <button 
        onClick={handleNext}
        className="w-full flex items-center justify-center group outline-none py-3 border-[2px] rounded-md"
    >
        <div className="inline-flex items-center">
            <span className="font-mono text-xs tracking-[0.2em] -mr-[0.2em] px-2 uppercase font-bold text-white group-active:text-white transition-colors block text-center">
                Next: {STAGE_LABELS[STAGES[currentIndex + 1]]}
            </span>

            {/* 2. RIGHT ICON */}
            <div className="w-5 flex justify-center items-center">
                <div className="relative flex items-center justify-center">
                    <ChevronRight 
                        size={18} 
                        className="text-white z-20 drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" 
                    />
                    {/* Layer 1: Tight Glow */}
                    <div className="absolute inset-0 bg-white/40 blur-[4px] rounded-full scale-115 z-10" />
                    
                    {/* Layer 2: Soft Radiant Bloom */}
                    <motion.div 
                        animate={{ opacity: [0.2, 1, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-[2] z-0" 
                    />

                    {/* Layer 3: Large Atmospheric Glow */}
                    <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-[5] -z-10" />
                </div>
            </div>
        </div>
    </button>
    )}

    {/* PREV BTN LAYER */}
    {currentIndex > 0 && (
        <button 
            onClick={handlePrev}
            className="w-full flex items-center justify-center group outline-none py-3 border-[2px] rounded-md"
        >
            <div className="inline-flex items-center">
                
                {/* 1. LEFT ICON */}
                <div className="w-5 flex justify-center items-center">
                    <div className="relative flex items-center justify-center">
                        <ChevronLeft 
                            size={18} 
                            className="text-white z-20 drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" 
                        />
                        {/* Layer 1: Tight Glow */}
                        <div className="absolute inset-0 bg-white/40 blur-[4px] rounded-full scale-115 z-10" />
                        
                        {/* Layer 2: Soft Radiant Bloom */}
                        <motion.div 
                            animate={{ opacity: [0.2, 1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-[2] z-0" 
                        />

                        {/* Layer 3: Large Atmospheric Glow */}
                        <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-[5] -z-10" />
                    </div>
                </div>

                <span className="font-mono text-xs tracking-[0.2em] -mr-[0.2em] px-2 uppercase font-bold text-white group-active:text-zinc-400 transition-colors block text-center">
                    Back to: {STAGE_LABELS[STAGES[currentIndex - 1]]}
                </span>

                {/* 2. RIGHT SYMMETRICAL SPACER: Perfectly offsets the icon on the left */}
                <div className="w-2" />
            </div>
        </button>
    )}
    
</div>

            </div>
        </div>
    );
}