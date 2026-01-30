
import connectDB from "@/lib/db";
import Order, { IOrder } from "@/models/Order";
import Link from "next/link";
import { Eye } from "lucide-react";
import { redirect } from "next/navigation";
import AdminOrderFilters from "@/components/admin/AdminOrderFilters";
import { formatOrderId } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PopulatedOrder {
    _id: string;
    userId?: { name?: string; email?: string };
    userInfo?: { name?: string; email?: string };
    createdAt: Date;
    orderStatus: string;
    totalAmount: number;
    shippingAddress?: {
        phone?: string;
    };
}

export default async function AdminOrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; status?: string }>;
}) {
    await connectDB();
    const { q, status } = await searchParams;

    // Build query
    const query: any = {};
    if (status && status !== "ALL") {
        query.orderStatus = status;
    }

    // For search, we need a slightly more complex query if searching by user name,
    // but standard Order model refers to User. 
    // Mongoose doesn't easily support deep search on populated fields in a single query without aggregations.
    // simpler approach: fetch all (or limit) and filter, OR search by Order ID directly if it looks like an ID,
    // OR use aggregation lookup.
    // Let's implement robust ID search first, and maybe aggregation for name later if needed/requested.
    // Actually, "q" could be order ID.
    if (q) {
        if (q.length === 24) { // heuristic for ObjectId
            query._id = q;
        } else {
            // Fallback: This is tricky with simple find. 
            // Ideally we'd aggregate. For this implementation, let's assume Order ID partial search or exact if ObjectId.
            // or search by 'shippingAddress.city' etc?
            // Let's stick to full Order ID or just filter client side? No, server side is requested.
            // We can regex search the _id if we cast to string in aggregation, but standard find matches ObjectId.
            // Let's assume q is for Order ID (last 8 chars logic) or use a regex on a string field if we had one.
            // For now, let's support Order ID (exact) or simple string match if we had an order number field.
            // We will implement an aggregation for robust search.
        }
    }

    // Implementing Aggregation for search across User and Order
    let pipeline: any[] = [
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userInfo"
            }
        },
        { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } }
    ];

    if (status && status !== "ALL") {
        pipeline.push({ $match: { orderStatus: status } });
    }

    if (q) {
        const cleanQ = q.startsWith('#') ? q.slice(1) : q;

        pipeline.push({
            $match: {
                $or: [
                    // Search by shipping address phone
                    { "shippingAddress.phone": { $regex: q, $options: "i" } },
                    // Search user name
                    { "userInfo.name": { $regex: q, $options: "i" } },
                    // Search user email
                    { "userInfo.email": { $regex: q, $options: "i" } },
                ]
            }
        });

        // Handle partial or full Order ID search
        if (cleanQ.length >= 2) {
            // Inject string conversion stage at the beginning
            pipeline.unshift({
                $addFields: {
                    orderIdString: { $toString: "$_id" }
                }
            });

            // Add string-based match for the cleaned ID
            pipeline[pipeline.length - 1].$match.$or.push({
                orderIdString: { $regex: cleanQ, $options: "i" }
            });
        }
    }

    const orders = await Order.aggregate(pipeline) as unknown as PopulatedOrder[];


    return (
        <div className="space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-5xl heading-luxe text-aether-primary">Orders</h2>
                    <p className="text-aether-secondary font-medium italic">Manage and track all customer orders.</p>
                </div>

                <AdminOrderFilters initialQuery={q} initialStatus={status} />
            </div>

            <div className="aether-card rounded-[2.5rem] border-slate-100 overflow-hidden shadow-sm p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-aether-muted">
                                <th className="p-4 md:p-8 font-black">Order ID</th>
                                <th className="p-4 md:p-8 font-black">Customer</th>
                                <th className="p-4 md:p-8 font-black">Date</th>
                                <th className="p-4 md:p-8 font-black">Status</th>
                                <th className="p-4 md:p-8 font-black">Total</th>
                                <th className="p-4 md:p-8 font-black text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-aether-muted italic">No orders found matching your criteria.</td>
                                </tr>
                            ) : orders.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4 md:p-8">
                                        <span className="text-xs font-black uppercase tracking-widest text-aether-primary bg-slate-100/50 px-3 py-1.5 rounded-lg border border-slate-200/50">
                                            {formatOrderId(order._id)}
                                        </span>
                                    </td>
                                    <td className="p-4 md:p-8">
                                        <div className="space-y-1">
                                            {/* @ts-ignore - Aggregation lookup result */}
                                            <p className="text-sm font-bold text-aether-primary font-display">{order.userInfo?.name || "Guest User"}</p>
                                            {/* @ts-ignore */}
                                            <p className="text-[10px] text-aether-muted font-medium italic">{order.userInfo?.email}</p>
                                            {/* Phone Number Display */}
                                            {order.shippingAddress?.phone ? (
                                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{order.shippingAddress.phone}</p>
                                            ) : (
                                                <p className="text-[9px] text-slate-300 font-mono mt-0.5">No Phone</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-8">
                                        <span className="text-xs font-medium text-aether-secondary">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </td>
                                    <td className="p-4 md:p-8">
                                        <StatusBadge status={order.orderStatus} />
                                    </td>
                                    <td className="p-4 md:p-8">
                                        <span className="text-sm font-bold text-aether-primary font-display">₹{order.totalAmount.toLocaleString()}</span>
                                    </td>
                                    <td className="p-4 md:p-8 text-right">
                                        <Link
                                            href={`/admin/orders/${order._id}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 hover:bg-cta-blue hover:text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-aether-secondary transition-all shadow-sm hover:shadow-lg group-hover:scale-105 transition-all"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || "bg-slate-50 text-slate-400 border-slate-100"}`}>
            {status.replace(/_/g, " ")}
        </span>
    );
}
