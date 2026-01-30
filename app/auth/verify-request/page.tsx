"use client";

import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function VerifyRequestPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 pt-[220px] pb-20 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
            {/* --- IMMERSIVE BACKGROUND --- */}
            <div className="fixed inset-0 bg-[#F8FAFC] z-0">
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-100/50 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/40 rounded-full blur-[100px]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,1)_80%)]" />
            </div>

            {/* --- CONTENT ARCHITECTURE --- */}
            <div className="relative z-10 w-full max-w-[480px]">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/auth/signin"
                        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-cta-blue transition-colors px-6 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-100/50 cursor-pointer"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </Link>
                </motion.div>

                {/* Main Glass Shell */}
                <div className="glass-panel p-1 rounded-[2.5rem] bg-white border-white shadow-2xl overflow-hidden group">
                    <div className="p-8 md:p-12 space-y-10 relative text-center">
                        {/* Status / Indicator */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cta-blue/20 blur-xl rounded-full" />
                                <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-cta-blue shadow-lg animate-pulse duration-[3000ms]">
                                    <Mail className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Title Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-3">
                                <span className="w-8 h-[2px] bg-cta-blue" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cta-blue">Check Your Email</span>
                                <span className="w-8 h-[2px] bg-cta-blue" />
                            </div>
                            <h1 className="heading-luxe text-4xl md:text-5xl uppercase leading-none tracking-tighter">
                                Verification
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Link Sent
                                </span>
                            </h1>
                        </div>

                        {/* Information Body */}
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider leading-relaxed">
                                    We've sent a secure login link to your email address.
                                </p>
                                <div className="flex items-center gap-3 justify-center text-cta-blue">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Link expires in 24 hours</span>
                                </div>
                            </div>

                            <div className="space-y-4 text-left">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Didn't get the email?</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        "Check your spam or junk folder",
                                        "Make sure your email is correct",
                                        "Wait a few minutes and try again"
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-100 group/item hover:border-cta-blue/20 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cta-blue/40 group-hover/item:scale-150 transition-transform" />
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="pt-6 border-t border-slate-100">
                            <Link
                                href="/auth/signin"
                                className="inline-flex items-center gap-2 text-cta-blue text-[10px] font-black uppercase tracking-[0.3em] hover:tracking-[0.5em] transition-all cursor-pointer"
                            >
                                <Sparkles className="w-3 h-3" />
                                Try Another Email
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Branding Seal */}
                <div className="mt-12 flex flex-col items-center gap-4 opacity-30">
                    <img src="/logo.png" alt="Seal" className="h-6 w-auto invert grayscale" />
                    <span className="text-[9px] font-mono font-black text-slate-400 tracking-[0.6em] uppercase text-center">Secure Identity Verification</span>
                </div>
            </div>
        </div>
    );
}
