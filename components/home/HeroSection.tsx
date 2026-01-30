"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Parallax - Optimized with useTransform
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    // Mouse Magnetic Effect - Optimized (No useState re-renders)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for mouse movement
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Background parallax based on mouse
    const bgX = useTransform(springX, (x) => x * -0.02);
    const bgY = useTransform(springY, (y) => y * -0.02);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Update motion values directly - NO RE-RENDER
        mouseX.set(clientX - innerWidth / 2);
        mouseY.set(clientY - innerHeight / 2);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-screen min-h-[900px] w-full overflow-hidden bg-black text-white perspective-1000 will-change-transform"
        >
            {/* --- CINEMATIC BACKGROUND --- */}
            <motion.div
                style={{ y: y1, scale: 1.1 }}
                className="absolute inset-0 z-0 will-change-transform"
            >
                {/* Optimized Background Layer */}
                <motion.div
                    className="absolute inset-0 bg-[url('/hero-ultimate.png')] bg-cover bg-center"
                    style={{
                        backgroundPosition: "center 35%",
                        x: bgX,
                        y: bgY
                    }}
                />

                {/* Gradients - Reduced complexity */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
            </motion.div>

            {/* --- FLOATING PARTICLES (Reduced opacity for better perf) --- */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay will-change-transform" />

            {/* --- HERO CONTENT LAYER --- */}
            <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-center">

                <motion.div
                    style={{ y: y2, opacity }}
                    className="space-y-8 max-w-5xl pt-32 md:pt-48 will-change-transform"
                >
                    {/* Top Tagline */}
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-center gap-4"
                        >
                            <span className="h-[1px] w-12 bg-amber-500/80" />
                            <span className="text-amber-500 font-mono text-sm tracking-[0.3em] uppercase">
                                Engineering Perfection
                            </span>
                        </motion.div>
                    </div>

                    {/* Massive Headline */}
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mix-blend-mode-difference text-white">
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            >
                                BEYOND
                            </motion.div>
                        </div>
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500"
                            >
                                LIMITS
                            </motion.div>
                        </div>
                    </h1>

                    {/* Description & CTAs */}
                    <div className="flex flex-col md:flex-row gap-12 items-start pt-8">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-md text-lg text-slate-300 font-light leading-relaxed border-l border-white/20 pl-6"
                        >
                            Redefine your vehicle's identity.
                            From precision interiors to aggressive aerodynamics,
                            we curate the ultimate driving experience.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex items-center gap-6"
                        >
                            <Link href="/shop" className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:pr-12">
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Store
                                </span>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-black">
                                    <ArrowUpRight className="w-5 h-5" />
                                </span>
                            </Link>

                            <button className="flex items-center gap-4 group text-white/80 hover:text-white transition-colors">
                                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
                                    <Play className="w-4 h-4 fill-white" />
                                </span>
                                <span className="text-xs font-bold tracking-[0.2em] uppercase">The Film</span>
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* --- BOTTOM SCROLL INDICATOR (Optimized) --- */}
            <div className="absolute bottom-12 right-12 z-20 hidden md:block">
                <motion.div
                    style={{ x: springX, y: springY }}
                    className="flex flex-col items-end gap-2 mix-blend-difference"
                >
                    <span className="text-6xl font-black text-white/10">01</span>
                    <span className="text-xs font-bold tracking-widest text-white/60 uppercase">Scroll to Discover</span>
                    <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent mt-4 opacity-30" />
                </motion.div>
            </div>

            {/* --- DECORATIVE GLOW (Lighter blur for perf) --- */}
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-amber-500/10 blur-[100px] pointer-events-none rounded-t-full opacity-30 mix-blend-screen will-change-transform" />
        </section>
    );
}
