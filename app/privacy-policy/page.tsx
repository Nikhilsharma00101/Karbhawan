"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Server, FileText, UserCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PrivacyPolicyPage() {
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
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600">Privacy Citadel</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-none"
                    >
                        Privacy <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Policy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium max-w-2xl mx-auto"
                    >
                        Your data is your property. We protect it with automotive precision.
                    </motion.p>
                </header>

                <div className="space-y-12">
                    <div className="space-y-10 px-4 md:px-8">
                        <Section
                            title="1. Information Gathering"
                            content="We collect only what is necessary to deliver excellence: your name, contact details (Phone & Email), and your car's make and model for perfect component matching."
                        />
                        <Section
                            title="2. Data Encryption"
                            content="Every piece of information shared with Karbhawan is encrypted using AES-256 protocols. Your payment details are processed through secure, bank-grade gateways and are never stored on our servers."
                        />
                        <Section
                            title="3. Third-Party Sharing"
                            content="We value your privacy. Your data is shared only with certified delivery partners in Delhi to ensure your products reach you. We never sell your data to marketing agencies."
                        />
                        <Section
                            title="4. Your Control"
                            content="You have full rights to request your data's deletion or export. Simply contact our support team from our Roop Nagar store or via email for immediate assistance."
                        />
                    </div>
                </div>
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
