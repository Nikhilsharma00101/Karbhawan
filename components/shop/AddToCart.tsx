"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { ProductType } from "@/types";
import { useCart } from "../cart/cart-context";

export default function AddToCart({ product }: { product: ProductType }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`Added ${quantity} x ${product.name} to cart`, {
            description: "Your luxury item is ready for checkout."
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <div className="flex items-center border border-white/20 rounded-lg">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-white/10 transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-white/10 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <span className="text-sm text-gray-400">
                    {product.stock > 0 ? `${product.stock} items in stock` : "Out of Stock"}
                </span>
            </div>

            <div className="flex gap-4">
                <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 h-14 text-base bg-karbhawan-teal text-karbhawan-midnight font-bold hover:bg-karbhawan-teal/90"
                    disabled={product.stock === 0}
                >
                    <ShoppingBag className="mr-2 w-5 h-5" />
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button size="lg" variant="outline" className="h-14 w-14 p-0 border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                </Button>
            </div>
        </div>
    );
}
