"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressStepper from "./ProgressStepper";
import { RenderContent } from "./RenderContent";
import BentoItem from "./BentoItem";

export default function ProjectDetailsSwitcher({ acf, title }: { acf: any, title: string }) {
    const [activeTab, setActiveTab] = useState("problem");

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-zinc-800 pt-16 min-h-[600px]">
            {/* Sidebar with Stepper */}
            <aside className="md:col-span-4 self-start">
                <h1 className="font-mono text-4xl font-black mb-4 text-white uppercase">{title}</h1>
                
                {/* We pass the state to the Stepper so it knows which icon to light up */}
                <ProgressStepper activeId={activeTab} onSelect={setActiveTab} />
            </aside>

            {/* The Content Area */}
            <div className="md:col-span-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Logic to render different types of content */}
                        {activeTab === "problem" && (
                            <section>
                                <h2 className="font-mono text-xl font-bold text-white mb-6 uppercase">The Problem</h2>
                                <RenderContent html={acf.problem} />
                            </section>
                        )}

                        {activeTab === "goal" && (
                            <section>
                                <h2 className="font-mono text-xl font-bold text-white mb-6 uppercase">The Goal</h2>
                                <BentoItem className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
                                    <ul className="space-y-4">
                                        {/* You can map your requirements here */}
                                        <li className="flex items-start gap-3 text-sm text-zinc-300">
                                            <span className="text-white-500 font-bold">•</span>
                                            <RenderContent html={acf.goal} />
                                        </li>
                                    </ul>
                                </BentoItem>
                            </section>
                        )}


                        {activeTab === "reqs" && (
                            <section>
                                <h2 className="font-mono text-xl font-bold text-white mb-6 uppercase">Core Requirements</h2>
                                <BentoItem className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
                                    <ul className="space-y-4">
                                        {/* You can map your requirements here */}
                                        <li className="flex items-start gap-3 text-sm text-zinc-300">
                                            <span className="text-white-500 font-bold">•</span>
                                            <RenderContent html={acf.core_requirements} />
                                        </li>
                                    </ul>
                                </BentoItem>
                            </section>
                        )}

                        {activeTab === "solution" && (
                             <section>
                                <h2 className="font-mono text-xl font-bold text-white mb-6 uppercase">The Solution</h2>
                                <RenderContent html={acf.solution} />
                             </section>
                        )}

                        {activeTab === "results" && (
                             <section>
                                <h2 className="font-mono text-xl font-bold text-white mb-6 uppercase">The Solution</h2>
                                <RenderContent html={acf.results} />
                             </section>
                        )}
                        
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}