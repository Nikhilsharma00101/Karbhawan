"use client";

import { useState } from "react";
import { X, Star, User, MessageSquare, Check, Loader2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createTestimonial, updateTestimonial } from "@/app/actions/testimonials";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface TestimonialFormProps {
    testimonial?: {
        _id: string;
        name: string;
        designation?: string;
        message: string;
        rating: number;
        isActive: boolean;
    };
    onClose: () => void;
}

export default function TestimonialForm({ testimonial, onClose }: TestimonialFormProps) {
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(testimonial?.rating || 5);
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            const result = testimonial
                ? await updateTestimonial(testimonial._id, formData)
                : await createTestimonial(formData);

            if (result.success) {
                toast.success(testimonial ? "Testimonial updated successfully" : "Testimonial created successfully");
                onClose();
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("Failed to save testimonial");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#0F0F12] border border-white/10 shadow-2xl shadow-black/50"
            >
                {/* Decorative Glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-karbhawan-teal to-transparent opacity-50" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-karbhawan-teal/20 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                                {testimonial ? "Edit Testimonial" : "New Testimonial"}
                            </h3>
                            <p className="text-sm text-gray-400">
                                Share customer feedback with the world.
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 -mt-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        {/* Name & Designation Input */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-karbhawan-teal/80 ml-1">
                                    Customer Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-500 group-focus-within:text-karbhawan-teal transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={testimonial?.name}
                                        required
                                        placeholder="e.g. John Doe"
                                        className="block w-full pl-10 pr-3 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-karbhawan-teal/50 focus:ring-1 focus:ring-karbhawan-teal/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-karbhawan-teal/80 ml-1">
                                    Designation
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Briefcase className="h-5 w-5 text-gray-500 group-focus-within:text-karbhawan-teal transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="designation"
                                        defaultValue={testimonial?.designation}
                                        placeholder="e.g. CEO (Optional)"
                                        className="block w-full pl-10 pr-3 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-karbhawan-teal/50 focus:ring-1 focus:ring-karbhawan-teal/50 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rating Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-karbhawan-teal/80 ml-1">
                                Rating
                            </label>
                            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-3 justify-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(null)}
                                        className="p-1 relative transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            className={clsx(
                                                "w-8 h-8 transition-all duration-200",
                                                (hoveredStar ?? rating) >= star
                                                    ? "fill-karbhawan-gold text-karbhawan-gold drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                                                    : "text-gray-700 fill-transparent"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                            <input type="hidden" name="rating" value={rating} />
                            <div className="text-center text-xs font-medium text-gray-500 mt-1">
                                {rating === 5 ? "Excellent!" : rating === 4 ? "Great" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-karbhawan-teal/80 ml-1">
                                Feedback
                            </label>
                            <div className="relative group">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <MessageSquare className="h-5 w-5 text-gray-500 group-focus-within:text-karbhawan-teal transition-colors" />
                                </div>
                                <textarea
                                    name="message"
                                    defaultValue={testimonial?.message}
                                    required
                                    placeholder="What did the customer say?"
                                    rows={4}
                                    className="block w-full pl-10 pr-3 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-karbhawan-teal/50 focus:ring-1 focus:ring-karbhawan-teal/50 transition-all font-medium resize-none leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Visibility Checkbox */}
                        <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl cursor-pointer hover:bg-white/[0.05] transition-colors group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    id="isActive"
                                    defaultChecked={testimonial ? testimonial.isActive : true}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-black/20 checked:border-karbhawan-teal checked:bg-karbhawan-teal transition-all"
                                />
                                <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <label htmlFor="isActive" className="text-sm font-medium text-gray-300 cursor-pointer select-none group-hover:text-white transition-colors">
                                Make publicly visible immediately
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1 border-white/10 hover:bg-white/5 hover:text-white text-gray-400 py-6 text-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-karbhawan-teal to-emerald-500 hover:from-karbhawan-teal/90 hover:to-emerald-500/90 text-black font-bold py-6 text-sm shadow-lg shadow-emerald-900/20"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Saving...</span>
                                    </div>
                                ) : (
                                    testimonial ? "Update Testimonial" : "Publish Testimonial"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
