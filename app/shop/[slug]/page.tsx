import Product from "@/models/Product";
import connectDB from "@/lib/db";
import { ProductType } from "@/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductClient from "./ProductClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    await connectDB();
    try {
        const product = await Product.findOne({ slug }).lean();
        if (!product) return { title: "Product Not Found" };

        return {
            title: product.metaTitle || `${product.name} | Karbhawan`,
            description: product.metaDescription || product.description.slice(0, 160),
            openGraph: {
                images: product.images[0] ? [{ url: product.images[0] }] : [],
            },
        };
    } catch {
        return { title: "Product" };
    }
}

async function getProduct(slug: string) {
    await connectDB();
    try {
        const product = await Product.findOne({ slug }).lean();
        if (!product) return null;

        // Fetch related products (same category, excluding current product)
        const related = await Product.find({
            category: product.category,
            slug: { $ne: slug },
            status: 'active'
        }).limit(4).lean();

        return {
            product: JSON.parse(JSON.stringify(product)) as ProductType,
            relatedProducts: JSON.parse(JSON.stringify(related)) as ProductType[]
        };
    } catch {
        return null;
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getProduct(slug);

    if (!data) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data.product.name,
        image: data.product.images[0] ? [data.product.images[0]] : [],
        description: data.product.metaDescription || data.product.description.slice(0, 160),
        sku: data.product.sku || data.product.slug,
        brand: {
            "@type": "Brand",
            name: "Karbhawan", // Or specific brand if available
        },
        offers: {
            "@type": "Offer",
            url: `https://karbhawan.com/shop/${data.product.slug}`,
            priceCurrency: "INR",
            price: data.product.discountPrice || data.product.price,
            availability: data.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
        },
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://karbhawan.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Shop",
                item: "https://karbhawan.com/shop",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: data.product.category,
                item: `https://karbhawan.com/shop?category=${data.product.category}`,
            },
            {
                "@type": "ListItem",
                position: 4,
                name: data.product.name,
                item: `https://karbhawan.com/shop/${data.product.slug}`,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <ProductClient product={data.product} relatedProducts={data.relatedProducts} />
        </>
    );
}
