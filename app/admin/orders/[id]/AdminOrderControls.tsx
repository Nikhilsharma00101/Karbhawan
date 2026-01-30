"use client";

import { updateOrderStatus, addTrackingInfo, handleReturnRequest } from "@/app/actions/admin-orders";
import { OrderStatus } from "@/models/Order";
import { Loader2, Truck, Check, X, Box, AlertCircle } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import AdminStatusSelect, { OrderStatus as StatusType } from "@/components/admin/AdminStatusSelect";

interface AdminOrderControlsProps {
    orderId: string;
    currentStatus: OrderStatus;
    hasTracking: boolean;
    returnDetails?: {
        isRequested: boolean;
        status?: string;
        reason?: string;
        refundAmount?: number;
    };
}

export default function AdminOrderControls({ orderId, currentStatus, hasTracking, returnDetails }: AdminOrderControlsProps) {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<OrderStatus>(currentStatus);
    const [showTrackingModal, setShowTrackingModal] = useState(false);
    const [trackingData, setTrackingData] = useState({ carrier: "", trackingCode: "", url: "" });

    // Sync local state with server state
    useEffect(() => {
        setStatus(currentStatus);
    }, [currentStatus]);

    // Handle Status Change
    const handleStatusUpdate = (newStatus: StatusType) => {
        const statusToUpdate = newStatus as OrderStatus;

        setStatus(statusToUpdate);
        startTransition(async () => {
            const result = await updateOrderStatus(orderId, statusToUpdate);
            if (!result.success) {
                // handle error
                setStatus(currentStatus);
            }
        });
    };

    // Handle Add Tracking
    const handleAddTracking = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const result = await addTrackingInfo(orderId, trackingData);
            if (result.success) {
                setShowTrackingModal(false);
                setStatus("SHIPPED"); // Auto update status visual
            }
        });
    };

    // Handle Return
    const handleReturnAction = (action: "APPROVED" | "REJECTED" | "COMPLETED") => {
        const amount = action === "COMPLETED" ? Number(prompt("Enter refund amount:")) : undefined;
        startTransition(async () => {
            await handleReturnRequest(orderId, action, amount);
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Current Order Lifecycle</span>
                <AdminStatusSelect
                    value={status}
                    onChange={handleStatusUpdate}
                    disabled={isPending}
                    className="w-full"
                />
            </div>

            {isPending && (
                <div className="flex items-center gap-3 py-2 px-4 bg-blue-50/50 border border-blue-100/50 rounded-2xl w-fit animate-in fade-in slide-in-from-left duration-500">
                    <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-100 border-t-cta-blue animate-spin" />
                        <Loader2 className="w-2.5 h-2.5 text-cta-blue absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-cta-blue">Updating System...</span>
                </div>
            )}

            <div className="flex flex-wrap gap-4">
                {/* Tracking Button */}
                {["PROCESSING", "SHIPPED"].includes(status) && (
                    <button
                        onClick={() => setShowTrackingModal(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 hover:bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] text-aether-secondary transition-all shadow-sm"
                    >
                        <Truck className="w-4 h-4" />
                        {hasTracking ? "Update Tracking" : "Add Tracking"}
                    </button>
                )}
            </div>

            {/* Return Management */}
            {returnDetails?.isRequested && returnDetails.status !== "COMPLETED" && returnDetails.status !== "REJECTED" && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-3 text-orange-600">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest">Return Request Active</span>
                    </div>
                    <p className="text-sm text-aether-secondary italic">Reason: "{returnDetails.reason}"</p>

                    <div className="flex gap-3">
                        {returnDetails.status === "PENDING" && (
                            <>
                                <button onClick={() => handleReturnAction("APPROVED")} className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-green-600 transition-colors">
                                    Approve Return
                                </button>
                                <button onClick={() => handleReturnAction("REJECTED")} className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
                                    Reject
                                </button>
                            </>
                        )}
                        {returnDetails.status === "APPROVED" && (
                            <button onClick={() => handleReturnAction("COMPLETED")} className="px-4 py-2 bg-cta-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-cta-dark transition-colors">
                                Process Refund & Close
                            </button>
                        )}
                    </div>
                </div>
            )}


            {/* Modal for Tracking */}
            {showTrackingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full space-y-6 shadow-2xl">
                        <h3 className="text-xl heading-luxe text-aether-primary">Shipment Details</h3>
                        <form onSubmit={handleAddTracking} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-aether-muted ml-1">Carrier</label>
                                <input
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-aether-primary outline-none focus:border-cta-blue transition-colors"
                                    placeholder="e.g. BlueDart, FedEx"
                                    required
                                    value={trackingData.carrier}
                                    onChange={e => setTrackingData({ ...trackingData, carrier: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-aether-muted ml-1">Tracking Code</label>
                                <input
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-aether-primary outline-none focus:border-cta-blue transition-colors"
                                    placeholder="Order tracking number"
                                    required
                                    value={trackingData.trackingCode}
                                    onChange={e => setTrackingData({ ...trackingData, trackingCode: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-aether-muted ml-1">Tracker URL (Opt)</label>
                                <input
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-aether-primary outline-none focus:border-cta-blue transition-colors"
                                    placeholder="https://..."
                                    value={trackingData.url}
                                    onChange={e => setTrackingData({ ...trackingData, url: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowTrackingModal(false)} className="flex-1 py-3 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-aether-secondary hover:bg-slate-50">Cancel</button>
                                <button type="submit" disabled={isPending} className="flex-1 py-3 rounded-xl bg-cta-blue text-[10px] font-black uppercase tracking-widest text-white hover:bg-cta-dark">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
