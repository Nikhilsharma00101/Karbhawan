
import { auth } from "@/auth";
import Order from "@/models/Order";
import Product from "@/models/Product"; // Need this to populate product details if needed, though Order model stores some item info
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import {
    ArrowLeft,
    Package,
    Truck,
    MapPin,
    CreditCard,
    Clock,
    CheckCircle,
    XCircle,
    Download
} from "lucide-react";
import connectDB from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Image from "next/image";

async function getOrder(orderId: string, userId: string) {
    await connectDB();
    try {
        const order = await Order.findOne({ _id: orderId, userId }).populate('items.productId');
        if (!order) return null;
        return JSON.parse(JSON.stringify(order));
    } catch (e) {
        return null;
    }
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) redirect('/auth/login');

    const { id } = await params;
    const order = await getOrder(id, session.user.id);

    if (!order) notFound();

    const timelineSteps = [
        { status: 'PROCESSING', label: 'Processing', icon: Clock },
        { status: 'SHIPPED', label: 'Shipped', icon: Package },
        { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
        { status: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
    ];

    const currentStepIndex = timelineSteps.findIndex(step => step.status === order.orderStatus);
    // If status is CANCELLED or RETURNED, we handle differently or just show current status as active

    return (
        <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
            {/* Header with Back Button */}
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/account/orders" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-aether-muted hover:text-cta-blue transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Orders
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-display font-black text-aether-primary uppercase tracking-tight">
                        Order #{order._id.slice(-6).toUpperCase()}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4">
                        <p className="text-sm font-bold text-aether-secondary">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${order.orderStatus === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            order.orderStatus === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' :
                                'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                            {order.orderStatus.replace(/_/g, ' ')}
                        </div>
                    </div>
                </div>

                <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-aether-primary hover:bg-slate-50 transition-all">
                    <Download className="w-4 h-4" /> Invoice
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                {/* Main Content: Timeline & Items */}
                <div className="lg:col-span-2 space-y-8 md:space-y-12">

                    {/* Order Timeline */}
                    {order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'RETURNED' && (
                        <div className="glass-panel p-8 rounded-3xl border-white/60">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-aether-muted mb-8">Order Status</h3>
                            <div className="relative">
                                {/* Connector Line */}
                                <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-slate-100 md:left-8 md:right-8 md:top-[19px] md:bottom-auto md:w-auto md:h-0.5" />

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                                    {timelineSteps.map((step, index) => {
                                        const isCompleted = index <= currentStepIndex;
                                        const isCurrent = index === currentStepIndex;

                                        return (
                                            <div key={step.status} className="flex md:flex-col items-center gap-4 md:gap-4 md:text-center">
                                                <div className={`
                                                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 border-4
                                                    ${isCompleted ? 'bg-cta-blue border-blue-50 text-white' : 'bg-white border-slate-50 text-slate-300'}
                                                    ${isCurrent ? 'ring-4 ring-blue-100 scale-110' : ''}
                                                `}>
                                                    <step.icon className="w-4 h-4" />
                                                </div>
                                                <span className={`text-xs font-bold uppercase tracking-wide ${isCompleted ? 'text-aether-primary' : 'text-slate-300'}`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Items */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-aether-muted">Items in this Order</h3>
                        <div className="space-y-4">
                            {order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex gap-4 md:gap-6 p-4 md:p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-100 relative overflow-hidden flex-shrink-0">
                                        {item.productId?.images?.[0] ? (
                                            <Image
                                                src={item.productId.images[0]}
                                                alt={item.productId.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-slate-300">
                                                <Package className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center gap-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-aether-primary mb-1 line-clamp-2">{item.productId?.name || "Product Name Unavailable"}</h4>
                                            <p className="text-xs font-medium text-aether-muted">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-aether-primary">{formatPrice(item.price)}</p>
                                            {item.hasInstallation && (
                                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide flex items-center gap-1 justify-end mt-1">
                                                    <Package className="w-3 h-3" />
                                                    With Installation
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Totals & Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Payment Summary */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-aether-primary">Payment Summary</h3>

                        <div className="space-y-4 pb-6 border-b border-slate-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="font-bold text-slate-900">{formatPrice(order.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Shipping</span>
                                <span className="font-bold text-emerald-600">Free</span>
                            </div>
                            {/* Tax etc here if we had breakdowns */}
                        </div>

                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-black uppercase text-slate-900">Total</span>
                            <span className="text-2xl font-black text-aether-primary">{formatPrice(order.totalAmount)}</span>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-slate-400" />
                            <div>
                                <p className="text-xs font-bold text-slate-900 uppercase">Payment Method</p>
                                <p className="text-xs text-slate-500">{order.paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-aether-muted" />
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-aether-primary">Delivery Address</h3>
                        </div>

                        <div className="text-sm text-aether-secondary leading-relaxed font-medium">
                            <p className="font-bold text-slate-900 mb-1">{session.user.name}</p>
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                            <p>{order.shippingAddress.country}</p>
                            {order.shippingAddress.phone && <p className="mt-2 text-slate-500">Phone: {order.shippingAddress.phone}</p>}
                        </div>
                    </div>

                    {/* Need Help? */}
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <CheckCircle className="w-24 h-24 -rotate-12" />
                        </div>
                        <h3 className="text-xl font-display font-black mb-2 relative z-10">Need Help?</h3>
                        <p className="text-blue-100 text-sm mb-6 relative z-10">
                            Have an issue with this order? Our support team is here to help you.
                        </p>
                        <Link href="/contact">
                            <button className="w-full py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all relative z-10">
                                Contact Support
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
