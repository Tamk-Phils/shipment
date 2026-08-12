"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <motion.div 
            className={`relative flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="100" height="100" rx="20" fill="#E30613" />
                <path 
                    d="M25 75V25H35L65 75V25H75V75H65L35 25V75H25Z" 
                    fill="white" 
                />
                <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M20 20H80V80H20V20Z" 
                    stroke="white" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    className="opacity-20"
                />
            </svg>
        </motion.div>
    );
}
