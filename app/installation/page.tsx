"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Wrench, Calendar, CheckCircle2, ShieldCheck, ArrowRight, Zap, Settings2, HelpCircle, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

export default function InstallationPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="bg-[#050505] min-h-screen text-slate-200 selection:bg-amber-500/30">

            {/* Background Aesthetics */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-[220px] pb-32">

                {/* 1. HERO - ASYMMETRIC HEADER */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="grid lg:grid-cols-12 gap-12 items-end">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="h-px w-12 bg-amber-500/50" />
                                    <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px]">Premium Logistics</span>
                                </div>
                                <h1 className="text-[clamp(3rem,10vw,8rem)] font-black text-white leading-[0.85] tracking-tighter uppercase mb-8">
                                    Precision<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Installation</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-slate-400 max-w-xl font-light leading-relaxed">
                                    Experience the future of car care. We bring the workshop to you, combining <span className="text-white font-medium italic">master craftsmanship</span> with absolute convenience.
                                </p>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-4 self-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:rotate-12 transition-transform duration-500">
                                    <Settings2 className="w-12 h-12 text-amber-500" />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-4xl font-black text-amber-500 mb-2">1,500+</div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Successful Deployments</div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            <span className="text-[11px] font-bold uppercase tracking-wider">Certified Technicians</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            <span className="text-[11px] font-bold uppercase tracking-wider">OEM Mirror Finish</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 2. THE BLUEPRINT (PROCESS) - NON-LINEAR SCROLL */}
                <section className="container mx-auto px-6 mb-48">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Operational<br />Flow</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-500 uppercase tracking-[0.3em] font-bold text-[10px]">Engineered for reliability</p>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

                        <div className="space-y-32">
                            {[
                                {
                                    step: "01",
                                    title: "Select & Order",
                                    desc: "Browse our premium catalogue and look for the 'Installation Available' badge on your favorite accessories. Simply add them to your cart and checkout as usual—our system handles the rest.",
                                    icon: Wrench,
                                    align: "left"
                                },
                                {
                                    step: "02",
                                    title: "Expert Consultation",
                                    desc: "Within 24 hours of your order, a Karbhawan Service Manager will call you to verify your vehicle's specific model and coordinate a time slot that fits your schedule perfectly.",
                                    icon: Calendar,
                                    align: "right"
                                },
                                {
                                    step: "03",
                                    title: "Doorstep Execution",
                                    desc: "Our mobile team arrives at your location with a fully independent setup. We bring our own power, professional lighting, and precision tools to transform your car in your own driveway.",
                                    icon: Zap,
                                    align: "left"
                                },
                                {
                                    step: "04",
                                    title: "Quality Handover",
                                    desc: "After a 12-point quality inspection, we walk you through the new upgrades. You only pay the installation fee once you are 100% satisfied with the craftsmanship.",
                                    icon: CheckCircle2,
                                    align: "right"
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-100px", once: true }}
                                    transition={{ duration: 0.6 }}
                                    className={`relative flex flex-col ${item.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
                                >
                                    {/* Center Point */}
                                    <div className="absolute left-[50%] top-[40px] -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 hidden md:block shadow-[0_0_20px_rgba(245,158,11,0.5)] z-20" />

                                    <div className="md:w-1/2 text-left">
                                        <div className="mb-6 flex items-center gap-4">
                                            <div className="text-5xl font-black text-white/10 font-mono tracking-tighter">{item.step}</div>
                                            <div className={`h-px grow bg-white/10 ${item.align === 'right' ? 'order-first' : ''}`} />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-4 tracking-tight">{item.title}</h3>
                                        <p className="text-slate-400 leading-relaxed text-lg font-light tracking-wide">{item.desc}</p>
                                    </div>
                                    <div className="md:w-1/2 flex justify-center">
                                        <div className="w-48 h-48 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group relative overflow-hidden transition-all duration-500 hover:border-amber-500/40">
                                            <item.icon className="w-16 h-16 text-white group-hover:text-amber-500 transition-colors duration-500 relative z-10" />
                                            <div className="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. COVERAGE HUB - RADIATING GRID */}
                <section className="bg-white/5 border-y border-white/5 py-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.05)_0%,transparent_50%)]" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div>
                                <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Elite Coverage Area</span>
                                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                                    The Hub Of<br />Delhi NCR
                                </h2>
                                <p className="text-slate-400 text-lg font-light max-w-sm leading-relaxed mb-12">
                                    Currently servicing the capital and its satellite cities. Rapid expansion into neighboring territories is underway.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {["New Delhi", "Gurgaon", "Noida", "Ghaziabad", "Faridabad", "G. Noida"].map((city, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 10 }}
                                            className="flex items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-2xl group hover:border-amber-500/30 transition-all"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-amber-500/50 group-hover:bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0)] group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">{city}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                {/* Abstract Map Visualization */}
                                <div className="aspect-square relative flex items-center justify-center">
                                    <div className="absolute inset-0 border border-white/5 rounded-full animate-spin-slow" />
                                    <div className="absolute inset-8 border border-white/10 rounded-full" />
                                    <div className="absolute inset-16 border border-white/5 rounded-full animate-[spin_8s_linear_infinite_reverse]" />

                                    <div className="relative z-10 w-32 h-32 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(245,158,11,0.3)] group cursor-default">
                                        <MapPin className="w-12 h-12 text-black" />
                                        <div className="absolute -inset-4 bg-amber-500/20 rounded-full animate-pulse-slow" />
                                    </div>

                                    {/* Pulsing connections */}
                                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                                        <div
                                            key={deg}
                                            className="absolute h-px w-[40%] bg-gradient-to-r from-amber-500/50 to-transparent origin-left"
                                            style={{
                                                top: '50%',
                                                left: '50%',
                                                transform: `rotate(${deg}deg) translateX(64px)`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. FAQ - THE INTEL LEDGER */}
                <section className="container mx-auto px-6 py-48">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-24">
                            <HelpCircle className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">System Intel</h2>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Frequency Asked Questions</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { q: "Pricing Structure?", a: "Minimum engagement starts from ₹299. Complex electronics or full interiors are quoted live during checkout based on product tiers." },
                                { q: "All-Weather Ops?", a: "We operate 365 days. For rain/extreme heat, a covered driveway or garage is preferred to ensure tool precision." },
                                { q: "Master Warranty?", a: "Every bolt, clip, and wire is covered by our 30-day Installation Integrity Guarantee. Your peace of mind is hardcoded into our service." },
                                { q: "Mobile Autonomy?", a: "Our team arrives with independent power and specialized lighting. We don't need your electricity—just your car." }
                            ].map((faq, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300"
                                >
                                    <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                        {faq.q}
                                    </h4>
                                    <p className="text-slate-400 font-light leading-relaxed">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. FINALE - CTA */}
                <section className="container mx-auto px-6 text-center">
                    <div className="relative py-24 rounded-[4rem] overflow-hidden bg-amber-500 group">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600" />

                        <div className="relative z-10 px-6">
                            <h2 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-8">
                                Initiate<br />Transformation
                            </h2>
                            <p className="text-black/70 max-w-xl mx-auto font-bold uppercase tracking-widest text-[11px] mb-12">
                                Deployment availability is limited. Secure your slot now.
                            </p>

                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full font-black uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                            >
                                Browse Catalogue <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Animated Background Text */}
                        <div className="absolute -bottom-10 left-0 right-0 whitespace-nowrap opacity-10 select-none pointer-events-none">
                            <div className="text-[12rem] font-black uppercase tracking-tighter text-black flex gap-12 animate-marquee">
                                <span>Delhi NCR</span>
                                <span>Doorstep</span>
                                <span>Installation</span>
                                <span>Delhi NCR</span>
                                <span>Doorstep</span>
                                <span>Installation</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
