"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Mic, MapPin, Pill } from "lucide-react";

const UPCOMING_PROJECTS = [
  { id: "bag", name: "Bag Catalog App", icon: ShoppingBag, color: "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]", hoverColor: "hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]", top: "0%", left: "50%" },
  { id: "studio", name: "Recording Studio App", icon: Mic, color: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]", hoverColor: "hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]", top: "50%", left: "100%" },
  { id: "maps", name: "Drink Mapping Engine", icon: MapPin, color: "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]", hoverColor: "hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]", top: "100%", left: "50%" },
  { id: "tracker", name: "Medicine Tracker Mobile", icon: Pill, color: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]", hoverColor: "hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]", top: "50%", left: "0%" },
];

export default function OrbitalGrid() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const currentActiveData = UPCOMING_PROJECTS.find(p => p.id === activeProject);

  return (
    /* OUTER WRAPPER: Handles the bento-box background, borders, and pads the elements away from the edges */
    <div className="w-full flex flex-col p-6 md:p-6 rounded-3xl bg-zinc-950/10 border-[2px] border-white backdrop-blur-sm select-none overflow-hidden">
      
      {/* CANVAS VIEWPORT (Maintains your exact flexbox configurations & scaling layout math) */}
      <div className="relative w-full h-[280px] lg:h-[300px] flex items-center justify-center group/sandbox">

        {/* THE SINGLE GEOMETRIC TRACK RINGS */}
        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-10 group-hover/sandbox:opacity-100 transition-opacity duration-700 pointer-events-none
          w-[150px] h-[150px] mx-auto my-auto md:w-auto md:h-[85%] md:aspect-square"
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{ 
              border: "2px solid rgba(255, 255, 255, 0.7)",
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' rx='9999px' fill='none'`,
              backgroundPosition: "center",
              backgroundSize: "cover"
            }}
          />
        </div>

        {/* THE DYNAMIC CENTRAL DASHBOARD HUD */}
        <div className="relative z-40 flex items-center justify-center pointer-events-auto">
          <div className="absolute w-28 md:w-40 aspect-square rounded-full bg-zinc-950 shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white" />
          
          <div className="relative w-28 md:w-40 aspect-square rounded-full flex items-center justify-center p-4 md:p-6 text-center overflow-hidden">
            <AnimatePresence mode="wait">
              {!activeProject ? (
                /* DEFAULT ACTIVE STATE: Shows your section identity header when resting */
                <motion.div
                  key="default-heading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center px-1"
                >
                  <h1 className="font-bold font-mono text-xs sm:text-sm md:text-base text-white uppercase tracking-wider leading-snug">
                    What's cooking
                  </h1>
                </motion.div>
              ) : (
                /* HOVERED ACTIVE STATE: Smoothly morphs to reveal the focused project metrics */
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="text-xs md:text-sm font-mono font-bold text-white uppercase tracking-wider leading-snug px-1"
                >
                  {currentActiveData?.name}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ROTATION CONSTELLATION LAYER */}
        <motion.div
          className="absolute w-[150px] h-[150px] md:w-auto md:h-[85%] md:aspect-square pointer-events-none z-30"
          animate={{ rotate: 360 }}
          transition={{
            duration: 40, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {UPCOMING_PROJECTS.map((project) => {
            const ProjectIcon = project.icon;
            const isSelected = activeProject === project.id;
            
            return (
              <div
                key={project.id}
                className="absolute pointer-events-auto origin-center"
                style={{ 
                  top: project.top, 
                  left: project.left,
                  transform: "translate(-50%, -50%)"
                }}
              >
                {/* PLANET SELF-ROTATION ENGINE */}
                <motion.div
                  animate={{ rotate: -1080 }}
                  transition={{
                    duration: 40, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <button
                    type="button"
                    aria-label={project.name}
                    className="p-3 outline-none select-none bg-transparent border-0 focus:outline-none active:scale-95 transition-transform"
                    onMouseEnter={() => setActiveProject(project.id)}
                    onMouseLeave={() => setActiveProject(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(prev => prev === project.id ? null : project.id);
                    }}
                  >
                    <ProjectIcon 
                      className={`h-9 w-9 md:h-10 md:w-10 transition-all duration-300 ${
                        isSelected 
                          ? project.color 
                          : `text-white ${project.hoverColor}`
                      }`} 
                    />
                  </button>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Reset view fallback when tapping empty card canvas space */}
        <div 
          className="absolute inset-0 z-10 pointer-events-auto" 
          onClick={() => setActiveProject(null)} 
        />

      </div>
    </div>
  );
}