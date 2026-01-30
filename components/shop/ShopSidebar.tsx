"use client";

import { Category, categories, getAllChildSlugs } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Filter, RotateCcw, X, Plus, Minus, Car, ChevronDown } from "lucide-react";
import { carBrands } from "@/lib/cars";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface ShopSidebarProps {
    currentCategory?: string;
    isMobile?: boolean;
    onClose?: () => void;
}

export default function ShopSidebar({ currentCategory, isMobile, onClose }: ShopSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

    const handleCarFilter = (make: string, model: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (make) params.set("make", make);
        else params.delete("make");

        if (model) params.set("model", model);
        else params.delete("model");

        router.push(`/shop?${params.toString()}`);
    };

    const handleApplyFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (minPrice) params.set("minPrice", minPrice);
        else params.delete("minPrice");

        if (maxPrice) params.set("maxPrice", maxPrice);
        else params.delete("maxPrice");

        router.push(`/shop?${params.toString()}`);
    };

    const handleReset = () => {
        setMinPrice("");
        setMaxPrice("");
        router.push("/shop");
    };

    const activeMake = searchParams.get("make");
    const activeModel = searchParams.get("model");

    return (
        <aside className={cn(
            "w-full lg:w-80 space-y-8 flex-shrink-0",
            isMobile ? "pb-32" : ""
        )}>
            {/* Mobile Header with Close Button */}
            {isMobile && (
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
                            <Filter className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-display font-bold text-slate-900 uppercase tracking-widest">Filters</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-950 shadow-sm active:scale-90 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            )}
            {/* Active Filter Summary (Shown only when filters applied) */}
            {(currentCategory || minPrice || maxPrice || activeMake || activeModel) && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-[2rem] bg-slate-900 text-white shadow-titanium-hover relative overflow-hidden group border border-slate-800"
                >
                    {/* Animated HUD Elements */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-20 h-[1px] bg-gradient-to-l from-sky-500/50 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:10px_10px] opacity-10 mix-blend-overlay" />

                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_#38BDF8]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-400/80">Active Filters</span>
                            </div>
                            <span className="text-lg font-display font-bold capitalize truncate max-w-[150px] text-slate-100">
                                {currentCategory
                                    ? currentCategory.replace(/-/g, ' ')
                                    : activeModel
                                        ? `${activeMake} ${activeModel}`
                                        : activeMake
                                            ? activeMake
                                            : "Search Filters"}
                            </span>
                        </div>
                        <button
                            onClick={handleReset}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all group/reset active:scale-95 text-slate-400 hover:text-white"
                        >
                            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Garage / Vehicle Selection Section */}
            <div className="titanium-card p-2 overflow-hidden relative group">
                <div className="p-6 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
                            <Car className="w-4 h-4 text-slate-700" />
                        </div>
                        <h3 className="text-sm font-display font-bold text-slate-900 uppercase tracking-[0.2em]">Select Vehicle</h3>
                    </div>
                    {(!activeMake && !activeModel) ? (
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                        </div>
                    ) : (
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse" />
                            <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse" style={{ animationDelay: '200ms' }} />
                        </div>
                    )}
                </div>

                <div className="px-2 pb-6 space-y-1 pt-4">
                    {carBrands.map((brand) => (
                        <BrandNode
                            key={brand.brand}
                            brand={brand}
                            activeMake={activeMake}
                            activeModel={activeModel}
                            onSelect={handleCarFilter}
                        />
                    ))}
                </div>
            </div>

            {/* Main Categories Section */}
            <div className="titanium-card p-2 overflow-hidden relative group">
                <div className="p-6 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
                            <Filter className="w-4 h-4 text-slate-700" />
                        </div>
                        <h3 className="text-sm font-display font-bold text-slate-900 uppercase tracking-[0.2em]">Categories</h3>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse" />
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                    </div>
                </div>

                <div className="px-2 pb-6 space-y-1 pt-4">
                    {categories.map((cat) => (
                        <CategoryNode
                            key={cat.id}
                            category={cat}
                            currentSlug={currentCategory}
                            depth={0}
                        />
                    ))}
                </div>
            </div>

            {/* Price Filter Section */}
            <div className="titanium-card p-8 relative">
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
                            <span className="text-xs font-black italic text-slate-700">₹</span>
                        </div>
                        <h3 className="text-sm font-display font-bold text-slate-900 uppercase tracking-[0.2em]">Price Range</h3>
                    </div>
                    {(minPrice || maxPrice) && (
                        <button
                            onClick={() => { setMinPrice(""); setMaxPrice(""); router.push("/shop"); }}
                            className="bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:text-sky-500 hover:border-sky-200 transition-all"
                        >
                            Reset
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Minimum</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">₹</span>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full bg-white/80 border border-slate-100 rounded-2xl pl-8 pr-4 py-3.5 text-xs font-bold text-slate-950 focus:border-cta-blue outline-none transition-all focus:ring-4 focus:ring-cta-blue/5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Maximum</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">₹</span>
                                <input
                                    type="number"
                                    placeholder="50,000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full bg-white/80 border border-slate-100 rounded-2xl pl-8 pr-4 py-3.5 text-xs font-bold text-slate-950 focus:border-cta-blue outline-none transition-all focus:ring-4 focus:ring-cta-blue/5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleApplyFilter}
                        className="w-full py-4.5 rounded-2xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-cta-blue transition-all duration-500 shadow-xl shadow-slate-200 group flex items-center justify-center gap-3"
                    >
                        Apply Filters
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Help/Support Utility Card */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-cta-soft/10 to-transparent border border-cta-soft/20 group hover:border-cta-soft/40 transition-all cursor-help relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Filter className="w-20 h-20 text-cta-blue" />
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                    <p className="text-[9px] font-black text-cta-blue uppercase tracking-[0.3em]">Bespoke Search</p>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                        "Need assistance curating your vehicle? Our concierge is available 24/7."
                    </p>
                    <Link href="/contact" className="text-[9px] font-black text-slate-950 uppercase tracking-[0.2em] border-b border-slate-900/10 w-fit pb-1 hover:border-cta-blue transition-colors">
                        Connect with Concierge
                    </Link>
                </div>
            </div>
        </aside>
    );
}

function BrandNode({ brand, activeMake, activeModel, onSelect }: { brand: any, activeMake: string | null, activeModel: string | null, onSelect: (make: string, model: string) => void }) {
    const [isExpanded, setIsExpanded] = useState(activeMake === brand.brand);
    const isActive = activeMake === brand.brand && !activeModel;
    const hasActiveModel = activeMake === brand.brand && !!activeModel;

    const toggleExpand = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col">
            <div className="relative group/node">
                {isActive && (
                    <motion.div
                        layoutId="active-garage-bar"
                        className="absolute left-1 top-1.5 bottom-1.5 w-1.5 bg-cta-blue rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)] z-20"
                    />
                )}

                <div
                    onClick={(e) => {
                        onSelect(brand.brand, "");
                        setIsExpanded(!isExpanded);
                    }}
                    className={cn(
                        "flex items-center justify-between py-3 px-5 rounded-[1.25rem] transition-all duration-500 text-[11px] font-black uppercase tracking-[0.15em] relative overflow-hidden cursor-pointer",
                        isActive
                            ? "bg-white text-slate-950 shadow-sm border border-slate-100 pl-8"
                            : hasActiveModel
                                ? "text-cta-blue hover:bg-white/40"
                                : "text-slate-500 hover:text-slate-950 hover:bg-white/40"
                    )}
                >
                    <span className="relative z-10">{brand.brand}</span>

                    <div
                        className={cn(
                            "p-1.5 rounded-lg transition-all",
                            isExpanded ? "rotate-90 text-cta-blue bg-slate-900/5" : "text-slate-400"
                        )}
                    >
                        <ChevronRight className="w-3.5 h-3.5" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-cta-blue/0 via-cta-blue/5 to-cta-blue/0 opacity-0 group-hover/node:opacity-100 -translate-x-full group-hover/node:translate-x-full transition-all duration-1000" />
                </div>
            </div>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="ml-4 mt-1 pl-4 border-l border-slate-100/50 space-y-1 py-1">
                            {brand.models.map((model: any) => {
                                const modelName = typeof model === 'string' ? model : model.name;
                                const isModelActive = activeMake === brand.brand && activeModel === modelName;
                                return (
                                    <div
                                        key={modelName}
                                        onClick={() => onSelect(brand.brand, modelName)}
                                        className={cn(
                                            "py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer relative",
                                            isModelActive
                                                ? "bg-white text-slate-950 shadow-sm"
                                                : "text-slate-400 hover:text-slate-950 hover:bg-white/40"
                                        )}
                                    >
                                        {isModelActive && (
                                            <motion.div
                                                layoutId="active-model-dot"
                                                className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-cta-blue rounded-full"
                                            />
                                        )}
                                        {modelName}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function CategoryNode({ category, currentSlug, depth }: { category: Category, currentSlug?: string, depth: number }) {
    const [isExpanded, setIsExpanded] = useState(
        !!currentSlug && getAllChildSlugs(category.slug).includes(currentSlug)
    );
    const isActive = currentSlug === category.slug;
    const hasChildren = category.children && category.children.length > 0;

    // Toggle expansion if child or self is selected
    const allChildSlugs = getAllChildSlugs(category.slug);
    const isParentActive = !!currentSlug && allChildSlugs.includes(currentSlug);

    const toggleExpand = (e: React.MouseEvent) => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="relative group/node">
                {/* Active Indicator Bar */}
                {isActive && (
                    <motion.div
                        layoutId="active-nav-bar"
                        className="absolute left-1 top-1.5 bottom-1.5 w-1.5 bg-cta-blue rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)] z-20"
                    />
                )}

                <Link
                    href={`/shop?category=${category.slug}`}
                    onClick={toggleExpand}
                    className={cn(
                        "flex items-center justify-between py-3 px-5 rounded-[1.25rem] transition-all duration-500 text-[11px] font-black uppercase tracking-[0.15em] relative overflow-hidden",
                        isActive
                            ? "bg-white text-slate-950 shadow-sm border border-slate-100 pl-8"
                            : isParentActive
                                ? "text-cta-blue hover:bg-white/40"
                                : "text-slate-500 hover:text-slate-950 hover:bg-white/40"
                    )}
                >
                    <span className="relative z-10">{category.name}</span>

                    {hasChildren && (
                        <div
                            className={cn(
                                "p-1.5 rounded-lg transition-all",
                                isExpanded ? "rotate-90 text-cta-blue" : "text-slate-400"
                            )}
                        >
                            <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                    )}

                    {/* Hover Flare */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cta-blue/0 via-cta-blue/5 to-cta-blue/0 opacity-0 group-hover/node:opacity-100 -translate-x-full group-hover/node:translate-x-full transition-all duration-1000" />
                </Link>
            </div>

            <AnimatePresence initial={false}>
                {hasChildren && isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="ml-4 mt-1 pl-4 border-l border-slate-100/50 space-y-1 py-1">
                            {category.children!.map((child) => (
                                <CategoryNode
                                    key={child.id}
                                    category={child}
                                    currentSlug={currentSlug}
                                    depth={depth + 1}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Side Component for Price Arrow
function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
