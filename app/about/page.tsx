"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Users, Trophy, Sparkles, Diamond, Clock, ShieldCheck, Building2, GraduationCap, Scale } from "lucide-react";

import heroImg from "@/public/images/about/hero.png";
import materialsImg from "@/public/images/about/materials.png";
import logoImg from "@/public/logo.png";

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            {/* --- IMMERSIVE BACKGROUND --- */}
            <div className="fixed inset-0 z-0 bg-[#F8FAFC]">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-100/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,1)_85%)]" />
            </div>

            {/* --- SECTION 1: THE PROLOGUE (HERO) --- */}
            <section className="relative min-h-screen flex items-center pt-[220px] pb-20">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Floating Vertical Text */}
                    <div className="hidden lg:block lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <span className="h-24 w-[1px] bg-slate-200" />
                            <span className="text-[10px] font-black uppercase tracking-[1em] [writing-mode:vertical-lr] rotate-180 text-slate-400">ESTABLISHED 2002</span>
                        </motion.div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-6 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[2px] bg-cta-blue/30" />
                                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-cta-blue">Legacy of Excellence</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl xl:text-9xl heading-luxe uppercase tracking-tighter leading-[0.85] text-aether-primary">
                                The Master <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Architects</span><br />
                                <span className="text-4xl md:text-6xl lowercase font-sans font-extralight tracking-normal text-slate-400">of automotive luxury.</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-8 pt-8"
                        >
                            <div className="space-y-1">
                                <p className="text-3xl font-display font-black text-aether-primary">22+</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Years of Craft</p>
                            </div>
                            <div className="w-[1px] h-12 bg-slate-200" />
                            <div className="space-y-1">
                                <p className="text-3xl font-display font-black text-aether-primary">50k+</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Cars Transformed</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/10 group">
                            <Image
                                src={heroImg}
                                alt="Luxury Interior"
                                priority
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3000ms]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />

                            {/* Floating Detail Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-[-20px] glass-panel p-6 max-w-[200px] border-white/50"
                            >
                                <Sparkles className="w-5 h-5 text-cta-blue mb-3" />
                                <p className="text-[10px] font-bold text-slate-800 leading-relaxed uppercase tracking-wider">Bespoke Interior Engineering</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 1.5: THE PILLARS OF TRUST (NEW) --- */}
            <section id="partnerships" className="relative py-40 overflow-hidden">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20 items-end mb-32">
                        <div className="flex-1 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <span className="w-12 h-[2px] bg-cta-blue/30" />
                                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-cta-blue">Elite Clients</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-8xl heading-luxe uppercase tracking-tighter text-aether-primary leading-none"
                            >
                                Serving the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Capital's Leaders</span>
                            </motion.h2>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 text-xl text-slate-500 font-medium leading-relaxed max-w-lg pb-4"
                        >
                            We are proud to be the trusted choice for Delhi's most important institutions. From law enforcement to government fleets, we keep the capital moving.
                        </motion.p>
                    </div>

                    {/* Creative Asymmetric Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        <PartnerCard
                            icon={<ShieldCheck className="w-8 h-8" />}
                            title="Delhi Police"
                            desc="Supplying essential car equipment and accessories to the city's law enforcement teams."
                            delay={0.1}
                            bgColor="bg-blue-50"
                            accentColor="text-blue-600"
                        />
                        <div className="lg:mt-12">
                            <PartnerCard
                                icon={<Building2 className="w-8 h-8" />}
                                title="Delhi Vidhan Sabha"
                                desc="Official supplier of premium accessories for government vehicles and high-ranking officials."
                                delay={0.2}
                                bgColor="bg-indigo-50"
                                accentColor="text-indigo-600"
                            />
                        </div>
                        <PartnerCard
                            icon={<GraduationCap className="w-8 h-8" />}
                            title="Delhi University"
                            desc="Reliable provider for staff and institutional vehicle needs across all university campuses."
                            delay={0.3}
                            bgColor="bg-sky-50"
                            accentColor="text-sky-600"
                        />
                        <div className="lg:mt-12">
                            <PartnerCard
                                icon={<Scale className="w-8 h-8" />}
                                title="The Courts of Delhi"
                                desc="Proudly supporting the High Court, Rohini, and Saket Courts with dependable auto parts."
                                delay={0.4}
                                bgColor="bg-slate-50"
                                accentColor="text-slate-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Decorative background number */}
                <div className="absolute right-[-5%] bottom-[10%] opacity-[0.02] select-none pointer-events-none">
                    <span className="text-[30vw] font-display font-black leading-none">TRUST</span>
                </div>
            </section>

            {/* --- SECTION 2: THE PHILOSOPHY (STAGGERED) --- */}
            <section className="relative py-32 overflow-hidden">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        {/* Philosophy Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h2 className="text-5xl md:text-7xl heading-luxe uppercase tracking-tighter text-aether-primary">The Art of <br />The Detail</h2>
                                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                                    At Karbhawan, we don't just sell accessories; we curate environments. Every stitch in our leather, every frequency in our audio systems, and every beam of light is calculated to evoke emotion.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <PhilosophyCard
                                    icon={<Diamond className="w-5 h-5" />}
                                    title="Precision"
                                    desc="Zero-tolerance quality control on every installation."
                                />
                                <PhilosophyCard
                                    icon={<Clock className="w-5 h-5" />}
                                    title="Legacy"
                                    desc="Built on two decades of elite automotive trust."
                                />
                                <PhilosophyCard
                                    icon={<ShieldCheck className="w-5 h-5" />}
                                    title="Integrity"
                                    desc="Transparent sourcing of world-class materials."
                                />
                                <PhilosophyCard
                                    icon={<Users className="w-5 h-5" />}
                                    title="Community"
                                    desc="Home to Delhi's most passionate car enthusiasts."
                                />
                            </div>
                        </motion.div>

                        {/* Staggered Material Preview */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
                            >
                                <Image
                                    src={materialsImg}
                                    alt="Materials"
                                    className="w-full aspect-square object-cover"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />
                            </motion.div>

                            {/* Decorative background element */}
                            <div className="absolute top-[-40px] right-[-40px] w-full h-full bg-cta-blue/5 rounded-[2.5rem] -rotate-3 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: THE JOURNEY (FULL WIDTH) --- */}
            <section className="relative py-40 bg-slate-900 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="container px-4 md:px-8 max-w-5xl mx-auto text-center relative z-10 space-y-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-cta-blue text-[11px] font-black uppercase tracking-[0.5em] px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">Our History</span>
                            <div className="h-16 w-[2px] bg-gradient-to-b from-cta-blue to-transparent" />
                        </div>

                        <h2 className="text-6xl md:text-9xl heading-luxe uppercase tracking-tighter leading-none">
                            <span className="block text-white">Our Long</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 opacity-90">Journey</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                        <TimelineStep
                            year="2002"
                            title="Where It All Began"
                            desc="We opened our first store in Delhi with a simple goal: to provide the best car speakers and audio."
                        />
                        <TimelineStep
                            year="2012"
                            title="Growing Bigger"
                            desc="We became experts in making custom leather seat covers and luxury car interiors."
                        />
                        <TimelineStep
                            year="2024"
                            title="Going Online"
                            desc="Now, we are bringing our high-quality car parts to your doorstep through our online store."
                        />
                    </div>
                </div>

                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
            </section>

            {/* --- SECTION 4: FINAL CALL --- */}
            <section className="relative py-40">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="glass-panel p-2 overflow-hidden border-white/80">
                        <div className="p-12 md:p-24 bg-white/40 rounded-[2.2rem] text-center space-y-12 relative overflow-hidden">
                            {/* Decorative Seal Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                                <Image src={logoImg} alt="Seal" className="w-[600px] h-auto grayscale" />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6 relative z-10"
                            >
                                <h2 className="text-5xl md:text-8xl heading-luxe uppercase tracking-tighter text-aether-primary leading-none">
                                    Become Part <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Of Our History</span>
                                </h2>
                                <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                                    Whether you're seeking a sonic overhaul or a complete interior transformation, your vehicle deserves the Karbhawan signature.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col md:flex-row justify-center gap-6 relative z-10 pt-8"
                            >
                                <Link href="/shop">
                                    <button className="h-20 px-12 rounded-2xl bg-slate-900 text-white text-[12px] font-black uppercase tracking-[0.4em] hover:scale-[1.05] transition-all cursor-pointer shadow-xl shadow-slate-900/10">
                                        Explore Collection
                                    </button>
                                </Link>
                                <Link href="/contact">
                                    <button className="h-20 px-12 rounded-2xl bg-white border border-slate-100 text-[12px] font-black uppercase tracking-[0.4em] hover:bg-slate-50 transition-all cursor-pointer">
                                        Visit Our Store
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Brand Seal */}
            <div className="pb-16 flex flex-col items-center gap-4 opacity-30 select-none">
                <Image src={logoImg} alt="Seal" className="h-6 w-auto invert grayscale" />
                <span className="text-[9px] font-mono font-black text-slate-400 tracking-[0.6em] uppercase text-center">Architecting Automotive Luxury Since 2002</span>
            </div>
        </div>
    );
}

