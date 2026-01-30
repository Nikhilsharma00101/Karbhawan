
"use client";

import { format } from "date-fns";
import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface RecentOrdersTableProps {
    orders: any[];
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
    if (!orders || orders.length === 0) {
        return (
            <div className="p-20 text-center text-aether-muted italic">
                No acquisitions found in the current cycle.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-50 bg-slate-50/20">
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-aether-muted">Client</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-aether-muted">Order ID</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-aether-muted">Date</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-aether-muted">Amount</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-aether-muted">Status</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-aether-muted text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {orders.map((order) => (
                        <tr key={order._id} className="group hover:bg-slate-50/50 transition-colors duration-200">
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                        {order.userId?.image ? (
                                            <Image src={order.userId.image} alt={order.userId.name || "User"} width={32} height={32} />
                                        ) : (
                                            <span className="text-[10px] font-black text-slate-400 capitalize">
                                                {(order.userId?.name || "U")[0]}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-aether-primary">{order.userId?.name || "Guest User"}</p>
                                        <p className="text-[10px] text-aether-muted font-medium tracking-tight truncate max-w-[150px]">{order.userId?.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-5">
                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">
                                    #{order._id.slice(-8)}
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <span className="text-[10px] font-bold text-aether-secondary uppercase">
                                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <span className="text-xs font-black text-aether-primary">₹{order.totalAmount.toLocaleString()}</span>
                            </td>
                            <td className="px-8 py-5">
                                <StatusBadge status={order.orderStatus} />
                            </td>
                            <td className="px-8 py-5 text-right">
                                <Link
                                    href={`/admin/orders/${order._id}`}
                                    className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-white border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-aether-muted hover:border-cta-blue hover:text-cta-blue transition-all group-hover:shadow-sm"
                                >
                                    Details
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        DELIVERED: "bg-emerald-50 text-emerald-600 border-emerald-100",
        PROCESSING: "bg-blue-50 text-blue-600 border-blue-100",
        SHIPPED: "bg-amber-50 text-amber-600 border-amber-100",
        CANCELLED: "bg-rose-50 text-rose-600 border-rose-100",
        RETURNED: "bg-slate-50 text-slate-600 border-slate-100",
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${styles[status] || "bg-slate-50 text-slate-500 border-slate-100"}`}>
            {status.replace(/_/g, " ")}
        </span>
    );
}
