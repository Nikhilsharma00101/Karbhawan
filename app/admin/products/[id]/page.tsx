
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EditProductForm from "@/app/admin/products/[id]/EditProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id).lean();

    if (!product) {
        return <div className="p-8 text-white">Product not found</div>;
    }

    // Convert to plain object for the client component to avoid serialization errors
    const productData = JSON.parse(JSON.stringify(product));

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/products" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <h2 className="text-2xl font-display font-bold text-white">Edit Product</h2>
            </div>

            <EditProductForm product={productData} />
        </div>
    );
}
