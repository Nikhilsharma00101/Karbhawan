"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TestimonialType } from "@/types";
import clsx from "clsx";

// Extended interface if needed for UI-specific props not in DB types
interface ExtendedTestimonial extends TestimonialType {
    designation?: string;
}

export default function Testimonials({ testimonials }: { testimonials: ExtendedTestimonial[] }) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="relative py-32 px-4 overflow-hidden bg-[#FAFAFA]">
            {/* Creative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#E0F2FE]/40 rounded-full blur-[120px] mix-blend-multiply filter" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-[#F0FDFA]/60 rounded-full blur-[120px] mix-blend-multiply filter" />
                <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] bg-[#FFF7ED]/60 rounded-full blur-[100px] mix-blend-multiply filter" />
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-24 space-y-4"
                >
                    <span className="text-karbhawan-teal font-black tracking-[0.3em] text-[10px] uppercase bg-teal-50 px-4 py-2 rounded-full border border-teal-100">Community Voices</span>
                    <h2 className="text-5xl md:text-7xl font-display font-medium text-slate-900 tracking-tight">
                        Trusted by <span className="italic text-slate-400 font-serif">Enthusiasts.</span>
                    </h2>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                            viewport={{ once: true }}
                            className="break-inside-avoid"
                        >
                            <div className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_1px_rgba(20,184,166,0.2),0_20px_40px_-4px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                                {/* Quote Icon */}
                                <div className="absolute top-10 right-10 text-slate-50 group-hover:text-karbhawan-teal/5 transition-colors duration-500 scale-150 rotate-12">
                                    <Quote className="w-12 h-12 fill-current" />
                                </div>

                                <div className="flex gap-1.5 mb-8 relative z-10">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            className={clsx(
                                                "w-4 h-4 transition-all duration-300",
                                                starIndex < t.rating ? "fill-karbhawan-gold text-karbhawan-gold drop-shadow-sm" : "text-slate-100 fill-slate-50"
                                            )}
                                        />
                                    ))}
                                </div>

                                <p className="text-slate-600 leading-[1.8] text-lg mb-10 font-medium relative z-10">
                                    &ldquo;{t.message}&rdquo;
                                </p>

                                <div className="flex items-center gap-5 pt-8 border-t border-slate-50 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-black text-lg shadow-inner">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-display font-bold text-slate-900 text-lg leading-none mb-1.5">{t.name}</p>
                                        {t.designation ? (
                                            <p className="text-[11px] text-karbhawan-teal font-black uppercase tracking-widest">{t.designation}</p>
                                        ) : (
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verified Buyer</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
