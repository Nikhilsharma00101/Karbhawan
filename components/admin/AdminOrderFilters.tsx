"use client";

import { Search, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { motion } from "framer-motion";
import AdminStatusSelect, { OrderStatus } from "./AdminStatusSelect";

interface AdminOrderFiltersProps {
    initialQuery?: string;
    initialStatus?: string;
}

export default function AdminOrderFilters({ initialQuery = "", initialStatus = "ALL" }: AdminOrderFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [query, setQuery] = useState(initialQuery);
    const [status, setStatus] = useState(initialStatus);

    // Debounced search logic for instant filtering
    const updateFilters = (q: string, s: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (q) params.set("q", q);
        else params.delete("q");

        if (s && s !== "ALL") params.set("status", s);
        else params.delete("status");

        const newPath = `/admin/orders?${params.toString()}`;

        // Prevent unnecessary push if nothing changed
        if (window.location.search === `?${params.toString()}`) return;

        startTransition(() => {
            router.push(newPath, { scroll: false });
        });
    };


    useEffect(() => {
        // Don't trigger on first mount if query is same as initial
        if (query === initialQuery) return;

        const timer = setTimeout(() => {
            updateFilters(query, status);
        }, 400) // 400ms delay to prevent excessive server requests

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters(query, status);
    };

    const handleStatusChange = (newStatus: OrderStatus) => {
        setStatus(newStatus);
        updateFilters(query, newStatus);
    };



    const handleReset = () => {
        setQuery("");
        setStatus("ALL");
        startTransition(() => {
            router.push("/admin/orders");
        });
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white/40 backdrop-blur-md p-3 rounded-[2rem] border border-slate-100 shadow-sm w-full md:w-auto relative group">
            {/* Search Input Container */}
            <form onSubmit={handleSearch} className="flex items-center flex-1 w-full md:w-80 group/search relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Search className={`w-4 h-4 transition-colors ${query ? 'text-cta-blue' : 'text-slate-300'}`} />
                </div>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Customer, ID or Email..."
                    className="w-full pl-12 pr-6 py-3.5 bg-slate-50/50 border border-slate-100/50 rounded-2xl text-[11px] font-bold text-aether-primary placeholder:text-slate-300 outline-none focus:bg-white focus:border-cta-blue/30 focus:ring-4 focus:ring-blue-50/50 transition-all font-sans tracking-wide"
                />
            </form>

            <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-slate-100 to-transparent" />

            {/* Status Dropdown */}
            <div className="w-full md:w-auto">
                <AdminStatusSelect
                    value={status}
                    onChange={handleStatusChange}
                    isFilter={true}
                    className="min-w-[220px]"
                />
            </div>

            {/* Reset Button (Optional but premium) */}
            {(query || (status && status !== "ALL")) && (
                <button
                    onClick={handleReset}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-aether-muted hover:text-cta-blue hover:bg-white hover:border-cta-blue/20 transition-all group/reset"
                    title="Reset Filters"
                >
                    <RotateCcw className="w-4 h-4 group-hover/reset:rotate-[-45deg] transition-transform" />
                </button>
            )}

            {isPending && (
                <div className="absolute -bottom-1 left-6 right-6 h-[2px] bg-slate-100 overflow-hidden rounded-full">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-cta-blue to-transparent"
                    />
                </div>
            )}
        </div>
    );
}
