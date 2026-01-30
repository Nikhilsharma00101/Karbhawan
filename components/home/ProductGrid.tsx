"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ProductType } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import { motion } from "framer-motion";

interface ProductGridProps {
    title: string;
    subtitle?: string;
    products: ProductType[];
    viewAllLink?: string;
}

export default function ProductGrid({
    title,
    subtitle,
    products,
    viewAllLink = "/shop"
}: ProductGridProps) {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-24 bg-zinc-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    {subtitle && (
                        <span className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {subtitle}
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        </span>
                    )}
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900">{title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.slice(0, 8).map((product, i) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link href={viewAllLink} className="group flex items-center gap-3 px-8 py-4 border border-slate-200 bg-white rounded-full transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm">
                        <span className="text-sm font-bold tracking-widest uppercase">Explore All Trending</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
