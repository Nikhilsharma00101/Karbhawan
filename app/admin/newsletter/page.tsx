"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    Mail, Users, Activity, Send, Search,
    Loader2, CheckCircle2, XCircle, AlertCircle, Trash2
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import RichTextEditor from "@/components/admin/newsletter/RichTextEditor";

interface Subscriber {
    _id: string;
    email: string;
    isActive: boolean;
    createdAt: string;
}

export default function NewsletterDashboard() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Compose Email State
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const res = await fetch("/api/admin/newsletter/subscribers");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setSubscribers(data.subscribers || []);
        } catch (error) {
            toast.error("Failed to load subscribers");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/newsletter/subscribers/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !currentStatus }),
            });

            if (!res.ok) throw new Error("Update failed");

            setSubscribers(subs =>
                subs.map(sub => sub._id === id ? { ...sub, isActive: !currentStatus } : sub)
            );
            toast.success("Subscriber status updated");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const deleteSubscriber = async (id: string) => {
        if (!confirm("Are you sure you want to permanently delete this subscriber?")) return;

        try {
            const res = await fetch(`/api/admin/newsletter/subscribers/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            setSubscribers(subs => subs.filter(sub => sub._id !== id));
            toast.success("Subscriber deleted");
        } catch (error) {
            toast.error("Failed to delete subscriber");
        }
    };

    const handleSendBulk = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !content) {
            toast.error("Please provide both subject and content");
            return;
        }

        const activeCount = subscribers.filter(s => s.isActive).length;
        if (activeCount === 0) {
            toast.error("No active subscribers to send to");
            return;
        }

        if (!confirm(`Are you sure you want to send this to ${activeCount} subscribers?\n\nThis action cannot be undone and will take some time.`)) {
            return;
        }

        setIsSending(true);
        toast.info("Starting email broadcast...", { duration: 5000 });

        try {
            const res = await fetch("/api/admin/newsletter/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, content }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Broadcast failed");

            toast.success(data.message, { duration: 8000 });
            setSubject("");
            setContent("");
        } catch (error: any) {
            toast.error(error.message || "An error occurred during broadcast");
        } finally {
            setIsSending(false);
        }
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeCount = subscribers.filter(s => s.isActive).length;
    const inactiveCount = subscribers.length - activeCount;

    return (
        <div className="space-y-6 md:space-y-10 pb-12">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-cta-blue/10 text-cta-blue text-[10px] font-bold uppercase tracking-widest rounded-full border border-cta-blue/20">
                        Marketing
                    </span>
                </div>
                <h2 className="text-3xl md:text-5xl heading-luxe">Newsletter Broadcast</h2>
                <p className="text-aether-secondary mt-3 font-medium italic max-w-2xl text-sm md:text-base">
                    Manage your subscriber base and initiate targeted email campaigns.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <StatsCard
                    title="Total Subscribers"
                    value={isLoading ? "-" : subscribers.length}
                    icon={<Users className="w-6 h-6" />}
                    color="text-cta-blue"
                    bgColor="bg-blue-500/10"
                />
                <StatsCard
                    title="Active Reach"
                    value={isLoading ? "-" : activeCount}
                    icon={<Activity className="w-6 h-6" />}
                    color="text-emerald-500"
                    bgColor="bg-emerald-500/10"
                />
                <StatsCard
                    title="Inactive / Bounced"
                    value={isLoading ? "-" : inactiveCount}
                    icon={<AlertCircle className="w-6 h-6" />}
                    color="text-slate-400"
                    bgColor="bg-slate-500/10"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                {/* Composer Section */}
                <div className="lg:col-span-7 aether-card p-6 md:p-8 border-slate-100 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-display font-black text-aether-primary uppercase tracking-widest">
                            Campaign Composer
                        </h3>
                        <span className="text-[10px] font-black uppercase text-cta-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                            {activeCount} Targets
                        </span>
                    </div>

                    <form onSubmit={handleSendBulk} className="flex-1 flex flex-col space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted ml-2">
                                Email Subject
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="E.g., Exclusive Diwali Sale Access! 🪔"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cta-blue focus:ring-4 focus:ring-blue-50 transition-all font-sans"
                                required
                            />
                        </div>

                        <div className="space-y-2 flex-1 flex flex-col">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted ml-2">
                                Email HTML Content
                            </label>
                            <RichTextEditor
                                content={content}
                                onChange={setContent}
                            />
                            <p className="text-[10px] text-aether-muted italic mt-2 ml-2">
                                Supports standard HTML tags. The layout wrapper and logo are automatically applied.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSending || activeCount === 0}
                            className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                                    <span>Broadcasting...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 flex-shrink-0" />
                                    <span>Broadcast to {activeCount} Users</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Subscriber Directory */}
                <div className="lg:col-span-5 aether-card p-0 border-slate-100 overflow-hidden flex flex-col h-[700px]">
                    <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/50">
                        <h3 className="text-xl font-display font-black text-aether-primary uppercase tracking-widest mb-4">
                            Directory
                        </h3>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search emails..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-5 py-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cta-blue transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                        {isLoading ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                                <Loader2 className="w-6 h-6 animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Loading Records...</span>
                            </div>
                        ) : filteredSubscribers.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                                <Mail className="w-8 h-8 opacity-20" />
                                <span className="text-[10px] font-black uppercase tracking-widest">No subscribers found</span>
                            </div>
                        ) : (
                            filteredSubscribers.map((sub) => (
                                <motion.div
                                    key={sub._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-colors group"
                                >
                                    <div className="min-w-0 pr-4">
                                        <p className="text-sm font-bold text-slate-900 truncate">
                                            {sub.email}
                                        </p>
                                        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">
                                            {format(new Date(sub.createdAt), 'MMM dd, yyyy')}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => toggleStatus(sub._id, sub.isActive)}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${sub.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                                            title={sub.isActive ? "Deactivate" : "Activate"}
                                        >
                                            {sub.isActive ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => deleteSubscriber(sub._id)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Delete Permanently"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon, color, bgColor }: any) {
    return (
        <div className="aether-card p-6 relative overflow-hidden group">
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${bgColor} rounded-full blur-3xl opacity-40`}></div>
            <div className="flex items-start justify-between relative z-10">
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-aether-muted">{title}</p>
                    <h3 className="text-4xl font-display font-black text-aether-primary">{value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${bgColor} border-2 border-white flex items-center justify-center ${color} shadow-sm group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
