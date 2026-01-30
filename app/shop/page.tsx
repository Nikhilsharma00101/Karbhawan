import ProductCard from "@/components/shop/ProductCard";
import Product from "@/models/Product";
import connectDB from "@/lib/db";
import { ProductType } from "@/types";
import { categories, getAllChildSlugs, flattenCategories } from "@/lib/categories";
import Link from "next/link";
import ShopClientWrapper from "@/components/shop/ShopClientWrapper";
import ShopBackground from "@/components/shop/ShopBackground";


async function getProducts(categorySlug?: string, minPrice?: string, maxPrice?: string, make?: string, model?: string) {
    try {
        await connectDB();

        // Build query
        let query: any = {};
        if (categorySlug) {
            // Get all child slugs (recursive) to include products in sub-categories
            const allSlugs = getAllChildSlugs(categorySlug);

            // Query across all category levels to ensure a sub-category slug 
            // matches products regardless of which level it was assigned to
            query.$or = [
                { category: { $in: allSlugs } },
                { subCategory: { $in: allSlugs } },
                { subSubCategory: { $in: allSlugs } }
            ];
        }

        // Apply Price Filtering
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Apply Vehicle Compatibility
        if (make || model) {
            let carMatch: any = {};
            if (make) carMatch["compatibility.make"] = make;
            if (model) carMatch["compatibility.model"] = model;

            const carOrUniversal = {
                $or: [
                    { isUniversal: true },
                    carMatch
                ]
            };

            if (query.$or) {
                const categoryMatch = { $or: query.$or };
                delete query.$or;
                query.$and = [categoryMatch, carOrUniversal];
            } else {
                query.$or = carOrUniversal.$or;
            }
        }

        const products = await Product.find(query).sort({ createdAt: -1 }).lean();

        if (products.length === 0 && !categorySlug && !minPrice && !maxPrice && !make && !model) return [];



        return products.map(p => ({
            ...p,
            _id: p._id.toString(),
            createdAt: p.createdAt?.toISOString(),
            updatedAt: p.updatedAt?.toISOString()
        })) as unknown as ProductType[];
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export default async function ShopPage({ searchParams }: { searchParams: { category?: string, minPrice?: string, maxPrice?: string, make?: string, model?: string } }) {
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const currentCategory = resolvedSearchParams.category;
    const minPrice = resolvedSearchParams.minPrice;
    const maxPrice = resolvedSearchParams.maxPrice;
    const make = resolvedSearchParams.make;
    const model = resolvedSearchParams.model;
    const products = await getProducts(currentCategory, minPrice, maxPrice, make, model);

    return (
        <div className="relative min-h-screen bg-[#FDFDFF]">
            {/* --- PREMIUM ATMOSPHERIC BACKGROUND SYSTEM --- */}
            <ShopBackground />

            <div className="container relative px-4 md:px-6 pt-[240px] pb-32 mx-auto">
                <ShopClientWrapper currentCategory={currentCategory}>
                    {/* --- REFINED HEADER SECTION --- */}
                    <div className="relative mb-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-4 flex-1 max-w-2xl">
                                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-1000">
                                    <div className="h-[1.5px] w-8 bg-cta-blue" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Premium Accessories</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight tracking-tight">
                                    {currentCategory ? (
                                        <span className="capitalize">
                                            {flattenCategories(categories).find((c: { slug: string }) => c.slug === currentCategory)?.label.split(' > ').pop() || currentCategory.replace(/-/g, ' ')}
                                        </span>
                                    ) : (
                                        <>
                                            Explore Our <span className="text-cta-blue">Catalog</span>
                                        </>
                                    )}
                                </h1>

                                <p className="text-base text-slate-500 font-medium max-w-lg leading-relaxed animate-in fade-in duration-1000 delay-300">
                                    {currentCategory
                                        ? `Quality components for ${flattenCategories(categories).find((c: { slug: string }) => c.slug === currentCategory)?.label.split(' > ').pop() || currentCategory.replace(/-/g, ' ')} to upgrade your ride.`
                                        : "Find the perfect parts and accessories to make your car stand out."}
                                </p>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-4 animate-in fade-in slide-in-from-right duration-1000">
                                <div className="px-6 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cta-blue animate-ping absolute inset-0" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-cta-blue relative z-10" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900 leading-none">{products.length} Items</span>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subtle Separator */}
                        <div className="absolute -bottom-8 left-0 right-0 h-px bg-slate-100" />
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-24">
                            {products.map((product, index) => (
                                <ProductCard key={product._id ? String(product._id) : `p-${index}`} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] border border-slate-200 bg-white shadow-sm overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

                            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                                <span className="text-3xl">⚠️</span>
                            </div>

                            <p className="text-xl font-display font-bold text-slate-900 mb-3 uppercase tracking-widest px-8 text-center">No Results Found</p>
                            <p className="text-slate-500 text-base mb-10 max-w-sm text-center leading-relaxed">System could not locate any components matching your criteria.</p>

                            {(currentCategory || minPrice || maxPrice || make || model) && (
                                <Link href="/shop">
                                    <button className="px-8 py-3 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-sky-600 transition-colors shadow-lg">
                                        Reset Filters
                                    </button>
                                </Link>
                            )}
                        </div>
                    )}
                </ShopClientWrapper>
            </div>
        </div>
    );
}
