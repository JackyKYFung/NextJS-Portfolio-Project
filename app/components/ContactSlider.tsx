"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, SendHorizonal, Donut, CheckCircle2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendContactEmail } from "@/actions";

const colorPalettes = [
"from-red-500 to-orange-500",
  "from-orange-500 to-yellow-500",
  "from-green-400 to-cyan-500",
  "from-blue-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-400",    
];

interface ContactSliderProps {
  isOpen: boolean;
  onClose: () => void;
  contactData: {
    contact_email: string;
    linkedin_url: string;
  };
}

interface ContactInputs {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

// Manually export Linkedin icon as a function because Lucid does not have LinkedIn icon
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

export default function ContactSlider({ isOpen, onClose, contactData }: ContactSliderProps) {

  const [isSuccessfullySent, setIsSuccessfullySent] = useState(false);

  // Reset the success state back to the form structure ONLY after the drawer completely slides out of view
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setIsSuccessfullySent(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
    formState: { errors, isSubmitting }, 
    reset
  } = useForm<ContactInputs>();

  // form validation success
  const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
    
    try {
          // Dispatch the payload straight into your server action container
          const result = await sendContactEmail(data);
          
          if (result.success) {
            console.log("Full-stack transactional communication dispatched seamlessly!");
            setIsSuccessfullySent(true);
            reset();
          } else {
            // Fallback catch if fields drop or Resend fails
            alert(result.error || "The mail gateway timed out. Please try again.");
          }
        } catch (error) {
          console.error("Critical client form transmission exception thrown:", error);
          alert("A system pipeline error occurred. Check network connection status.");
        }
      };

    return (
<AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ 
              x: "100%",
              transition: { type: "tween", ease: "easeInOut", duration: 0.3 } 
            }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }} 
            className="fixed right-0 top-0 z-50 h-full w-full md:max-w-md bg-zinc-950 border-l border-zinc-800 text-white p-6 md:p-8 flex flex-col pointer-events-auto shadow-2xl"
          >
            
            {/* Slider Top Section */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800 mb-6">
              <div>
                <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-emerald-400 font-bold">
                  <div className="flex inline-flex items-center text-sm font-bold font-mono">


                    <span className="relative pb-1 mr-[1px]">C</span>
                    
                    <div className="inline-flex items-center justify-center w-[1em] h-[1em] mt-[-4px] ml-[-2px]">
                      <motion.div
                        className="flex items-center justify-center w-full h-full pointer-events-none"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      >
                        <Donut className="w-full h-full stroke-[2.5] text-current" />
                      </motion.div>
                    </div>
                    
                    <span className="relative pb-1 ml-[2px]">nnect with Me</span>
                  </div>
                </h2>

              </div>
              
              <button
                onClick={onClose}
                className="transition-all duration-300 hover:scale-110 cursor-pointer text-zinc-500 hover:text-white outline-none -mr-1"
                aria-label="Close panel"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Slider Body section */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {!isSuccessfullySent ? (
                  
                  //Form Section
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="mb-1">
                      <h3 className="text-2xl font-bold font-mono tracking-tight mb-2">
                        Behind the code.
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        This website serves as a living resume and architectural proof of concept for my development work. I'm currently looking to join an innovative engineering team.
                      </p>
                      <p className="text-white font-bold text-sm leading-relaxed mt-3">
                          Feel free to reach out regarding pipeline openings or to review my technical process!
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 mb-5">       
                    <a
                      href={contactData.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-300 hover:scale-110 cursor-pointer text-zinc-500 hover:text-white"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinIcon className="h-6 w-6 transition-colors duration-300" />
                    </a>

                    <a
                      href={`mailto:${contactData.contact_email}`}
                      className="transition-all duration-300 hover:scale-110 cursor-pointer text-zinc-500 hover:text-white"
                      aria-label="Send Email"
                    >
                      <Mail className="h-6 w-6 transition-colors duration-300" />
                    </a>
                    </div>

                    <div className="relative flex py-2 mb-5 items-center">
                      <div className="flex-grow border-t border-zinc-800"></div>
                      <span className="flex-shrink mx-4 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                        Or leave a message
                      </span>
                      <div className="flex-grow border-t border-zinc-800"></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="hidden" aria-hidden="true">
                        <input type="text" autoComplete="off" tabIndex={-1} {...register("honeypot")} />
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Name</label>
                          <input
                              type="text"
                              disabled={isSubmitting}
                              {...register("name", { required: "Name is required" })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm disabled:opacity-50"
                          />
                          {errors.name && <span className="text-xs font-mono text-red-400 mt-1">{errors.name.message}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Email</label>
                          <input
                              type="email"
                              disabled={isSubmitting}
                              {...register("email", { 
                                  required: "Email is required",
                                  pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "Invalid email address"
                                  }
                              })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm disabled:opacity-50"
                          />
                          {errors.email && <span className="text-xs font-mono text-red-400 mt-1">{errors.email.message}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Message</label>
                          <textarea
                              rows={5}
                              disabled={isSubmitting}
                              {...register("message", { required: "Please write a short message" })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm resize-none disabled:opacity-50"
                          />
                          {errors.message && <span className="text-xs font-mono text-red-400 mt-1">{errors.message.message}</span>}
                      </div>

                      <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full cursor-pointer bg-white text-black font-mono uppercase font-bold text-sm tracking-widest p-4 rounded-lg hover:bg-zinc-200 transition-all pt-3 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed"
                      >
                        <div className="flex inline-flex items-center justify-center text-sm font-bold font-mono w-full">
                            <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                            {!isSubmitting && <SendHorizonal className="w-[0.8em] h-[0.8em] stroke-[2.5] ml-[4px]" />}
                        </div>
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  
                  // Success submission confirmation panel
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 my-auto"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    >
                      <CheckCircle2 className="h-16 w-16 text-emerald-400 stroke-[1.5]" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold font-mono tracking-tight mt-4">
                      Message Dispatched!
                    </h3>
                    
                    <p className="text-zinc-400 text-sm max-w-xs leading-relaxed font-sans">
                      Your form data successfully cleared the network pipeline. I'll review your details and follow up shortly.
                    </p>

                    <button
                      onClick={onClose}
                      className="mt-8 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-all cursor-pointer outline-none focus:border-zinc-500"
                    >
                      Close Portal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Safe mobile bottom spacing */}
            <div className="h-6 md:h-0 w-full bg-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
    );
}