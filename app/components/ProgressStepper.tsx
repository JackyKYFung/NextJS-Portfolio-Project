"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const steps = [
  { id: "problem", label: "The Problem" },
  { id: "goal", label: "The Goal" },
  { id: "reqs", label: "Core Requirements" },
  { id: "solution", label: "The Solution" },
  { id: "results", label: "Results & Impact" },
];

export default function ProgressStepper({ 
  activeId, 
  onSelect 
}: { 
  activeId: string; 
  onSelect: (id: string) => void; 
}) {
  return (
    <nav className="flex flex-col gap-2">
      {steps.map((step) => {
        const isActive = activeId === step.id;
        
        return (
          <button
            key={step.id}
            onClick={() => onSelect(step.id)}
            className="relative flex items-center group outline-none"
          >
            {/* The moving indicator */}
            <div className="w-5 pr-1 flex justify-center items-center">
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  className="relative flex items-center justify-center"
                >
                  {/* The indicator icon */}
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
                </motion.div>
              )}
            </div>

            {/* The label */}
            <span 
              className={`font-mono text-sm py-2 tracking-[0.2em] uppercase font-bold transition-all duration-500 ${
                isActive 
                  ? "text-white translate-x-1" 
                  : "text-zinc-600 group-hover:text-zinc-400"
              }`}
            >
              {step.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}