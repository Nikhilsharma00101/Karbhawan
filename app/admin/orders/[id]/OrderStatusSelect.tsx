
"use client";

import { updateOrderStatus } from "@/app/actions/orders";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import AdminStatusSelect, { OrderStatus } from "@/components/admin/AdminStatusSelect";

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = (newStatus: OrderStatus) => {
        const previousStatus = status;
        setStatus(newStatus);

        startTransition(async () => {
            const result = await updateOrderStatus(orderId, newStatus);
            if (!result.success) {
                // Revert if failed (optional: show toast)
                setStatus(previousStatus);
            }
        });
    };

    return (
        <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Manage Status</span>
                <AdminStatusSelect
                    value={status}
                    onChange={handleStatusChange}
                    disabled={isPending}
                    className="min-w-[240px]"
                />
            </div>
            {isPending && (
                <div className="flex items-center gap-2 mt-5">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full border-2 border-slate-100 border-t-cta-blue animate-spin" />
                        <Loader2 className="w-3 h-3 text-cta-blue absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-cta-blue animate-pulse">Synchronizing...</span>
                </div>
            )}
        </div>
    );
}
