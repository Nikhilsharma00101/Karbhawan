
import { auth } from "@/auth";
import Order from "@/models/Order";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import {
    Package,
    ArrowRight,
    Search,
    Filter,
    Calendar,
    CreditCard
} from "lucide-react";
import connectDB from "@/lib/db";
import { redirect } from "next/navigation";

// Server action or data fetching
async function getUserOrders(userId: string) {
    await connectDB();
    // Return all orders sorted by date
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(orders)); // Serialize for client component usage if needed, but this is a server component
}

export default async function OrdersPage() {
    const session = await auth();
    if (!session?.user?.id) redirect('/auth/login');

    const orders = await getUserOrders(session.user.id);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-display font-black text-aether-primary uppercase tracking-tight">Order History</h2>
                    <p className="text-sm font-bold text-aether-secondary mt-1">
                        View and track all your past purchases
                    </p>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {orders.length === 0 ? (
                    <div className="glass-panel p-20 rounded-[2.5rem] bg-slate-50 border-dashed border-2 border-slate-200 text-center flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
                            <Package className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-aether-primary mb-2">No Orders Yet</h3>
                        <p className="text-aether-muted mb-8 max-w-sm">You haven't placed any orders yet. Once you do, they will show up here.</p>
                        <Link href="/shop">
                            <button className="btn-primary px-8 py-3 text-xs">Start Shopping</button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order: any) => (
                            <Link
                                key={order._id}
                                href={`/account/orders/${order._id}`}
                                className="group relative overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500"
                            >
                                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                                    {/* Order Thumbnail/Icon */}
                                    <div className="hidden md:flex flex-shrink-0 w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-cta-blue transition-colors">
                                        <Package className="w-8 h-8" />
                                    </div>

                                    {/* Order Details */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between md:justify-start md:gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-black text-aether-primary">#{order._id.slice(-6).toUpperCase()}</span>
                                                    <div className={`
                                                        px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                                                        ${order.orderStatus === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            order.orderStatus === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' :
                                                                'bg-blue-50 text-blue-600 border-blue-100'}
                                                    `}>
                                                        {order.orderStatus.replace(/_/g, ' ')}
                                                    </div>
                                                </div>
                                                <p className="text-xs font-bold text-aether-secondary flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-xs font-medium text-aether-muted">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center">
                                                    <span className="font-bold text-[10px]">{order.items.length}</span>
                                                </div>
                                                <span>Items</span>
                                            </div>
                                            <div className="w-px h-3 bg-slate-200" />
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-3 h-3" />
                                                <span className="font-bold text-aether-primary">{formatPrice(order.totalAmount)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Arrow */}
                                    <div className="flex items-center gap-2 md:pl-8 md:border-l md:border-slate-50">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-aether-muted group-hover:text-cta-blue transition-colors">Details</span>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-cta-blue group-hover:text-white transition-all transform group-hover:rotate-[-45deg]">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
