import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order, { IOrder } from "@/models/Order";
import Product from "@/models/Product";
import { formatPrice, formatOrderId } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Package, Truck, Check, X, ArrowUpRight } from "lucide-react";
import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface ExtendedSession extends Session {
    user: {
        id: string;
    } & Session["user"];
}

interface PopulatedOrder extends Omit<IOrder, 'items'> {
    items: {
        productId: {
            name: string;
            images: string[];
        };
        quantity: number;
        price: number;
    }[];
}

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    const session = await auth() as ExtendedSession | null;
    if (!session || !session.user) {
        redirect("/api/auth/signin?callbackUrl=/orders");
    }

    await connectDB();
    const { tab } = await searchParams;
    const currentTab = tab || "ALL";

    const query: any = { userId: session.user.id };

    if (currentTab === "OPEN") {
        query.orderStatus = { $in: ["PROCESSING", "SHIPPED", "OUT_FOR_DELIVERY"] };
    } else if (currentTab === "DELIVERED") {
        query.orderStatus = "DELIVERED";
    } else if (currentTab === "CANCELLED") {
        query.orderStatus = { $in: ["CANCELLED", "RETURN_REQUESTED", "RETURNED"] };
    }

    // Create a populated query
    const orders = await Order.find(query)
        .sort({ createdAt: -1 })
        .populate({
            path: "items.productId",
            model: Product,
            select: "name images"
        })
        .lean() as unknown as PopulatedOrder[];

    const tabs = [
        { id: "ALL", label: "All Orders" },
        { id: "OPEN", label: "Open Orders" },
        { id: "DELIVERED", label: "Delivered" },
        { id: "CANCELLED", label: "Cancelled & Returns" },
    ];

    return (
        <div className="container px-4 md:px-6 pt-[220px] pb-32 min-h-screen">
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl heading-luxe text-aether-primary mb-2">My Orders</h1>
                    <p className="text-aether-secondary font-medium italic">Track, manage and review your purchases.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
                {tabs.map((t) => (
                    <Link
                        key={t.id}
                        href={`/orders?tab=${t.id}`}
                        className={`shrink-0 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${currentTab === t.id
                            ? "bg-cta-blue border-cta-blue text-white shadow-lg shadow-cta-blue/20"
                            : "bg-white border-slate-100 text-aether-secondary hover:border-slate-200"
                            }`}
                    >
                        {t.label}
                    </Link>
                ))}
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-40 glass-panel rounded-[3rem] border-dashed border-slate-200">
                    <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-8">
                        <Package className="w-8 h-8 text-slate-200" />
                    </div>
                    <h2 className="text-2xl heading-luxe mb-4 text-aether-primary">No Orders Found</h2>
                    <p className="text-aether-muted italic mb-8">We couldn't find any orders in this section.</p>
                    {currentTab !== "ALL" && (
                        <Link href="/orders" className="text-xs font-black uppercase tracking-widest text-cta-blue hover:underline">View All Orders</Link>
                    )}
                </div>
            ) : (
                <div className="space-y-12">
                    {orders.map((order) => (
                        <div key={order._id.toString()} className="glass-panel rounded-[2.5rem] border-slate-200/40 overflow-hidden shadow-sm hover:shadow-aether transition-all duration-500 group relative">
                            {/* Header */}
                            <div className="px-8 py-8 bg-white/40 border-b border-slate-100 flex flex-wrap justify-between items-center gap-6">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-aether-muted">Order ID</p>
                                    <p className="font-display font-bold text-aether-primary">{formatOrderId(order._id)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-aether-muted">Placed On</p>
                                    <p className="text-sm font-bold text-aether-primary">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-aether-muted">Total</p>
                                    <p className="text-lg font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cta-soft to-cta-blue">{formatPrice(order.totalAmount)}</p>
                                </div>
                                <div className="ml-auto">
                                    <StatusBadge status={order.orderStatus} />
                                </div>
                            </div>

                            {/* Items Preview (Max 2) */}
                            <div className="p-8 space-y-6 bg-white/20">
                                {order.items.slice(0, 2).map((item, idx: number) => (
                                    <div key={idx} className="flex items-center gap-6 group/item">
                                        <div className="w-16 h-16 bg-white border border-slate-100 rounded-xl flex-shrink-0 overflow-hidden relative">
                                            {item.productId?.images?.[0] ? (
                                                <Image src={item.productId.images[0]} alt={item.productId.name || ""} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-slate-50 flex items-center justify-center text-[8px] font-black text-slate-200">N/A</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-display font-bold text-aether-primary truncate">
                                                {item.productId?.name || "Product Unavailable"}
                                            </p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-aether-muted italic">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                                {order.items.length > 2 && (
                                    <p className="text-[10px] font-bold text-aether-secondary italic">+ {order.items.length - 2} more items</p>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="px-8 py-5 border-t border-slate-100 flex justify-between items-center bg-white/30">
                                <Link href={`/orders/${order._id}`} className="group/link flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cta-blue hover:text-cta-dark transition-colors">
                                    View Full Details
                                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                </Link>

                                {order.orderStatus === "DELIVERED" && (
                                    <span className="text-[9px] font-black uppercase tracking-widest text-green-600 flex items-center gap-1.5">
                                        <Check className="w-3 h-3" />
                                        Completed
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        PROCESSING: "bg-blue-50 text-cta-blue border-blue-100",
        SHIPPED: "bg-indigo-50 text-indigo-600 border-indigo-100",
        OUT_FOR_DELIVERY: "bg-purple-50 text-purple-600 border-purple-100",
        DELIVERED: "bg-green-50 text-green-600 border-green-100",
        CANCELLED: "bg-red-50 text-red-500 border-red-100",
        RETURN_REQUESTED: "bg-orange-50 text-orange-600 border-orange-100",
        RETURNED: "bg-slate-100 text-slate-600 border-slate-200",
    };

    return (
        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${styles[status] || "bg-slate-50 text-slate-400 border-slate-100"}`}>
            {status.replace(/_/g, " ")}
        </span>
    );
}
