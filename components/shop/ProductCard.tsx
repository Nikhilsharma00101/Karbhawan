"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { ShoppingBag, Heart, Eye, Star, ArrowRight, Sparkles, Check, Car, Plus, Wrench } from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, MouseEvent } from "react";
import { useCart } from "../cart/cart-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useWishlist } from "../wishlist/wishlist-context";

interface ProductCardProps {
    product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();
    const { isInWishlist, toggleItem } = useWishlist();

    const isWishlisted = isInWishlist(product._id);

    const handleNavigate = () => {
        if (isNavigating) return;
        setIsNavigating(true);
        // Premium artificial delay of 2 seconds
        setTimeout(() => {
            router.push(`/shop/${product.slug}`);
        }, 2000);
    };

    const handleWishlistClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await toggleItem(product);
    };

    // Reset "Added" state after delay
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAdding(true);
        // Simulate a tiny delay for feel
        setTimeout(() => {
            addToCart(product, 1);
            setIsAdding(false);
            setIsAdded(true);
            toast.success(`${product.name} reserved successfully!`, {
                description: "View your collection in the cart.",
                className: "bg-karbhawan-midnight border-white/10 text-white",
            });

            setTimeout(() => setIsAdded(false), 2000);
        }, 300);
    };

    // Tilt Animation Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

    // Spotlight effect values
    const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
        mouseX.set(mouseXVal);
        mouseY.set(mouseYVal);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const hasDiscount = product.discountPrice && product.discountPrice < product.price;
    const hasSecondaryImage = product.images.length > 1;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNavigate();
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={handleNavigate}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="article"
            aria-label={`View details for ${product.name}`}
            style={{
                rotateX,
            }}
            className="group relative flex flex-col h-full bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-titanium-hover hover:-translate-y-1 hover:border-slate-300 cursor-pointer"
        >
            {/* Subtle Texture Grain */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            {/* Image Container - Defined & Separated */}
            <div className="relative aspect-square m-2 overflow-hidden rounded-[1.5rem] bg-slate-50 border border-slate-100/50">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isHovered && hasSecondaryImage ? "secondary" : "primary"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={isHovered && hasSecondaryImage ? product.images[1] : (product.images[0] || "/placeholder-product.jpg")}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Badges - Top Left */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {product.stock === 0 && <span className="badge-titanium bg-slate-900 text-white border-slate-800 shadow-slate-200/20">Sold Out</span>}
                    {hasDiscount && (
                        <motion.div
                            initial={{ x: -20, opacity: 0, scale: 0.5 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1, rotate: -2 }}
                            className="relative z-10 filter drop-shadow-[0_8px_20px_rgba(14,165,233,0.5)]"
                        >
                            <div
                                className="bg-sky-500 text-white flex items-center gap-2 pl-3 pr-5 py-2 shadow-inner"
                                style={{
                                    clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)',
                                    borderLeft: '4px solid #fff'
                                }}
                            >
                                <div className="relative flex items-center justify-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="absolute inset-0 bg-white blur-md rounded-full"
                                    />
                                    <Sparkles className="w-3.5 h-3.5 text-white relative z-10" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-sm font-black tracking-tighter text-white">
                                        {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                                    </span>
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-sky-100">OFF</span>
                                </div>
                            </div>

                            {/* Decorative Accent under the blade */}
                            <div className="absolute -bottom-1 left-0 w-2/3 h-[2px] bg-indigo-500 rounded-full blur-[1px]" />
                        </motion.div>
                    )}
                    {product.isNewArrival && <span className="badge-titanium bg-white text-slate-900 border-slate-200 shadow-sm">New</span>}
                </div>

                {/* Wishlist Toggle - Top Right */}
                <button
                    onClick={handleWishlistClick}
                    className={cn(
                        "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm z-20",
                        isWishlisted ? "bg-red-50 text-red-500" : "bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white"
                    )}
                >
                    <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute bottom-3 left-3 right-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || product.stock === 0}
                        className={cn(
                            "w-full h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg transition-colors flex items-center justify-center gap-2",
                            isAdded ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-cta-blue"
                        )}
                    >
                        {isAdding ? <ShoppingBag className="w-3 h-3 animate-ping" /> : isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        {isAdding ? "Adding..." : isAdded ? "Added" : "Add to Cart"}
                    </button>
                </div>
            </div >

            {/* --- PREMIUM NAVIGATION LOADER --- */}
            <AnimatePresence>
                {isNavigating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
                    >
                        {/* High-Tech Geometry Animation */}
                        <div className="relative w-24 h-24 mb-6">
                            {/* Outer Spinning Frame */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-[1.5px] border-slate-200 border-t-cta-blue rounded-[2rem]"
                            />
                            {/* Inner Pulsing Core */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-4 bg-cta-blue/10 rounded-2xl flex items-center justify-center"
                            >
                                <Sparkles className="w-8 h-8 text-cta-blue" />
                            </motion.div>

                            {/* Scanning Laser Line */}
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute left-2 right-2 h-[1px] bg-cta-blue/40 blur-[1px] z-10"
                            />
                        </div>

                        {/* Status Text */}
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-1">Initializing</p>
                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">Secure Link Established</p>
                        </motion.div>

                        {/* Progress Bar (2s duration) */}
                        <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                                className="h-full bg-cta-blue"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Section - Clean & Structured */}
            < div className="px-5 pb-5 pt-2 flex flex-col flex-1 gap-2" >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {product.category.replace(/-/g, ' ')}
                        </p>
                        <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-cta-blue transition-colors line-clamp-2">
                            {product.name}
                        </h3>
                    </div>
                </div>

                <div className="mt-auto flex items-end justify-between pt-3 border-t border-slate-100">
                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <div className="flex flex-col items-start gap-0.5">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-slate-400 line-through decoration-red-400/50">
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50/80 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                                        -{Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                                    </span>
                                </div>
                                <span className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 tracking-tighter">
                                    {formatPrice(product.discountPrice!)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-2xl font-display font-black text-slate-900 tracking-tighter">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>

                    {product.compatibility && product.compatibility.length > 0 && (
                        <div className="px-2 py-1 rounded bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                            <Car className="w-3 h-3 text-slate-400" />
                            <span>Fitment</span>
                        </div>
                    )}
                    {product.installationOverride?.isAvailable !== false && (
                        <div className="px-2 py-1 rounded bg-indigo-50 border border-indigo-100 flex items-center gap-1.5 text-[9px] font-bold text-indigo-600">
                            <Wrench className="w-3 h-3 text-indigo-500" />
                            <span>Install</span>
                        </div>
                    )}
                </div>
            </div>


        </motion.div >
    );
}
