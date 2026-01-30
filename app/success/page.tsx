"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, Home, Wrench, Zap, Clock, Fuel, Coffee } from "lucide-react";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import confetti from "canvas-confetti";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const isInstallationOrder = searchParams.get('installation') === 'true';

    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-aether-gradient pt-[220px] pb-20 md:pb-32">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cta-soft/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-50/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

            <div className="container px-4 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.3
                        }}
                        className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl shadow-blue-100 flex items-center justify-center mx-auto mb-12 border border-blue-50"
                    >
                        <CheckCircle2 className="w-12 h-12 text-cta-blue" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="flex justify-center flex-wrap gap-3">
                            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-cta-blue bg-blue-50 px-6 py-2 rounded-full border border-blue-100 shadow-sm">
                                Order Confirmed
                            </span>
                            {isInstallationOrder && (
                                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-emerald-600 bg-emerald-50 px-6 py-2 rounded-full border border-emerald-100 shadow-sm flex items-center gap-2">
                                    <Wrench className="w-3 h-3" /> Installation Service Booked
                                </span>
                            )}
                        </div>

                        <h1 className="text-6xl md:text-8xl heading-luxe text-aether-primary leading-tight">
                            Thank you for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta-soft to-cta-blue">your order!</span>
                        </h1>

                        <p className="text-lg text-aether-secondary max-w-lg mx-auto italic font-medium leading-relaxed">
                            We appreciate your business. Your order has been placed and is being processed.
                        </p>
                    </motion.div>

                    {/* Installation Message Section */}
                    {isInstallationOrder && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-16 relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 via-indigo-100 to-violet-100 rounded-[3rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Coffee className="w-32 h-32 text-cta-blue rotate-12" />
                                </div>

                                <div className="max-w-xl mx-auto space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl md:text-3xl font-display font-black text-aether-primary uppercase tracking-widest">Sit back and relax</h3>
                                        <p className="text-sm font-medium text-slate-500 italic">
                                            "While others are driving to workshops, our experts are driving to you."
                                        </p>
                                        <p className="text-base text-slate-600 leading-relaxed font-medium">
                                            You've opted for <span className="text-cta-blue font-bold">Doorstep Installation</span>. Our team will contact you shortly to schedule a time that fits your day perfectly.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                        <div className="flex flex-col items-center text-center gap-3 group/item">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-cta-blue group-hover/item:bg-cta-blue group-hover/item:text-white transition-all duration-300">
                                                <Clock className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-1">Save Time</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase leading-tight italic">Spend it where it matters</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-3 group/item">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all duration-300">
                                                <Fuel className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-1">Save Fuel</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase leading-tight italic">Avoid the garage run</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-3 group/item">
                                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover/item:bg-amber-500 group-hover/item:text-white transition-all duration-300">
                                                <Home className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-1">Home Comfort</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase leading-tight italic">Stay cozy in your zone</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 text-left max-w-2xl mx-auto">
                        <Link href="/orders" className="group">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="aether-card p-8 group-hover:shadow-aether transition-all duration-500 border-slate-100 h-full"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Package className="w-6 h-6 text-cta-blue" />
                                </div>
                                <h3 className="text-xl font-display font-black text-aether-primary uppercase tracking-widest mb-2">View Order</h3>
                                <p className="text-xs text-aether-muted italic font-medium flex items-center gap-2">
                                    Track your order status <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </p>
                            </motion.div>
                        </Link>

                        <Link href="/" className="group">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="aether-card p-8 group-hover:shadow-aether transition-all duration-500 border-slate-100 h-full"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Home className="w-6 h-6 text-cta-blue" />
                                </div>
                                <h3 className="text-xl font-display font-black text-aether-primary uppercase tracking-widest mb-2">Continue Shopping</h3>
                                <p className="text-xs text-aether-muted italic font-medium flex items-center gap-2">
                                    Return to home page <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </p>
                            </motion.div>
                        </Link>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300"
                    >
                        Official Confirmation Sent to Registered Email Address
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-aether-gradient">
                <div className="w-10 h-10 border-4 border-cta-blue border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
