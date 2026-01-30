
import { auth } from "@/auth";
import Order from "@/models/Order";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Package, ArrowRight, Clock, CheckCircle, XCircle, Truck, ShoppingBag, Heart, User, Sparkles } from "lucide-react";
import connectDB from "@/lib/db";
import Image from "next/image";

async function getRecentOrders(userId: string) {
    await connectDB();
    // Fetch last 1 most recent order for the 'Active Order' card
    // And maybe top 3 for a list
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).limit(3);
    const orderCount = await Order.countDocuments({ userId });
    return { orders, orderCount };
}

export default async function AccountPage() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const { orders, orderCount } = await getRecentOrders(session.user.id);
    const lastOrder = orders[0];

    return (
        <div className="space-y-8 md:space-y-12">

            {/* 1. Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                    { label: 'Total Orders', value: orderCount, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Wishlist', value: 'View', href: '/wishlist', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50' },
                    { label: 'Cart', value: 'Check', href: '/cart', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Profile', value: 'Edit', href: '/account/profile', icon: User, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((stat, i) => (
                    stat.href ? (
                        <Link href={stat.href} key={i} className="group relative overflow-hidden bg-white p-6 rounded-3xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                                <stat.icon className="w-16 h-16 -rotate-12" />
                            </div>
                            <div className="relative z-10">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-aether-muted mb-1">{stat.label}</div>
                                <div className="text-xl font-bold text-aether-primary flex items-center gap-2">
                                    {stat.value} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div key={i} className="relative overflow-hidden bg-white p-6 rounded-3xl border border-white/60 shadow-lg shadow-slate-200/50">
                            <div className={`absolute top-0 right-0 p-4 opacity-10 ${stat.color}`}>
                                <stat.icon className="w-16 h-16 -rotate-12" />
                            </div>
                            <div className="relative z-10">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-aether-muted mb-1">{stat.label}</div>
                                <div className="text-2xl font-black text-aether-primary">{stat.value}</div>
                            </div>
                        </div>
                    )
                ))}
            </div>

            {/* 2. Last Active Order Highlight */}
            {lastOrder && (
                <div className="space-y-6">
                    <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-display font-black text-aether-primary uppercase tracking-tight">Recent Activity</h3>
                    </div>

                    <div className="glass-panel p-1 rounded-[2.5rem] bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 border-white shadow-2xl overflow-hidden group">
                        <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.3rem] relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:items-center justify-between">
                                {/* Order Info */}
                                <div className="space-y-6 flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border
                                            ${lastOrder.orderStatus === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                lastOrder.orderStatus === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    'bg-blue-50 text-blue-600 border-blue-100 animate-pulse'}
                                        `}>
                                            {lastOrder.orderStatus.replace(/_/g, ' ')}
                                        </div>
                                        <span className="text-xs font-bold text-aether-secondary">
                                            Placed on {new Date(lastOrder.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="text-3xl md:text-4xl font-display font-black text-aether-primary mb-2">
                                            Order #{lastOrder._id.toString().slice(-6).toUpperCase()}
                                        </h4>
                                        <p className="text-aether-secondary font-medium">
                                            Total Amount: <span className="text-aether-primary font-bold">{formatPrice(lastOrder.totalAmount)}</span> • {lastOrder.items.length} Items
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {/* Show simple thumbnails of items */}
                                        {lastOrder.items.slice(0, 4).map((item: any, idx: number) => (
                                            <div key={idx} className="w-16 h-16 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm overflow-hidden">
                                                {/* In a real scenario, we'd fetch product images. Assuming we don't have images in order items schema easily directly without populate, showing placeholder or generic icon */}
                                                <Package className="w-6 h-6 text-slate-300" />
                                            </div>
                                        ))}
                                        {lastOrder.items.length > 4 && (
                                            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-aether-muted">
                                                +{lastOrder.items.length - 4}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Link href={`/account/orders/${lastOrder._id}`} className="w-full sm:w-auto">
                                        <button className="w-full h-14 px-8 rounded-2xl bg-aether-primary text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group/btn">
                                            View Details <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>

                                    {lastOrder.orderStatus !== 'DELIVERED' && lastOrder.orderStatus !== 'CANCELLED' && (
                                        <Link href={`/account/orders/${lastOrder._id}`} className="w-full sm:w-auto">
                                            <button className="w-full h-14 px-8 rounded-2xl bg-white border border-slate-200 text-aether-primary text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                                                Track Order
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State if no orders */}
            {!lastOrder && (
                <div className="glass-panel p-12 rounded-[2.5rem] bg-white border-dashed border-2 border-slate-200 text-center flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                        <ShoppingBag className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-aether-primary mb-2">No Recent Orders</h3>
                    <p className="text-aether-muted mb-8 max-w-sm">Looks like you haven't placed any orders recently. Start shopping to see your activity here.</p>
                    <Link href="/shop">
                        <button className="btn-primary px-8 py-3 text-xs">Start Shopping</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
