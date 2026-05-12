"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressStepper from "./ProgressStepper";
import { RenderContent } from "./RenderContent";
import BentoItem from "./BentoItem";

export default function ProjectDetailsSwitcher({ acf, title }: { acf: any, title: string }) {
    const [activeTab, setActiveTab] = useState("problem");

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-zinc-800 pt-16">
            {/* Sidebar with Stepper */}
            <aside className="md:col-span-5 self-start">
               <ProgressStepper activeId={activeTab} onSelect={setActiveTab} />
            </aside>

            {/* The Content Area */}
            <div className="md:col-span-7">
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
                                <RenderContent html={acf.problem} />
                            </section>
                        )}

                        {activeTab === "goal" && (
                            <section>
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
                            <ul className="space-y-6">
                                {acf.core_requirements
                                .split('\n')
                                .filter((line: string) => line.trim() !== "")
                                .map((req: string, index: number) => {
                                // Split only at the FIRST colon to separate Header from Description
                                    const [header, ...descriptionParts] = req.split(":");
                                    const description = descriptionParts.join(":"); // Rejoin in case there are other colons

                                    return (
                                        <motion.li 
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-4 text-sm text-zinc-300 leading-relaxed"
                                        >
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] shrink-0" />

                                            <p>
                                            {/* If a colon exists, bold the header. Otherwise, render the whole thing. */}
                                            {description ? (
                                            <>
                                            <span className="font-bold text-white font-mono tracking-tight mr-1">
                                                {header}:
                                            </span>
                                                {description}
                                            </>
                                            ) : (
                                            req
                                            )}
                                            </p>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        )}

                        {activeTab === "solution" && (
                             <section>
                                <RenderContent html={acf.solution} />
                             </section>
                        )}

                        {activeTab === "results" && (
                             <section>
                                <RenderContent html={acf.results} />
                             </section>
                        )}
                        
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}