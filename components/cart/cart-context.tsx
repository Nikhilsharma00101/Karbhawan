"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, ProductType } from "@/types";
import { toast } from "sonner";

export interface AddToCartOptions {
    hasInstallation?: boolean;
    installationCost?: number;
    selectedVehicle?: {
        make?: string;
        model?: string;
        year?: string;
        fullText?: string;
    };
}

export interface RecentlyAddedItem {
    product: ProductType;
    quantity: number;
    options?: AddToCartOptions;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: ProductType, quantity: number, options?: AddToCartOptions) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    recentlyAddedItem: RecentlyAddedItem | null;
    closeNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [recentlyAddedItem, setRecentlyAddedItem] = useState<RecentlyAddedItem | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    const closeNotification = () => setRecentlyAddedItem(null);

    // Initial load from localStorage
    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem("karbhawan-cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("karbhawan-cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addToCart = (product: ProductType, quantity: number, options?: AddToCartOptions) => {
        const hasDiscount = !!(product.discountPrice && product.discountPrice < product.price);
        const finalPrice = hasDiscount ? product.discountPrice! : product.price;
        const originalPriceValue = hasDiscount ? product.price : undefined;

        const isSameVehicle = (v1?: AddToCartOptions["selectedVehicle"], v2?: AddToCartOptions["selectedVehicle"]) => {
            if (!v1 && !v2) return true;
            if (!v1 || !v2) return false;
            return v1.make === v2.make && v1.model === v2.model && v1.year === v2.year && v1.fullText === v2.fullText;
        };

        setItems((prev) => {
            // Check if item exists with SAME installation options and SAME vehicle
            const existing = prev.find(
                (i) =>
                    i.productId === product._id &&
                    i.hasInstallation === options?.hasInstallation &&
                    isSameVehicle(i.selectedVehicle, options?.selectedVehicle)
            );

            if (existing) {
                return prev.map((i) =>
                    i.productId === product._id &&
                    i.hasInstallation === options?.hasInstallation &&
                    isSameVehicle(i.selectedVehicle, options?.selectedVehicle)
                        ? {
                            ...i,
                            quantity: i.quantity + quantity,
                            price: finalPrice,
                            originalPrice: originalPriceValue,
                            installationCost: options?.installationCost ?? i.installationCost,
                            selectedVehicle: options?.selectedVehicle ?? i.selectedVehicle
                        }
                        : i
                );
            }
            return [
                ...prev,
                {
                    productId: product._id,
                    slug: product.slug,
                    quantity,
                    price: finalPrice,
                    originalPrice: originalPriceValue,
                    name: product.name,
                    image: product.images[0] || "",
                    hasInstallation: options?.hasInstallation,
                    installationCost: options?.installationCost,
                    selectedVehicle: options?.selectedVehicle
                },
            ];
        });

        // Trigger global floating notification modal
        setRecentlyAddedItem({ product, quantity, options });
    };

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
        toast.info("Item removed from cart");
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((total, item) => {
        return total + (item.price * item.quantity) + ((item.hasInstallation && item.installationCost) ? (item.installationCost * item.quantity) : 0);
    }, 0);

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, recentlyAddedItem, closeNotification }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
