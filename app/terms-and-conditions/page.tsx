"use client";

import { motion } from "framer-motion";
import { FileText, Scale, Gavel, UserCheck, AlertTriangle, Shield, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
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
                        <Scale className="w-4 h-4 text-indigo-600" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-indigo-600">Legal Agreement</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-[0.9]"
                        >
                            Terms & <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Conditions
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed px-4"
                        >
                            Please read these terms carefully before using Karbhawan. They define the standards of excellence for our community and outline our mutual responsibilities.
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
                        <span>Version 2.0</span>
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
                            <Scale className="w-64 h-64" />
                        </div>

                        <div className="space-y-16 relative z-10">

                            <Section
                                icon={<FileText className="w-5 h-5" />}
                                number="01"
                                title="Agreement to Terms"
                                content="By accessing or using Karbhawan, you agree to be bound by these Terms and Conditions and our Privacy Policy. These terms apply to all visitors, users, and others who access the service. If you disagree with any part of the terms, then you may not access the service."
                            />

                            <Section
                                icon={<Shield className="w-5 h-5" />}
                                number="02"
                                title="Product Accuracy & Compatibility"
                                content="While we strive for 100% accuracy in our product descriptions, automotive components can vary significantly by vehicle variant, make year, and trim level. It is the user's explicit responsibility to verify compatibility using the tools provided on our platform or by consulting with our support team prior to purchase."
                            />

                            <Section
                                icon={<UserCheck className="w-5 h-5" />}
                                number="03"
                                title="User Accounts"
                                content={
                                    <div className="space-y-4">
                                        <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.</p>
                                        <ul className="space-y-3 mt-4">
                                            {[
                                                "You are responsible for safeguarding your password.",
                                                "You must not disclose your password to any third party.",
                                                "You must notify us immediately upon becoming aware of any breach of security."
                                            ].map((point, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                                    <span className="text-sm leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            />

                            <Section
                                icon={<AlertTriangle className="w-5 h-5" />}
                                number="04"
                                title="Limitation of Liability"
                                content="In no event shall Karbhawan, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the Service."
                            />

                            <Section
                                icon={<Gavel className="w-5 h-5" />}
                                number="05"
                                title="Governing Law"
                                content="These Terms shall be governed and construed in accordance with the laws of Delhi, India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
                            />

                        </div>

                        {/* Document Footer Signoff */}
                        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                                <FileText className="w-5 h-5 text-slate-400" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">End of Terms and Conditions</p>
                            <p className="max-w-md text-xs text-slate-500 leading-relaxed font-medium">If you have any questions about these Terms, please contact us at itskarbhawan2002@gmail.com.</p>
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
                <span className="text-3xl md:text-4xl font-black text-slate-200 tracking-tighter transition-colors group-hover:text-indigo-100">
                    {number}
                </span>
                <div className="w-px h-10 bg-slate-200 hidden md:block" />
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all duration-300 shadow-sm shrink-0 md:hidden lg:flex">
                    {icon}
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="space-y-3 flex-1">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight group-hover:text-indigo-900 transition-colors">
                    {title}
                </h3>
                <div className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                    {content}
                </div>
            </div>
        </div>
    );
}
