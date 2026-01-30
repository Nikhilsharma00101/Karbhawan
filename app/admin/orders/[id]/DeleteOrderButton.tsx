"use client";

import { deleteOrder } from "@/app/actions/admin-orders";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;

        startTransition(async () => {
            const result = await deleteOrder(orderId);
            if (result.success) {
                router.push("/admin/orders");
            } else {
                alert("Failed to delete order");
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
        >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete
        </button>
    );
}
