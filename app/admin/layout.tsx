"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Users, LogOut, Package, Wrench, Menu, X, Home } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Installation", href: "/admin/installation", icon: Wrench },
    { name: "Testimonials", href: "/admin/testimonials", icon: Users }, // Reusing Users icon for testimonials for now
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8FAFF] text-aether-primary font-sans flex relative">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-4">
                <h1 className="text-xl font-display font-black text-aether-primary tracking-widest leading-none">
                    STORE
                    <span className="text-cta-blue text-[8px] font-sans font-black tracking-[0.3em] ml-1">ADMIN</span>
                </h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-aether-secondary hover:bg-slate-50 rounded-lg"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen w-72 
                    bg-white/80 backdrop-blur-xl border-r border-slate-200/60 
                    flex flex-col pt-20 lg:pt-10 pb-6 z-50 
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="px-8 mb-8 lg:mb-12 hidden lg:block">
                    <h1 className="text-2xl font-display font-black text-aether-primary tracking-widest leading-none">
                        STORE
                        <span className="text-cta-blue text-[10px] block font-sans font-black tracking-[0.3em] mt-2">ADMIN</span>
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive
                                    ? "bg-cta-blue text-white shadow-lg shadow-blue-100/50"
                                    : "text-aether-secondary hover:bg-slate-50 hover:text-cta-blue"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-4 mt-auto space-y-3 pt-4 border-t border-slate-50">
                    <Link
                        href="/"
                        className="flex items-center gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-cta-blue hover:bg-blue-50 hover:text-cta-blue rounded-[1.25rem] transition-all duration-300 group border border-blue-100/50"
                    >
                        <Home className="w-4 h-4" />
                        Back to Store
                    </Link>

                    <div className="flex items-center gap-4 px-5 py-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cta-soft to-cta-blue flex items-center justify-center text-white font-black shadow-md shadow-blue-100">
                            {session?.user?.name?.[0]?.toUpperCase() || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black uppercase tracking-widest text-aether-primary truncate">{session?.user?.name || "Admin"}</p>
                            <p className="text-[10px] text-aether-muted font-medium truncate">{session?.user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 hover:text-red-500 rounded-[1.25rem] transition-all duration-300 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0 bg-aether-gradient pt-16 lg:pt-0">
                <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
