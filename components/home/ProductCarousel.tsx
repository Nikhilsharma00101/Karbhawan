"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductType } from "@/types";
import ProductCard from "@/components/shop/ProductCard";

interface ProductCarouselProps {
    title: string;
    subtitle?: string;
    products: ProductType[];
    viewAllLink?: string;
    bgClass?: string;
}

export default function ProductCarousel({
    title,
    subtitle,
    products,
    viewAllLink = "/shop",
    bgClass = "bg-white"
}: ProductCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            scrollContainerRef.current.scrollTo({
                left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: "smooth"
            });
        }
    };

    if (!products || products.length === 0) return null;

    return (
        <section className={`py-24 ${bgClass} overflow-hidden`}>
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-3">
                        {subtitle && (
                            <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">{subtitle}</span>
                        )}
                        <h2 className="text-4xl font-display font-medium text-slate-900">{title}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Custom Navigation */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => scroll("left")}
                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all active:scale-95"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all active:scale-95"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        {viewAllLink && (
                            <Link href={viewAllLink} className="hidden md:flex ml-6 items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-slate-600 transition-colors">
                                View All
                            </Link>
                        )}
                    </div>
                </div>

                {/* Carousel Rail */}

                {/* Gradient Masks for Edge Fading */}
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/0 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/0 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product, i) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5 }}
                                className="min-w-[280px] md:min-w-[320px] snap-center"
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
