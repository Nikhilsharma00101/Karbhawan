"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function ShopBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 40, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 40, stiffness: 200 });

    const { scrollYProgress } = useScroll();

    // Complex car-related animations
    const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F1F5F9]">
            {/* --- BASE LAYER --- */}
            <div className="absolute inset-0 bg-white/75 backdrop-blur-[120px]" />

            {/* --- CARBON FIBER MATERIAL --- */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)`,
                    backgroundSize: '6px 6px'
                }}
            />
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), 
                                     linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`,
                    backgroundSize: '30px 30px',
                    backgroundPosition: '0 0, 15px 15px'
                }}
            />

            {/* --- DYNAMIC WIND TUNNEL LIGHT RAYS --- */}
            <div className="absolute inset-0 opacity-[0.1]">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{ top: `${10 + i * 8}%` }}
                        animate={{
                            x: ["-100%", "200%"],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 6 + i,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "linear"
                        }}
                        className="absolute h-[1.5px] w-80 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
                    />
                ))}
            </div>

            <motion.div
                style={{ rotate: wheelRotate }}
                className="absolute -right-[15%] top-[5%] w-[900px] h-[900px] opacity-[0.04]"
            >
                <svg viewBox="0 0 200 200" className="w-full h-full stroke-slate-900 fill-none" strokeWidth="0.8">
                    <circle cx="100" cy="100" r="98" />
                    <circle cx="100" cy="100" r="25" />
                    {[...Array(10)].map((_, i) => (
                        <line
                            key={i}
                            x1="100" y1="100"
                            x2={100 + 90 * Math.cos(i * (Math.PI * 2 / 10))}
                            y2={100 + 90 * Math.sin(i * (Math.PI * 2 / 10))}
                        />
                    ))}
                    <circle cx="100" cy="100" r="88" strokeDasharray="4 8" className="stroke-sky-500/50" />
                </svg>
            </motion.div>

            {/* --- STEERING INTERFACE --- */}
            <div className="absolute -left-[5%] top-[15%] w-[500px] h-[500px] opacity-[0.05]">
                <svg viewBox="0 0 200 200" className="w-full h-full stroke-slate-900 fill-none" strokeWidth="1.2">
                    <motion.path
                        d="M 20,100 A 80,80 0 1,1 180,100"
                        strokeDasharray="6 8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    <path d="M 100,100 L 100,180 M 100,100 L 30,140 M 100,100 L 170,140" strokeWidth="2.5" className="opacity-40" />
                    <circle cx="100" cy="100" r="10" className="fill-slate-900/10" />
                </svg>
            </div>

            {/* --- SCANNER GLOW (VIVID) --- */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translate: "-50% -50%"
                }}
                className="absolute w-[600px] h-[600px] rounded-full mix-blend-overlay"
                animate={{
                    background: [
                        "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)"
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* --- DATA ACCESSORY HUDs (HIGH VISIBILITY) --- */}
            <div className="absolute inset-0">
                {[
                    { t: "12%", l: "25%", label: "WHEEL_SYS_v04" },
                    { t: "70%", l: "80%", label: "EXT_AERO_PK" },
                    { t: "45%", l: "12%", label: "INT_LUXE_STR" }
                ].map((hud, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 0.2, x: 0 }}
                        transition={{ delay: i * 0.3, duration: 1 }}
                        style={{ top: hud.t, left: hud.l }}
                        className="absolute flex flex-col gap-3"
                    >
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-[1.5px] border-slate-900/40 rounded-xl animate-[spin_8s_linear_infinite]" />
                            <div className="absolute inset-3 border border-sky-500 rounded-sm animate-pulse" />
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-900 rounded-tl-sm" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-900 rounded-br-sm" />
                        </div>
                        <div className="bg-slate-900 px-3 py-1 rounded shadow-lg border border-white/20">
                            <span className="text-[7px] font-black text-sky-400 tracking-[0.3em] uppercase">{hud.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- REINFORCED STITCHING (DARKER) --- */}
            <div className="absolute right-[8%] bottom-[15%] w-[2px] h-80 bg-slate-900/10 hidden xl:block">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ width: 0 }}
                        animate={{ width: 12 }}
                        transition={{ delay: i * 0.05 }}
                        className="absolute h-1 bg-slate-900/30 -left-1.5"
                        style={{ top: `${i * 4}%` }}
                    />
                ))}
            </div>

            {/* --- AMBIENT NEON WASH --- */}
            <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-sky-400/15 via-indigo-400/5 to-transparent"
            />

            {/* --- TEXTURE REFINEMENT --- */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* --- FOCUS VIGNETTE --- */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(241,245,249,0.5)]" />
        </div>
    );
}
