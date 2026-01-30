"use client";

import { useWishlist } from "@/components/wishlist/wishlist-context";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, Trash2, ShoppingBag, Eye, Zap, ShieldCheck, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-context";
import { toast } from "sonner";

export default function WishlistPage() {
    const { items, toggleItem, isLoading } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (product: any) => {
        addToCart(product, 1);
        toast.success("Added to cart", {
            description: `${product.name} has been added to your shopping cart.`,
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFEFE] pb-40 overflow-hidden">
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-50/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-50/40 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            {/* Header: Simple Title */}
            <header className="relative z-10 pt-[180px] pb-24 px-4 md:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-12 h-[1px] bg-cta-blue" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cta-blue">My Collection</span>
                            </div>
                            <h1 className="text-7xl md:text-9xl heading-luxe tracking-tighter leading-[0.85] text-aether-primary uppercase">
                                My<br />Wishlist
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-md text-right md:text-left"
                        >
                            <p className="text-lg font-medium text-aether-secondary leading-relaxed border-l-2 md:border-l-0 md:border-r-2 border-cta-blue/30 pl-6 md:pl-0 md:pr-6">
                                A curated list of your favorite premium car accessories. Save items you like here and add them to your cart whenever you are ready.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Content: The Grid */}
            <main className="relative z-10 max-w-screen-2xl mx-auto px-4 md:px-12">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[500px] bg-slate-50 animate-pulse rounded-[3rem]" />
                        ))}
                    </div>
                ) : items.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {items.map((product, index) => (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className="break-inside-avoid"
                            >
                                <div className="group relative glass-panel overflow-hidden border-white/40 hover:border-cta-blue/30 transition-all duration-700 hover:shadow-2xl">
                                    {/* Product Image Stage */}
                                    <div className={`relative w-full overflow-hidden bg-slate-50 ${index % 3 === 0 ? 'aspect-[3/4]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                                        <Image
                                            src={product.images[0] || ""}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />

                                        {/* Overlay controls */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-aether-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="h-12 px-6 rounded-full bg-cta-blue text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-cta-blue transition-all shadow-lg"
                                                >
                                                    Add to Cart <ShoppingCart className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => toggleItem(product)}
                                                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 transition-all border border-white/20"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price Tag */}
                                        {/* Price Tag */}
                                        <div className="absolute top-6 right-6 flex flex-col items-end gap-1 z-20">
                                            <div className="badge-titanium bg-white/90 backdrop-blur-xl border-white shadow-xl text-lg font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                                                {formatPrice(product.discountPrice || product.price)}
                                            </div>
                                            {product.discountPrice && (
                                                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/50 shadow-sm">
                                                    <span className="text-[10px] font-black text-slate-400 line-through decoration-red-400/50">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600">
                                                        <Sparkles className="w-2.5 h-2.5 fill-current" />
                                                        <span>-{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info Panel */}
                                    <div className="p-8 space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cta-blue">
                                                <ShieldCheck className="w-3 h-3" /> 100% Original
                                            </div>
                                            <Link href={`/shop/${product.slug}`}>
                                                <h3 className="text-2xl font-display font-black text-aether-primary leading-tight group-hover:text-cta-blue transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-aether-muted">
                                            <span className="text-emerald-500">Available</span>
                                            <Link href={`/shop/${product.slug}`} className="flex items-center gap-2 hover:text-cta-blue transition-colors">
                                                View Product <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center py-40 text-center"
                    >
                        <div className="relative mb-12">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="w-32 h-32 rounded-[3rem] bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner"
                            >
                                <Heart className="w-12 h-12 text-slate-200 fill-slate-50" />
                            </motion.div>
                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Eye className="w-6 h-6" />
                            </div>
                        </div>
                        <h2 className="text-5xl font-display font-black text-aether-primary mb-6 uppercase">Wishlist is Empty</h2>
                        <p className="max-w-sm text-aether-secondary mb-12 italic">
                            You haven't saved any products yet. Browse our collection and click the heart icon to save items here.
                        </p>
                        <Link href="/shop">
                            <button className="btn-primary">
                                START SHOPPING
                            </button>
                        </Link>
                    </motion.div>
                )}
            </main>

            {/* Footer Decorative Label */}
            <div className="absolute bottom-20 left-12 rotate-[-90deg] origin-left hidden lg:block">
                <span className="text-[10px] font-black uppercase tracking-[1em] text-aether-muted opacity-30">
                    KARBHAWAN / WISHLIST / 2024
                </span>
            </div>
        </div>
    );
}
