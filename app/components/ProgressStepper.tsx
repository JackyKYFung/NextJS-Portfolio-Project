"use client";

import { motion } from "framer-motion";
import { Search, Target, ListChecks, Cpu, Zap } from "lucide-react";

// 1. Define the steps array outside the component so it's accessible
const steps = [
  { id: "problem", icon: Search, label: "The Problem" },
  { id: "goal", icon: Target, label: "The Goal" },
  { id: "reqs", icon: ListChecks, label: "Core Requirements" },
  { id: "solution", icon: Cpu, label: "The Solution" },
  { id: "results", icon: Zap, label: "Results & Impact" },
];

export default function ProgressStepper({ 
  activeId, 
  onSelect 
}: { 
  activeId: string; 
  onSelect: (id: string) => void; 
}) {
  return (
    <nav className="flex flex-col gap-8">
      {steps.map((step) => {
        const isActive = activeId === step.id;
        
        return (
          <button
            key={step.id}
            onClick={() => onSelect(step.id)}
            className={`flex items-center gap-4 transition-all duration-300 text-left outline-none ${
              isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
            }`}
          >
            <div className="relative">
              {/* Note: We use step.icon as a component */}
              <step.icon 
                size={20} 
                className={`transition-all duration-500 ${
                  isActive ? "text-white-500 scale-125" : "text-zinc-400"
                }`}
              />
              
              {/* The Glow effect */}
              {isActive && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-white-500/80 blur-lg rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
            
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-white">
              {step.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}