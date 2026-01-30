
"use client";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

interface DashboardChartsProps {
    data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white/95 backdrop-blur-md p-4 border border-slate-100 shadow-2xl rounded-2xl min-w-[180px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-aether-muted mb-3 pb-2 border-b border-slate-50">
                    {data.fullDate}
                </p>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cta-blue shadow-sm shadow-blue-200"></div>
                            <span className="text-[11px] font-bold text-aether-secondary">Revenue</span>
                        </div>
                        <span className="text-xs font-black text-aether-primary">₹{data.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                            <span className="text-[11px] font-bold text-aether-secondary">Orders</span>
                        </div>
                        <span className="text-xs font-black text-indigo-600">{data.orders} Contracts</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default function DashboardCharts({ data }: DashboardChartsProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-aether-muted italic">
                Insufficient data for analytics.
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }}
                    dy={15}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }}
                    tickFormatter={(value) => `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
                    dx={-10}
                />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    activeDot={{
                        r: 6,
                        stroke: "#fff",
                        strokeWidth: 3,
                        fill: "#3b82f6",
                        className: "shadow-lg"
                    }}
                    animationDuration={1500}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
