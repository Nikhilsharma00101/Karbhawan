"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Car } from "lucide-react";

const CATEGORIES = [
    {
        id: "interior",
        name: "Interior Accessories",
        description: "Make your car comfortable inside.",
        slug: "interior-accessories",
        colSpan: "md:col-span-2",
        bgClass: "bg-slate-100",
        icon: ArmchairIcon,
        image: "/luxury-interior.png" // Generated Custom Interior Image
    },
    {
        id: "exterior",
        name: "Exterior Accessories",
        description: "Protect and style your car's outside.",
        slug: "exterior-accessories",
        colSpan: "md:col-span-1",
        bgClass: "bg-zinc-100",
        icon: Shield,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop" // Placeholder: Car Detail
    },
    {
        id: "electronics",
        name: "Car Electronics",
        description: "Screens, audio, and more.",
        slug: "car-electronics",
        colSpan: "md:col-span-1",
        bgClass: "bg-sky-50",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2574&auto=format&fit=crop" // Placeholder: Dashboard
    },
    {
        id: "care",
        name: "Car Care",
        description: "Keep your car clean and shiny.",
        slug: "car-care-tools",
        colSpan: "md:col-span-2",
        bgClass: "bg-emerald-50/50",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2670&auto=format&fit=crop" // Placeholder: Detailer
    }
];

function ArmchairIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 9h3v12H2V9h3" />
            <path d="M4 14h16" />
            <path d="M7 14v4" />
            <path d="M17 14v4" />
            <path d="M7 6v3" />
            <path d="M17 6v3" />
            <path d="M4 4h16" />
        </svg>
    )
}

export default function CategoryGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">The Collection</span>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900">
                            Popular <span className="italic text-slate-500 font-serif">Categories</span>
                        </h2>
                    </div>
                    <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:gap-4 transition-all">
                        View All Categories <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`group relative overflow-hidden rounded-[2rem] ${cat.colSpan} ${cat.bgClass}`}
                        >
                            <Link href={`/shop?category=${cat.slug}`} className="block w-full h-full">

                                {/* Background Image with zoom effect */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority={i < 3} // Prioritize above-fold images
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                            <cat.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xs font-bold tracking-widest text-white uppercase">Explore</span>
                                    </div>

                                    <h3 className="text-3xl font-display text-white mb-2">{cat.name}</h3>
                                    <p className="text-slate-300 font-light text-sm max-w-xs">{cat.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center md:hidden">
                    <Link href="/shop" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                        View All Categories <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
