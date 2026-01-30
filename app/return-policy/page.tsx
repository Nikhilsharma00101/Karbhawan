"use client";

import { motion } from "framer-motion";
import { RefreshCcw, ShieldCheck, Clock, CheckCircle2, AlertCircle, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-100 selection:text-blue-900 pt-[220px] pb-32">
            {/* --- BACKGROUND ACCENTS --- */}
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
                        <RefreshCcw className="w-5 h-5 text-blue-600" />
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600">Customer Support</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-none"
                    >
                        Return <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Policy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium max-w-2xl mx-auto"
                    >
                        At Karbhawan, we believe in complete transparency and customer satisfaction. Our unique "Same-Time Return" policy ensures you only pay for what you love.
                    </motion.p>
                </header>

                <div className="space-y-12">
                    {/* --- CORE POLICY CARD --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-2 border-white/80 overflow-hidden"
                    >
                        <div className="p-8 md:p-12 bg-white/40 rounded-[1.8rem] space-y-10">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-display font-black text-slate-900 uppercase tracking-tight">Same-Time Return Policy</h2>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        We offer a unique **Check-at-Door** service. Our return policy is strictly applicable **only at the time of delivery**. This ensures that you can inspect the quality and fit of your accessories before finalizing the purchase.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200/50">
                                <PolicyInsight
                                    icon={<Package className="w-5 h-5" />}
                                    title="Check on Delivery"
                                    desc="You are encouraged to open and inspect the product while the delivery partner is present."
                                />
                                <PolicyInsight
                                    icon={<RefreshCcw className="w-5 h-5" />}
                                    title="Instant Return"
                                    desc="If you are not satisfied with the product, simply return it to the delivery partner immediately."
                                />
                                <PolicyInsight
                                    icon={<CheckCircle2 className="w-5 h-5" />}
                                    title="No Questions Asked"
                                    desc="We don't ask for reasons if you choose to return at the doorstep."
                                />
                                <PolicyInsight
                                    icon={<AlertCircle className="w-5 h-5" />}
                                    title="No Post-Delivery Returns"
                                    desc="Once the delivery is accepted and the partner leaves, we cannot process further returns."
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* --- DETAILED TERMS --- */}
                    <div className="space-y-10 px-4 md:px-8">
                        <Section
                            title="1. Inspection Process"
                            content="When our delivery partner arrives at your location in Delhi, you have the right to inspect the product. Please check for any physical damage, color mismatch, or missing components."
                        />
                        <Section
                            title="2. Acceptance"
                            content="Once you have inspected the product and are satisfied, you may accept the delivery. Acceptance of delivery signifies that the product has been received in good condition and meets your expectations."
                        />
                        <Section
                            title="3. Refusal & Refund"
                            content="If you find the product unsatisfactory at the time of delivery, you can refuse to accept it. If you have already paid online, the full amount will be refunded to your original payment method within 5-7 business days."
                        />
                        <Section
                            title="4. Why This Policy?"
                            content="Since we are a Delhi-based premium brand dealing with bespoke automotive accessories, this 'Same-Time' policy allows us to maintain the highest quality standards and prevents the risks associated with multi-stage shipping and handling of sensitive car components."
                        />
                    </div>

                    {/* --- FAQ MINI SECTION --- */}
                    <div className="pt-12 border-t border-slate-200 text-center space-y-8">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Need more help?</h3>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/contact">
                                <Button variant="luxury" size="lg" className="px-12">
                                    Contact Support
                                </Button>
                            </Link>
                            <Link href="/shop">
                                <Button variant="secondary" size="lg" className="px-12 text-slate-900 border-slate-200">
                                    Back to Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PolicyInsight({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                {icon}
            </div>
            <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{title}</h4>
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
