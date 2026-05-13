"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressStepper from "./ProgressStepper";
import { RenderContent } from "./RenderContent";
import { RenderFormattedText } from "./RenderFormattedText";

export default function ProjectDetailsSwitcher({ acf, title }: { acf: any, title: string }) {
    const [activeTab, setActiveTab] = useState("problem");

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-zinc-800 pt-16">
            {/* Sidebar with Stepper */}
            <aside className="md:col-span-5 self-start">
               <ProgressStepper activeId={activeTab} onSelect={setActiveTab} />
            </aside>

            {/* The Content Area */}
            <div className="md:col-span-7 text-[16px]">
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
                               <RenderFormattedText text={acf.problem} />
                            </section>
                        )}

                        {activeTab === "goal" && (
                            <section>
                                <RenderFormattedText text={acf.goal} />
                            </section>                
                        )}

                        {activeTab === "reqs" && (
                            <section>
                                <RenderFormattedText text={acf.core_requirements} />
                            </section> 
                        )}

                        {activeTab === "solution" && (
                             <section>
                                <RenderFormattedText text={acf.solution} />
                             </section>
                        )}

                        {activeTab === "results" && (
                             <section>
                                <RenderFormattedText text={acf.results} />
                             </section>
                        )}
                        
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}