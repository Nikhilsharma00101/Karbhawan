"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, ProductType } from "@/types";
import { toast } from "sonner";

interface CartContextType {
    items: CartItem[];
    addToCart: (product: ProductType, quantity: number, options?: { hasInstallation?: boolean, installationCost?: number }) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

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

    const addToCart = (product: ProductType, quantity: number, options?: { hasInstallation?: boolean, installationCost?: number }) => {
        const hasDiscount = !!(product.discountPrice && product.discountPrice < product.price);
        const finalPrice = hasDiscount ? product.discountPrice! : product.price;
        const originalPriceValue = hasDiscount ? product.price : undefined;

        setItems((prev) => {
            // Check if item exists with SAME installation options
            const existing = prev.find((i) => i.productId === product._id && i.hasInstallation === options?.hasInstallation);

            if (existing) {
                return prev.map((i) =>
                    (i.productId === product._id && i.hasInstallation === options?.hasInstallation)
                        ? {
                            ...i,
                            quantity: i.quantity + quantity,
                            price: finalPrice,
                            originalPrice: originalPriceValue,
                            // Update cost if changed (optional logic)
                            installationCost: options?.installationCost ?? i.installationCost
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
                    installationCost: options?.installationCost
                },
            ];
        });
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
            value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}
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
