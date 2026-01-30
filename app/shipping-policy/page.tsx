"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Clock, ShieldCheck, Globe, Navigation } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100 selection:text-blue-900 pt-[220px] pb-32">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-100/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/20 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10 px-4 md:px-8 max-w-4xl mx-auto">
                <header className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <Truck className="w-5 h-5 text-blue-600" />
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600">Logistics Protocol</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-none"
                    >
                        Shipping <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Policy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium max-w-2xl mx-auto"
                    >
                        Delhi's premium car accessories, delivered with precision to your doorstep.
                    </motion.p>
                </header>

                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-2 border-white/80 overflow-hidden"
                    >
                        <div className="p-8 md:p-12 bg-white/40 rounded-[1.8rem] space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <ShippingStat icon={<Clock />} title="24-48 Hours" desc="Delhi-NCR Delivery" />
                                <ShippingStat icon={<MapPin />} title="Doorstep" desc="Installation Ready" />
                                <ShippingStat icon={<ShieldCheck />} title="Secured" desc="Safe Handling" />
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-10 px-4 md:px-8">
                        <Section
                            title="1. Delhi-NCR Focus"
                            content="Being a Delhi based brand, we prioritize deliveries within the National Capital Region. Our local logistics network ensures that your car accessories reach you faster than national competitors."
                        />
                        <Section
                            title="2. Delivery Timelines"
                            content="Standard delivery within Delhi takes 24 to 48 hours for in-stock items. For custom leather seat covers or bespoke interior modifications, shipping might take 3-5 business days as they are crafted to order."
                        />
                        <Section
                            title="3. Live Tracking"
                            content="Once your order shifts to 'In Transit', you will receive a tracking link via SMS and Email. You can also track your order directly from your Karbhawan account dashboard."
                        />
                        <Section
                            title="4. Installation at Home"
                            content="If you have opted for our home installation service, our technician will arrive with the delivery partner or shortly after, depending on your scheduled slot."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShippingStat({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{title}</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">{desc}</p>
            </div>
        </div>
    );
}

function Section({ title, content }: { title: string, content: string }) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <span className="w-6 h-[1px] bg-blue-600" />
                {title}
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium pl-9">
                {content}
            </p>
        </div>
    );
}
