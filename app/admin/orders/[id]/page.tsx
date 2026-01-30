import connectDB from "@/lib/db";
import Order, { IOrder, OrderStatus } from "@/models/Order";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Truck, Package, CreditCard, User, Clock, CheckCircle2 } from "lucide-react";
import AdminOrderControls from "@/app/admin/orders/[id]/AdminOrderControls";
import InvoiceButton from "./InvoiceButton";
import DeleteOrderButton from "./DeleteOrderButton";
import { formatOrderId } from "@/lib/utils";

export const dynamic = "force-dynamic";

// Populated interface matching our schema updates
interface PopulatedOrder {
    _id: string;
    userId?: { name?: string; email?: string };
    createdAt: Date;
    orderStatus: OrderStatus;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    items: Array<{
        productId?: { name: string; images: string[] };
        quantity: number;
        price: number;
    }>;
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        phone?: string;
    };
    timeline: {
        status: string;
        timestamp: Date;
        note?: string;
    }[];
    tracking?: {
        carrier: string;
        trackingCode: string;
        url?: string;
    };
    returnDetails?: {
        isRequested: boolean;
        status?: string;
        reason?: string;
        refundAmount?: number;
    };
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    const order = await Order.findById(id)
        .populate("userId", "name email")
        .populate("items.productId", "name images")
        .sort({ "timeline.timestamp": 1 }) // ensure timeline order
        .lean() as unknown as PopulatedOrder | null;

    if (!order) {
        return <div className="p-8 text-aether-secondary">Order not found</div>;
    }

    const OrderItem = ({ item }: { item: any }) => (
        <div className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
            <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 overflow-hidden shrink-0">
                {item.productId?.images?.[0] && (
                    <Image src={item.productId.images[0]} alt="" width={48} height={48} className="object-cover w-full h-full" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-aether-primary truncate">{item.productId?.name}</p>
                <p className="text-[10px] text-aether-secondary">Qty: {item.quantity} × ₹{item.price}</p>
            </div>
            <p className="text-sm font-bold text-aether-primary">₹{item.quantity * item.price}</p>
        </div>
    );

    return (
        <div className="max-w-[1600px] mx-auto pb-20 px-4 md:px-8">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pt-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-cta-blue hover:border-cta-blue transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold font-display text-aether-primary flex items-center gap-3">
                            {formatOrderId(order._id)}
                            <span className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded-full border ${order.orderStatus === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
                                order.orderStatus === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' :
                                    'bg-blue-50 text-cta-blue border-blue-100'
                                }`}>
                                {order.orderStatus.replace(/_/g, " ")}
                            </span>
                        </h1>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                            {new Date(order.createdAt).toLocaleString()} • {order.items.length} Items • Total: ₹{order.totalAmount.toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <InvoiceButton orderId={order._id.toString()} />
                    <DeleteOrderButton orderId={order._id.toString()} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT COL: Order Context (8 cols) */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Items Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                            <Package className="w-4 h-4" /> Order Items
                        </h3>
                        <div className="grid grid-cols-1 gap-1">
                            {order.items.map((item, i) => <OrderItem key={i} item={item} />)}
                        </div>
                        <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-widest text-slate-400">Total Amount</p>
                                <p className="text-2xl font-bold text-aether-primary">₹{order.totalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Activity Log
                        </h3>
                        <div className="space-y-6 pl-2">
                            {(order.timeline || []).slice().reverse().map((event, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full border-2 z-10 ${i === 0 ? 'bg-cta-blue border-cta-blue' : 'bg-white border-slate-300'}`}></div>
                                        {i !== order.timeline.length - 1 && <div className="w-0.5 h-full bg-slate-100 absolute top-3"></div>}
                                    </div>
                                    <div className="pb-2">
                                        <p className="text-sm font-bold text-aether-primary">{event.status.replace(/_/g, " ")}</p>
                                        <p className="text-[10px] text-slate-400 mb-1">{new Date(event.timestamp).toLocaleString()}</p>
                                        {event.note && <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">{event.note}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COL: Controls & Details (4 cols) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Management Card (Sticky-ish usually, but simple here) */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm ring-1 ring-slate-100">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Management</h3>
                        <AdminOrderControls
                            orderId={order._id.toString()}
                            currentStatus={order.orderStatus}
                            hasTracking={!!order.tracking}
                            returnDetails={order.returnDetails ? {
                                isRequested: order.returnDetails.isRequested,
                                status: order.returnDetails.status,
                                reason: order.returnDetails.reason,
                                refundAmount: order.returnDetails.refundAmount
                            } : undefined}
                        />
                    </div>

                    {/* Customer & Shipping */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">

                        {/* User */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                <User className="w-4 h-4" /> Customer
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-aether-muted mb-1">Identity</p>
                                    <p className="text-sm font-bold text-aether-primary">{order.userId?.name || "Generic Entity"}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-aether-muted mb-1">Communication</p>
                                    <p className="text-xs font-medium text-aether-secondary break-all italic">{order.userId?.email || "N/A"}</p>
                                    {order.shippingAddress?.phone && (
                                        <p className="text-xs font-mono text-slate-500 mt-1">{order.shippingAddress.phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100"></div>

                        {/* Address */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                <Truck className="w-4 h-4" /> Delivery
                            </h3>
                            <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="font-bold text-aether-primary">{order.shippingAddress?.street}</p>
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
                                <p className="text-xs uppercase tracking-wider mt-1 font-bold text-slate-400">{order.shippingAddress?.country}</p>
                            </div>

                            {order.tracking && (
                                <div className="mt-3 p-3 border border-indigo-100 bg-indigo-50/50 rounded-xl">
                                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Tracking</p>
                                    <p className="text-sm font-bold text-indigo-900">{order.tracking.carrier}</p>
                                    <p className="text-xs font-mono text-indigo-700">{order.tracking.trackingCode}</p>
                                    {order.tracking.url && <a href={order.tracking.url} target="_blank" className="text-[10px] underline text-indigo-500 mt-1 block">Track Now</a>}
                                </div>
                            )}
                        </div>

                        <div className="h-px bg-slate-100"></div>

                        {/* Payment */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" /> Payment
                            </h3>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-aether-primary">
                                    {order.paymentMethod === 'RAZORPAY' ? 'Online' : 'Cash on Delivery'}
                                </p>
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    }`}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
