"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    User,
    MapPin,
    Heart,
    LogOut,
    ChevronRight,
    Settings,
    CreditCard
} from "lucide-react";
import { SignOut } from "@/components/auth/sign-out-button";
import { motion } from "framer-motion";

const navItems = [
    { name: 'Overview', href: '/account', icon: LayoutDashboard },
    { name: 'My Orders', href: '/account/orders', icon: Package },
    { name: 'Profile Settings', href: '/account/profile', icon: User },
    // { name: 'Addresses', href: '/account/addresses', icon: MapPin }, // Can add later if needed
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
];

export function AccountSidebar() {
    const pathname = usePathname();

    return (
        <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-6">
                {/* User Snapshot - Optional visual enhancer */}
                <div className="glass-panel p-6 rounded-3xl border-white/40 bg-gradient-to-br from-white/80 to-blue-50/20 backdrop-blur-xl hidden md:block">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cta-blue to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-aether-muted">Logged in as</p>
                            <p className="font-bold text-aether-primary truncate max-w-[120px]">User</p>
                        </div>
                    </div>
                    <div className="w-full h-px bg-slate-100 mb-4" />
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-aether-muted">
                        <span>Status</span>
                        <span className="text-emerald-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                        </span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="glass-panel p-2 rounded-3xl border-white/50 bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group overflow-hidden ${isActive
                                            ? 'bg-cta-blue text-white shadow-lg shadow-blue-200'
                                            : 'hover:bg-slate-50 text-aether-secondary hover:text-cta-blue'
                                        }`}
                                >
                                    <div className="relative z-10 flex items-center gap-4">
                                        <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cta-blue'}`} />
                                        <span className="text-sm font-bold tracking-wide">{item.name}</span>
                                    </div>

                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-cta-blue z-0"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    {!isActive && (
                                        <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-2 transition-all" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="my-2 px-4">
                        <div className="h-px bg-slate-100" />
                    </div>

                    <div className="px-2 pb-2">
                        <SignOut />
                    </div>
                </div>
            </div>
        </aside>
    );
}
