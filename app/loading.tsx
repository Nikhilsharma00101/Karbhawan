"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl">
            <div className="relative">
                {/* Animated Rings */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="w-16 h-16 border-2 border-cta-blue/20 border-t-cta-blue rounded-full shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                />

                {/* Inner Pulsing Dot */}
                <motion.div
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 m-auto w-3 h-3 bg-cta-blue rounded-full blur-[2px]"
                />

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                    <span className="text-[10px] text-cta-blue font-black uppercase tracking-[0.3em] animate-pulse">
                        In Transit
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
