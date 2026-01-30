import { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://karbhawan.com";

    // Static routes
    const staticRoutes = [
        "",
        "/shop",
        "/installation",
        "/about",
        "/contact",
        "/return-policy",
        "/shipping-policy",
        "/privacy-policy",
        "/terms-and-conditions",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    try {
        await connectDB();
        const products = await Product.find({ status: "active" }).select("slug updatedAt");

        const productRoutes = products.map((product) => ({
            url: `${baseUrl}/shop/${product.slug}`,
            lastModified: product.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        }));

        return [...staticRoutes, ...productRoutes];
    } catch (error) {
        console.error("Sitemap generation error:", error);
        return staticRoutes;
    }
}
