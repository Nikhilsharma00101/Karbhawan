"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShoppingBag, X, ArrowRight, Car, Wrench, Sparkles } from "lucide-react";
import { useCart } from "./cart-context";
import { formatPrice } from "@/lib/utils";

export default function AddToCartModal() {
    const { recentlyAddedItem, closeNotification, items, cartTotal } = useCart();
    const [mounted, setMounted] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Countdown Timer for Auto Dismiss (5 seconds)
    useEffect(() => {
        if (!recentlyAddedItem) {
            setProgress(100);
            return;
        }

        setProgress(100);
        const duration = 5000; // 5s
        const intervalTime = 50;
        const decrement = (intervalTime / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev - decrement;
                if (next <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [recentlyAddedItem]);

    // Safely trigger closeNotification when countdown completes
    useEffect(() => {
        if (progress <= 0 && recentlyAddedItem) {
            closeNotification();
        }
    }, [progress, recentlyAddedItem, closeNotification]);

    if (!mounted || !recentlyAddedItem) return null;

    const { product, quantity, options } = recentlyAddedItem;
    const hasDiscount = !!(product.discountPrice && product.discountPrice < product.price);
    const activePrice = hasDiscount ? product.discountPrice! : product.price;

    const modalContent = (
        <AnimatePresence>
            {recentlyAddedItem && (
                <div className="fixed top-6 right-4 sm:right-6 md:right-8 z-[100000] max-w-md w-[calc(100vw-2rem)] sm:w-[420px] pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -40, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(5px)" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-[2.5rem] bg-slate-900/95 backdrop-blur-2xl border border-indigo-500/30 text-white shadow-[0_30px_90px_-15px_rgba(15,23,42,0.6)] p-6 md:p-7 space-y-5"
                    >
                        {/* Ambient Glow Backgrounds */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                        {/* Top Progress Countdown Bar */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
                                style={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between relative z-10 pt-1">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 block leading-none mb-1">
                                        Added To Cart
                                    </span>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-300 leading-none">
                                        {quantity} {quantity === 1 ? 'Item' : 'Items'} Reserved
                                    </h4>
                                </div>
                            </div>
                            <button
                                onClick={closeNotification}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Product Card Details */}
                        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 relative z-10">
                            {/* Product Thumbnail */}
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-white/20 shadow-md">
                                {product.images[0] ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[9px] font-black uppercase text-slate-300">N/A</div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0 space-y-1.5 flex flex-col justify-center">
                                <h3 className="text-sm font-black text-white leading-tight line-clamp-1">
                                    {product.name}
                                </h3>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-base font-black text-white font-display">
                                        {formatPrice(activePrice)}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-xs text-slate-400 line-through font-medium">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}
                                </div>

                                {/* Vehicle Badge if Specified */}
                                {options?.selectedVehicle?.fullText && (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[9px] font-black uppercase tracking-wider w-fit">
                                        <Car className="w-3 h-3 text-indigo-400 shrink-0" />
                                        <span className="truncate max-w-[200px]">{options.selectedVehicle.fullText}</span>
                                    </div>
                                )}

                                {/* Installation Badge */}
                                {options?.hasInstallation && (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[9px] font-black uppercase tracking-wider w-fit">
                                        <Wrench className="w-3 h-3 text-emerald-400 shrink-0" />
                                        <span>Doorstep Installation (+{formatPrice(options.installationCost || 0)})</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart Summary Bar */}
                        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Cart Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})
                            </span>
                            <span className="text-sm font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                                {formatPrice(cartTotal)}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 relative z-10 pt-1">
                            <button
                                onClick={closeNotification}
                                className="w-full py-3.5 rounded-xl border border-white/10 hover:bg-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                            >
                                Continue Shopping
                            </button>
                            <Link href="/cart" onClick={closeNotification} className="block w-full">
                                <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer group">
                                    <span>View Cart</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
