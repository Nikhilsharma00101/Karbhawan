"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook, Youtube, Sparkles, MessageSquare, ArrowUpRight, Twitter } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#F1F5F9] selection:bg-blue-100 selection:text-blue-900">
            {/* --- IMMERSIVE BACKGROUND --- */}
            <div className="fixed inset-0 z-0 bg-[#F1F5F9] overflow-hidden">
                {/* Deeper Base Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#EDF2FF_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,#F1F5F9_0%,#E2E8F0_100%)] opacity-50" />

                {/* Muted Aurora Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.4, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-15%] right-[-10%] w-[80vw] h-[80vw] bg-blue-200/20 rounded-full blur-[140px]"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 120, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-25%] left-[-15%] w-[70vw] h-[70vw] bg-indigo-200/15 rounded-full blur-[120px]"
                />

                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* Vignette & Settling Layer */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(241,245,249,0.5)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-transparent to-slate-200/40" />
            </div>

            <div className="relative z-10 pt-[140px] md:pt-[220px] pb-16 md:pb-32">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">

                    {/* --- HEADER SECTION --- */}
                    <header className="mb-12 md:mb-24 text-center space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-4"
                        >
                            <span className="w-8 md:w-12 h-[2px] bg-cta-blue/30" />
                            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-cta-blue">Get In Touch</span>
                            <span className="w-8 md:w-12 h-[2px] bg-cta-blue/30" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="heading-luxe text-4xl md:text-5xl lg:text-8xl uppercase tracking-tighter leading-[0.9]"
                        >
                            We're Here<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                To Help
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-widest max-w-xl mx-auto opacity-60 leading-relaxed px-4"
                        >
                            Have a question or need help with your car? Reach out to us, and our team will get back to you shortly.
                        </motion.p>
                    </header>

                    {/* --- MAIN ARCHITECTURE --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT: INFORMATION CLUSTER */}
                        <div className="lg:col-span-5 space-y-6 md:space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-panel p-2 overflow-hidden border-white/80 group"
                            >
                                <div className="p-6 md:p-10 space-y-8 md:space-y-12 bg-white/40 rounded-[1.8rem]">
                                    <div className="space-y-8 md:space-y-10">
                                        {/* Contact Nodes */}
                                        <ContactNode
                                            icon={<MapPin className="w-5 h-5" />}
                                            label="Our Store"
                                            value="2/40 Roop Nagar, Bhagat Singh Chowk, Delhi 110007"
                                            delay={0.5}
                                        />
                                        <ContactNode
                                            icon={<Mail className="w-5 h-5" />}
                                            label="Email Us"
                                            value={<span className="text-xs md:text-sm font-bold break-all">itskarbhawan2002@gmail.com</span>}
                                            link="mailto:itskarbhawan2002@gmail.com"
                                            delay={0.6}
                                        />
                                        <ContactNode
                                            icon={<Phone className="w-5 h-5" />}
                                            label="Call Us"
                                            value={
                                                <div className="grid grid-cols-1 gap-2 mt-2 w-full max-w-full">
                                                    {["+91 98117 71141", "+91 98117 71143", "+91 99996 66778"].map((num, i) => (
                                                        <a
                                                            key={i}
                                                            href={`tel:${num.replace(/\s/g, '')}`}
                                                            className="group/item relative flex items-center justify-between p-2 md:p-3 pr-3 md:pr-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                            <div className="flex items-center gap-2 md:gap-3 relative z-10 w-full">
                                                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover/item:text-cta-blue group-hover/item:bg-blue-50 transition-colors shrink-0">
                                                                    <Phone className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                                                                </div>
                                                                <span className="text-xs md:text-sm font-bold text-slate-600 group-hover/item:text-slate-900 tracking-wider font-mono transition-colors whitespace-nowrap -ml-[5px] md:ml-0">{num}</span>
                                                            </div>
                                                            <div className="hidden md:block opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-cta-blue relative z-10 shrink-0">
                                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            }
                                            delay={0.7}
                                        />
                                        <ContactNode
                                            icon={<Clock className="w-5 h-5" />}
                                            label="Store Hours"
                                            value="Mon - Sun: 10:00 AM - 06:00 PM"
                                            delay={0.8}
                                        />
                                    </div>

                                    {/* Social Ecosystem */}
                                    <div className="pt-8 md:pt-10 border-t border-slate-200/50">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 md:mb-8 ml-2">Social Media</p>
                                        <div className="flex gap-4">
                                            {[
                                                { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/karbhawan_2002?igsh=aTh6NHN3cnpoMWFl", color: "hover:text-pink-500" },
                                                { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/share/1CTWxaBNVW/", color: "hover:text-blue-600" },
                                                { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/Kar_Bhawan2002?t=FfHwVhssoLJLdOL9nmnoTg&s=09", color: "hover:text-sky-400" },
                                                { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com/@karbhawan?si=g83_qVvHZnrhVPj5", color: "hover:text-red-600" },
                                            ].map((social, i) => (
                                                <motion.a
                                                    key={i}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ y: -5, scale: 1.1 }}
                                                    className={`w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:bg-slate-50 ${social.color}`}
                                                >
                                                    {social.icon}
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Map Preview Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="glass-panel p-2 h-[250px] md:h-[300px] overflow-hidden group border-white/80"
                            >
                                <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                                    <iframe
                                        title="Karbhawan Location"
                                        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d112005.96197153459!2d77.1166407949618!3d28.68407284958682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390cfd8921b1a17f%3A0x21dc0dc4cdaabf01!2s2%2F40%2C%20Block%202%2C%20Roop%20Nagar%2C%20Delhi%2C%20110007!3m2!1d28.684113399999998!2d77.1990309!5e0!3m2!1sen!2sin!4v1754050158806!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 rounded-[1.8rem]" />
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT: CONTACT FORM */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="lg:col-span-7"
                        >
                            <div className="glass-panel p-2 border-white/80">
                                <div className="p-6 md:p-10 lg:p-16 space-y-8 md:space-y-12 bg-white/40 rounded-[1.8rem]">
                                    <div className="space-y-2 md:space-y-4">
                                        <h3 className="heading-luxe text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter">Message Us</h3>
                                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Fill out the form below</p>
                                    </div>

                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            const name = formData.get('name');
                                            const email = formData.get('email');
                                            const subject = formData.get('subject');
                                            const message = formData.get('message');

                                            const text = `*New Inquiry from Karbhawan Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;

                                            window.open(`https://wa.me/919999666778?text=${text}`, '_blank');
                                        }}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <InputField
                                                label="Your Name"
                                                placeholder="John Doe"
                                                type="text"
                                                name="name"
                                            />
                                            <InputField
                                                label="Email Address"
                                                placeholder="john@example.com"
                                                type="email"
                                                name="email"
                                            />
                                        </div>

                                        <InputField
                                            label="Subject"
                                            placeholder="Service Inquiry"
                                            type="text"
                                            name="subject"
                                        />

                                        <div className="space-y-3">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Your Message</label>
                                            <textarea
                                                name="message"
                                                rows={5}
                                                className="block w-full px-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-cta-blue transition-all resize-none"
                                                placeholder="How can we help you?"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full group relative isolate overflow-hidden rounded-2xl bg-[#25D366] px-8 py-6 shadow-xl shadow-[#25D366]/20 transition-all hover:shadow-[#25D366]/40 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366] to-[#075E54] z-0" />
                                            <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                                            <div className="absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-black/10 blur-2xl group-hover:bg-black/20 transition-all duration-500" />

                                            <div className="relative z-10 flex items-center justify-between">
                                                <div className="text-left space-y-1.5">
                                                    <span className="block text-white text-[13px] font-black uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform duration-300">
                                                        Chat on WhatsApp
                                                    </span>
                                                    <div className="flex items-center gap-2 bg-black/10 w-fit px-2 py-1 rounded-md border border-white/5">
                                                        <span className="relative flex h-1.5 w-1.5">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                                                        </span>
                                                        <span className="text-green-50 text-[9px] font-bold tracking-wide uppercase">Online Now</span>
                                                    </div>
                                                </div>

                                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white group-hover:fill-[#25D366] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>
                                    </form>

                                    {/* Trust Indicator */}
                                    <div className="flex items-center justify-center gap-8 opacity-40">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-3 h-3 text-cta-blue" />
                                            <span className="text-[8px] font-black uppercase tracking-widest">Fast Support</span>
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="w-3 h-3 text-cta-blue" />
                                            <span className="text-[8px] font-black uppercase tracking-widest">Quick Response</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Brand Seal */}
                    <div className="mt-24 flex flex-col items-center gap-4 opacity-30 select-none">
                        <Image src="/logo.png" alt="Seal" width={24} height={24} className="h-6 w-auto invert grayscale" />
                        <span className="text-[9px] font-mono font-black text-slate-400 tracking-[0.6em] uppercase">Karbhawan Contact Center</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactNode({ icon, label, value, link, delay }: { icon: React.ReactNode, label: string, value: React.ReactNode, link?: string, delay: number }) {
    const content = (
        <div className="flex items-start gap-6 group cursor-pointer relative">
            <div className="relative w-14 h-14 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-cta-blue transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-200/50 group-hover:border-cta-blue/30">
                    <div className="text-cta-blue group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                </div>
            </div>

            <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-cta-blue/80 group-hover:text-cta-blue transition-colors flex items-center gap-2">
                    {label}
                    <span className="w-1 h-1 rounded-full bg-cta-blue opacity-50" />
                </p>
                <div className="text-slate-700 text-sm font-bold leading-relaxed pr-4 group-hover:text-slate-900 transition-colors">
                    {value}
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            {link ? (
                <a href={link} className="block">
                    {content}
                </a>
            ) : (
                content
            )}
        </motion.div>
    );
}

function InputField({ label, placeholder, type, name }: { label: string, placeholder: string, type: string, name?: string }) {
    return (
        <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{label}</label>
            <div className="relative group">
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required
                    className="block w-full px-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-cta-blue transition-all"
                />
            </div>
        </div>
    );
}
