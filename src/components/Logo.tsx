"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <motion.div 
            className={`relative flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                <defs>
                    <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="nexusAccent" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
                <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M 20 80 L 20 20 L 80 80 L 80 20" 
                    stroke="url(#nexusGradient)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
                <motion.circle 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5, type: "spring" }}
                    cx="80" 
                    cy="80" 
                    r="8" 
                    fill="url(#nexusAccent)" 
                />
                <motion.circle 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                    cx="20" 
                    cy="20" 
                    r="8" 
                    fill="url(#nexusAccent)" 
                />
            </svg>
        </motion.div>
    );
}