function PartnerCard({ icon, title, desc, delay, bgColor, accentColor }: { icon: React.ReactNode, title: string, desc: string, delay: number, bgColor: string, accentColor: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className="group relative p-1 rounded-[2.8rem] transition-all duration-500 hover:-translate-y-2"
        >
            {/* The outer glowing shell */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-white/50 rounded-[2.8rem] opacity-100 group-hover:from-blue-100/80 group-hover:to-indigo-50/80 transition-colors duration-500" />

            {/* The main card body */}
            <div className="relative h-full p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/20 flex flex-col items-start gap-8">
                {/* Side Accent Line */}
                <div className={`absolute top-12 left-0 w-1 h-12 ${bgColor.replace('bg-', 'bg-').replace('50', '400')} rounded-r-full group-hover:h-20 transition-all duration-700`} />

                {/* Top Badge */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${bgColor.replace('50', '500')}`} />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Verified Client</span>
                </div>

                {/* Icon Platform */}
                <div className={`w-20 h-20 rounded-3xl ${bgColor} flex items-center justify-center ${accentColor} shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                    {icon}
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-display font-black text-aether-primary uppercase tracking-tight leading-none group-hover:text-cta-blue transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {desc}
                    </p>
                </div>

                {/* Interactive Bottom Accent */}
                <div className="mt-auto pt-8 w-full flex items-center justify-between border-t border-slate-100/50">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Gov-Sector</span>
                    <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:${bgColor.replace('50', '200')} transition-colors`} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PhilosophyCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-cta-blue transition-all duration-300">
                {icon}
            </div>
            <div className="space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-aether-primary">{title}</h4>
                <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase">{desc}</p>
            </div>
        </div>
    );
}

function TimelineStep({ year, title, desc }: { year: string, title: string, desc: string }) {
    return (
        <div className="space-y-8 group relative p-8 rounded-[2rem] hover:bg-white/5 transition-all duration-500">
            <div className="space-y-3">
                <span className="text-5xl md:text-6xl font-display font-black text-blue-400/20 group-hover:text-blue-400 transition-colors duration-500">{year}</span>
                <div className="h-[2px] w-12 bg-blue-400/40 group-hover:w-full transition-all duration-700" />
            </div>
            <div className="space-y-3">
                <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-white group-hover:text-blue-300 transition-colors">{title}</h4>
                <p className="text-sm text-slate-300/80 group-hover:text-slate-200 transition-colors leading-relaxed font-medium">{desc}</p>
            </div>
        </div>
    );
}
