"use client";

import { Printer } from "lucide-react";

export default function InvoiceButton({ orderId }: { orderId: string }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-aether-secondary hover:bg-slate-50 hover:text-cta-blue transition-colors"
        >
            <Printer className="w-4 h-4" />
            Print Invoice
        </button>
    );
}
