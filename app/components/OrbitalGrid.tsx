"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Mic, MapPin, Pill, HelpCircle } from "lucide-react";

// 1. Exact case-sensitive lookups from your WordPress layout string
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  "ShoppingBag": ShoppingBag,
  "Mic": Mic,
  "MapPin": MapPin,
  "Pill": Pill,
};

const COLOR_MAP: Record<string, { color: string; hoverColor: string }> = {
  blue: {
    color: "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]",
    hoverColor: "hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
  },
  purple: {
    color: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]",
    hoverColor: "hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]"
  },
  orange: {
    color: "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]",
    hoverColor: "hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]"
  },
  emerald: {
    color: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]",
    hoverColor: "hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
  }
};

interface OrbitalGridProps {
  upcomingProjects: string;
}

export default function OrbitalGrid({ upcomingProjects }: OrbitalGridProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

// 1. Split everything on the pipe symbol and trim whitespace out
  let allTokens = upcomingProjects
    ? upcomingProjects.split("|").map(t => t.trim()).filter(Boolean)
    : [];

  // 2. Group the flat tokens into sets of 4 (id, name, icon, theme)
  const UPCOMING_PROJECTS = [];
  const chunkSize = 4;
  
  for (let i = 0; i < allTokens.length; i += chunkSize) {
    const chunk = allTokens.slice(i, i + chunkSize);
    if (chunk.length === chunkSize) { // Make sure we have a complete set of 4 properties
      UPCOMING_PROJECTS.push({
        id: chunk[0],
        name: chunk[1],
        iconKey: chunk[2],
        themeKey: chunk[3].toLowerCase(),
      });
    }
  }

  const totalItems = UPCOMING_PROJECTS.length;
  const radius = 50;

  // 3. Re-map with your trigonometric positioning math equations
  const mappedProjects = UPCOMING_PROJECTS.map((project, index) => {
    const theme = COLOR_MAP[project.themeKey] || COLOR_MAP.blue;
    const angle = (index * (2 * Math.PI / totalItems)) - (Math.PI / 2);
    
    const leftPos = 50 + radius * Math.cos(angle);
    const topPos = 50 + radius * Math.sin(angle);

    return {
      id: project.id,
      name: project.name,
      icon: ICON_MAP[project.iconKey] || HelpCircle,
      color: theme.color,
      hoverColor: theme.hoverColor,
      top: `${topPos}%`,
      left: `${leftPos}%`
    };
  });

  const currentActiveData = mappedProjects.find(p => p.id === activeProject);

  return (
    <div className="w-full flex flex-col p-6 rounded-3xl bg-zinc-950/10 border-[2px] border-white backdrop-blur-sm select-none overflow-hidden">
      <div className="relative w-full h-[280px] lg:h-[300px] flex items-center justify-center group/sandbox">

        {/* 1. MOVED BACKDROP CLICK LAYER TO THE TOP (Acts as the base layer) */}
        <div className="absolute inset-0 z-10 pointer-events-auto" onClick={() => setActiveProject(null)} />

        {/* THE SINGLE GEOMETRIC TRACK RINGS */}
        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-10 group-hover/sandbox:opacity-100 transition-opacity duration-700 pointer-events-none w-[250px] h-[250px] mx-auto my-auto md:w-auto md:aspect-square z-20">
          <div className="absolute inset-0 rounded-full" style={{ border: "2px solid rgba(255, 255, 255, 0.7)" }} />
        </div>

        {/* THE DYNAMIC CENTRAL DASHBOARD HUD */}
        <div className="relative z-40 flex items-center justify-center pointer-events-auto">
          <div className="absolute w-40 aspect-square rounded-full bg-zinc-950 shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white" />
          <div className="relative w-40 aspect-square rounded-full flex items-center justify-center p-4 md:p-6 text-center overflow-hidden">
            <AnimatePresence mode="wait">
              {!activeProject ? (
                <motion.div key="default-heading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} className="flex items-center justify-center px-1">
                  <h1 className="font-bold font-mono text-md sm:text-md md:text-base text-white uppercase tracking-wider leading-snug">
                    What's cooking
                  </h1>
                </motion.div>
              ) : (
                <motion.div 
                    key={activeProject} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15, ease: "easeOut" }} 
                    className="text-md md:text-sm font-mono font-bold text-white uppercase tracking-wider leading-snug px-1">
                  {currentActiveData?.name}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ROTATION CONSTELLATION LAYER - BUMPED TO Z-40 */}
        <motion.div
          className="absolute w-[250px] h-[250px] md:w-auto md:aspect-square pointer-events-none z-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {mappedProjects.map((project) => {
            const ProjectIcon = project.icon;
            const isSelected = activeProject === project.id;
            
            return (
              <div
                key={project.id}
                className="absolute pointer-events-auto origin-center transition-all duration-500"
                style={{ top: project.top, left: project.left, transform: "translate(-50%, -50%)" }}
              >
                <motion.div animate={{ rotate: -1080 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                  <button
                    type="button"
                    aria-label={project.name}
                    className="p-3 outline-none select-none bg-transparent border-0 focus:outline-none active:scale-95 transition-transform cursor-pointer"
                    onMouseEnter={() => setActiveProject(project.id)}
                    onMouseLeave={() => setActiveProject(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(prev => prev === project.id ? null : project.id);
                    }}
                  >
                    <ProjectIcon className={`h-9 w-9 md:h-10 md:w-10 transition-all duration-300 ${isSelected ? project.color : `text-white ${project.hoverColor}`}`} />
                  </button>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}