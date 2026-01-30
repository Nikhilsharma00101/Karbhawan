"use client";

import { motion } from "framer-motion";
import { FileText, Scale, Gavel, UserCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function TermsPage() {
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
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600">House Rules</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-none"
                    >
                        Terms & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Conditions</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium max-w-2xl mx-auto"
                    >
                        Defining the standards of excellence for our community.
                    </motion.p>
                </header>

                <div className="space-y-12">
                    <div className="space-y-10 px-4 md:px-8">
                        <Section
                            title="1. Agreement to Terms"
                            content="By accessing Karbhawan, you agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and others who access the service."
                        />
                        <Section
                            title="2. Product Accuracy"
                            content="While we strive for 100% accuracy, automotive components can vary significantly by vehicle variant. It is the user's responsibility to verify compatibility using the tools provided on our platform."
                        />
                        <Section
                            title="3. User Accounts"
                            content="When you create an account, you must provide accurate information. Failure to do so constitutes a breach of terms, which may result in immediate termination of your account on our platform."
                        />
                        <Section
                            title="4. Governing Law"
                            content="These Terms shall be governed and construed in accordance with the laws of Delhi, India, without regard to its conflict of law provisions."
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
