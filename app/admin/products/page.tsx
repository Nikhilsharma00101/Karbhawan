
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { deleteProduct, migrateProductCategories } from "@/app/actions/products";


export const dynamic = "force-dynamic";

interface ProductLean {
    _id: string;
    name: string;
    images: string[];
    price: number;
    stock: number;
    category: string;
    featured?: boolean;
}

export default async function ProductsPage() {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean() as unknown as ProductLean[];

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h2 className="text-5xl heading-luxe text-aether-primary">Products</h2>
                    <p className="text-aether-secondary font-medium italic">Manage your product inventory.</p>
                </div>
                <div className="flex gap-4">
                    <form action={migrateProductCategories}>
                        <button
                            type="submit"
                            className="flex items-center gap-3 bg-white border border-slate-100 text-aether-secondary px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition-all duration-300"
                            title="Sync older products to new 3-tier category hierarchy"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Sync Hierarchy
                        </button>
                    </form>
                    <Link
                        href="/admin/products/new"
                        className="flex items-center gap-3 bg-gradient-to-r from-cta-soft to-cta-blue text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-100/50 hover:scale-[1.02] transition-all duration-300"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Product
                    </Link>
                </div>

            </div>

            {/* Product List */}
            <div className="aether-card rounded-[2.5rem] border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-aether-muted">
                            <th className="p-8 font-black">Product</th>
                            <th className="p-8 font-black">Price</th>
                            <th className="p-8 font-black">Stock</th>
                            <th className="p-8 font-black">Category</th>
                            <th className="p-8 font-black text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="p-8">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white border border-slate-100 flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                            {product.images[0] && (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-aether-primary font-display font-bold text-lg leading-none">{product.name}</p>
                                            {product.featured && (
                                                <span className="text-[9px] font-black uppercase tracking-widest text-cta-blue bg-blue-50 px-2 py-1 rounded-md inline-block">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <span className="text-sm font-bold text-aether-primary font-display">₹{product.price.toLocaleString()}</span>
                                </td>
                                <td className="p-8">
                                    <span className={`text-sm font-bold font-display ${product.stock < 5 ? 'text-red-500' : 'text-aether-primary'}`}>
                                        {product.stock} Units
                                    </span>
                                </td>
                                <td className="p-8">
                                    <span className="capitalize px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-aether-secondary text-[10px] font-black uppercase tracking-widest rounded-full">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-8 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Link
                                            href={`/admin/products/${product._id.toString()}`}
                                            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-cta-blue hover:bg-cta-blue hover:text-white transition-all shadow-sm"
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <form action={deleteProduct.bind(null, product._id.toString())}>
                                            <button
                                                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-20 text-center text-aether-muted italic">
                                    No products found. Start by adding a new product.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
