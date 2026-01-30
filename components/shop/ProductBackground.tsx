"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { ProductType } from "@/types";

interface ProductBackgroundProps {
    product: ProductType;
}

export default function ProductBackground({ product }: ProductBackgroundProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    const { scrollYProgress } = useScroll();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax values for a refined "Studio" feel
    const lightX = useTransform(springX, [0, 1000], ["-10%", "10%"]);
    const lightY = useTransform(springY, [0, 1000], ["-10%", "10%"]);
    const lightX2 = useTransform(springX, [0, 1000], ["5%", "-5%"]);
    const lightY2 = useTransform(springY, [0, 1000], ["5%", "-5%"]);
    const panelMove = useTransform(scrollYProgress, [0, 1], [0, -50]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FBFBFE]">
            {/* --- BASE STUDIO GRADIENT --- */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,250,252,1)_0%,rgba(226,232,240,0.8)_100%)]" />

            {/* --- TOP-TIER STUDIO LIGHTING (Enhanced Visibility) --- */}
            <motion.div
                style={{ x: lightX, y: lightY }}
                className="absolute -top-[20%] -right-[10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(224,231,255,0.9)_0%,transparent_60%)] blur-[100px] opacity-80"
            />
            <motion.div
                style={{ x: lightX2, y: lightY2 }}
                className="absolute bottom-[0%] -left-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(219,234,254,0.7)_0%,transparent_60%)] blur-[80px] opacity-70"
            />

            {/* --- PRISMATIC GLASS PANELS (Light Gradient Designs) --- */}
            <motion.div
                style={{ y: panelMove }}
                className="absolute inset-0"
            >
                {/* Large Pane: Crystalline Indigo Wash */}
                <div className="absolute top-[10%] left-[5%] w-[42%] h-[62%] bg-white/30 backdrop-blur-[8px] border border-white/40 rounded-[4rem] rotate-[-5deg] shadow-[0_45px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.12)_0%,transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.1)_0%,transparent_50%)]" />

                    {/* Minimalist Design Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
                </div>

                {/* Secondary Pane: Ethereal Rose & Sky Wash */}
                <div className="absolute bottom-[10%] right-[10%] w-[37%] h-[52%] bg-white/20 backdrop-blur-[6px] border border-white/30 rounded-[5rem] rotate-[8deg] shadow-[0_45px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(225,29,72,0.06)_0%,transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.08)_0%,transparent_50%)]" />

                    {/* Focal Dot Design */}
                    <div className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-cta-blue/20" />
                </div>
            </motion.div>

            {/* --- PRECISION MARKERS (Higher Contrast) --- */}
            <div className="absolute inset-0 opacity-[0.4]">
                {/* Subtle Coordinate Grid */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}
                />

                {/* Technical Corner Brackets */}
                <div className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-slate-300" />
                <div className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-slate-300" />

                {/* Vertical Measurement Line */}
                <div className="absolute left-24 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
            </div>

            {/* --- DYNAMIC PRODUCT SHADOW (Grounded) --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-slate-900/[0.03] blur-[100px] rounded-full mt-[120px]" />

            {/* --- FLOATING ACCENT GEOMETRY --- */}
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.4, 0.7, 0.4]
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i
                        }}
                        style={{
                            top: `${15 + i * 18}%`,
                            left: `${10 + (i * 22) % 80}%`
                        }}
                        className="absolute w-2.5 h-2.5 rounded-full bg-indigo-300/50 shadow-[0_0_10px_rgba(165,180,252,0.3)]"
                    />
                ))}
            </div>

            {/* --- PREMIUM FINISH: REFINED GRAIN --- */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
