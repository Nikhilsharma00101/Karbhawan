"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ProductType } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import {
    Star,
    ChevronLeft,
    ShoppingBag,
    Heart,
    Share2,
    ShieldCheck,
    Truck,
    CheckCircle2,
    Sparkles,
    Box,
    FileText,
    Car,
    Layers,
    Info,
    ArrowRight,
    Zap,
    MousePointer2,
    Maximize2
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import Tooltip from "@/components/ui/Tooltip";
import { toast } from "sonner";
import ProductBackground from "@/components/shop/ProductBackground";
import InstallationService from "@/components/shop/InstallationService";

interface ProductClientPageProps {
    product: ProductType;
    relatedProducts?: ProductType[];
}

export default function ProductClient({ product, relatedProducts = [] }: ProductClientPageProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
    const [showFullDossier, setShowFullDossier] = useState(false);
    const { addToCart } = useCart();
    const { isInWishlist, toggleItem } = useWishlist();
    const [installation, setInstallation] = useState<{ active: boolean; cost: number }>({ active: false, cost: 0 });

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const hasDiscount = product.discountPrice && product.discountPrice < product.price;
    const savings = hasDiscount ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) : 0;

    const handleAddToCart = () => {
        addToCart(product, quantity, {
            hasInstallation: installation.active,
            installationCost: installation.cost
        });
        toast.success(`Reserved Successfully`, {
            description: `${product.name} has been added to your collection.`,
            className: "bg-white border-indigo-100 text-aether-primary font-sans",
        });
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#fafbff] pb-20 md:pb-32 pt-[180px] md:pt-[240px] overflow-x-hidden md:overflow-visible selection:bg-indigo-100 selection:text-indigo-900">
            {/* Premium Custom Background */}
            <ProductBackground product={product} />

            <div className="container px-4 md:px-8 relative z-[30] mx-auto max-w-7xl">
                {/* Premium Navigation Header */}
                <div className="flex items-center justify-between mb-8 md:mb-12">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/shop"
                            className="group flex items-center gap-3 md:gap-4 py-2.5 md:py-3 px-6 md:px-8 rounded-full bg-white/70 backdrop-blur-xl border border-indigo-50 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 group-hover:-translate-x-1 transition-transform" />
                            <div className="flex flex-col">
                                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-indigo-400 leading-none mb-0.5">Back To</span>
                                <span className="text-[11px] md:text-xs font-bold text-slate-900">Inventory</span>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex gap-2 md:gap-4"
                    >
                        <Tooltip content={isInWishlist(product._id) ? "Remove from Collection" : "Save to Wishlist"}>
                            <button
                                onClick={() => toggleItem(product)}
                                className={cn(
                                    "w-11 h-11 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl border transition-all duration-500 shadow-sm overflow-hidden relative group active:scale-95 cursor-pointer",
                                    isInWishlist(product._id)
                                        ? "bg-rose-50 border-rose-100 text-rose-500"
                                        : "bg-white/70 backdrop-blur-xl border-indigo-50 text-slate-400 hover:bg-white"
                                )}
                            >
                                <Heart className={cn("w-5 h-5 md:w-6 md:h-6 transition-all duration-500", isInWishlist(product._id) ? "fill-current scale-110" : "group-hover:text-rose-500 group-hover:scale-110")} />
                                {isInWishlist(product._id) && (
                                    <motion.div
                                        layoutId="wishlist-glow"
                                        className="absolute inset-0 bg-rose-400/10 blur-xl pointer-events-none"
                                    />
                                )}
                            </button>
                        </Tooltip>
                        <Tooltip content="Share Details">
                            <button className="w-11 h-11 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl bg-white/70 backdrop-blur-xl border border-indigo-50 shadow-sm hover:bg-white group transition-all cursor-pointer">
                                <Share2 className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-indigo-500 transition-all" />
                            </button>
                        </Tooltip>
                    </motion.div>
                </div>

                {/* Main Hero Layout - Advanced Composition */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start mb-24 md:mb-32">

                    {/* Perspective Image Stage */}
                    <div className="w-full lg:w-[40%] lg:sticky lg:top-[240px]">
                        <div className="relative group">
                            {/* Floating Metadata */}
                            <div className="absolute -top-[20px] md:-top-11 left-0 flex items-center gap-3 md:gap-6 z-[50] overflow-x-auto no-scrollbar w-full md:w-auto pb-2">
                                {product.isNewArrival && (
                                    <div className="shrink-0 py-1.5 md:py-2 px-3 md:px-5 bg-indigo-600 text-white rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-200">
                                        Release 2026.01
                                    </div>
                                )}
                                {product.isBestSeller && (
                                    <div className="shrink-0 py-1.5 md:py-2 px-3 md:px-5 bg-amber-500 text-white rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-amber-200">
                                        Elite Choice
                                    </div>
                                )}
                                {product.isTopChoice && (
                                    <div className="shrink-0 py-1.5 md:py-2 px-3 md:px-5 bg-emerald-600 text-white rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-200">
                                        Top Performance
                                    </div>
                                )}
                                <div className="shrink-0 text-[8px] md:text-[10px] font-mono text-slate-400 tracking-[0.3em] uppercase whitespace-nowrap">
                                    SKU: {product.sku || 'KBN-PRO-001'}
                                </div>
                            </div>

                            {/* Main Frame */}
                            <motion.div
                                layoutId={`image-${product.slug}`}
                                className="relative aspect-square bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(30,58,138,0.15)] border-4 border-white group-hover:shadow-[0_60px_120px_-20px_rgba(30,58,138,0.2)] transition-shadow duration-700 p-4 md:p-10"
                            >
                                {/* Floating Wishlist Action */}
                                <div className="absolute top-6 right-6 z-30">
                                    <Tooltip content={isInWishlist(product._id) ? "Remove from Collection" : "Save to Wishlist"}>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleItem(product);
                                            }}
                                            className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl cursor-pointer",
                                                isInWishlist(product._id)
                                                    ? "bg-rose-500 text-white shadow-rose-200"
                                                    : "bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500 border border-slate-100"
                                            )}
                                        >
                                            <Heart className={cn("w-5 h-5", isInWishlist(product._id) ? "fill-current" : "")} />
                                        </motion.button>
                                    </Tooltip>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={product.images[selectedImage] || "/placeholder-product.jpg"}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Image Interactions */}
                                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black/20 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="flex justify-between items-end">
                                        <div className="flex gap-1.5 md:gap-2">
                                            {[...Array(product.images.length)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        "h-1 transition-all duration-500 rounded-full",
                                                        selectedImage === i ? "w-6 md:w-8 bg-white" : "w-1 bg-white/40"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors cursor-pointer">
                                            <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Thumbnails - Sidecar or Bottom Row */}
                            <div className="mt-6 lg:mt-0 lg:absolute lg:-left-20 lg:top-1/2 lg:-translate-y-1/2 flex lg:flex-col gap-3 md:gap-4 z-20 overflow-x-auto no-scrollbar pb-2 lg:pb-0 px-1">
                                {product.images.map((img, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedImage(i)}
                                        className={cn(
                                            "relative shrink-0 w-16 h-16 md:w-20 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-500 bg-white shadow-lg md:shadow-xl cursor-pointer",
                                            selectedImage === i
                                                ? "border-indigo-500 shadow-indigo-100/50"
                                                : "border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={img}
                                            alt={`View ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Architecture */}
                    <div className="w-full lg:w-[60%] space-y-8 md:space-y-12 mt-4 md:mt-0">
                        {/* Identity Header */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="h-[1px] w-8 bg-indigo-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">
                                    {product.category.replace(/-/g, ' ')}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] font-black text-slate-900 tracking-tight"
                            >
                                {product.name}
                            </motion.h1>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap items-center gap-4 md:gap-6"
                            >
                                <div className="flex items-center gap-2 py-1.5 md:py-2 px-3 md:px-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50">
                                    <div className="flex text-indigo-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 md:w-3.5 md:h-3.5 ${i < Math.floor(product.rating?.average || 5) ? 'fill-indigo-500' : 'text-slate-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-black text-indigo-900">
                                        {product.rating?.average || 5}.0
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-600">In Stock & Ready</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Pricing and Attributes Component */}
                        <div className="p-8 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                            {/* Accent Decoration */}
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <Box className="w-32 h-32 text-indigo-900" />
                            </div>

                            <div className="space-y-12 relative z-10">
                                {/* Price Display */}
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Current Valuation</span>
                                    <div className="flex items-baseline gap-4">
                                        <div className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                                            {formatPrice(hasDiscount ? product.discountPrice! : product.price)}
                                        </div>
                                        {hasDiscount && (
                                            <div className="flex flex-col">
                                                <span className="text-base md:text-lg text-slate-400 line-through font-bold">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <span className="text-[10px] md:text-xs font-black text-indigo-600 uppercase">
                                                    Save {savings}%
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Variants (Colors/Sizes) - Integrated Selection */}
                                <div className="space-y-8">
                                    {product.colors && product.colors.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-slate-400">Finish / Color</span>
                                                <span className="text-indigo-600">{selectedColor}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 md:gap-3">
                                                {product.colors.map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSelectedColor(color)}
                                                        className={cn(
                                                            "px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border-2 transition-all cursor-pointer",
                                                            selectedColor === color
                                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                                                                : "bg-slate-50 border-slate-50 text-slate-500 hover:border-indigo-200 hover:bg-white"
                                                        )}
                                                    >
                                                        {color}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {product.sizes && product.sizes.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-slate-400">Dimensions / Size</span>
                                                <span className="text-indigo-600">{selectedSize}</span>
                                            </div>
                                            <div className="grid grid-cols-2 min-[400px]:grid-cols-4 gap-2">
                                                {product.sizes.map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={cn(
                                                            "h-12 md:h-14 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-black border-2 transition-all flex items-center justify-center cursor-pointer",
                                                            selectedSize === size
                                                                ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200"
                                                                : "bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-500"
                                                        )}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Installation Service Integration */}
                                    <InstallationService
                                        productId={product._id}
                                        productName={product.name}
                                        onInstallationChange={(active, cost) => setInstallation({ active, cost })}
                                    />
                                </div>

                                {/* Action Matrix */}
                                <div className="space-y-6 pt-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 flex items-center justify-between p-2 pl-6 bg-slate-50 rounded-2xl border border-slate-100">
                                            <span className="text-[10px] font-black uppercase text-slate-400">Qty</span>
                                            <div className="flex items-center gap-3 bg-white rounded-xl p-1 border border-slate-100 shadow-sm">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500 transition-colors cursor-pointer"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-bold text-slate-900">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500 transition-colors cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <Tooltip content={isInWishlist(product._id) ? "Remove from Collection" : "Save to Wishlist"}>
                                            <button
                                                onClick={() => toggleItem(product)}
                                                className={cn(
                                                    "w-16 h-16 rounded-2xl flex items-center justify-center group active:scale-95 transition-all border cursor-pointer",
                                                    isInWishlist(product._id)
                                                        ? "bg-rose-50 border-rose-100 text-rose-500 shadow-sm shadow-rose-100"
                                                        : "bg-indigo-50 border-indigo-100 text-indigo-500"
                                                )}
                                            >
                                                <Heart className={cn("w-6 h-6 group-hover:scale-110 transition-transform", isInWishlist(product._id) ? "fill-current" : "")} />
                                            </button>
                                        </Tooltip>
                                        <Tooltip content="Forward to Network">
                                            <button className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group active:scale-95 transition-all cursor-pointer">
                                                <Share2 className="w-6 h-6 text-slate-400 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </Tooltip>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className="relative w-full h-[80px] group overflow-hidden bg-slate-900 rounded-[2rem] transition-all hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed group cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="relative flex items-center justify-center gap-4">
                                            <ShoppingBag className="w-6 h-6 text-white" />
                                            <span className="text-white text-sm font-black uppercase tracking-[0.2em]">
                                                {product.stock === 0 ? "Out of Stock" : "Add to Collection"}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-white/50 group-hover:translate-x-2 transition-transform duration-500" />
                                        </div>
                                    </button>
                                </div>

                                {/* Micro Details */}
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        Authenticity Guaranteed
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <Truck className="w-4 h-4 text-indigo-400" />
                                        Global Transit
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extended Documentation Section */}
                <div className="space-y-24 md:space-y-32">

                    {/* Narrative & Visual Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-10"
                            >
                                <div className="space-y-4">
                                    <span className="text-indigo-600 font-extrabold tracking-[0.4em] text-[11px] uppercase">The Narrative</span>
                                    <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                                        Masterfully <br />
                                        Crafted.
                                    </h2>
                                </div>
                                <div className="h-1 w-24 bg-indigo-600 rounded-full" />
                                <div className="relative">
                                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-indigo-50 rounded-full overflow-hidden">
                                        <motion.div className="h-full bg-indigo-500 w-full" style={{ scaleY: scrollYProgress }} />
                                    </div>
                                    <p className="text-2xl font-medium text-slate-600 leading-relaxed italic">
                                        "{product.description}"
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3 pt-6">
                                    {product.tags?.map(tag => (
                                        <span key={tag} className="px-5 py-2 rounded-full bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-2 gap-8 h-full">
                                {product.images.slice(1, 3).map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 }}
                                        className={cn(
                                            "relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700",
                                            i === 1 ? "mt-8 md:mt-16" : ""
                                        )}
                                    >
                                        <Image src={img} alt="Product perspective" fill className="object-cover" />
                                    </motion.div>
                                ))}
                                {product.images.length < 3 && (
                                    <div className="col-span-1 bg-indigo-50 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center p-6 md:p-12 text-center border-2 border-dashed border-indigo-200">
                                        <div className="space-y-2 md:space-y-4">
                                            <Zap className="w-8 h-8 md:w-12 md:h-12 text-indigo-400 mx-auto" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Detailed Visuals Coming Soon</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Technical Dossier Grid */}
                    {(product.highlights?.length || (product.specifications && Object.keys(product.specifications).length > 0)) && (
                        <div className="space-y-8 relative">
                            {/* Compact Dossier Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-100 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Technical Dossier</h2>
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-none mt-1">SKU: {product.sku || 'KBN-PRO-001'}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block py-1.5 px-4 rounded-full bg-slate-50 border border-slate-100">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Validated Engineering Specifications</span>
                                </div>
                            </div>

                            <div className="relative">
                                <motion.div
                                    initial={false}
                                    animate={{ height: showFullDossier ? "auto" : "220px" }}
                                    className="overflow-hidden relative"
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                        {/* All Technical Highlights */}
                                        {product.highlights?.map((h, i) => (
                                            <motion.div
                                                key={`highlight-full-${i}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.05 }}
                                                className="p-8 rounded-[2rem] bg-indigo-600 text-white shadow-xl shadow-indigo-100 flex flex-col justify-between group h-[220px] relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                                    <Sparkles className="w-8 h-8" />
                                                </div>
                                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md mb-6">
                                                    <span className="text-sm font-black italic">0{i + 1}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Highlight</h4>
                                                    <p className="text-lg font-black leading-tight tracking-tight">{h}</p>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* All Technical Specifications */}
                                        {product.specifications && Object.entries(product.specifications).map(([key, value], i) => (
                                            <motion.div
                                                key={`spec-full-${key}`}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (product.highlights?.length || 0) * 0.05 + i * 0.03 }}
                                                className="p-8 rounded-[2rem] bg-white border border-slate-100 group hover:border-indigo-400 transition-all duration-500 h-[220px] flex flex-col justify-between shadow-sm hover:shadow-md"
                                            >
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-indigo-600 transition-colors" />
                                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">{key}</p>
                                                    </div>
                                                    <p className="text-lg font-black text-slate-900 leading-tight font-mono tracking-tighter">{value}</p>
                                                </div>
                                                <div className="flex justify-end pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Info className="w-4 h-4 text-indigo-200" />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {!showFullDossier && (
                                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafbff] via-[#fafbff]/80 to-transparent z-10 pointer-events-none" />
                                    )}
                                </motion.div>

                                <div className="mt-16 flex justify-center relative z-20">
                                    <button
                                        onClick={() => setShowFullDossier(!showFullDossier)}
                                        className="group relative cursor-pointer"
                                    >
                                        {/* Outer Glowing Ring */}
                                        <div className="absolute inset-0 bg-indigo-400 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700 rounded-full" />

                                        <div className="relative flex items-center gap-6 py-4 px-10 rounded-full bg-slate-900 shadow-[0_20px_50px_-10px_rgba(79,70,229,0.3)] border border-indigo-500/30 overflow-hidden transition-all duration-500 hover:border-indigo-400 group-hover:shadow-[0_20px_50px_-5px_rgba(79,70,229,0.5)] active:scale-95">
                                            {/* Scanning Line Animation */}
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent -translate-x-full group-hover:animate-scan z-10" />

                                            <div className="flex flex-col items-start gap-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Command.Extract</span>
                                                </div>
                                                <span className="text-sm font-black text-white uppercase tracking-widest">
                                                    {showFullDossier ? "Compress Data" : "Expand Full Dossier"}
                                                </span>
                                            </div>

                                            <div className="h-10 w-[1px] bg-indigo-500/20 mx-2" />

                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/40 relative overflow-hidden transition-all duration-700",
                                                showFullDossier ? "rotate-180 bg-slate-800" : "group-hover:scale-110"
                                            )}>
                                                <ChevronLeft className={cn(
                                                    "w-6 h-6 -rotate-90 relative z-10 transition-transform duration-500",
                                                    showFullDossier ? "" : "group-hover:translate-y-1"
                                                )} />
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                                            </div>

                                            {/* Technical Coordinate Accent */}
                                            <div className="absolute right-4 bottom-2 opacity-10">
                                                <span className="text-[8px] font-black text-indigo-300 font-mono">COORD: 45.9221 / 01.002</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Compatibility Section - If Automotive */}
                    {(product.compatibility?.length || product.isUniversal) && (
                        <div className="relative p-12 lg:p-24 rounded-[4rem] bg-slate-900 overflow-hidden text-white">
                            {/* Abstract Visuals */}
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
                            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />

                            <div className="relative z-10 flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
                                <div className="lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
                                    <div className="flex items-center gap-4 py-2 px-5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full w-fit mx-auto lg:mx-0">
                                        <Car className="w-5 h-5 text-indigo-400" />
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200">Engineering Compatibility</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-none">
                                        Precision <br className="hidden md:block" />
                                        Interfacing.
                                    </h3>
                                    <p className="text-base md:text-xl text-slate-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                                        Validated through rigorous testing to ensure seamless integration with your hardware.
                                    </p>
                                </div>

                                <div className="lg:w-1/2 w-full">
                                    {product.isUniversal ? (
                                        <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-indigo-600 shadow-2xl shadow-indigo-500/20 text-center space-y-6">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 mx-auto flex items-center justify-center">
                                                <Layers className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Universal Standard</h4>
                                                <p className="text-indigo-100/60 uppercase text-[9px] md:text-[10px] font-black tracking-[0.3em]">Optimized for Global Systems</p>
                                            </div>
                                            <p className="text-indigo-50 font-medium text-sm md:text-base">This component is engineered with a universal mounting architecture, compatible with all standard automotive configurations.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                            {product.compatibility?.map((item, i) => (
                                                <div key={i} className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl group hover:bg-white hover:text-slate-900 transition-all duration-500">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1 group-hover:text-indigo-600 transition-colors">{item.make}</p>
                                                    <p className="text-xl md:text-2xl font-black tracking-tight mb-3 md:mb-4">{item.model}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.years?.map(year => (
                                                            <span key={year} className="px-2.5 py-1 rounded-lg bg-white/10 text-[9px] font-black group-hover:bg-slate-100 group-hover:text-slate-500 transition-colors">
                                                                {year}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quality & Trust Manifest */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-12 md:pt-12 pb-0">
                        {[
                            { icon: MousePointer2, title: "Precision", desc: "Digital Inspection" },
                            { icon: CheckCircle2, title: "Certified", desc: "Auth Guaranteed" },
                            { icon: Box, title: "Elite Pack", desc: "Safe Transit" }
                        ].map((item, i) => (
                            <div key={i} className="group flex flex-col items-center text-center p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-700">
                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-500">
                                    <item.icon className="w-8 h-8 md:w-10 md:h-10" />
                                </div>
                                <h4 className="text-lg md:text-xl font-black uppercase tracking-widest text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Related Discoveries Section - Aether Luxe Kinetic Grid */}
                    {relatedProducts.length > 0 && (
                        <div className="space-y-16 md:space-y-24 border-t border-slate-100/50 pt-[35px] relative">
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
                                <div className="absolute top-24 left-0 w-full h-[1px] bg-indigo-600" />
                                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-indigo-600" />
                                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-indigo-600" />
                            </div>

                            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center gap-2"
                                >
                                    <Sparkles className="w-3 h-3 text-indigo-500" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500">Recommended</span>
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
                                >
                                    Related Products
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-slate-400 font-bold tracking-[0.2em] text-[10px] md:text-xs max-w-lg"
                                >
                                    PREMIUM COMPONENTS FROM THE Karbhawan COLLECTION
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
                                {relatedProducts.map((rel, i) => (
                                    <Link
                                        key={rel.slug}
                                        href={`/shop/${rel.slug}`}
                                        className="group block relative cursor-pointer"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1, duration: 0.8 }}
                                            className="space-y-8"
                                        >
                                            {/* Advanced Product Stage */}
                                            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-white border border-slate-100 transition-all duration-700 hover:border-indigo-200 group-hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)]">
                                                {/* Scanning HUD Effect */}
                                                <div className="absolute inset-x-0 h-[100%] bg-gradient-to-b from-transparent via-indigo-400/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2s] ease-in-out z-20 pointer-events-none" />

                                                {/* Lineage ID Overlay */}
                                                <div className="absolute top-8 left-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <div className="text-[8px] font-mono font-black text-indigo-400 uppercase tracking-widest bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-indigo-50">
                                                        ID: {rel.sku?.slice(-4) || 'P-03'}
                                                    </div>
                                                </div>

                                                <Image
                                                    src={rel.images[0] || "/placeholder-product.jpg"}
                                                    alt={rel.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                                                />

                                                {/* Interactive Action Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }}
                                                        whileHover={{ y: 0, opacity: 1 }}
                                                        className="w-full py-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white text-center shadow-2xl"
                                                    >
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">View Details</span>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Technical Card Metadata */}
                                            <div className="space-y-4 px-4 relative">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-[1px] w-6 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-500">In Stock Now</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-1">{rel.name}</h3>
                                                    <div className="flex justify-between items-center pt-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                                                            <p className="text-base font-bold text-slate-900">{formatPrice(rel.discountPrice || rel.price)}</p>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-500">
                                                            <ArrowRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed bottom-0 left-0 right-0 h-1.5 bg-indigo-600 z-50 origin-[0%]"
            />
        </div>
    );
}

