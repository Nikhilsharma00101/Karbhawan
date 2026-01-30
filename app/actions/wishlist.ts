"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

export async function toggleWishlist(productId: string) {
    const session = await auth();

    if (!session || !session.user) {
        return { error: "Please login to manage your wishlist" };
    }

    try {
        await dbConnect();

        // Find or create wishlist
        // Cast query to any to satisfy TS for simple string-to-ObjectId query
        let wishlist = await Wishlist.findOne({ user: session.user.id } as any);

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: session.user.id,
                products: []
            } as any);
        }

        // Check if product exists in wishlist
        // Use loose typing for the findIndex callback to avoid SchemaType vs RuntimeType conflicts
        const productIndex = wishlist.products.findIndex(
            (p: any) => p.toString() === productId
        );

        let isAdded = false;

        if (productIndex > -1) {
            // Remove
            wishlist.products.splice(productIndex, 1);
        } else {
            // Add
            // Mongoose handles string IDs in ref arrays perfectly well at runtime
            wishlist.products.push(productId as any);
            isAdded = true;
        }

        await wishlist.save();
        revalidatePath("/wishlist");

        return { success: true, isAdded };
    } catch (error) {
        console.error("Wishlist error:", error);
        return { error: "Failed to update wishlist" };
    }
}

export async function getWishlist() {
    const session = await auth();

    if (!session || !session.user) {
        return [];
    }

    try {
        await dbConnect();
        // Cast query to any
        const wishlist = await Wishlist.findOne({ user: session.user.id } as any)
            .populate("products")
            .lean();

        if (!wishlist) return [];

        // Filter out null products (in case a product was deleted)
        // Ensure we return plain objects
        const products = (wishlist.products as any[]).filter((p: any) => p !== null);

        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error("Get wishlist error:", error);
        return [];
    }
}
