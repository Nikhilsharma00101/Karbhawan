"use client";

import { useState, useEffect } from "react";
import { Filter, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShopSidebar from "./ShopSidebar";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

interface ShopClientWrapperProps {
    children: React.ReactNode;
    currentCategory?: string;
}

export default function ShopClientWrapper({ children, currentCategory }: ShopClientWrapperProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Close sidebar on path change (navigation), but keep open on filter change (searchParams)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isSidebarOpen]);

    return (
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            {/* Desktop Sidebar */}
            <div
                className="hidden lg:block w-80 flex-shrink-0 sticky top-[200px] self-start max-h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar pr-6 z-20"
                data-lenis-prevent
            >
                <ShopSidebar currentCategory={currentCategory} />
            </div>



            {/* Mobile Sidebar Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[9998] lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[85%] max-w-[380px] bg-slate-50 z-[9999] lg:hidden shadow-2xl overflow-hidden"
                            data-lenis-prevent
                        >
                            <div className="h-full overflow-y-auto p-6 custom-scrollbar">
                                <ShopSidebar
                                    currentCategory={currentCategory}
                                    isMobile={true}
                                    onClose={() => setIsSidebarOpen(false)}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1">
                {/* Mobile Filter Trigger - Top Bar */}
                <div className="lg:hidden w-full mb-12">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="w-full flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-md border border-slate-200 rounded-3xl active:scale-[0.98] transition-all group shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
                                <Filter className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Filters</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {currentCategory && (
                                <div className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-100 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-sky-500">Active</span>
                                </div>
                            )}
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
