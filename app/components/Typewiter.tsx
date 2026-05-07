"use client";
import { useState, useEffect } from "react";

export function Typewriter() {
    const [text, setText] = useState("turned");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    //the two states to toggle between
    const suffixes = ["ed", "ing"];

    useEffect(() => {
        const currentSuffix = suffixes[loopNum % suffixes.length];
        const fullText = "turn" + currentSuffix;

        const handleType = () => {
            if (isDeleting) {
                // remove a character
                setText(fullText.substring(0, text.length - 1));
            } else {
                // add a character
                setText(fullText.substring(0, text.length + 1));
            }
        
            //When the text finished typing the suffix
            if (!isDeleting && text === fullText) {
                //wait 2 seconds before deleting starts
                setTimeout(() => setIsDeleting(true), 2000);
            }

            //when the text finished deleting back to the word "turn"
            else if (isDeleting && text === "turn") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        //set the speed of adding and deleting a character
        const timer = setTimeout(handleType, isDeleting ? 100 : 200);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum]);

    return (
        <p className="text-center">
            A WordPress specialist <span className="font-mono font-bold text-blue-500">{text}</span><span className="animate-pulse border-r-2 border-blue-500"></span> Full-Stack Developer  
        </p>
    );
}