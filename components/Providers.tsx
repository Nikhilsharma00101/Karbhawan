"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { CartProvider } from "./cart/cart-context";
import { WishlistProvider } from "./wishlist/wishlist-context";
import { GarageProvider } from "@/components/shop/GarageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CartProvider>
                <WishlistProvider>
                    <GarageProvider>
                        {children}
                        <Toaster
                            position="top-center"
                            theme="light"
                            expand={false}
                            toastOptions={{
                                style: {
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(226, 232, 240, 0.6)',
                                    borderRadius: '24px',
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03)',
                                    fontSize: '10px',
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: '#0F172A',
                                    padding: '16px 24px',
                                    fontFamily: 'inherit'
                                }
                            }}
                        />
                    </GarageProvider>
                </WishlistProvider>
            </CartProvider>
        </SessionProvider>
    );
}
