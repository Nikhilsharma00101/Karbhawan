
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import {
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    TrendingUp,
    TrendingDown,
    ArrowRight,
    Calendar,
    ChevronRight,
    MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import DashboardCharts from "@/components/admin/DashboardCharts";
import RecentOrdersTable from "@/components/admin/RecentOrdersTable";
import TopProductsList from "@/components/admin/TopProductsList";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

async function getAdminData() {
    await connectDB();

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Basic Counts
    const [totalOrders, totalProducts, totalUsers, revenueData] = await Promise.all([
        Order.countDocuments(),
        Product.countDocuments(),
        User.countDocuments({ role: "USER" }),
        Order.aggregate([
            { $match: { paymentStatus: "PAID" } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]),
    ]);

    // Trends calculation (Current 30 days vs Previous 30 days)
    const [currentMonthRevenue, prevMonthRevenue, currentMonthOrders, prevMonthOrders] = await Promise.all([
        Order.aggregate([
            { $match: { paymentStatus: "PAID", createdAt: { $gte: thirtyDaysAgo } } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]),
        Order.aggregate([
            { $match: { paymentStatus: "PAID", createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]),
        Order.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        Order.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
    ]);

    const revCurrent = currentMonthRevenue[0]?.total || 0;
    const revPrev = prevMonthRevenue[0]?.total || 0;
    const revenueGrowth = revPrev === 0 ? 100 : ((revCurrent - revPrev) / revPrev) * 100;
    const ordersGrowth = prevMonthOrders === 0 ? 100 : ((currentMonthOrders - prevMonthOrders) / prevMonthOrders) * 100;

    // Daily revenue for the last 14 days (Continuous Timeline)
    const dailyRevenueRaw = await Order.aggregate([
        {
            $match: {
                paymentStatus: "PAID",
                createdAt: { $gte: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                revenue: { $sum: "$totalAmount" },
                orders: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    // Fill gaps in the last 14 days
    const chartData = [];
    for (let i = 13; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = d.toISOString().split('T')[0];
        const dayData = dailyRevenueRaw.find(item => item._id === dateStr);

        chartData.push({
            name: format(d, "MMM dd"),
            revenue: dayData?.revenue || 0,
            orders: dayData?.orders || 0,
            fullDate: format(d, "eeee, MMMM dd")
        });
    }

    // Recent Orders
    const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("userId", "name email image")
        .lean();

    // Top Products
    const topProductsRaw = await Order.aggregate([
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.productId",
                totalSold: { $sum: "$items.quantity" },
                revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
            }
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        { $unwind: "$productInfo" }
    ]);

    return {
        stats: {
            totalRevenue: revenueData[0]?.total || 0,
            totalOrders,
            totalUsers,
            totalProducts,
            revenueGrowth,
            ordersGrowth,
            activeUsers: Math.floor(totalUsers * 0.8), // Mock data for active users
            userGrowth: 15 // Mock data
        },
        chartData,
        recentOrders: JSON.parse(JSON.stringify(recentOrders)),
        topProducts: JSON.parse(JSON.stringify(topProductsRaw))
    };
}


export default async function AdminDashboard() {
    const data = await getAdminData();
    const { stats, chartData, recentOrders, topProducts } = data;

    return (
        <div className="space-y-6 md:space-y-10 pb-12">
            {/* Header section with glass effect */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-cta-blue/10 text-cta-blue text-[10px] font-bold uppercase tracking-widest rounded-full border border-cta-blue/20">
                            Enterprise Overview
                        </span>
                        <span className="text-aether-muted text-[10px] font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(), "MMMM dd, yyyy")}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl heading-luxe">Command Center</h2>
                    <p className="text-aether-secondary mt-3 font-medium italic max-w-2xl text-sm md:text-base">
                        A real-time holistic view of KarBhawan&apos;s commercial performance and operational health.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <button className="aether-button-secondary py-3 px-6 text-sm flex items-center gap-2 flex-1 md:flex-none justify-center">
                        Download Report
                    </button>
                    <Link href="/admin/orders" className="aether-button-primary py-3 px-6 text-sm flex items-center gap-2 flex-1 md:flex-none justify-center">
                        Manage Orders
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Stats Grid - High Impact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatsCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend={stats.revenueGrowth}
                    label="vs last month"
                    color="text-emerald-500"
                    bgColor="bg-emerald-500/10"
                />
                <StatsCard
                    title="Active Orders"
                    value={stats.totalOrders.toString()}
                    icon={ShoppingBag}
                    trend={stats.ordersGrowth}
                    label="order volume"
                    color="text-blue-500"
                    bgColor="bg-blue-500/10"
                />
                <StatsCard
                    title="Total Fleet"
                    value={stats.totalProducts.toString()}
                    icon={Package}
                    trend={2}
                    label="new inventory"
                    color="text-amber-500"
                    bgColor="bg-amber-500/10"
                />
                <StatsCard
                    title="Global Clients"
                    value={stats.totalUsers.toString()}
                    icon={Users}
                    trend={stats.userGrowth}
                    label="user base"
                    color="text-indigo-500"
                    bgColor="bg-indigo-500/10"
                />
            </div>

            {/* Main Visualizations Column */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* Revenue & Growth Chart */}
                <div className="xl:col-span-2 aether-card p-0 border-slate-100 overflow-hidden">
                    <div className="p-4 md:p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg md:text-xl font-display font-black text-aether-primary uppercase tracking-widest">Revenue Analytics</h3>
                            <p className="text-xs text-aether-muted font-medium mt-1">Daily revenue performance over the last 14 days</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 italic text-[10px] text-aether-muted font-bold">
                                <div className="w-2 h-2 rounded-full bg-cta-blue"></div>
                                Revenue
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:p-6 h-[300px] md:h-[400px]">
                        <DashboardCharts data={chartData} />
                    </div>
                </div>

                {/* Top Selling Products - Elite Sidebar */}
                <div className="aether-card p-4 md:p-8 border-slate-100">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h3 className="text-lg md:text-xl font-display font-black text-aether-primary uppercase tracking-widest">Premier Products</h3>
                        <Link href="/admin/products" className="text-[10px] font-black uppercase text-cta-blue hover:underline">View All</Link>
                    </div>
                    <TopProductsList products={topProducts} />
                </div>
            </div>

            {/* Bottom Row - Operational Excellence */}
            <div className="grid grid-cols-1 gap-6 md:gap-8">
                <div className="aether-card p-0 border-slate-100 overflow-hidden">
                    <div className="p-4 md:p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
                        <div>
                            <h3 className="text-lg md:text-xl font-display font-black text-aether-primary uppercase tracking-widest">Recent Acquisitions</h3>
                            <p className="text-xs text-aether-muted font-medium mt-1">Real-time order flow and procurement status</p>
                        </div>
                        <Link href="/admin/orders" className="aether-button-secondary py-2 px-4 text-[10px] uppercase font-black w-full sm:w-auto text-center">
                            Order Ledger
                        </Link>
                    </div>
                    <RecentOrdersTable orders={recentOrders} />
                </div>
            </div>
        </div>
    );
}

interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    trend: number;
    label: string;
    color: string;
    bgColor: string;
}

function StatsCard({ title, value, icon: Icon, trend, label, color, bgColor }: StatsCardProps) {
    const isPositive = trend >= 0;

    return (
        <div className="aether-card p-6 md:p-8 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 border-slate-100/80 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${bgColor} rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>

            <div className="flex items-start justify-between relative z-10">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-aether-muted">{title}</p>
                        <h3 className="text-3xl md:text-4xl font-display font-black text-aether-primary leading-tight tracking-tight">{value}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(trend).toFixed(1)}%
                        </div>
                        <span className="text-[10px] font-bold text-aether-muted italic uppercase tracking-wider">{label}</span>
                    </div>
                </div>

                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${bgColor} border-2 border-white flex items-center justify-center ${color} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
            </div>
        </div>
    );
}
