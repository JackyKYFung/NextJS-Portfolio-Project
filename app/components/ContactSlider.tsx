"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight } from "lucide-react";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LinkedinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactSlider({ isOpen, onClose }: ContactDrawerProps) {
  
  // LOCK SCROLL: Prevents the background portfolio page from scrolling 
  // underneath the drawer while it's open (crucial for mobile UX!)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. BACKDROP: Dims out the main workspace on desktop, click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* 2. DRAWER CONTAINER: Mobile=Full screen, Desktop=Slick side panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 h-full w-full md:max-w-md bg-zinc-950 border-l border-zinc-800 text-white p-6 md:p-8 flex flex-col pointer-events-auto shadow-2xl"
          >
            {/* STICKY TOP ESCAPE HATCH */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-emerald-400 font-bold">
                Connect Hub
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white outline-none"
                aria-label="Close panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* SCROLLABLE BODY LAYER (overflow-y-auto enables safe mobile keyboard handling) */}
            <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-1 scrollbar-thin">
              
              {/* INTRO TEXT */}
              <div>
                <h3 className="text-2xl font-bold font-mono tracking-tight mb-2">
                  Let's build something epic.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Whether you have an upcoming project blueprint, a recruitment pipeline opening, or just want to chat full-stack architecture—drop a line.
                </p>
              </div>

              {/* DIRECT CONNECT LINKS (Built-in anti-spam ecosystem) */}
              <div className="grid grid-cols-1 gap-3">
                <a
                  href="https://linkedin.com" // Update with your actual URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-950/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="h-5 w-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm font-medium tracking-wide">LinkedIn Profile</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Secure Text Obfuscation for Direct Copy */}
                <a
                  href="mailto:hello@jfunki.com" // Switch to mailto link
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-950/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                    {/* Humans read this fine, simple bots struggle to pick up raw regex hooks */}
                    <span className="text-sm font-medium tracking-wide">hello [at] jfunki [dot] com</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              {/* SECTION SEPARATOR */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-zinc-800"></div>
                <span className="flex-shrink mx-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                  Or leave a message
                </span>
                <div className="flex-grow border-t border-zinc-800"></div>
              </div>

              {/* PLACEHOLDER FORM CONTAINER (Where React Hook Form will live) */}
              <div className="p-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/40 text-center text-zinc-500 text-xs font-mono py-12">
                [ REACT HOOK FORM COMING SOON ]
              </div>

            </div>

            {/* SAFE EXTRA BOTTOM PADDING FOR MOBILE DEVICE VIEWPORT NAVIGATION SHEETS */}
            <div className="h-6 md:h-0 w-full bg-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}