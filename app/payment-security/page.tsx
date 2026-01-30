"use client";

import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Lock, Eye, CheckCircle2, ShieldAlert } from "lucide-react";

export default function PaymentSecurityPage() {
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
                        <Lock className="w-5 h-5 text-blue-600" />
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600">Secure Vault</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-none"
                    >
                        Payment <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Security</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium max-w-2xl mx-auto"
                    >
                        Industry leading encryption for your peace of mind.
                    </motion.p>
                </header>

                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-2 border-white/80 overflow-hidden"
                    >
                        <div className="p-8 md:p-12 bg-white/40 rounded-[1.8rem] space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <SecurityFeature
                                    icon={<ShieldCheck className="w-6 h-6" />}
                                    title="PCI-DSS Compliant"
                                    desc="We adhere to the highest international standards for credit card data processing."
                                />
                                <SecurityFeature
                                    icon={<Eye className="w-6 h-6" />}
                                    title="No Stored Data"
                                    desc="Karbhawan never stores your raw credit card or UPI PIN information."
                                />
                                <SecurityFeature
                                    icon={<Lock className="w-6 h-6" />}
                                    title="256-Bit SSL"
                                    desc="Our entire platform is protected by high-level SSL encryption for secure data transfer."
                                />
                                <SecurityFeature
                                    icon={<ShieldAlert className="w-6 h-6" />}
                                    title="Razorpay Secured"
                                    desc="Our primary gateway, Razorpay, ensures your transactions are protected by industry-leading security protocols."
                                />
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-10 px-4 md:px-8">
                        <Section
                            title="Our Strategic Partner"
                            content="Karbhawan has partnered with Razorpay, India's leading full-stack payments platform. This partnership allows us to offer you a seamless and highly secure checkout experience, supporting 100+ payment methods including all major cards, 50+ netbanking options, and all UPI apps."
                        />
                        <Section
                            title="Accepted Methods"
                            content="We accept all major Credit Cards, Debit Cards, UPI (GPay, PhonePe, Paytm), and Net Banking from all leading Indian banks through the Razorpay interface."
                        />
                        <Section
                            title="Fraud Protection"
                            content="Every transaction is monitored by Razorpay's AI-powered fraud detection system in real-time. Any suspicious activity is immediately flagged to protect your finances."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SecurityFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                {icon}
            </div>
            <div className="space-y-2">
                <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">{title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
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
