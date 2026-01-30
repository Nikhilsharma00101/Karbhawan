"use client";

import Link from "next/link";
import {
    Instagram, Twitter, Linkedin, Facebook, Youtube,
    Mail, Phone, MapPin, ArrowUp,
    ShieldCheck, CreditCard, Truck, RefreshCcw,
    Sparkles, Send, Diamond
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const footerLinks = [
    {
        title: "Product Categories",
        links: [
            { label: "Interior Accessories", href: "/shop?category=interior-accessories" },
            { label: "Exterior Accessories", href: "/shop?category=exterior-accessories" },
            { label: "Car Electronics", href: "/shop?category=car-electronics" },
            { label: "Car Care & Tools", href: "/shop?category=car-care-tools" },
            { label: "Lifestyle & Gifts", href: "/shop?category=lifestyle-apparel" },
        ]
    },
    {
        title: "Our Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Our Partners", href: "/about#partnerships" },
            { label: "Track Order", href: "/orders" },
            { label: "Contact Us", href: "/contact" },
            { label: "Visit Our Store", href: "/contact" },
        ]
    },
    {
        title: "Customer Support",
        links: [
            { label: "Shipping Policy", href: "/shipping-policy" },
            { label: "Return Policy", href: "/return-policy" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms-and-conditions" },
            { label: "Payment Security", href: "/payment-security" },
        ]
    }
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative z-50 bg-slate-950 border-t border-white/[0.05] overflow-hidden">
            {/* --- ATMOSPHERIC ELEMENTS --- */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* --- TOP SECTION: NEWSLETTER & TRUST --- */}
                <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-b border-white/[0.05]">
                    <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3"
                            >
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-400">Join Our Community</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none"
                            >
                                Get the Latest <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Updates</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-400 text-sm font-medium max-w-md leading-relaxed"
                            >
                                Subscribe to get exclusive early access to our luxury car accessories and new collections.
                            </motion.p>
                        </div>

                        <motion.form
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 max-w-xl"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="relative flex-1 group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-bold placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all"
                                />
                            </div>
                            <Button variant="luxury" size="lg" className="h-16 px-10 group">
                                Subscribe
                                <Send className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </motion.form>
                    </div>

                    <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-8">
                        <TrustItem
                            icon={<ShieldCheck className="w-6 h-6" />}
                            title="Certified Quality"
                            desc="Premium car products"
                        />
                        <TrustItem
                            icon={<Truck className="w-6 h-6" />}
                            title="Delhi Wide Delivery"
                            desc="Fast doorstep shipping"
                        />
                        <TrustItem
                            icon={<RefreshCcw className="w-6 h-6" />}
                            title="Same-Time Return"
                            desc="Instant return at delivery"
                        />
                        <TrustItem
                            icon={<CreditCard className="w-6 h-6" />}
                            title="100% Secure"
                            desc="Safe online payments"
                        />
                    </div>
                </div>

                {/* --- MAIN LINKS SECTION --- */}
                <div className="py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Brand Meta */}
                    <div className="lg:col-span-4 space-y-10">
                        <Link href="/" className="flex flex-col group max-w-fit">
                            <div className="h-8 md:h-10 overflow-hidden flex items-center justify-start">
                                <img
                                    src="/logo.png"
                                    alt="Karbhawan Logo"
                                    className="h-[180%] md:h-[220%] w-auto object-contain transition-transform duration-700 group-hover:scale-110 scale-[1.2] origin-left -translate-y-0.5 hue-rotate-[190deg] saturate-[2] brightness-[1.2]"
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="h-[1px] w-4 bg-indigo-500/50"></span>
                                <span className="text-[9px] text-white/40 uppercase tracking-[0.5em] font-black group-hover:text-indigo-400 transition-colors">Delhi's Finest Auto Store</span>
                            </div>
                        </Link>

                        <div className="space-y-6">
                            <ContactItem
                                icon={<MapPin className="w-4 h-4" />}
                                text="2/40 Roop Nagar, Bhagat Singh Chowk, Delhi 110007"
                                href="https://maps.google.com/?q=2/40+Roop+Nagar,+Bhagat+Singh+Chowk,+Delhi+110007"
                            />
                            <ContactItem
                                icon={<Mail className="w-4 h-4" />}
                                text="itskarbhawan2002@gmail.com"
                                href="mailto:itskarbhawan2002@gmail.com"
                            />
                            <ContactItem
                                icon={<Phone className="w-4 h-4" />}
                                text="+91 98765 43210"
                                href="tel:+919876543210"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            {[
                                { icon: Instagram, href: "https://www.instagram.com/karbhawan_2002?igsh=aTh6NHN3cnpoMWFl", label: "Instagram", color: "hover:text-pink-500" },
                                { icon: Facebook, href: "https://www.facebook.com/share/1CTWxaBNVW/", label: "Facebook", color: "hover:text-blue-600" },
                                { icon: Twitter, href: "https://x.com/Kar_Bhawan2002?t=FfHwVhssoLJLdOL9nmnoTg&s=09", label: "Twitter", color: "hover:text-sky-400" },
                                { icon: Youtube, href: "https://youtube.com/@karbhawan?si=g83_qVvHZnrhVPj5", label: "Youtube", color: "hover:text-red-600" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group ${social.color}`}
                                >
                                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-16">
                        {footerLinks.map((column, i) => (
                            <div key={i} className="space-y-8">
                                <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                                    {column.title}
                                </h4>
                                <ul className="space-y-4">
                                    {column.links.map((link, j) => (
                                        <li key={j}>
                                            <Link
                                                href={link.href}
                                                className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group"
                                            >
                                                <div className="w-0 h-[1px] bg-indigo-500 group-hover:w-3 transition-all duration-300" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="py-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-2 md:order-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                            &copy; {new Date().getFullYear()} Karbhawan Automotive. All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-2">
                            <Diamond className="w-3 h-3 text-indigo-500/50" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Delhi's Trusted Choice</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 order-1 md:order-2">
                        <div className="flex items-center gap-4 px-6 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mr-2">Secured By</span>
                            <div className="flex gap-6 items-center opacity-90 hover:opacity-100 transition-all duration-500 h-4">
                                <span className="text-[10px] font-black italic tracking-tighter text-[#4D5DFF] drop-shadow-[0_0_8px_rgba(77,93,255,0.4)]">VISA</span>
                                <div className="flex items-center -gap-1 drop-shadow-[0_0_8px_rgba(235,0,27,0.3)]">
                                    <div className="w-3 h-3 rounded-full bg-[#EB001B] -mr-1" />
                                    <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-80" />
                                    <span className="text-[8px] font-bold text-white ml-1">MC</span>
                                </div>
                                <span className="text-[10px] font-black tracking-widest text-white border-[1.5px] border-white/40 px-1 rounded-sm flex items-center gap-0.5 shadow-[0_0_10px_rgba(255,255,255,0.15)]">
                                    <span className="text-indigo-400">U</span>PI
                                </span>
                                <span className="text-[9px] font-bold text-[#2E9AFF] tracking-tighter drop-shadow-[0_0_8px_rgba(46,154,255,0.4)]">AMEX</span>
                            </div>
                        </div>

                        {/* Back To Top */}
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-indigo-400 transition-colors cursor-pointer"
                        >
                            Back To Top
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-indigo-400 group-hover:-translate-y-1 transition-all">
                                <ArrowUp className="w-3 h-3" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Side Element */}
            <div className="absolute bottom-0 right-0 p-8 hidden xl:block opacity-[0.02] select-none pointer-events-none">
                <span className="text-[200px] font-display font-black leading-none uppercase -mb-20">DELHI</span>
            </div>
        </footer>
    );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="group space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all duration-500">
                {icon}
            </div>
            <div className="space-y-1">
                <h4 className="text-white text-[10px] font-black uppercase tracking-widest">{title}</h4>
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider leading-none">{desc}</p>
            </div>
        </div>
    );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode, text: string, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group cursor-pointer"
        >
            <div className="mt-0.5 text-slate-400 group-hover:text-indigo-400 transition-colors">
                {icon}
            </div>
            <span className="text-slate-300 text-xs font-bold leading-relaxed group-hover:text-white transition-colors">
                {text}
            </span>
        </a>
    );
}
