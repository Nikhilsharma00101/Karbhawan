"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowRight, PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { searchProducts } from "@/app/actions/products";
import { useRouter } from "next/navigation";

interface SearchInputProps {
    className?: string; // For layout variants (desktop vs mobile)
    onClose?: () => void; // For mobile menu closing
    variant?: "desktop" | "mobile";
}

export default function SearchInput({ className, onClose, variant = "desktop" }: SearchInputProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounce Logic
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.trim().length > 1) {
                setLoading(true);
                setIsOpen(true);
                try {
                    const data = await searchProducts(query);
                    setResults(data);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    // Handle Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                (document.activeElement as HTMLElement)?.blur();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query) {
            setIsOpen(false);
            onClose?.();
            router.push(`/shop?category=${encodeURIComponent(query)}`); // Fallback to broad search if needed or custom search page
            // Or if we want to submit to a search page: 
            // router.push(`/search?q=${query}`);
        }
    };

    return (
        <div ref={containerRef} className={`relative z-[50] w-full ${className}`}>

            {/* INPUT FIELD */}
            <div className={`relative group flex items-center bg-slate-900/5 hover:bg-slate-900/[0.08] focus-within:bg-white border focus-within:border-cta-blue focus-within:shadow-[0_0_20px_rgba(14,165,233,0.15)] overflow-hidden transition-all duration-500
                ${variant === "mobile"
                    ? "rounded-xl border-slate-200"
                    : "rounded-2xl border-slate-200"
                }
            `}>

                {/* Search Icon */}
                <div className="pl-4 relative flex items-center">
                    {loading ? (
                        <Loader2 className="w-4 h-4 text-cta-blue animate-spin" />
                    ) : (
                        <>
                            <Search className={`w-4 h-4 text-slate-400 group-focus-within:text-cta-blue transition-all duration-500 group-focus-within:scale-110`} />
                            <div className="absolute inset-0 bg-cta-blue/20 rounded-full blur-sm opacity-0 group-focus-within:opacity-100 animate-pulse" />
                        </>
                    )}
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => { if (query.length > 1) setIsOpen(true); }}
                    placeholder="Search by name, category, color..."
                    className={`w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all font-black tracking-[0.1em]
                        ${variant === "mobile" ? "py-3 pl-3 pr-10 text-[10px]" : "py-4 pl-4 pr-16 text-[10px]"}
                    `}
                />

                {/* Clear Button */}
                {query.length > 0 && (
                    <button
                        onClick={() => { setQuery(""); setIsOpen(false); }}
                        className="absolute right-3 p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-3 h-3" />
                    </button>
                )}

                {/* Desktop Shortcut Visual */}
                {variant === "desktop" && query.length === 0 && (
                    <div className="absolute right-4 flex items-center gap-1 opacity-40 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                        <div className="px-1.5 py-0.5 rounded-md border border-slate-300 text-[8px] font-black text-slate-400 group-focus-within:text-cta-blue group-focus-within:border-cta-blue/30 bg-slate-50 uppercase">⌘K</div>
                    </div>
                )}

                {/* ANIMATED DECORATION LINES */}
                {/* Laser Scan Animation */}
                <motion.div
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-cta-blue/15 to-transparent skew-x-[45deg] pointer-events-none group-focus-within:opacity-100 opacity-30 transition-opacity"
                />
                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-cta-blue group-focus-within:w-full w-0 transition-all duration-700 ease-out" />

            </div>

            {/* RESULTS DROPDOWN */}
            <AnimatePresence>
                {isOpen && query.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute left-0 right-0 bg-white/95 backdrop-blur-3xl border border-slate-200/60 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] overflow-hidden z-[100]
                            ${variant === "mobile" ? "top-full mt-2 rounded-xl" : "top-full mt-4 rounded-3xl"}
                        `}
                    >
                        {results.length > 0 ? (
                            <div className="flex flex-col">
                                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        Matches for "{query}"
                                    </span>
                                    <span className="text-[9px] font-bold text-cta-blue bg-cta-blue/10 px-2 py-0.5 rounded-full">
                                        {results.length} found
                                    </span>
                                </div>

                                <div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                                    {results.map((product) => (
                                        <Link
                                            key={product._id}
                                            href={`/shop/${product.slug}`}
                                            onClick={() => { setIsOpen(false); onClose?.(); }}
                                            className="group/item flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 relative"
                                        >
                                            {/* Image */}
                                            <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 p-1 overflow-hidden relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 flex flex-col">
                                                <h4 className="text-xs font-bold text-slate-900 group-hover/item:text-cta-blue transition-colors line-clamp-1">{product.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">{product.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                    <span className="text-[10px] font-black text-slate-700">₹{product.discountPrice || product.price}</span>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover/item:text-cta-blue -translate-x-2 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                        </Link>
                                    ))}
                                </div>

                                {/* Link to full search if results > 3? actually we show all 20 in scroll, but visual cue is nice */}
                                <div className="p-2 bg-slate-50/50 border-t border-slate-100 text-center">
                                    <span className="text-[9px] text-slate-400">Scroll to see more results</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                                    <PackageOpen className="w-5 h-5 text-slate-300" />
                                </div>
                                <p className="text-xs font-bold text-slate-900">No products found</p>
                                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                                    We couldn't find anything matching "{query}". Try a different term.
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
