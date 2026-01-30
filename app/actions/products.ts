
"use server";

import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCategoryLineage } from "@/lib/categories";


const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    discountPrice: z.coerce.number().min(0).optional(),
    category: z.string().min(1, "Category is required"),
    subCategory: z.string().optional(),
    subSubCategory: z.string().optional(),
    stock: z.coerce.number().min(0, "Stock must be positive"),
    sku: z.string().optional(),
    featured: z.coerce.boolean().optional(),
    isNewArrival: z.coerce.boolean().optional(),
    isBestSeller: z.coerce.boolean().optional(),
    isTopChoice: z.coerce.boolean().optional(),
    status: z.enum(["draft", "active", "archived"]).default("active"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    tags: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    specifications: z.record(z.string(), z.string()).optional(),
    colors: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    compatibility: z.array(z.object({
        make: z.string(),
        model: z.string(),
        years: z.array(z.string()).optional()
    })).optional(),
    isUniversal: z.boolean().default(false),
    installationOverride: z.object({
        isAvailable: z.boolean(),
        flatRate: z.number().optional(),
        segmentRates: z.record(z.string(), z.number()).optional()
    }).optional(),
});

export async function createProduct(prevState: { message: string; success: boolean }, formData: FormData) {
    try {
        await connectDB();

        const images = formData.getAll("images") as string[];

        // Helper to parse comma-separated strings to arrays
        const toArray = (name: string) => {
            const val = formData.get(name) as string;
            return val ? val.split(",").map(v => v.trim()).filter(Boolean) : [];
        };

        const rawData = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            discountPrice: formData.get("discountPrice") || undefined,
            category: formData.get("category"),
            subCategory: formData.get("subCategory") || undefined,
            subSubCategory: formData.get("subSubCategory") || undefined,
            stock: formData.get("stock"),
            sku: formData.get("sku") || undefined,
            featured: formData.get("featured") === "on",
            isNewArrival: formData.get("isNewArrival") === "on",
            isBestSeller: formData.get("isBestSeller") === "on",
            isTopChoice: formData.get("isTopChoice") === "on",
            status: formData.get("status") || "active",
            images: images,
            tags: toArray("tags"),
            highlights: toArray("highlights"),
            colors: toArray("colors"),
            sizes: toArray("sizes"),
            metaTitle: formData.get("metaTitle") || undefined,
            metaDescription: formData.get("metaDescription") || undefined,
            specifications: formData.get("specifications")
                ? (JSON.parse(formData.get("specifications") as string) as Record<string, string>)
                : {},
            compatibility: formData.get("compatibility")
                ? JSON.parse(formData.get("compatibility") as string)
                : [],
            isUniversal: formData.get("isUniversal") === "on" || formData.get("isUniversal") === "true",
            installationOverride: (formData.get("installationPossible") === "on" || formData.get("installationPossible") === null) // Default true if not present? No, checkbox sends "on" or nothing.
                ? (formData.get("installationFlatRate")
                    ? { isAvailable: true, flatRate: Number(formData.get("installationFlatRate")) }
                    : undefined) // If default (available but no flat rate), usually undefined is fine if schema allows optional. 
                : { isAvailable: false } // Explicitly unavailable
        };

        // Better logic:
        // Check "installationPossible": if not "on", then isAvailable: false.
        // If "on", check "installationFlatRate": if present, set flatRate. 
        // If "on" and no flatRate, leave undefined -> backend uses category default.

        // Wait, my form checkbox `defaultChecked={true}`. If unchecked, it sends nothing.
        // So checking `=== 'on'` works.

        const installPossible = formData.get("installationPossible") === "on";
        const installFlat = formData.get("installationFlatRate");

        let installOverride = undefined;
        if (!installPossible) {
            installOverride = { isAvailable: false };
        } else if (installFlat) {
            installOverride = { isAvailable: true, flatRate: Number(installFlat) };
        }

        // Inject into rawData
        // @ts-ignore
        rawData.installationOverride = installOverride;

        const validatedData = ProductSchema.parse(rawData);

        await Product.create(validatedData);

        revalidatePath("/admin/products");
        revalidatePath("/shop");

        return { success: true, message: "Product created successfully" };
    } catch (error) {
        console.error("Create Product Error:", error);
        return { success: false, message: "Failed to create product" };
    }
}

