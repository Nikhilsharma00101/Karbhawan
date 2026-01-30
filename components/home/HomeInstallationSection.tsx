"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Calendar, CheckCircle2, Zap } from "lucide-react";

export default function HomeInstallationSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
    const opacityOverlay = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.4, 0.1, 0]);

    return (
        <section ref={containerRef} className="relative py-48 bg-[#050505] overflow-hidden">

            {/* Background Aesthetics */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Blueprint Grid Mask */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_100%)]" />

            <div className="container mx-auto px-6 relative z-10">

                {/* 1. Giant Headline Section */}
                <div className="mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-px w-10 bg-amber-500" />
                            <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase">
                                Delhi NCR Exclusive
                            </span>
                        </div>
                        <h2 className="text-5xl sm:text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.8] uppercase mix-blend-overlay opacity-30 select-none">
                            Doorstep
                        </h2>
                        <h2 className="text-5xl sm:text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.8] uppercase mt-[-0.5rem] md:mt-[-2rem]">
                            Installation
                            <span className="text-amber-500 italic block md:inline">.</span>
                        </h2>
                    </motion.div>
                </div>

                {/* 2. Visual Layer & Feature Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Info Column */}
                    <div className="lg:col-span-4 space-y-10 lg:mt-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem]"
                        >
                            <p className="text-slate-300 text-xl leading-relaxed font-light">
                                "The workshop experience, <span className="text-white font-medium italic">redefined</span>. We bring certified experts and specialized mobile docking systems to your driveway."
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-px w-full bg-gradient-to-r from-amber-500/50 to-transparent" />
                                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest whitespace-nowrap">Tactical Service</span>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Deployment Hubs", val: "Delhi" },
                                { label: "Specialists", val: "50+" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-center hover:bg-white/5 transition-all group"
                                >
                                    <div className="text-4xl font-black text-white mb-2 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{stat.val}</div>
                                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black leading-none">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Center Hero Image (The "Lens") */}
                    <div className="lg:col-span-5 relative group mt-12 lg:mt-0">
                        <motion.div
                            style={{ scale: scaleImage }}
                            className="aspect-[4/5] relative rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-slate-900"
                        >
                            <motion.div style={{ opacity: opacityOverlay }} className="absolute inset-0 bg-[#050505] z-10" />
                            <Image
                                src="/home-installation.png"
                                alt="Mechanic hands installing seat covers"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Hover Reveal Badge */}
                            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/40 backdrop-blur-[4px]">
                                <div className="text-center">
                                    <Zap className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-pulse" />
                                    <div className="text-xs font-black text-white uppercase tracking-[0.4em]">Elite Standard</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Steps Column */}
                    <div className="lg:col-span-3 space-y-6 lg:pt-32">
                        {[
                            { icon: MapPin, title: "Territory Focus", desc: "Serving Delhi, Noida, Gurgaon, and satellite hubs." },
                            { icon: Calendar, title: "Live Scheduling", desc: "Select 2-hour windows that fit your mission profile." },
                            { icon: CheckCircle2, title: "Post-Ops Check", desc: "Final verification and 30-day workmanship warranty." },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-50px" }}
                                transition={{ delay: 0.3 + (i * 0.15) }}
                                className="group p-8 rounded-3xl bg-transparent border border-white/5 hover:bg-white/[0.04] hover:border-amber-500/40 transition-all cursor-default"
                            >
                                <div className="flex items-center gap-5 mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all text-white border border-white/5">
                                        <step.icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-white font-black text-[10px] uppercase tracking-widest leading-none">{step.title}</h4>
                                </div>
                                <p className="text-slate-500 text-xs pl-0 leading-relaxed font-light group-hover:text-slate-300 transition-colors">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="pt-8"
                        >
                            <Link href="/installation" className="group flex items-center gap-4 text-[10px] text-amber-500 font-black uppercase tracking-[0.3em] overflow-hidden">
                                <span className="relative z-10">View Full Installation Details</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                <div className="h-[1px] flex-1 bg-amber-500/20" />
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
