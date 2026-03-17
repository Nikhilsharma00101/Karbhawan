"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Server, FileText, UserCheck, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-900 pt-[140px] md:pt-[200px] pb-32 overflow-hidden relative">
            {/* Ambient Background - Clean & Light */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-emerald-100/40 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-teal-100/30 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.3]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-100/80" />
            </div>

            <div className="container relative z-10 px-4 md:px-8 max-w-5xl mx-auto">
                {/* Header Section */}
                <header className="text-center mb-16 md:mb-24 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm"
                    >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-emerald-600">Privacy Citadel</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-[0.9]"
                        >
                            Privacy <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                Policy
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed px-4"
                        >
                            Your data is your property. We protect it with automotive precision. This document explains how we collect, use, and safeguard your information.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest pt-4"
                    >
                        <span>Last Updated: Mar 2026</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>Version 1.2</span>
                    </motion.div>
                </header>

                {/* Main Content Document */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 overflow-hidden"
                >
                    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-slate-100 relative">
                        {/* Decorative background element inside the card */}
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                            <ShieldCheck className="w-64 h-64" />
                        </div>

                        <div className="space-y-16 relative z-10">

                            <Section
                                icon={<EyeOff className="w-5 h-5" />}
                                number="01"
                                title="Information Gathering"
                                content={
                                    <div className="space-y-4">
                                        <p>We collect only what is absolutely necessary to deliver excellence and fulfill your orders. The information we gather includes:</p>
                                        <ul className="space-y-3 mt-4">
                                            {[
                                                "Your full name and contact details (Phone & Email)",
                                                "Delivery addresses for physical product shipping",
                                                "Your car's make, model, and year for component matching"
                                            ].map((point, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    <span className="text-sm leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            />

                            <Section
                                icon={<Lock className="w-5 h-5" />}
                                number="02"
                                title="Data Encryption"
                                content="Every piece of information shared with Karbhawan is encrypted using AES-256 protocols. Your payment details are processed exclusively through secure, bank-grade payment gateways (like Razorpay) and are never stored on our local servers."
                            />

                            <Section
                                icon={<Server className="w-5 h-5" />}
                                number="03"
                                title="Third-Party Sharing"
                                content="We value your privacy implicitly. Your data is shared strictly with certified delivery partners in Delhi to ensure your products reach you. We never sell, rent, or trade your personal data to marketing agencies or third-party advertisers."
                            />

                            <Section
                                icon={<UserCheck className="w-5 h-5" />}
                                number="04"
                                title="Your Control & Rights"
                                content="You maintain full rights to request your data's modification, export, or complete deletion. Simply contact our support team from our Roop Nagar store or via email for immediate assistance regarding your digital footprint with us."
                            />

                        </div>

                        {/* Document Footer Signoff */}
                        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-slate-400" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">End of Privacy Policy</p>
                            <p className="max-w-md text-xs text-slate-500 leading-relaxed font-medium">To enact any of your privacy rights, please contact us at itskarbhawan2002@gmail.com.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function Section({ icon, number, title, content }: { icon: React.ReactNode, number: string, title: string, content: React.ReactNode }) {
    return (
        <div className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            {/* Left Column: Number & Icon */}
            <div className="flex items-center md:items-start gap-4 shrink-0 mt-1 md:w-32">
                <span className="text-3xl md:text-4xl font-black text-slate-200 tracking-tighter transition-colors group-hover:text-emerald-100">
                    {number}
                </span>
                <div className="w-px h-10 bg-slate-200 hidden md:block" />
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all duration-300 shadow-sm shrink-0 md:hidden lg:flex">
                    {icon}
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="space-y-3 flex-1">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight group-hover:text-teal-900 transition-colors">
                    {title}
                </h3>
                <div className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                    {content}
                </div>
            </div>
        </div>
    );
}
