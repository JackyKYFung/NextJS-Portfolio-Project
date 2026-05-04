"use client";

import { motion } from "framer-motion";

// Add onClick to the type definition
interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Optional click handler
}

export default function BentoItem({ children, className, onClick }: BentoItemProps) {
  return (
    <motion.div
      className={className}
      onClick={onClick} // Pass it here!
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: [0, -8, 0] 
      }}
      transition={{
        opacity: { duration: 0.5 },
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2 // Keeps your grid feeling organic
        }
      }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 } 
      }}
    >
      {children}
    </motion.div>
  );
}