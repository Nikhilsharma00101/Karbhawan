"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

interface TooltipProps {
    children: ReactNode;
    content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full mt-3 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg shadow-2xl pointer-events-none whitespace-nowrap z-[150]"
                    >
                        {/* Glow Arrow pointing upwards */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-bottom-slate-900"></div>

                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                            {content}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
