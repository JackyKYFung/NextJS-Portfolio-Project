"use client";
import { useState, useEffect } from "react";

const colorPalettes = [
"from-red-500 to-orange-500",
  "from-orange-500 to-yellow-500",
  "from-green-400 to-cyan-500",
  "from-blue-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-400",    
];

export function Typewriter() {
    const [text, setText] = useState("turned");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [colorClass, setColorClass] = useState(colorPalettes[0]);
    const [hasSwappedColor, setHasSwappedColor] = useState(false);
    const [bgPos, setBgPos] = useState(0);

    //the two states to toggle between
    const suffixes = ["ed", "ing"];
    const base = "turn";

useEffect(() => {
        const currentSuffix = suffixes[loopNum % suffixes.length];
        const fullText = base + currentSuffix;

const handleType = () => {
            if (!isDeleting) {
                const nextText = fullText.substring(0, text.length + 1);
                setText(nextText);

                if (nextText === fullText) {
                    // WORD COMPLETE: Shift the background position smoothly
                    // Moving it by 25% or 33% shifts it to the next "color" in the gradient
                    setBgPos((prev) => prev + 33); 
                    
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                const nextText = fullText.substring(0, text.length - 1);
                setText(nextText);

                if (nextText === base) {
                    setIsDeleting(false);
                    setLoopNum((prev) => prev + 1);
                }
            }
        };

        const timer = setTimeout(handleType, isDeleting ? 200 : 300);
        return () => clearTimeout(timer);
        
        // We removed text and colorClass from dependencies to prevent the "strobe" effect
    }, [isDeleting, loopNum, text]);

    return (
        <p className="text-center">
            A WordPress specialist 
            <span 
                className="inline-block ml-1 bg-clip-text text-transparent font-mono font-bold transition-all duration-3000 ease-in-out"
                style={{
                    // We create one long horizontal rainbow
                    backgroundImage: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)',
                    backgroundSize: '400% 100%',
                    backgroundPosition: `${bgPos}% 0%`,
                }}
            >
                {text}
            </span>
            <span className="animate-pulse border-r-2 border-white/50 mr-1"></span> 
            Full-Stack Developer  
        </p>
    );
}