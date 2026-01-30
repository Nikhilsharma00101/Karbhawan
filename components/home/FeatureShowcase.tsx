"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface FeatureShowcaseProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    features: string[];
    ctaText?: string;
    ctaLink?: string;
    align?: "left" | "right";
    theme?: "warm" | "cool";
}

export default function FeatureShowcase({
    title,
    subtitle,
    description,
    image,
    features,
    ctaText = "Shop Collection",
    ctaLink = "/shop",
    align = "left",
    theme = "warm",
}: FeatureShowcaseProps) {
    const isRight = align === "right";

    // Theme Config
    const themes = {
        warm: {
            bg: "bg-[#FDFCF8]", // Very warm off-white
            accent: "bg-amber-500",
            textAccent: "text-amber-900",
            gradient: "from-amber-50 to-transparent",
        },
        cool: {
            bg: "bg-slate-50",
            accent: "bg-blue-500",
            textAccent: "text-slate-900",
            gradient: "from-slate-100 to-transparent",
        }
    };

    const currentTheme = themes[theme];

    return (
        <section className={`py-24 relative overflow-hidden ${currentTheme.bg}`}>
            {/* Background Decor */}
            <div className={`absolute top-0 ${isRight ? 'left-0' : 'right-0'} w-1/2 h-full bg-gradient-to-b ${currentTheme.gradient} opacity-50 z-0`} />

            <div className="container mx-auto px-6 relative z-10">
                <div className={`flex flex-col lg:flex-row items-center gap-16 ${isRight ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >



                        <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />

                            {/* Overlay Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className={`absolute -bottom-8 ${isRight ? '-left-8' : '-right-8'} bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block`}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className={`w-2 h-2 rounded-full ${currentTheme.accent}`} />
                                <span className="text-xs font-bold tracking-widest uppercase text-slate-500">Premium Quality</span>
                            </div>
                            <p className="text-slate-900 font-serif italic text-lg">"Designed for those who demand the exceptional."</p>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: isRight ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className={`text-xs font-bold tracking-[0.2em] uppercase ${currentTheme.textAccent} mb-4 block`}>
                                {subtitle}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-slate-900 leading-tight mb-6">
                                {title}
                            </h2>
                            <p className="text-lg text-slate-600 font-light leading-relaxed">
                                {description}
                            </p>
                        </motion.div>

                        <motion.ul
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                            className="space-y-4"
                        >
                            {features.map((feature, i) => (
                                <motion.li
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex items-center gap-4"
                                >
                                    <CheckCircle2 className={`w-5 h-5 ${currentTheme.textAccent}`} />
                                    <span className="text-slate-700">{feature}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href={ctaLink} className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-95">
                                <span className="text-sm font-bold tracking-widest uppercase">{ctaText}</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
