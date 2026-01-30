"use client";

import { useCart } from "@/components/cart/cart-context";
import { AddressFormValues, AddressSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, ArrowRight, ShieldCheck, CreditCard, Wallet, Zap, Sparkles, Lock, CheckCircle2, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { data: session, status } = useSession();
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');

    const form = useForm<AddressFormValues>({
        resolver: zodResolver(AddressSchema),
        defaultValues: {
            fullName: session?.user?.name || "",
            country: "India",
            street: "",
            city: "",
            state: "Delhi",
            zip: "",
            phone: ""
        }
    });

    useEffect(() => {
        if (session?.user?.name) {
            form.setValue("fullName", session.user.name);
        }
    }, [session, form]);

    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("Please login to checkout");
            router.push("/api/auth/signin?callbackUrl=/checkout");
        }
    }, [status, router]);

    // If cart is empty, redirect or show message
    useEffect(() => {
        if (items.length === 0) {
            const timer = setTimeout(() => router.push('/shop'), 3000);
            return () => clearTimeout(timer);
        }
    }, [items, router]);

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F5F9]">
                <Loader2 className="w-10 h-10 animate-spin text-cta-blue mb-4" />
                <h2 className="text-xl font-display font-black text-aether-primary">Redirecting to shop...</h2>
            </div>
        );
    }

    const onSubmit = async (data: AddressFormValues) => {
        setIsProcessing(true);
        try {
            // Map frontend selection to backend enum
            const backendPaymentMethod = (paymentMethod === 'UPI' || paymentMethod === 'CARD') ? 'RAZORPAY' : 'COD';

            // 2. Create Order
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(i => ({
                        productId: i.productId,
                        quantity: i.quantity,
                        price: i.price,
                        hasInstallation: i.hasInstallation,
                        installationCost: i.installationCost
                    })),
                    totalAmount: cartTotal,
                    shippingAddress: data,
                    paymentMethod: backendPaymentMethod,
                    // Pass vehicle type if available in context or form
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to create order");
            }

            const orderData = await res.json();

            // 3. Handle Payment
            if (backendPaymentMethod === "RAZORPAY") {
                if (!window.Razorpay) {
                    // Load script dynamically if not present
                    const script = document.createElement("script");
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.async = true;
                    document.body.appendChild(script);
                    await new Promise((resolve) => (script.onload = resolve));
                }

                const options = {
                    key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                    amount: orderData.amount * 100, // Amount is in currency subunits. Default currency is INR.
                    currency: orderData.currency,
                    name: "KarBhawann",
                    description: "Car Accessories Order",
                    image: "/android-chrome-192x192.png", // Ensure this path is correct
                    order_id: orderData.razorpayOrderId,
                    handler: async function (response: any) {
                        try {
                            const verifyRes = await fetch("/api/orders/verify", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    razorpayOrderId: response.razorpay_order_id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature,
                                }),
                            });

                            const verifyData = await verifyRes.json();

                            if (verifyData.success) {
                                const hasInstallation = items.some(i => i.hasInstallation);
                                toast.success("Payment Successful!");
                                clearCart();
                                router.push(`/success${hasInstallation ? '?installation=true' : ''}`);
                            } else {
                                toast.error("Payment Verification Failed: " + verifyData.error);
                            }
                        } catch (err) {
                            console.error("Verification Error", err);
                            toast.error("Payment verification failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: data.fullName,
                        email: session?.user?.email,
                        contact: data.phone,
                    },
                    notes: {
                        address: `${data.street}, ${data.city}, ${data.state}, ${data.zip}`,
                    },
                    config: {
                        display: {
                            blocks: {
                                // Dynamic block based on selection
                                selected: {
                                    name: paymentMethod === 'UPI' ? "Pay via UPI" : "Pay via Card",
                                    instruments: [
                                        { method: paymentMethod === 'UPI' ? "upi" : "card" }
                                    ]
                                }
                            },
                            sequence: ["block.selected"],
                            preferences: {
                                show_default_blocks: false
                            }
                        }
                    },
                    theme: {
                        color: "#2563EB", // cta-blue
                    },
                    modal: {
                        ondismiss: function () {
                            setIsProcessing(false);
                            toast("Payment cancelled or closed.");
                        }
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response: any) {
                    console.error(response.error);
                    toast.error(`Payment Failed: ${response.error.description}`);
                    setIsProcessing(false);
                });
                rzp1.open();
                return; // Wait for payment header
            }

            // 4. Success for COD
            const hasInstallation = items.some(i => i.hasInstallation);
            toast.success("Order placed! Pay on delivery.");
            clearCart();
            router.push(`/success${hasInstallation ? '?installation=true' : ''}`);

        } catch (error: any) {
            toast.error(error.message || "Order placement failed. Please try again.");
            console.error(error);
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F1F5F9] pt-28 md:pt-40 pb-20 md:pb-32 px-4 md:px-8 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] opacity-60" />
            </div>

            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-16 gap-6">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cta-blue mb-4 block underline underline-offset-8">Final Step</span>
                        <h1 className="text-4xl md:text-7xl heading-luxe tracking-tighter leading-none uppercase">
                            Secure<br />Checkout
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm"
                    >
                        <Lock className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">256-Bit SSL Encrypted</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-[2.5rem] shadow-xl border border-white/50 overflow-hidden relative"
                        >
                            {/* Decorative Top Bar */}
                            <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                            <div className="p-6 md:p-12 space-y-10">
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black font-display text-lg">1</div>
                                            <h2 className="text-2xl font-display font-black text-aether-primary uppercase tracking-widest">Shipping Details</h2>
                                        </div>
                                        <div className="bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-700">Delhi Only Service</span>
                                        </div>
                                    </div>

                                    <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pl-0 md:pl-14">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted ml-2">Full Name</label>
                                                <input
                                                    {...form.register("fullName")}
                                                    placeholder="Enter your name"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cta-blue focus:ring-4 focus:ring-blue-50 transition-all font-sans"
                                                />
                                                {form.formState.errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest px-2 pt-1">{form.formState.errors.fullName.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted ml-2">Phone Number</label>
                                                <input
                                                    {...form.register("phone")}
                                                    placeholder="+91 — — —"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cta-blue focus:ring-4 focus:ring-blue-50 transition-all font-sans"
                                                />
                                                {form.formState.errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest px-2 pt-1">{form.formState.errors.phone.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted ml-2">Street Address</label>
                                            <input
                                                {...form.register("street")}
                                                placeholder="House No., Street Area"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cta-blue focus:ring-4 focus:ring-blue-50 transition-all font-sans"
                                            />
                                            {form.formState.errors.street && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest px-2 pt-1">{form.formState.errors.street.message}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted ml-2">City</label>
                                                <input
                                                    {...form.register("city")}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cta-blue focus:ring-4 focus:ring-blue-50 transition-all font-sans"
                                                />
                                                {form.formState.errors.city && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest px-2 pt-1">{form.formState.errors.city.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted ml-2">State</label>
                                                <input
                                                    {...form.register("state")}
                                                    readOnly
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-black text-slate-500 cursor-not-allowed outline-none font-sans uppercase tracking-widest"
                                                />
                                                {form.formState.errors.state && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest px-2 pt-1">{form.formState.errors.state.message}</p>}
                                            </div>
                                            <div className="space-y-2 col-span-2 lg:col-span-1">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted ml-2">Pincode (Delhi)</label>
                                                <input
                                                    {...form.register("zip")}
                                                    placeholder="110001"
                                                    maxLength={6}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cta-blue focus:ring-4 focus:ring-blue-50 transition-all font-sans"
                                                />
                                                {form.formState.errors.zip && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest px-2 pt-1">{form.formState.errors.zip.message}</p>}
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="space-y-6 pt-8 border-t border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black font-display text-lg">2</div>
                                        <h2 className="text-2xl font-display font-black text-aether-primary uppercase tracking-widest">Payment Method</h2>
                                    </div>

                                    <div className="pl-0 md:pl-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* UPI Option */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('UPI')}
                                            className={`relative p-6 rounded-2xl border-2 transition-all flex flex-col gap-4 text-left ${paymentMethod === 'UPI' ? 'border-cta-blue bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className={`p-2 rounded-xl ${paymentMethod === 'UPI' ? 'bg-cta-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    <Wallet className="w-5 h-5" />
                                                </div>
                                                {paymentMethod === 'UPI' && (
                                                    <div className="w-5 h-5 rounded-full bg-cta-blue flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-aether-primary">UPI Payment</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-cta-blue mt-1 mb-2">GooglePay / PhonePe</p>
                                                <div className="flex -space-x-2">
                                                    {/* Google Pay */}
                                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-10">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="w-5 h-5 object-contain" />
                                                    </div>
                                                    {/* PhonePe */}
                                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-20">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="w-5 h-5 object-contain" />
                                                    </div>
                                                    {/* Paytm */}
                                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-30">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="w-5 h-5 object-contain" />
                                                    </div>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Card Option */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('CARD')}
                                            className={`relative p-6 rounded-2xl border-2 transition-all flex flex-col gap-4 text-left ${paymentMethod === 'CARD' ? 'border-cta-blue bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className={`p-2 rounded-xl ${paymentMethod === 'CARD' ? 'bg-cta-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    <CreditCard className="w-5 h-5" />
                                                </div>
                                                {paymentMethod === 'CARD' && (
                                                    <div className="w-5 h-5 rounded-full bg-cta-blue flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-aether-primary">Card Payment</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-cta-blue mt-1 mb-2">Credit / Debit</p>
                                                <div className="flex -space-x-2">
                                                    {/* Visa */}
                                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-10">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="w-5 h-3 object-contain" />
                                                    </div>
                                                    {/* Mastercard */}
                                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-20">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="w-5 h-5 object-contain" />
                                                    </div>
                                                    {/* RuPay */}
                                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-30">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png" alt="RuPay" className="w-6 h-4 object-contain" />
                                                    </div>
                                                </div>
                                            </div>
                                        </button>

                                        {/* COD Option */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('COD')}
                                            className={`relative p-6 rounded-2xl border-2 transition-all flex flex-col gap-4 text-left ${paymentMethod === 'COD' ? 'border-slate-900 bg-slate-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className={`p-2 rounded-xl ${paymentMethod === 'COD' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    <Truck className="w-5 h-5" />
                                                </div>
                                                {paymentMethod === 'COD' && (
                                                    <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-aether-primary">Cash On Delivery</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 mb-2">Pay at doorstep</p>
                                                <div className="h-8 flex items-center">
                                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                                        <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                        <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wide">Dehli Only</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Small Info box based on selection */}
                                    <div className="pl-0 md:pl-14">
                                        <AnimatePresence mode="wait">
                                            {paymentMethod !== 'COD' ? (
                                                <motion.div
                                                    key="online-info"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-[10px] font-bold text-cta-blue flex items-center gap-3"
                                                >
                                                    <ShieldCheck className="w-4 h-4" />
                                                    <p>Securely processed by Razorpay. {paymentMethod === 'UPI' ? 'Enter UPI ID on next screen.' : 'Card details are encrypted.'}</p>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="cod-info"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 flex items-center gap-3"
                                                >
                                                    <Truck className="w-4 h-4" />
                                                    <p>Please keep exact change ready. A verification call might be made before dispatch.</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Summary Card */}
                            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white p-6 md:p-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />

                                <h3 className="text-xl font-display font-black text-aether-primary uppercase tracking-widest mb-8">Order Summary</h3>

                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-8">
                                    {items.map(item => (
                                        <div key={item.productId} className="flex gap-4 items-start group">
                                            <div className="relative w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[8px]">NO IMG</div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-slate-900 truncate group-hover:text-cta-blue transition-colors">{item.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className="text-[10px] font-black uppercase text-slate-400">Qty: {item.quantity}</p>
                                                    {item.hasInstallation && (
                                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold uppercase tracking-wider">
                                                            + Install
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black font-display text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                                                {item.hasInstallation && item.installationCost && (
                                                    <p className="text-[9px] text-emerald-600 font-bold">+{formatPrice(item.installationCost * item.quantity)}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Subtotal</span>
                                        <span className="font-bold text-slate-900">{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Shipping</span>
                                        <span className="font-bold text-emerald-500 uppercase">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium">Taxes</span>
                                        <span className="font-bold text-slate-900 text-xs text-right">Inclusive</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-dashed border-slate-200">
                                    <div className="flex justify-between items-end mb-6">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Amount</span>
                                        <span className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                                            {formatPrice(cartTotal)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={form.handleSubmit(onSubmit)}
                                        disabled={isProcessing}
                                        className={`w-full relative overflow-hidden group rounded-2xl py-5 transition-all hover:scale-[0.98] active:scale-95 disabled:opacity-70 disabled:pointer-events-none ${paymentMethod === 'COD' ? 'bg-slate-900' : 'bg-cta-blue'} text-white`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em]">
                                            {isProcessing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    {paymentMethod === 'COD' ? 'Place COD Order' : (paymentMethod === 'UPI' ? 'Pay via UPI' : 'Pay via Card')} <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>

                                {/* Trust Badges */}
                                <div className="mt-8 grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-slate-100">
                                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                        <div className="text-[9px] leading-tight">
                                            <span className="block font-black uppercase text-slate-700">Secure</span>
                                            <span className="block text-slate-400 font-medium">Protocol</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-slate-100">
                                        <Zap className="w-5 h-5 text-amber-500" />
                                        <div className="text-[9px] leading-tight">
                                            <span className="block font-black uppercase text-slate-700">Instant</span>
                                            <span className="block text-slate-400 font-medium">Confirmation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
