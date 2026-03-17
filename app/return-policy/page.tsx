"use client";

import { motion } from "framer-motion";
import { RefreshCcw, ShieldCheck, Clock, CheckCircle2, AlertCircle, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-900 pt-[140px] md:pt-[200px] pb-32 overflow-hidden relative">
            {/* Ambient Background - Clean & Light */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-100/40 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-pink-100/30 rounded-full blur-[100px] mix-blend-multiply" />
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
                        <RefreshCcw className="w-4 h-4 text-purple-600" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-purple-600">Customer Support</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-[0.9]"
                        >
                            Return <br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                Policy
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed px-4"
                        >
                            At Karbhawan, we believe in complete transparency and customer satisfaction. Our unique "Same-Time Return" policy ensures you only pay for what you love.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest pt-4"
                    >
                        <span>Check on Delivery</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>Instant Resolution</span>
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
                            <RefreshCcw className="w-64 h-64" />
                        </div>

                        {/* Top Specific Policy Insight */}
                        <div className="mb-20 relative z-10 border-b border-slate-100 pb-20">
                            <div className="flex items-start gap-6 border border-purple-100 bg-purple-50/50 p-6 md:p-8 rounded-3xl mb-12">
                                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-200 hidden sm:flex">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Same-Time Return Policy</h2>
                                    <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">
                                        We offer a unique <strong>Check-at-Door</strong> service. Our return policy is strictly applicable <strong>only at the time of delivery</strong>. This ensures that you can inspect the quality and fit of your accessories before finalizing the purchase.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pl-2">
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

                        {/* Detailed Document Sections */}
                        <div className="space-y-16 relative z-10">

                            <Section
                                icon={<Package className="w-5 h-5" />}
                                number="01"
                                title="Inspection Process"
                                content="When our delivery partner arrives at your location in Delhi, you have the right to inspect the product. Please carefully check for any physical damage, color mismatch, or missing components before signing off."
                            />

                            <Section
                                icon={<CheckCircle2 className="w-5 h-5" />}
                                number="02"
                                title="Acceptance of Goods"
                                content="Once you have inspected the product and are satisfied, you may accept the delivery. Acceptance of delivery explicitly signifies that the product has been received in good condition and strictly meets your expectations."
                            />

                            <Section
                                icon={<RefreshCcw className="w-5 h-5" />}
                                number="03"
                                title="Refusal & Refund Process"
                                content="If you find the product unsatisfactory at the time of delivery, you can immediately refuse to accept it from the partner. If you have already paid online, the full amount will automatically be returned and refunded to your original payment method within 5-7 business days."
                            />

                            <Section
                                icon={<ShieldCheck className="w-5 h-5" />}
                                number="04"
                                title="Why This Policy?"
                                content="Since we are a Delhi-based premium brand dealing with bespoke automotive accessories, this 'Same-Time' policy allows us to maintain the highest quality standards and prevents the extreme risks associated with multi-stage shipping and handling of sensitive car components."
                            />

                        </div>

                        {/* Document Footer Signoff & Action */}
                        <div className="mt-20 pt-16 border-t border-slate-100 flex flex-col items-center justify-center text-center space-y-10 relative z-10">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="w-5 h-5 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-widest text-slate-900">Need immediate assistance?</h3>
                                <p className="max-w-md text-sm text-slate-500 leading-relaxed font-medium mx-auto">
                                    If you have a unique case regarding a received item, reach out to our dedicated support team.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                                <Link href="/contact" className="w-full sm:w-auto">
                                    <Button variant="luxury" size="lg" className="px-10 w-full">
                                        Contact Support
                                    </Button>
                                </Link>
                                <Link href="/shop" className="w-full sm:w-auto">
                                    <Button variant="secondary" size="lg" className="px-10 w-full text-slate-700">
                                        Back to Store
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

function PolicyInsight({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 border border-purple-100 shadow-sm shadow-purple-500/10">
                {icon}
            </div>
            <div className="space-y-1.5 pt-0.5">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{title}</h4>
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
                <span className="text-3xl md:text-4xl font-black text-slate-200 tracking-tighter transition-colors group-hover:text-purple-100">
                    {number}
                </span>
                <div className="w-px h-10 bg-slate-200 hidden md:block" />
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 transition-all duration-300 shadow-sm shrink-0 md:hidden lg:flex">
                    {icon}
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="space-y-3 flex-1">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight group-hover:text-purple-900 transition-colors">
                    {title}
                </h3>
                <div className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                    {content}
                </div>
            </div>
        </div>
    );
}
