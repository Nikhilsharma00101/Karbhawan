
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order, { IOrder, OrderStatus } from "@/models/Order";
import Product from "@/models/Product";
import { formatPrice, formatOrderId } from "@/lib/utils";
import { redirect, notFound } from "next/navigation";
import { Package, Truck, CreditCard, ChevronLeft, MapPin, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CustomerOrderActions from "./CustomerOrderActions";

interface PopulatedOrder {
    _id: string;
    userId: string;
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
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
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
    };
}

const STEPS = [
    { status: "PROCESSING", label: "Processing" },
    { status: "SHIPPED", label: "Shipped" },
    { status: "OUT_FOR_DELIVERY", label: "Out For Delivery" },
    { status: "DELIVERED", label: "Delivered" },
];

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    await connectDB();
    const { id } = await params;

    const order = await Order.findOne({ _id: id, userId: session.user.id })
        .populate({
            path: "items.productId",
            model: Product,
            select: "name images"
        })
        .sort({ "timeline.timestamp": 1 })
        .lean() as unknown as PopulatedOrder | null;

    if (!order) {
        notFound();
    }

    // Calculate progress
    let currentStepIndex = STEPS.findIndex(s => s.status === order.orderStatus);
    if (order.orderStatus === "RETURN_REQUESTED" || order.orderStatus === "RETURNED" || order.orderStatus === "CANCELLED") {
        currentStepIndex = -1; // Handle separately or show fail state
    }
    // Logic: if current status is SHIPPED, then Processing (idx 0) is done. 
    // currentStepIndex 0 -> 0% bar? No, we want to light up current step.

    // Better logic: mapping status to a number level.
    const getStepStatus = (stepIndex: number) => {
        if (order.orderStatus === "CANCELLED" || order.orderStatus === "RETURNED") return "cancelled";
        if (currentStepIndex >= stepIndex) return "completed";
        return "upcoming";
    }

    return (
        <div className="container px-4 md:px-6 pt-[220px] pb-32">

            {/* Nav */}
            <div className="mb-12">
                <Link href="/orders" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted hover:text-cta-blue transition-colors">
                    <ChevronLeft className="w-3 h-3" />
                    Back to Orders
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main */}
                <div className="lg:col-span-8 space-y-12">

                    {/* Header Card */}
                    <div className="glass-panel p-10 rounded-[3rem] border-slate-200/40 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <h1 className="text-3xl md:text-4xl heading-luxe text-aether-primary mb-2">
                                    {formatOrderId(order._id)}
                                </h1>
                                <p className="text-aether-secondary font-medium">
                                    Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                </p>
                            </div>
                            <CustomerOrderActions
                                orderId={order._id.toString()}
                                orderStatus={order.orderStatus}
                                returnDetails={order.returnDetails}
                            />
                        </div>

                        {/* Stepper */}
                        {order.orderStatus !== "CANCELLED" && order.orderStatus !== "RETURNED" && order.orderStatus !== "RETURN_REQUESTED" ? (
                            <div className="relative">
                                {/* Bar Background */}
                                <div className="absolute top-[15px] left-0 w-full h-[2px] bg-slate-100 rounded-full z-0"></div>
                                {/* Progress Bar (approximate) */}
                                <div
                                    className="absolute top-[15px] left-0 h-[2px] bg-gradient-to-r from-cta-soft to-cta-blue rounded-full transition-all duration-1000 z-0"
                                    style={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
                                ></div>

                                <div className="relative z-10 flex justify-between">
                                    {STEPS.map((step, idx) => {
                                        const status = getStepStatus(idx);
                                        return (
                                            <div key={step.status} className="flex flex-col items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white
                                                    ${status === 'completed'
                                                        ? 'border-cta-blue text-cta-blue shadow-lg shadow-cta-blue/20 scale-110'
                                                        : 'border-slate-200 text-slate-300'
                                                    }`}
                                                >
                                                    {status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>}
                                                </div>
                                                <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${status === 'completed' ? 'text-cta-blue' : 'text-slate-300'}`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
                                <p className="text-sm font-bold text-aether-primary uppercase tracking-widest">
                                    Order is {order.orderStatus.replace(/_/g, " ")}
                                </p>
                                {order.orderStatus === "RETURN_REQUESTED" && <p className="text-xs text-orange-500 mt-1 font-bold">Return Request Under Review</p>}
                            </div>
                        )}

                        {/* Latest Update */}
                        {order.timeline && order.timeline.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-slate-50 flex items-start gap-4">
                                <Clock className="w-5 h-5 text-aether-muted shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted mb-1">Latest Update</p>
                                    <p className="text-sm font-bold text-aether-primary">
                                        {/* Get last item */}
                                        {order.timeline[order.timeline.length - 1].note || order.timeline[order.timeline.length - 1].status.replace(/_/g, " ")}
                                    </p>
                                    <p className="text-xs text-aether-secondary mt-1 font-medium italic">
                                        {new Date(order.timeline[order.timeline.length - 1].timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Items List */}
                    <div className="space-y-6">
                        <h3 className="text-xl heading-luxe text-aether-primary px-4">Items Ordered</h3>
                        {order.items.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] p-6 border border-slate-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl flex-shrink-0 overflow-hidden relative">
                                    {item.productId?.images?.[0] ? (
                                        <Image src={item.productId.images[0]} alt={item.productId.name || ""} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">N/A</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-display font-bold text-aether-primary mb-1">{item.productId?.name || "Product Unavailable"}</h4>
                                    <p className="text-xs font-medium text-aether-secondary">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-lg font-bold text-aether-primary">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Summary */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-32">
                        <h3 className="text-lg heading-luxe text-aether-primary mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6 pb-6 border-b border-slate-50 text-sm font-medium text-aether-secondary">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-aether-primary font-bold">{formatPrice(order.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600 font-bold">Free</span>
                            </div>
                            {/* Tax, Discounts could go here */}
                        </div>

                        <div className="flex justify-between items-baseline mb-8">
                            <span className="text-xs font-black uppercase tracking-widest text-aether-primary">Total</span>
                            <span className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cta-soft to-cta-blue">
                                {formatPrice(order.totalAmount)}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {/* Shipping */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin className="w-4 h-4 text-cta-blue" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-aether-muted">Shipping To</span>
                                </div>
                                <div className="ml-6 text-sm text-aether-secondary leading-relaxed">
                                    <p className="font-bold text-aether-primary italic">{order.shippingAddress.street}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>

                            {/* Tracking if available */}
                            {order.tracking && (
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Truck className="w-4 h-4 text-cta-blue" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-aether-muted">Tracking</span>
                                    </div>
                                    <p className="text-xs font-bold text-aether-primary">{order.tracking.carrier}</p>
                                    <p className="text-xs font-mono text-slate-500 mb-2">{order.tracking.trackingCode}</p>
                                    {order.tracking.url && (
                                        <Link href={order.tracking.url} target="_blank" className="text-[10px] font-black uppercase tracking-widest text-cta-blue hover:underline">
                                            Track Package
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Payment */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <CreditCard className="w-4 h-4 text-green-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-aether-muted">Payment</span>
                                </div>
                                <div className="ml-6">
                                    <p className="text-sm font-bold text-aether-primary">
                                        {order.paymentMethod === 'RAZORPAY' ? 'Online Payment' : 'Cash on Delivery'}
                                    </p>
                                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.paymentStatus === 'PAID' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                                        }`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
