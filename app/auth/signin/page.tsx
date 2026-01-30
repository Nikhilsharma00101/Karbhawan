"use client";

import { signIn } from "next-auth/react";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Mail, Loader2, ArrowLeft, Clock, Sparkles, ShieldCheck, Fingerprint, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SignInContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams?.get("callbackUrl") || "/";

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [step, setStep] = useState<"email" | "otp">("email");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const errorParam = searchParams?.get("error");

    // Countdown timer
    useEffect(() => {
        if (step === "otp" && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to send OTP");
                setIsLoading(false);
                return;
            }

            setStep("otp");
            setTimeLeft(600);
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all filled
        if (index === 5 && value && newOtp.every((digit) => digit)) {
            handleVerifyOTP(newOtp.join(""));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async (code?: string) => {
        const otpCode = code || otp.join("");
        if (otpCode.length !== 6) {
            setError("Please enter all 6 digits");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: otpCode }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid OTP");
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
                setIsLoading(false);
                return;
            }

            // Sign in with credentials after verification
            const result = await signIn("credentials", {
                email,
                redirect: false,
            });

            if (result?.error) {
                router.push(callbackUrl);
            } else {
                router.push(callbackUrl);
            }
        } catch {
            setError("Network error. Please try again.");
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setOtp(["", "", "", "", "", ""]);
        setError("");
        const syntheticEvent = {
            preventDefault: () => { },
        } as React.FormEvent;
        await handleSendOTP(syntheticEvent);
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await signIn("google", { callbackUrl });
        } catch (error) {
            console.error("Google sign-in error:", error);
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 pt-[220px] pb-20 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
            {/* --- IMMERSIVE BACKGROUND --- */}
            <div className="fixed inset-0 bg-[#F8FAFC] z-0">
                {/* Dynamic Aurora Orbs */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-100/50 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/40 rounded-full blur-[100px]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,1)_80%)]" />
            </div>

            {/* --- CONTENT ARCHITECTURE --- */}
            <div className="relative z-10 w-full max-w-[480px]">
                {/* Back to Home Link */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex justify-center"
                >
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-cta-blue transition-colors px-6 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-100/50 cursor-pointer"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Back To Store
                    </Link>
                </motion.div>

                {/* Main Glass Shell */}
                <div className="glass-panel p-1 rounded-[2.5rem] bg-white border-white shadow-2xl overflow-hidden group">
                    <div className="p-8 md:p-12 space-y-10 relative">
                        {/* Status / Indicator */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cta-blue/20 blur-xl rounded-full" />
                                <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-cta-blue shadow-lg group-hover:scale-110 transition-transform duration-700">
                                    {step === "email" ? <Fingerprint className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                                </div>
                            </div>
                        </div>

                        {/* Title Section */}
                        <div className="text-center space-y-3">
                            <div className="flex items-center justify-center gap-3">
                                <span className="w-8 h-[2px] bg-cta-blue" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cta-blue">Secure Session</span>
                                <span className="w-8 h-[2px] bg-cta-blue" />
                            </div>
                            <h1 className="heading-luxe text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tighter">
                                {step === "email" ? "Login To" : "Confirm"}
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    {step === "email" ? "Account" : "Identity"}
                                </span>
                            </h1>
                            <p className="text-slate-500 text-xs font-bold tracking-wide max-w-[280px] mx-auto uppercase opacity-60">
                                {step === "email" ? "Enter your details to access your dashboard." : `Enter the 6-digit code sent to your email.`}
                            </p>
                        </div>

                        {/* Transitions Container */}
                        <AnimatePresence mode="wait">
                            {step === "email" ? (
                                <motion.div
                                    key="email-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-8"
                                >
                                    {/* Google Entry */}
                                    <button
                                        onClick={handleGoogleSignIn}
                                        disabled={isGoogleLoading || isLoading}
                                        className="w-full relative group/btn overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:bg-white hover:border-cta-blue/30 hover:shadow-xl hover:shadow-blue-500/5 disabled:opacity-50 cursor-pointer"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-4">
                                            {isGoogleLoading ? (
                                                <Loader2 className="w-5 h-5 animate-spin text-cta-blue" />
                                            ) : (
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                            )}
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Sign in with Google</span>
                                        </div>
                                    </button>

                                    <div className="flex items-center gap-4 py-2">
                                        <div className="h-px flex-1 bg-slate-100" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-300">Or use email</span>
                                        <div className="h-px flex-1 bg-slate-100" />
                                    </div>

                                    {/* Email Form */}
                                    <form onSubmit={handleSendOTP} className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-slate-300 group-focus-within/input:text-cta-blue transition-colors" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    placeholder="you@email.com"
                                                    className="block w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-cta-blue transition-all disabled:opacity-50"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading || !email}
                                            className="w-full h-16 relative group/submit overflow-hidden rounded-2xl bg-slate-950 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:bg-slate-200 cursor-pointer"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/submit:opacity-100 transition-opacity duration-500" />
                                            <div className="relative flex items-center justify-center gap-3">
                                                {isLoading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                                                ) : (
                                                    <>
                                                        <span className="text-white text-[11px] font-black uppercase tracking-[0.3em]">Send OTP Code</span>
                                                        <ChevronRight className="w-4 h-4 text-white/50 group-hover/submit:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="otp-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-8"
                                >
                                    {/* Code Inputs */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center px-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Enter Code</label>
                                            <div className="flex items-center gap-2 text-cta-blue">
                                                <Clock className="w-3 h-3" />
                                                <span className="text-[10px] font-mono font-bold tracking-widest">{formatTime(timeLeft)}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2.5 justify-between">
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    ref={(el) => { inputRefs.current[index] = el; }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    disabled={isLoading || timeLeft === 0}
                                                    className="w-full aspect-square text-center text-xl font-black bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-cta-blue transition-all disabled:opacity-50"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Error Display inside flow */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="p-4 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest leading-relaxed border border-red-100 text-center"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <div className="space-y-4">
                                        <button
                                            onClick={() => handleVerifyOTP()}
                                            disabled={isLoading || otp.some(d => !d) || timeLeft === 0}
                                            className="w-full h-16 relative group/verify overflow-hidden rounded-2xl bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:bg-slate-200 shadow-xl shadow-blue-500/20 cursor-pointer"
                                        >
                                            <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover/verify:opacity-100 transition-opacity duration-500" />
                                            <div className="relative flex items-center justify-center gap-3">
                                                {isLoading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-4 h-4 text-white group-hover/verify:rotate-12 transition-transform" />
                                                        <span className="text-white text-[11px] font-black uppercase tracking-[0.3em]">Verify & Login</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>

                                        <div className="flex justify-between items-center px-2">
                                            <button
                                                onClick={() => {
                                                    setStep("email");
                                                    setOtp(["", "", "", "", "", ""]);
                                                    setError("");
                                                }}
                                                className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                                            >
                                                Change Email
                                            </button>
                                            <button
                                                onClick={handleResendOTP}
                                                disabled={isLoading || timeLeft > 540}
                                                className="text-[9px] font-black uppercase tracking-widest text-cta-blue hover:text-indigo-600 transition-colors disabled:opacity-50 cursor-pointer"
                                            >
                                                Resend Code
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error Param Display */}
                        {errorParam && step === "email" && (
                            <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest text-center">
                                    {errorParam === "OAuthAccountNotLinked"
                                        ? "Email already registered with another provider"
                                        : "Authentication failed. Please try again."}
                                </p>
                            </div>
                        )}

                        {/* Terms Footer */}
                        <div className="pt-4 text-center">
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 leading-relaxed">
                                By signing in, you agree to our <br />
                                <span className="text-slate-400 hover:text-cta-blue cursor-pointer">Terms of Service</span> & <span className="text-slate-400 hover:text-cta-blue cursor-pointer">Privacy Policy</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Brand Seal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity"
                >
                    <img src="/logo.png" alt="Seal" className="h-6 w-auto invert grayscale" />
                    <span className="text-[9px] font-mono font-black text-slate-400 tracking-[0.6em] uppercase">Secure Login System</span>
                </motion.div>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <Loader2 className="w-10 h-10 text-cta-blue animate-spin" />
            </div>
        }>
            <SignInContent />
        </Suspense>
    );
}

