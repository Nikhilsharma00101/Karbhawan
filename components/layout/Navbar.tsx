"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ShoppingBag, Menu, X, User, Heart, Search,
    Diamond, ArrowRight, LayoutDashboard, LogOut,
    Armchair, CarFront, Zap, Sparkles, Shirt,
    Home, ShieldCheck, Phone
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/components/cart/cart-context";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import Tooltip from "@/components/ui/Tooltip";
import SearchInput from "@/components/ui/SearchInput";

const links = [
    { href: "/shop", label: "Shop" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();
    const { items } = useCart();
    const { items: wishlistItems } = useWishlist();

    const { scrollY, scrollYProgress } = useScroll();
    const navHeight = useTransform(scrollY, [0, 100], [110, 80]);

    // Scroll Progress Spring
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Mouse follow effect for the dock
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateScrolled = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", updateScrolled);
        // Prevent body scroll when menu is open
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => window.removeEventListener("scroll", updateScrolled);
    }, [isOpen]);

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlistItems.length;

    // Hamburger Line Variants
    const lineVariants = {
        closed: { rotate: 0, y: 0 },
        open: (custom: number) => ({
            rotate: custom === 1 ? 45 : -45,
            y: custom === 1 ? 4 : -4,
        }),
    };

    return (
        <>
            <motion.nav
                style={{ height: navHeight }}
                className={`fixed top-0 w-full z-[100] transition-[background-color,border-color,backdrop-filter] duration-700 flex items-center px-4 md:px-12 pointer-events-auto overflow-visible`}
            >
                {/* Dynamic Glass Container (Light Theme) */}
                <div className={`absolute inset-0 transition-[background-color,border-color,backdrop-filter] duration-700 ${scrolled
                    ? "bg-white/90 backdrop-blur-3xl border-b border-slate-200/50"
                    : "bg-white/20 backdrop-blur-md border-b border-slate-200/20"
                    }`} />

                <div className="relative w-full h-full flex items-center justify-between z-[120]">

                    {/* --- BRAND ARCHITECTURE --- */}
                    <Link href="/" className="flex flex-col group relative z-[120] isolate">
                        {/* Reactive Pulse Aura */}
                        <motion.div
                            animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -inset-2 bg-cta-blue/20 blur-xl rounded-full pointer-events-none"
                        />

                        {/* Logo Zoom-Crop Container - Increased Mobile Size */}
                        <div className="h-7 md:h-8 overflow-hidden flex items-center justify-center -ml-1 md:ml-0 relative">
                            {/* Inner Chromatic Ghost Layer */}
                            <img
                                src="/logo.png"
                                alt=""
                                className="absolute inset-0 h-[200%] md:h-[220%] w-auto object-contain scale-[1.3] md:scale-[1.2] origin-center -translate-y-0.5 invert opacity-0 group-hover:opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 blur-[1px] mix-blend-screen"
                            />

                            <img
                                src="/logo.png"
                                alt="Karbhawan Logo"
                                className="h-[200%] md:h-[220%] w-auto object-contain transition-all duration-700 group-hover:scale-110 scale-[1.3] md:scale-[1.2] origin-center -translate-y-0.5 invert relative z-10"
                            />
                        </div>
                        {/* Tagline */}
                        <div className="flex items-center gap-2 mt-0">
                            <span className="h-[1px] w-4 bg-cta-blue/50"></span>
                            <span className="text-[8px] text-white shadow-glow uppercase tracking-[0.5em] font-bold group-hover:text-cta-blue transition-colors">Luxury Concierge</span>
                        </div>
                    </Link>

                    {/* --- HYPER-PREMIUM PRISMATIC DOCK --- */}
                    <div
                        onMouseMove={handleMouseMove}
                        className="hidden lg:flex items-center gap-6 bg-white border border-slate-200 p-2.5 px-6 rounded-[40px] backdrop-blur-[50px] shadow-[0_20px_80px_rgba(0,0,0,0.05)] relative group/nav min-w-[600px]"
                    >
                        {/* --- LIGHT NEBULA AURORA BACKGROUND --- */}
                        <div className="absolute inset-0 rounded-[40px] overflow-hidden opacity-20 group-hover/nav:opacity-40 transition-opacity duration-1000">
                            <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-[conic-gradient(from_0deg,transparent,rgba(56,189,248,0.3),rgba(139,92,246,0.3),rgba(236,72,153,0.3),transparent)] animate-[spin_10s_linear_infinite] blur-[60px]" />
                        </div>

                        {/* Pulsing Rim (Light) */}
                        <div className="absolute inset-0 rounded-[40px] border border-slate-900/5 group-hover/nav:border-cta-blue/30 transition-colors duration-700" />

                        {/* Trailing Prismatic Flare */}
                        <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none">
                            <motion.div
                                className="absolute w-56 h-56 bg-gradient-to-tr from-cta-blue/40 via-purple-500/40 to-pink-500/40 blur-[50px] rounded-full opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 mix-blend-screen"
                                style={{
                                    x: springX,
                                    y: springY,
                                    translate: '-50% -50%'
                                }}
                            />
                        </div>

                        {/* --- SHOP LINK (HOLOGRAPHIC) --- */}
                        {links.map((link, i) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-8 py-3.5 rounded-[22px] transition-all duration-700 group/link flex items-center gap-3 z-10"
                                >
                                    {/* Holographic Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cta-blue/0 via-white/0 to-purple-500/0 group-hover/link:from-cta-blue/20 group-hover/link:via-white/10 group-hover/link:to-purple-500/20 blur-xl rounded-full transition-all duration-700" />

                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-8 h-8 rounded-full bg-slate-900/5 group-hover/link:bg-cta-blue flex items-center justify-center transition-colors duration-500">
                                            <Sparkles className="w-4 h-4 text-cta-blue group-hover/link:text-white transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] group-hover/link:text-cta-blue transition-all duration-700 ${isActive ? "text-white" : "text-slate-900"}`}>
                                                Shop
                                            </span>
                                            <span className="text-[7px] text-slate-400 font-bold uppercase tracking-widest leading-none">The Collection</span>
                                        </div>
                                    </div>

                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-liquid-lens"
                                            className="absolute inset-0 bg-slate-950 rounded-[18px] z-0 shadow-[0_15px_50px_rgba(56,189,248,0.2)]"
                                            transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Cyber Divider */}
                        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-cta-blue/40 to-transparent mx-2 relative">
                            <div className="absolute inset-0 bg-cta-blue blur-sm opacity-50" />
                        </div>


                        <div className="flex-1 relative group/search z-50">
                            <SearchInput className="w-full" />
                        </div>

                    </div>

                    {/* --- RIGHT ACTIONS HUB --- */}
                    <div className="flex items-center gap-2 md:gap-4 relative z-[120]">

                        {/* Wishlist Icon */}
                        <Tooltip content="Saved Items">
                            <Link href="/wishlist" className="relative p-3 text-slate-950 transition-all group hidden md:block">
                                <div className="absolute inset-0 bg-slate-950/5 rounded-xl scale-0 group-hover:scale-100 transition-transform"></div>
                                <Heart className={`w-5 h-5 md:w-6 md:h-6 relative z-10 transition-colors ${mounted && wishlistCount > 0 ? "text-red-500 fill-red-500/10" : "text-slate-900/40 group-hover:text-slate-950"}`} />
                                <AnimatePresence>
                                    {mounted && wishlistCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                            className="absolute top-1 right-1 min-w-[16px] h-[16px] bg-red-500 text-white text-[7px] font-black flex items-center justify-center rounded-full border-2 border-white z-20"
                                        >
                                            {wishlistCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </Tooltip>

                        {/* Cart Icon */}
                        <Tooltip content="Your Cart">
                            <Link href="/cart" className="relative p-3 text-slate-950 transition-all group">
                                <div className="absolute inset-0 bg-slate-950/5 rounded-xl scale-0 group-hover:scale-100 transition-transform"></div>
                                <ShoppingBag className={`w-5 h-5 md:w-6 md:h-6 relative z-10 transition-colors ${mounted && itemCount > 0 ? "text-cta-blue fill-cta-blue/10" : "text-slate-900/60 group-hover:text-slate-950"}`} />
                                <AnimatePresence>
                                    {mounted && itemCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                            className="absolute top-1 right-1 min-w-[17px] h-[17px] bg-slate-950 text-white text-[7px] font-black flex items-center justify-center rounded-full border-2 border-white z-20"
                                        >
                                            {itemCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </Tooltip>

                        {/* Dashboard/Logout (Desktop Only) */}
                        <div className="hidden md:flex items-center gap-1 bg-slate-900/5 p-1 rounded-2xl border border-slate-900/10 ml-2">
                            {session ? (
                                <div className="flex items-center gap-5 pl-4 border-l border-slate-900/10">
                                    {/* Profile Identity Card */}
                                    <Link href="/account" className="flex items-center gap-4 group">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] text-cta-blue font-black uppercase tracking-[0.2em] group-hover:underline underline-offset-4 decoration-cta-blue/30 transition-all">View Profile</span>
                                            <span className="text-sm text-cta-blue font-bold tracking-tight group-hover:text-cta-blue transition-colors antialiased">
                                                {session.user?.name}
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-tr from-cta-blue to-transparent opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-500"></div>
                                            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                                                {session.user?.image ? (
                                                    <img
                                                        src={session.user.image}
                                                        alt={session.user.name || "User"}
                                                        className="w-full h-full object-cover"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                ) : (
                                                    <User className="w-5 h-5 text-slate-400 group-hover:text-slate-950 transition-colors" />
                                                )}
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Global Actions */}
                                    <div className="flex items-center gap-1.5 bg-slate-900/5 p-1 rounded-2xl border border-slate-200">
                                        {(session.user as any)?.role === "ADMIN" && (
                                            <Tooltip content="Admin Panel">
                                                <Link
                                                    href="/admin"
                                                    className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                </Link>
                                            </Tooltip>
                                        )}
                                        <Tooltip content="Sign Out">
                                            <button
                                                onClick={() => signOut()}
                                                className="relative w-9 h-9 rounded-xl flex items-center justify-center group/logout overflow-hidden border border-transparent hover:border-red-500/30 transition-all duration-500 hover:bg-red-500/5 hover:scale-110 active:scale-95 shadow-sm hover:shadow-red-500/10"
                                            >
                                                {/* Animated Background Pulse */}
                                                <div className="absolute inset-0 bg-red-500/0 group-hover/logout:bg-red-500/[0.03] transition-colors" />

                                                {/* Glow Effect */}
                                                <div className="absolute -inset-1 bg-red-500/20 blur-xl opacity-0 group-hover/logout:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                                <LogOut className="w-4 h-4 text-slate-400 group-hover/logout:text-red-500 group-hover/logout:-translate-x-0.5 transition-all duration-500 relative z-10" />

                                                {/* Corner Accents (Futuristic) */}
                                                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-red-500/0 group-hover/logout:border-red-500/50 transition-all rounded-tr-sm" />
                                                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-red-500/0 group-hover/logout:border-red-500/50 transition-all rounded-bl-sm" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/auth/signin" className="px-5 md:px-6 py-2 md:py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-950 hover:text-cta-blue transition-colors">Login</Link>
                            )}
                        </div>

                        {/* --- MOBILE HAMBURGER --- */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-11 h-11 md:hidden flex flex-col items-center justify-center gap-[5px] bg-slate-900/5 rounded-xl group border border-slate-900/10 active:scale-90 transition-transform z-[120]"
                            aria-label="Toggle Menu"
                        >
                            <motion.span
                                variants={lineVariants}
                                animate={isOpen ? "open" : "closed"}
                                custom={1}
                                className="w-5 h-[1.5px] bg-slate-950 rounded-full transition-colors group-hover:bg-cta-blue"
                            />
                            <motion.span
                                animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0 }}
                                className="w-3 h-[1.5px] bg-slate-950 rounded-full ml-auto mr-3 transition-colors group-hover:bg-cta-blue"
                            />
                            <motion.span
                                variants={lineVariants}
                                animate={isOpen ? "open" : "closed"}
                                custom={2}
                                className="w-5 h-[1.5px] bg-slate-950 rounded-full transition-colors group-hover:bg-cta-blue"
                            />
                        </button>
                    </div>

                </div>

                {/* --- ULTRA LUXURY MOBILE MENU --- */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-0 z-[110] bg-white flex flex-col pointer-events-auto"
                        >
                            <div className="flex items-center justify-between px-6 py-8 border-b border-slate-100">
                                {/* Only one logo should be shown - the main navbar logo is already z-[120] and visible */}
                                <div className="flex-1" />
                                <div className="w-10 h-10" />
                            </div>

                            <div className="relative flex-1 flex flex-col overflow-y-auto pt-4 pb-20" data-lenis-prevent>
                                {/* Futuristic Search Injection */}
                                <div className="px-6 py-6">
                                    <div className="relative group/m-search z-50">
                                        <SearchInput variant="mobile" onClose={() => setIsOpen(false)} />
                                    </div>
                                </div>

                                {/* Primary Navigation */}
                                <div className="px-6 space-y-2">
                                    <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mb-4">Navigation</p>
                                    <Link
                                        href="/shop"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-cta-blue flex items-center justify-center text-white">
                                                <Sparkles className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-black text-slate-900">The Collection</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Shop All Items</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Secondary Navigation Links */}
                                <div className="px-6 mt-10">
                                    <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mb-6">Explore Karbhawan</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { label: "Return to Home", href: "/", icon: Home },
                                            { label: "Browse Catalog", href: "/shop", icon: Search },
                                            { label: "Saved Wishlist", href: "/wishlist", icon: Heart, count: wishlistCount },
                                            { label: "Our Philosophy", href: "/about", icon: ShieldCheck },
                                            { label: "Contact Support", href: "/contact", icon: Phone },
                                        ].map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl active:scale-95 transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center relative group-hover:bg-cta-blue group-hover:text-white transition-colors">
                                                        <item.icon className="w-4 h-4" />
                                                        {item.count && item.count > 0 && (
                                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">{item.count}</span>
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-black text-slate-800 group-hover:text-cta-blue transition-colors">{item.label}</span>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-cta-blue transition-colors" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Identity & Actions Section */}
                                <div className="mt-auto p-6 bg-slate-50 border-t border-slate-100">
                                    {session ? (
                                        <div className="space-y-4">
                                            <Link href="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cta-blue/20">
                                                    {session.user?.image ? (
                                                        <img src={session.user.image} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center"><User className="w-6 h-6 text-slate-300" /></div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-900">{session.user?.name}</span>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{session.user?.email}</span>
                                                </div>
                                            </Link>
                                            <div className="flex gap-3">
                                                {(session.user as any)?.role === "ADMIN" && (
                                                    <Link href="/admin" onClick={() => setIsOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                                                        <LayoutDashboard className="w-4 h-4" /> Admin Console
                                                    </Link>
                                                )}
                                                <button onClick={() => signOut()} className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link href="/auth/signin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em]">
                                            Initialize Member Login <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}

                                    <div className="mt-6 flex items-center justify-center gap-6 opacity-30">
                                        <Link href="/about" className="text-[10px] font-black uppercase tracking-widest">About</Link>
                                        <div className="w-1 h-1 bg-slate-400 rounded-full" />
                                        <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest">Contact</Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- CATEGORY STRIP (ANCHORED TO NAV) --- */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full z-[99] border-b border-slate-100 py-4 overflow-x-auto no-scrollbar translate-y-[92%] md:translate-y-full transition-all duration-700 bg-white"
                >
                    <div className="container mx-auto px-4 md:px-12 flex items-center justify-between gap-4 md:gap-8 whitespace-nowrap relative z-10">
                        {[
                            { label: "Interior", icon: Armchair, href: "/shop?category=interior-accessories" },
                            { label: "Exterior", icon: CarFront, href: "/shop?category=exterior-accessories" },
                            { label: "Electronics", icon: Zap, href: "/shop?category=car-electronics" },
                            { label: "Care & Tools", icon: Sparkles, href: "/shop?category=car-care-tools" },
                            { label: "Lifestyle", icon: Shirt, href: "/shop?category=lifestyle-apparel" },
                        ].map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className="flex items-center gap-4 group/cat px-4 py-2 rounded-2xl transition-all duration-300 hover:bg-slate-50 relative"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-900/5 flex items-center justify-center group-hover/cat:bg-cta-blue transition-all duration-500 border border-slate-100">
                                    <item.icon className="w-5 h-5 text-slate-900 group-hover/cat:text-white transition-colors" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-800 group-hover/cat:text-cta-blue transition-colors">
                                        {item.label}
                                    </span>
                                    <div className="h-[2px] w-0 bg-cta-blue group-hover/cat:w-full transition-all duration-500 mt-1" />
                                </div>

                                <span className="absolute -top-1 -right-1 text-[8px] font-black text-cta-blue/30 group-hover/cat:text-cta-blue transition-colors">0{i + 1}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Clean Progress Trace */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-100">
                        <motion.div
                            className="h-full bg-cta-blue origin-left z-[100]"
                            style={{ scaleX }}
                        />
                    </div>
                </motion.div>
            </motion.nav>
        </>
    );
}
