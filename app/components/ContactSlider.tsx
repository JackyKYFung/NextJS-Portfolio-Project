"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ContactSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactInputs {
  name: string;
  email: string;
  message: string;
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

export default function ContactSlider({ isOpen, onClose }: ContactSliderProps) {

  // Locks scroll on main page when slider is open 
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

  // Core form utilities
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset
  } = useForm<ContactInputs>();

  // form validation success
  const onSubmit: SubmitHandler<ContactInputs> = (data) => {
    console.log("Form submission successful!");
    
    reset();
    onClose();
  }

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

{/* 2. DRAWER CONTAINER */}
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ 
    x: "100%",
    transition: { type: "tween", ease: "easeInOut", duration: 0.3 } // <-- Handles exit timing cleanly
  }}
  transition={{ type: "spring", damping: 30, stiffness: 260 }} // <-- Stable spring config for entering
  className="fixed right-0 top-0 z-50 h-full w-full md:max-w-md bg-zinc-950 border-l border-zinc-800 text-white p-6 md:p-8 flex flex-col pointer-events-auto shadow-2xl"
>
  
{/* STICKY TOP ESCAPE HATCH (Exit-Only Rotation Mechanics) */}
<div className="flex items-center justify-between pb-6 border-b border-zinc-800">
  <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-emerald-400 font-bold">
    Connect Hub
  </h2>
  
  <button
    onClick={onClose}
    className="transition-all duration-300 hover:scale-110 cursor-pointer text-zinc-500 hover:text-emerald-400 outline-none -mr-1"
    aria-label="Close panel"
  >
    <motion.div
      // 1. Force it to start at -180 (pointing left) immediately on mount
      initial={{ rotate: -180 }} 
      // 2. Sit at -180 while open; only transition to 0 (pointing right) on close
      animate={{ 
        rotate: isOpen ? -180 : 0     
      }}
      transition={{ 
        type: "tween", 
        ease: "easeInOut", 
        duration: 0.35,
        delay: 0 // Fires instantly on click to maximize the visual feedback
      }}
      className="flex items-center justify-center"
    >
      <X className="h-6 w-6" />
    </motion.div>
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
            <div className="flex items-center gap-4">
              
              {/* LinkedIn Icon Button */}
              <a
                href="https://linkedin.com" // Update with your actual URL
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 cursor-pointer text-zinc-500 hover:text-white"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-6 w-6 transition-colors duration-300" />
              </a>

              {/* Email Icon Button */}
              <a
                href="mailto:hello@jfunki.com"
                className="transition-all duration-300 hover:scale-110 cursor-pointer text-zinc-500 hover:text-white"
                aria-label="Send Email"
              >
                <Mail className="h-6 w-6 transition-colors duration-300" />
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* NAME FIELD */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm"
                    />
                    {errors.name && (
                        <span className="text-xs font-mono text-red-400 mt-1">{errors.name.message}</span>
                    )}
                </div>

                {/* EMAIL FIELD */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Email</label>
                    <input
                        type="email"
                        {...register("email", { 
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm"
                    />
                    {errors.email && (
                        <span className="text-xs font-mono text-red-400 mt-1">{errors.email.message}</span>
                    )}
                </div>

                {/* MESSAGE FIELD */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Message</label>
                    <textarea
                        rows={5}
                        {...register("message", { required: "Please write a short message" })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm resize-none"
                    />
                    {errors.message && (
                        <span className="text-xs font-mono text-red-400 mt-1">{errors.message.message}</span>
                    )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="w-full cursor-pointer bg-white text-black font-mono uppercase font-bold text-sm tracking-widest p-4 rounded-lg hover:bg-zinc-200 transition-colors pt-3"
                >
                    Send Message
                </button>

            </form>

            </div>

            {/* SAFE EXTRA BOTTOM PADDING FOR MOBILE DEVICE VIEWPORT NAVIGATION SHEETS */}
            <div className="h-6 md:h-0 w-full bg-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}