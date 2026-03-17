"use client";

import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Lock, Eye, CheckCircle2, ShieldAlert } from "lucide-react";

export default function PaymentSecurityPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-900 pt-[140px] md:pt-[200px] pb-32 overflow-hidden relative">
            {/* Ambient Background - Clean & Light */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-100/30 rounded-full blur-[100px] mix-blend-multiply" />
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
                        <Lock className="w-4 h-4 text-blue-600" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-blue-600">Secure Vault</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-[0.9]"
                        >
                            Payment <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Security
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed px-4"
                        >
                            Industry leading encryption for your peace of mind. We utilize bank-level security architectures to ensure your financial transactions are entirely protected.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest pt-4"
                    >
                        <span>Razorpay Secured</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>PCI DSS Certified</span>
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
                            <ShieldAlert className="w-64 h-64" />
                        </div>

                        {/* Top Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20 relative z-10 border-b border-slate-100 pb-20">
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

                        {/* Detailed Document Sections */}
                        <div className="space-y-16 relative z-10">

                            <Section
                                icon={<ShieldAlert className="w-5 h-5" />}
                                number="01"
                                title="Our Strategic Partner"
                                content="Karbhawan has partnered with Razorpay, India's leading full-stack payments platform. This partnership allows us to offer you a seamless and highly secure checkout experience, utilizing their robust backend infrastructure."
                            />

                            <Section
                                icon={<CreditCard className="w-5 h-5" />}
                                number="02"
                                title="Accepted Methods"
                                content={
                                    <div className="space-y-4">
                                        <p>Through our secure checkout, we accept all major payment vectors across India, including but not limited to:</p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                            {[
                                                "Major Credit & Debit Cards",
                                                "All UPI Apps (GPay, PhonePe)",
                                                "Netbanking (50+ Banks)",
                                                "Various Digital Wallets"
                                            ].map((point, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-600 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                                                    <span className="text-sm font-bold tracking-wide">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            />

                            <Section
                                icon={<Eye className="w-5 h-5" />}
                                number="03"
                                title="Active Fraud Protection"
                                content="Every transaction on Karbhawan is actively monitored by AI-powered fraud detection systems in real-time. Any highly suspicious activity or irregular geographic transaction routing is automatically flagged and halted to protect your finances from unauthorized access."
                            />

                        </div>

                        {/* Document Footer Signoff */}
                        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                                <Lock className="w-5 h-5 text-slate-400" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Security Architecture Ver 1.4</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function SecurityFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm shadow-blue-500/10">
                {icon}
            </div>
            <div className="space-y-2">
                <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">{title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function Section({ icon, number, title, content }: { icon: React.ReactNode, number: string, title: string, content: React.ReactNode }) {
    return (
        <div className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            {/* Left Column: Number & Icon */}
            <div className="flex items-center md:items-start gap-4 shrink-0 mt-1 md:w-32">
                <span className="text-3xl md:text-4xl font-black text-slate-200 tracking-tighter transition-colors group-hover:text-blue-100">
                    {number}
                </span>
                <div className="w-px h-10 bg-slate-200 hidden md:block" />
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-300 shadow-sm shrink-0 md:hidden lg:flex">
                    {icon}
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="space-y-3 flex-1">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight group-hover:text-blue-900 transition-colors">
                    {title}
                </h3>
                <div className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                    {content}
                </div>
            </div>
        </div>
    );
}
