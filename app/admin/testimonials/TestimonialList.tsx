"use client";

import { useState } from "react";
import { Star, Trash2, Eye, EyeOff, Edit2, Plus } from "lucide-react";
import { deleteTestimonial, toggleTestimonialStatus } from "@/app/actions/testimonials";
import { toast } from "sonner";
import TestimonialForm from "./TestimonialForm";
import { Button } from "@/components/ui/Button";

interface TestimonialType {
    _id: string;
    name: string;
    designation?: string;
    rating: number;
    message: string;
    isActive: boolean;
    createdAt: Date;
}

export default function TestimonialList({ initialTestimonials }: { initialTestimonials: TestimonialType[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<TestimonialType | null>(null);

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        const result = await deleteTestimonial(id);
        if (result.success) {
            toast.success("Testimonial deleted");
        } else {
            toast.error("Failed to delete testimonial");
        }
    }

    async function handleToggle(id: string) {
        const result = await toggleTestimonialStatus(id);
        if (result.success) {
            toast.success("Testimonial status updated");
        } else {
            toast.error("Failed to update status");
        }
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h2 className="text-5xl heading-luxe text-aether-primary">Testimonials</h2>
                    <p className="text-aether-secondary font-medium italic">Manage customer testimonials.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingTestimonial(null);
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-3 bg-gradient-to-r from-cta-soft to-cta-blue text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-100/50 hover:scale-[1.02] transition-all duration-300"
                >
                    <Plus className="w-4 h-4" /> Add Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {initialTestimonials.map((testi) => (
                    <div key={testi._id} className="group relative aether-card p-10 flex flex-col h-full hover:shadow-aether transition-all duration-500 border-slate-100">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-display font-black text-aether-primary leading-tight">{testi.name}</h3>
                                {testi.designation && (
                                    <p className="text-xs uppercase tracking-widest text-cta-blue font-bold mt-1">{testi.designation}</p>
                                )}
                                <div className="flex text-cta-soft gap-1 text-xs mt-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < testi.rating ? 'fill-current' : 'text-slate-100'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => {
                                        setEditingTestimonial(testi);
                                        setIsFormOpen(true);
                                    }}
                                    className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-cta-blue hover:bg-cta-blue hover:text-white transition-all shadow-sm"
                                    title="Edit"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleToggle(testi._id)}
                                    className={`w-10 h-10 flex items-center justify-center border rounded-xl transition-all shadow-sm ${testi.isActive ? 'bg-green-50 border-green-100 text-green-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                                    title={testi.isActive ? "Archived" : "Visible"}
                                >
                                    {testi.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <p className="text-aether-secondary text-sm italic mb-12 flex-1 leading-relaxed border-l-2 border-indigo-50 pl-6 italic">
                            &quot;{testi.message}&quot;
                        </p>

                        <div className="flex justify-between items-center pt-8 border-t border-slate-50 mt-auto">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-aether-muted">
                                Date: {new Date(testi.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                            </span>
                            <button
                                onClick={() => handleDelete(testi._id)}
                                className="text-slate-300 hover:text-red-500 transition-colors text-[10px] flex items-center gap-2 font-black uppercase tracking-widest"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                        </div>
                    </div>
                ))}

                {initialTestimonials.length === 0 && (
                    <div className="col-span-full py-40 text-center aether-card border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Star className="w-10 h-10 text-slate-100" />
                        </div>
                        <h3 className="text-2xl heading-luxe text-slate-300">No Testimonials</h3>
                        <p className="text-aether-muted italic text-sm mt-3 font-medium">No testimonials found.</p>
                    </div>
                )}
            </div>

            {isFormOpen && (
                <TestimonialForm
                    testimonial={editingTestimonial || undefined}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
}
