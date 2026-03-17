"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Clock, ShieldCheck, Globe, Navigation, Box, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-900 pt-[140px] md:pt-[200px] pb-32 overflow-hidden relative">
            {/* Ambient Background - Clean & Light */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-sky-100/50 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-100/30 rounded-full blur-[100px] mix-blend-multiply" />
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
                        <Truck className="w-4 h-4 text-sky-600" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-sky-600">Logistics Protocol</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-[0.9]"
                        >
                            Shipping <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                                Policy
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed px-4"
                        >
                            Delhi's premium car accessories, delivered with precision to your doorstep. We prioritize speed and careful handling.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest pt-4"
                    >
                        <span>Delhi NCR Logistics</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>Live Tracking</span>
                    </motion.div>
                </header>

                {/* Main Content Document */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 overflow-hidden"
                >
                    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] py-12 px-6 md:p-12 lg:p-16 border border-slate-100 relative">
                        {/* Decorative background element inside the card */}
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                            <Truck className="w-64 h-64" />
                        </div>

                        {/* Top Specific Insight / Stats */}
                        <div className="mb-20 relative z-10 border-b border-slate-100 pb-20">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                                <ShippingStat icon={<Clock className="w-6 h-6" />} title="24-48 Hours" desc="Delhi-NCR Delivery" />
                                <ShippingStat icon={<MapPin className="w-6 h-6" />} title="Doorstep" desc="Installation Ready" />
                                <ShippingStat icon={<ShieldCheck className="w-6 h-6" />} title="Secured" desc="Safe Handling" />
                            </div>
                        </div>

                        {/* Detailed Document Sections */}
                        <div className="space-y-16 relative z-10">

                            <Section
                                icon={<MapPin className="w-5 h-5" />}
                                number="01"
                                title="Delhi-NCR Focus"
                                content="Being a Delhi based brand, we explicitly prioritize deliveries within the National Capital Region. Our localized logistics network ensures that your premium car accessories reach you significantly faster than national competitors."
                            />

                            <Section
                                icon={<Clock className="w-5 h-5" />}
                                number="02"
                                title="Delivery Timelines"
                                content="Standard delivery within Delhi typically takes 24 to 48 hours for our in-stock, ready-to-ship items. For custom leather seat covers, bespoke interior modifications, or pre-orders, shipping might require 3-5 business days as they are specifically crafted to order."
                            />

                            <Section
                                icon={<Navigation className="w-5 h-5" />}
                                number="03"
                                title="Live Courier Tracking"
                                content="Once your order's status shifts to 'In Transit', you will instantly receive a live tracking link via SMS and Email. You can also actively track your order's geographical progress directly from your Karbhawan account dashboard."
                            />

                            <Section
                                icon={<Box className="w-5 h-5" />}
                                number="04"
                                title="Installation at Home"
                                content="If you have specifically opted for our professional home installation service, our certified technician will arrive either alongside the delivery partner or shortly after, perfectly aligned with your pre-scheduled installation slot."
                            />

                        </div>

                        {/* Document Footer Signoff & Action */}
                        <div className="mt-20 pt-16 border-t border-slate-100 flex flex-col items-center justify-center text-center space-y-10 relative z-10">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Zap className="w-5 h-5 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-widest text-slate-900">Track an active order?</h3>
                                <p className="max-w-md text-sm text-slate-500 leading-relaxed font-medium mx-auto">
                                    You can instantly track the status of your shipping and fulfillment from your account.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                                <Link href="/account/orders" className="w-full sm:w-auto">
                                    <Button variant="luxury" size="lg" className="px-10 w-full">
                                        View Orders
                                    </Button>
                                </Link>
                                <Link href="/shop" className="w-full sm:w-auto">
                                    <Button variant="secondary" size="lg" className="px-10 w-full text-slate-700">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function ShippingStat({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center text-center space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-sm shadow-sky-500/10">
                {icon}
            </div>
            <div>
                <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">{title}</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-none mt-2">{desc}</p>
            </div>
        </div>
    );
}

function Section({ icon, number, title, content }: { icon: React.ReactNode, number: string, title: string, content: React.ReactNode }) {
    return (
        <div className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            {/* Left Column: Number & Icon */}
            <div className="flex items-center md:items-start gap-4 shrink-0 mt-1 md:w-32">
                <span className="text-3xl md:text-4xl font-black text-slate-200 tracking-tighter transition-colors group-hover:text-sky-100">
                    {number}
                </span>
                <div className="w-px h-10 bg-slate-200 hidden md:block" />
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-sky-600 group-hover:bg-sky-50 transition-all duration-300 shadow-sm shrink-0 md:hidden lg:flex">
                    {icon}
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="space-y-3 flex-1">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight group-hover:text-sky-900 transition-colors">
                    {title}
                </h3>
                <div className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                    {content}
                </div>
            </div>
        </div>
    );
}
