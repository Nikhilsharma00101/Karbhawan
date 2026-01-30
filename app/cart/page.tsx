"use client";

import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/utils";
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag, Terminal, Cpu, Zap, ShoppingCart, Sparkles, MessageCircle, ShieldCheck, CreditCard, Wallet, Wrench, PartyPopper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const handleCheckout = () => {
        const hasInstallation = items.some(i => i.hasInstallation);
        if (hasInstallation) {
            setShowSuccessModal(true);
        } else {
            router.push('/checkout');
        }
    };

    if (items.length === 0) {
        return (
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F1F5F9]">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-blue-100/30 blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-indigo-100/30 blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 flex flex-col items-center text-center px-4"
                >
                    <div className="relative mb-8 md:mb-12">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 m-auto border-2 border-dashed border-slate-200 rounded-full"
                        />
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-2xl flex items-center justify-center">
                            <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-cta-blue" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-8xl heading-luxe mb-4 md:mb-6 tracking-tighter uppercase">Cart Is<br />Empty</h1>
                    <p className="max-w-md text-aether-secondary font-medium leading-relaxed mb-8 md:mb-10 text-sm md:text-base">
                        Your shopping cart is currently empty. Browse our collection to find premium accessories for your car.
                    </p>
                    <Link href="/shop">
                        <button className="btn-primary flex items-center gap-4 text-xs md:text-sm py-3 px-6 md:py-4 md:px-8">
                            START SHOPPING <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const originalTotal = items.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
    const productCurrentTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalInstallation = items.reduce((sum, item) => sum + (item.hasInstallation && item.installationCost ? item.installationCost * item.quantity : 0), 0);
    const totalDiscount = originalTotal - productCurrentTotal;

    return (
        <div className="min-h-screen bg-[#F1F5F9] pt-28 md:pt-40 pb-20 md:pb-32 px-4 md:px-8 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-200/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 -right-20 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-indigo-200/20 rounded-full blur-[60px] md:blur-[100px] animate-pulse-slow font-display text-[20vw] opacity-[0.03] select-none pointer-events-none flex items-center justify-center">
                    CART
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-20 gap-8">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cta-blue mb-4 block underline underline-offset-8">Shopping Cart</span>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl heading-luxe tracking-tighter leading-none uppercase">
                            Your<br />Cart
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-center gap-6"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-aether-muted mb-1">Total Items</p>
                            <p className="text-2xl font-display font-black">{items.length}</p>
                        </div>
                        <button
                            onClick={clearCart}
                            className="h-12 md:h-14 px-6 md:px-8 rounded-2xl border border-red-100 bg-red-50/50 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-500"
                        >
                            Clear All
                        </button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-24">
                    {/* Items List - Floating Bento Style */}
                    <div className="lg:col-span-7 space-y-6 md:space-y-12">
                        <AnimatePresence mode="popLayout">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.productId}
                                    layout
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredItem(item.productId)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`relative group ${index % 2 === 0 ? 'md:ml-0' : 'md:ml-12'}`}
                                >
                                    {/* Background Glow */}
                                    <div className={`absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-[3rem] blur-2xl transition-opacity duration-1000 ${hoveredItem === item.productId ? 'opacity-100' : 'opacity-0'}`} />

                                    <div className="relative glass-panel p-5 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 items-center md:items-stretch group">
                                        {/* Dynamic Image Wrapper - Now Clickable */}
                                        <Link
                                            href={`/shop/${item.slug}`}
                                            className="relative w-full h-48 md:w-56 md:h-56 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-100 border border-white/50 flex-shrink-0 shadow-sm block group/img"
                                        >
                                            <motion.div
                                                animate={hoveredItem === item.productId ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                                                className="w-full h-full relative"
                                            >
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase text-slate-300">No Image</div>
                                                )}
                                            </motion.div>
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-cta-blue/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500">
                                                    <ArrowRight className="w-5 h-5 text-cta-blue" />
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="flex-1 flex flex-col justify-between py-2 w-full">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-cta-blue flex items-center gap-2 mb-2">
                                                            ID: {item.productId.slice(-6).toUpperCase()}
                                                        </span>
                                                        <Link href={`/shop/${item.slug}`}>
                                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-aether-primary group-hover:text-cta-blue transition-colors leading-tight">
                                                                {item.name}
                                                            </h3>
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2 md:gap-3 flex-shrink-0">
                                                        <div className="flex flex-col items-end gap-0.5 md:gap-1">
                                                            {item.originalPrice && item.originalPrice > item.price && (
                                                                <span className="text-[10px] md:text-[11px] font-black text-slate-400/80 line-through decoration-red-500/30 tracking-widest uppercase">
                                                                    {formatPrice(item.originalPrice)}
                                                                </span>
                                                            )}
                                                            <p className="text-3xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 tracking-tighter leading-none drop-shadow-sm">
                                                                {formatPrice(item.price)}
                                                            </p>
                                                            {item.hasInstallation && (
                                                                <div className="flex items-center gap-1 mt-1 text-emerald-600">
                                                                    <Wrench className="w-3 h-3" />
                                                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider">
                                                                        + {formatPrice(item.installationCost || 0)} install
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {item.originalPrice && item.originalPrice > item.price && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                className="badge-titanium bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-200/50 flex items-center gap-2 py-1.5 px-3 md:py-2 md:px-4 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500"
                                                            >
                                                                <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-500 group-hover:text-white transition-colors" />
                                                                <span className="text-[9px] md:text-[10px] font-black text-emerald-700 group-hover:text-white uppercase tracking-[0.2em] whitespace-nowrap">
                                                                    SAVE {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                                                </span>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 md:gap-4 pt-2 md:pt-4">
                                                    <div className="badge-titanium bg-slate-50 flex items-center gap-2 text-[9px] md:text-[10px] px-2 md:px-3">
                                                        High Quality
                                                    </div>
                                                    <div className="badge-titanium bg-slate-50 text-[9px] md:text-[10px] px-2 md:px-3">Genuine</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-6 md:mt-8 border-t border-slate-100 pt-4 md:pt-6">
                                                <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 p-1 md:p-1.5">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl text-aether-muted hover:text-cta-blue transition-all"
                                                    >
                                                        <Minus className="w-3 h-3 md:w-4 md:h-4" />
                                                    </button>
                                                    <span className="w-8 md:w-12 text-center font-black font-display text-lg md:text-xl text-aether-primary">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl text-aether-muted hover:text-cta-blue transition-all"
                                                    >
                                                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.productId)}
                                                    className="p-3 md:p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                    title="Remove Item"
                                                >
                                                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary - Dynamic Dashboard Style */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="lg:sticky lg:top-40"
                        >
                            <div className="relative p-1 overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-br from-white via-white to-blue-50 shadow-2xl border border-white">
                                <div className="p-6 md:p-14 space-y-8 md:space-y-12">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl md:text-3xl font-display font-black text-aether-primary uppercase tracking-tighter">Order<br />Summary</h3>
                                            <div className="w-12 h-1 bg-cta-blue rounded-full" />
                                        </div>

                                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-6 shadow-lg shadow-blue-200">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <MessageCircle className="w-24 h-24 rotate-12" />
                                            </div>
                                            <div className="relative z-10 flex flex-col gap-3">
                                                <div className="flex items-center gap-2 text-white/90">
                                                    <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">GST Invoice Available</span>
                                                </div>
                                                <p className="text-xs font-bold text-white leading-relaxed">
                                                    If you want to add your GST details for this transaction, please Whatsapp us <span className="text-yellow-300 underline underline-offset-2">@+91 9811771143</span> before placing the order.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted">Total MRP</span>
                                            <span className="text-sm font-black uppercase tracking-widest text-slate-400 line-through decoration-red-400/50">
                                                {formatPrice(originalTotal)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted">Total Discount</span>
                                            <span className="text-sm font-black uppercase tracking-widest text-emerald-500">
                                                -{formatPrice(totalDiscount)}
                                            </span>
                                        </div>

                                        {totalInstallation > 0 && (
                                            <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted">Doorstep Installation</span>
                                                    <div className="bg-emerald-100 text-emerald-600 p-0.5 rounded-full">
                                                        <Wrench className="w-3 h-3" />
                                                    </div>
                                                </div>
                                                <span className="text-sm font-black uppercase tracking-widest text-slate-900">
                                                    +{formatPrice(totalInstallation)}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted">Shipping</span>
                                            <span className="text-sm font-black uppercase tracking-widest text-emerald-500">FREE</span>
                                        </div>

                                        <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cta-blue">Taxes</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-cta-blue">Inclusive of all taxes</span>
                                        </div>

                                        {totalDiscount > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-4 shadow-lg shadow-emerald-200"
                                            >
                                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                                <div className="relative flex items-center justify-center gap-3 text-white">
                                                    <Sparkles className="w-5 h-5 animate-pulse text-yellow-300" />
                                                    <p className="text-xs font-black uppercase tracking-widest">
                                                        Yay! You saved <span className="text-yellow-300 text-sm">{formatPrice(totalDiscount)}</span> on this order
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="pt-8 flex flex-col gap-6">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-cta-blue">Total Amount</span>
                                            <div className="text-right">
                                                <motion.span
                                                    key={cartTotal}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 block leading-tight drop-shadow-sm"
                                                >
                                                    {formatPrice(cartTotal)}
                                                </motion.span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleCheckout}
                                            className="relative w-full h-20 md:h-24 overflow-hidden rounded-3xl bg-aether-primary text-white transition-transform duration-500 hover:scale-[0.98]"
                                        >
                                            {/* Animated BG for button */}
                                            <motion.div
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%]"
                                            />
                                            <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em]">
                                                Checkout Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                            </span>
                                        </button>

                                        {/* Trust Markers */}
                                        <div className="flex items-center justify-center gap-6 py-4 border-t border-slate-100">
                                            <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 group/trust">
                                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                                <span className="text-[10px] font-bold text-slate-900">Secure Payment</span>
                                            </div>
                                            <div className="h-4 w-px bg-slate-200" />
                                            <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 group/trust">
                                                <div className="flex -space-x-2">
                                                    <div className="w-6 h-6 rounded-full bg-white border border-slate-100 flex items-center justify-center relative z-10">
                                                        <CreditCard className="w-3 h-3 text-blue-600" />
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-white border border-slate-100 flex items-center justify-center relative z-0">
                                                        <Wallet className="w-3 h-3 text-indigo-600" />
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-900">Cards & UPI</span>
                                            </div>
                                            <div className="h-4 w-px bg-slate-200" />
                                            <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 group/trust">
                                                <Zap className="w-4 h-4 text-amber-500" />
                                                <span className="text-[10px] font-bold text-slate-900">Fast Delivery</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                            <div className="text-[9px] font-black uppercase text-aether-muted mb-1">Secure</div>
                                            <div className="text-[10px] font-bold text-aether-primary italic">Encoded Payment</div>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                            <div className="text-[9px] font-black uppercase text-aether-muted mb-1">Authentic</div>
                                            <div className="text-[10px] font-bold text-aether-primary italic">100% Original</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Checkout Success Modal for Installation */}
            {mounted && showSuccessModal && createPortal(
                <AnimatePresence>
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-10 text-center"
                        >
                            {/* Confetti / Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent" />

                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-200 mb-2">
                                    <PartyPopper className="w-12 h-12 text-white animate-bounce-slow" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight">
                                        Peace of Mind, Delivered
                                    </h3>
                                    <p className="text-base md:text-lg font-medium text-slate-500 leading-relaxed max-w-sm mx-auto">
                                        You&apos;ve made a brilliant choice. Instead of waiting at a workshop, enjoy the comfort of your home while our experts ensure a flawless installation at your doorstep.
                                    </p>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-2">
                                        <p className="text-sm font-bold text-aether-primary italic">
                                            &quot;Sit back and relax while we upgrade your drive&quot;
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push('/checkout')}
                                    className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mt-4 group"
                                >
                                    Continue to Checkout <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
