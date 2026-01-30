"use client";

import { cancelOrder, requestReturn } from "@/app/actions/customer-orders";
import { OrderStatus } from "@/models/Order";
import { Loader2, XCircle, RotateCcw } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface CustomerOrderActionsProps {
    orderId: string;
    orderStatus: OrderStatus;
    returnDetails?: {
        isRequested: boolean;
        status?: string;
    };
}

export default function CustomerOrderActions({ orderId, orderStatus, returnDetails }: CustomerOrderActionsProps) {
    const [isPending, startTransition] = useTransition();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [reason, setReason] = useState("");

    const handleCancel = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const result = await cancelOrder(orderId, reason);
            if (result.success) {
                setShowCancelModal(false);
                // Status update handled by revalidatePath
            } else {
                alert(result.error);
            }
        });
    }

    const handleReturn = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const result = await requestReturn(orderId, reason);
            if (result.success) {
                setShowReturnModal(false);
            } else {
                alert(result.error);
            }
        });
    }

    if (orderStatus === "PROCESSING") {
        return (
            <>
                <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-100 transition-colors"
                >
                    <XCircle className="w-4 h-4" />
                    Cancel Order
                </button>

                {showCancelModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full space-y-6 shadow-2xl">
                            <div className="text-center space-y-2">
                                <h3 className="text-xl heading-luxe text-aether-primary">Cancel Order?</h3>
                                <p className="text-sm text-aether-secondary">Are you sure? This action cannot be undone.</p>
                            </div>
                            <form onSubmit={handleCancel} className="space-y-4">
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-aether-primary outline-none focus:border-red-200 transition-colors h-24 resize-none"
                                    placeholder="Reason for cancellation..."
                                    required
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                />
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setShowCancelModal(false)} className="flex-1 py-3 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-aether-secondary hover:bg-slate-50">Back</button>
                                    <button type="submit" disabled={isPending} className="flex-1 py-3 rounded-xl bg-red-500 text-[10px] font-black uppercase tracking-widest text-white hover:bg-red-600 flex justify-center items-center gap-2">
                                        {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        );
    }

    if (orderStatus === "DELIVERED" && !returnDetails?.isRequested) {
        return (
            <>
                <button
                    onClick={() => setShowReturnModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 text-aether-secondary rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 hover:text-cta-blue transition-colors shadow-sm"
                >
                    <RotateCcw className="w-4 h-4" />
                    Return / Exchange
                </button>

                {showReturnModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full space-y-6 shadow-2xl">
                            <div className="text-center space-y-2">
                                <h3 className="text-xl heading-luxe text-aether-primary">Request Return</h3>
                                <p className="text-sm text-aether-secondary">Please assist us with a reason for the return.</p>
                            </div>
                            <form onSubmit={handleReturn} className="space-y-4">
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-aether-primary outline-none focus:border-cta-blue transition-colors h-24 resize-none"
                                    placeholder="Reason for return..."
                                    required
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                />
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setShowReturnModal(false)} className="flex-1 py-3 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-aether-secondary hover:bg-slate-50">Back</button>
                                    <button type="submit" disabled={isPending} className="flex-1 py-3 rounded-xl bg-cta-blue text-[10px] font-black uppercase tracking-widest text-white hover:bg-cta-dark flex justify-center items-center gap-2">
                                        {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        )
    }

    return null;
}
