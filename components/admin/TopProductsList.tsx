
"use client";

import Image from "next/image";
import { TrendingUp, Award } from "lucide-react";

interface TopProductsListProps {
    products: any[];
}

export default function TopProductsList({ products }: TopProductsListProps) {
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-aether-muted italic text-sm border border-dashed border-slate-100 rounded-[2rem]">
                No performance data.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {products.map((item, index) => (
                <div key={item._id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 overflow-hidden transition-transform group-hover:scale-105">
                                {item.productInfo.images && item.productInfo.images[0] ? (
                                    <Image
                                        src={item.productInfo.images[0]}
                                        alt={item.productInfo.name}
                                        width={48}
                                        height={48}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                        <Award className="w-5 h-5 text-slate-300" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-aether-primary border-2 border-white flex items-center justify-center shadow-sm">
                                <span className="text-[8px] font-black text-white">{index + 1}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[11px] font-black text-aether-primary uppercase tracking-tight line-clamp-1 max-w-[140px]">
                                {item.productInfo.name}
                            </p>
                            <p className="text-[10px] text-aether-muted font-bold italic">
                                {item.totalSold} units sold
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-black text-aether-primary">₹{item.revenue.toLocaleString()}</p>
                        <div className="flex items-center justify-end gap-1 text-emerald-500">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-[9px] font-bold uppercase tracking-tighter">Elite</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