export async function updateProduct(id: string, prevState: { message: string; success: boolean }, formData: FormData) {
    try {
        await connectDB();

        const images = formData.getAll("images") as string[];

        const toArray = (name: string) => {
            const val = formData.get(name) as string;
            return val ? val.split(",").map(v => v.trim()).filter(Boolean) : [];
        };

        const rawData = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            discountPrice: formData.get("discountPrice") || undefined,
            category: formData.get("category"),
            subCategory: formData.get("subCategory") || undefined,
            subSubCategory: formData.get("subSubCategory") || undefined,
            stock: formData.get("stock"),
            sku: formData.get("sku") || undefined,
            featured: formData.get("featured") === "on",
            isNewArrival: formData.get("isNewArrival") === "on",
            isBestSeller: formData.get("isBestSeller") === "on",
            isTopChoice: formData.get("isTopChoice") === "on",
            status: formData.get("status") || "active",
            images: images,
            tags: toArray("tags"),
            highlights: toArray("highlights"),
            colors: toArray("colors"),
            sizes: toArray("sizes"),
            metaTitle: formData.get("metaTitle") || undefined,
            metaDescription: formData.get("metaDescription") || undefined,
            specifications: formData.get("specifications")
                ? (JSON.parse(formData.get("specifications") as string) as Record<string, string>)
                : {},
            compatibility: formData.get("compatibility")
                ? JSON.parse(formData.get("compatibility") as string)
                : [],
            isUniversal: formData.get("isUniversal") === "on" || formData.get("isUniversal") === "true",
            installationOverride: (formData.get("installationPossible") === "on" || formData.get("installationPossible") === null)
                ? (formData.get("installationFlatRate")
                    ? { isAvailable: true, flatRate: Number(formData.get("installationFlatRate")) }
                    : undefined)
                : { isAvailable: false }
        };

        const installPossible = formData.get("installationPossible") === "on";
        const installFlat = formData.get("installationFlatRate");

        let installOverride = undefined;
        if (!installPossible) {
            installOverride = { isAvailable: false };
        } else if (installFlat) {
            installOverride = { isAvailable: true, flatRate: Number(installFlat) };
        }

        // Inject into rawData
        // @ts-ignore
        rawData.installationOverride = installOverride;

        const validatedData = ProductSchema.parse(rawData);

        await Product.findByIdAndUpdate(id, validatedData);

        revalidatePath("/admin/products");
        revalidatePath("/shop");
        revalidatePath(`/shop/${id}`);

        return { success: true, message: "Product updated successfully" };
    } catch (error) {
        console.error("Update Product Error:", error);
        return { success: false, message: "Failed to update product" };
    }
}

export async function deleteProduct(id: string, formData: FormData) {
    try {
        await connectDB();
        await Product.findByIdAndDelete(id);
        revalidatePath("/admin/products");
        revalidatePath("/shop");
    } catch (error) {
        console.error("Failed to delete product:", error);
        // You could throw an error here if you want to show user feedback
    }
}

export async function migrateProductCategories(formData: FormData) {
    try {
        await connectDB();
        const products = await Product.find({});
        let updatedCount = 0;

        for (const product of products) {
            const lineage = getCategoryLineage(product.category);

            if (lineage) {
                await Product.findByIdAndUpdate(product._id, {
                    category: lineage.category,
                    subCategory: lineage.subCategory || undefined,
                    subSubCategory: lineage.subSubCategory || undefined
                });
                updatedCount++;
            }
        }

        revalidatePath("/admin/products");
        revalidatePath("/shop");
    } catch (error) {
        console.error("Migration Error:", error);
    }
}



export async function searchProducts(query: string) {
    try {
        await connectDB();

        if (!query || query.trim().length === 0) return [];

        const searchRegex = new RegExp(query.trim(), 'i');

        const products = await Product.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex }, // Search in description too
                { category: searchRegex },
                { subCategory: searchRegex },
                { subSubCategory: searchRegex },
                { tags: { $in: [searchRegex] } },
                { colors: { $in: [searchRegex] } },
                // searching specifications values might be heavy but useful
                { "specifications.value": searchRegex }
            ],
            status: 'active'
        })
            .select('_id name slug price discountPrice images category subCategory')
            .limit(20)
            .lean();

        // Transform for client usage
        return products.map(p => ({
            _id: p._id.toString(),
            name: p.name,
            slug: p.slug,
            price: p.price,
            discountPrice: p.discountPrice,
            image: p.images?.[0] || '/placeholder.png', // valid image helper
            category: p.category,
            subCategory: p.subCategory
        }));

    } catch (error) {
        console.error("Search Error:", error);
        return [];
    }
}
