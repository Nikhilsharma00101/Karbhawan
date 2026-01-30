"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { getWishlist, toggleWishlist } from "@/app/actions/wishlist";
import { toast } from "sonner";
import { ProductType } from "@/types";

interface WishlistContextType {
    items: ProductType[];
    isLoading: boolean;
    isInWishlist: (productId: string) => boolean;
    toggleItem: (product: ProductType) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [items, setItems] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initial fetch when session is available
    useEffect(() => {
        if (session?.user) {
            fetchWishlist();
        } else {
            setItems([]);
        }
    }, [session]);

    const fetchWishlist = async () => {
        setIsLoading(true);
        try {
            const data = await getWishlist();
            // Ensure data is treated as ProductType[]
            setItems(JSON.parse(JSON.stringify(data)));
        } catch (error) {
            console.error("Failed to fetch wishlist", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isInWishlist = (productId: string) => {
        return items.some(item => item._id === productId);
    };

    const toggleItem = async (product: ProductType) => {
        if (!session) {
            toast.error("Please login to save items to your wishlist");
            return;
        }

        // Optimistic update
        const isCurrentlyIn = isInWishlist(product._id);
        let newItems;

        if (isCurrentlyIn) {
            newItems = items.filter(item => item._id !== product._id);
            toast.success("Removed from wishlist");
        } else {
            newItems = [...items, product];
            toast.success("Added to wishlist");
        }

        setItems(newItems);

        // Server update
        const result = await toggleWishlist(product._id);

        if (result.error) {
            // Revert on error
            toast.error(result.error);
            fetchWishlist(); // Sync back to true state
        }
    };

    return (
        <WishlistContext.Provider value={{ items, isLoading, isInWishlist, toggleItem }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
