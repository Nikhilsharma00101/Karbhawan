"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createProduct } from "@/app/actions/products";
import { getSignature } from "@/app/actions/upload";
import { ArrowRight, Loader2, Upload, X, Save, Box, Layers, Image as ImageIcon, Tag, Settings, Truck, Search, Plus, Info } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { categories } from "@/lib/categories";
import { carBrands } from "@/lib/cars";
import { motion, AnimatePresence } from "framer-motion";

const initialState = {
    message: "",
    success: false,
};

export default function NewProductPage() {
    const [state, formAction] = useActionState(createProduct, initialState);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [urlInput, setUrlInput] = useState("");

    // Cascading Category State
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");

    // State for specifications (Key-Value pairs)
    const [specs, setSpecs] = useState<[string, string][]>([]);

    // Vehicle Compatibility State
    const [isUniversal, setIsUniversal] = useState(false);
    const [compatibilities, setCompatibilities] = useState<{ make: string, model: string }[]>([]);
    const [currentBrand, setCurrentBrand] = useState("");
    const [currentModel, setCurrentModel] = useState("");

    const addSpec = () => setSpecs([...specs, ["", ""]]);
    const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
    const updateSpec = (index: number, key: string, value: string) => {
        const newSpecs = [...specs];
        newSpecs[index] = [key, value];
        setSpecs(newSpecs);
    };

    const addCompatibility = () => {
        if (!currentBrand || !currentModel) return;
        if (compatibilities.some(c => c.make === currentBrand && c.model === currentModel)) return;
        setCompatibilities([...compatibilities, { make: currentBrand, model: currentModel }]);
        setCurrentModel("");
    };

    const removeCompatibility = (index: number) => {
        setCompatibilities(compatibilities.filter((_, i) => i !== index));
    };

    const handleAddUrl = () => {
        if (!urlInput) return;
        if (imageUrls.length >= 4) {
            alert("Archive capacity reached. Maximum 4 visual assets allowed.");
            return;
        }
        setImageUrls([...imageUrls, urlInput]);
        setUrlInput("");
    };

    const handleInitialUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        if (imageUrls.length + files.length > 4) {
            alert("Archive capacity reached. Maximum 4 visual assets allowed.");
            return;
        }
        setUploading(true);
        const newImages = [...imageUrls];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const formData = new FormData();
            try {
                const { timestamp, folder, signature } = await getSignature();
                formData.append("file", file);
                formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
                formData.append("timestamp", timestamp.toString());
                formData.append("folder", folder);
                formData.append("signature", signature);
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: "POST", body: formData }
                );
                if (!res.ok) throw new Error("Synchronization protocol failed");
                const data = await res.json();
                if (data.secure_url) newImages.push(data.secure_url);
            } catch (err) {
                console.error("Asset upload error", err);
                alert("Synchronization failed. Please verify connection protocol.");
            }
        }
        setImageUrls(newImages);
        setUploading(false);
    };

    const removeImage = (index: number) => {
        const newImages = [...imageUrls];
        newImages.splice(index, 1);
        setImageUrls(newImages);
    };

    // SEO & Content State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");

    // Auto-generate SEO
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        // Auto-fill title if empty or matches pattern
        if (!metaTitle || metaTitle.endsWith("| Karbhawan Premium Store")) {
            setMetaTitle(`${newName} | Karbhawan Premium Store`);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDesc = e.target.value;
        setDescription(newDesc);
        // Auto-fill description if empty
        if (!metaDescription) {
            setMetaDescription(newDesc.substring(0, 160) + (newDesc.length > 160 ? "..." : ""));
        }
    };

    const generateSEOMetadata = () => {
        if (name) setMetaTitle(`${name} | Karbhawan Premium Store`);
        if (description) setMetaDescription(description.substring(0, 160) + (description.length > 160 ? "..." : ""));
    };

    const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-aether-primary placeholder:text-slate-400 outline-none focus:border-cta-blue focus:ring-4 focus:ring-blue-500/10 transition-all hover:bg-white hover:border-slate-300";
    const labelClasses = "block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2";
    const sectionTitleClasses = "text-lg font-display font-bold text-aether-primary flex items-center gap-2";

    return (
        <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8">
            <form action={formAction}>
                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-1">
                            <span className="text-cta-blue">Products</span>
                            <span>/</span>
                            <span>Create New</span>
                        </div>
                        <h2 className="text-4xl heading-luxe text-aether-primary">Add Product</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="button" className="px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                            Discard
                        </button>
                        <SubmitButton />
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* --- LEFT COLUMN: MAIN CONTENT --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. GENERAL INFO */}
                        <div className="aether-card p-8 space-y-6">
                            <div className="pb-4 border-b border-slate-100 mb-2">
                                <h3 className={sectionTitleClasses}>
                                    <Box className="w-5 h-5 text-cta-blue" />
                                    General Information
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className={labelClasses}>Product Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="e.g. Aerodynamic Roof Rails"
                                        className={inputClasses}
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Description</label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={6}
                                        placeholder="Detailed product description..."
                                        className={inputClasses}
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    />
                                    <p className="text-[10px] text-slate-400 mt-2 text-right">Markdown supported</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. MEDIA GALLERY */}
                        <div className="aether-card p-8 space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-2">
                                <h3 className={sectionTitleClasses}>
                                    <ImageIcon className="w-5 h-5 text-cta-blue" />
                                    Visual Media
                                </h3>
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold">{imageUrls.length} / 4 Assets</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <AnimatePresence>
                                    {imageUrls.map((url, i) => (
                                        <motion.div
                                            key={url}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            layout
                                            className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group shadow-sm bg-slate-50"
                                        >
                                            <Image src={url} alt="Product Shot" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-2 right-2 bg-white text-red-500 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:scale-110"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                            {i === 0 && (
                                                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                    Primary
                                                </span>
                                            )}
                                            <input type="hidden" name="images" value={url} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {imageUrls.length < 4 && (
                                    <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-cta-blue hover:bg-blue-50/50 transition-all group relative overflow-hidden">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                                            {uploading ? <Loader2 className="w-5 h-5 text-cta-blue animate-spin" /> : <Upload className="w-5 h-5 text-slate-400 group-hover:text-cta-blue" />}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-cta-blue">Upload</span>
                                        <input type="file" hidden multiple accept="image/*" onChange={handleInitialUpload} disabled={uploading} />
                                    </label>
                                )}
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        placeholder="Or add via external URL..."
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
                                        className={`${inputClasses} pl-10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddUrl}
                                        disabled={!urlInput}
                                        className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs disabled:opacity-50 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 3. PRICING & INVENTORY */}
                        <div className="aether-card p-8 space-y-6">
                            <div className="pb-4 border-b border-slate-100 mb-2">
                                <h3 className={sectionTitleClasses}>
                                    <Tag className="w-5 h-5 text-cta-blue" />
                                    Pricing & Inventory
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClasses}>Regular Price (₹)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-serif italic">₹</span>
                                            <input name="price" type="number" required min="0" className={`${inputClasses} pl-8 font-mono`} placeholder="0.00" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Discounted Price (₹)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-serif italic">₹</span>
                                            <input name="discountPrice" type="number" min="0" className={`${inputClasses} pl-8 font-mono`} placeholder="Optional" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClasses}>Stock Quantity</label>
                                        <input name="stock" type="number" required min="0" className={inputClasses} placeholder="Available units" />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>SKU (Stock Keeping Unit)</label>
                                        <input name="sku" type="text" className={`${inputClasses} font-mono uppercase`} placeholder="PROD-001" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. COMPATIBILITY & SPECS */}
                        <div className="aether-card p-8 space-y-8">
                            <div className="pb-4 border-b border-slate-100 mb-2">
                                <h3 className={sectionTitleClasses}>
                                    <Settings className="w-5 h-5 text-cta-blue" />
                                    Attributes & Compatibility
                                </h3>
                            </div>

                            {/* COMPATIBILITY */}
                            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                                <div className="flex justify-between items-start mb-6">
                                    <h4 className="text-sm font-bold text-slate-800">Vehicle Compatibility</h4>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="isUniversal"
                                            id="isUniversal"
                                            checked={isUniversal}
                                            onChange={(e) => setIsUniversal(e.target.checked)}
                                            className="w-4 h-4 rounded border-slate-300 accent-cta-blue cursor-pointer"
                                        />
                                        <label htmlFor="isUniversal" className="text-xs font-bold text-slate-500 uppercase tracking-wide cursor-pointer select-none">Universal Fit</label>
                                    </div>
                                </div>

                                {!isUniversal && (
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <select
                                                className={inputClasses}
                                                value={currentBrand}
                                                onChange={(e) => { setCurrentBrand(e.target.value); setCurrentModel(""); }}
                                            >
                                                <option value="">Select Make</option>
                                                {carBrands.map(b => (
                                                    <option key={b.brand} value={b.brand}>{b.brand}</option>
                                                ))}
                                            </select>
                                            <select
                                                className={inputClasses}
                                                value={currentModel}
                                                onChange={(e) => setCurrentModel(e.target.value)}
                                                disabled={!currentBrand}
                                            >
                                                <option value="">Select Model</option>
                                                {carBrands.find(b => b.brand === currentBrand)?.models.map(m => (
                                                    <option key={m.name} value={m.name}>{m.name}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={addCompatibility}
                                                disabled={!currentModel}
                                                className="w-12 h-[46px] bg-cta-blue text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-md shadow-blue-200 disabled:opacity-30 disabled:shadow-none shrink-0"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {compatibilities.length > 0 ? (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {compatibilities.map((c, i) => (
                                                    <span key={i} className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
                                                        {c.make} {c.model}
                                                        <button type="button" onClick={() => removeCompatibility(i)} className="p-1 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-slate-400 italic">No specific vehicles added yet.</p>
                                        )}
                                        <input type="hidden" name="compatibility" value={JSON.stringify(compatibilities)} />
                                    </div>
                                )}
                            </div>

                            {/* SPECIFICATIONS */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className={labelClasses}>Technical Specifications</label>
                                    <button type="button" onClick={addSpec} className="text-[10px] font-bold uppercase tracking-wider text-cta-blue hover:underline flex items-center gap-1">
                                        <Plus className="w-3 h-3" /> Add Field
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {specs.length === 0 && (
                                        <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs font-medium">
                                            No specifications added.
                                        </div>
                                    )}
                                    {specs.map(([key, value], i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <input type="text" placeholder="Key (e.g. Material)" value={key} onChange={(e) => updateSpec(i, e.target.value, value)} className={`${inputClasses} py-2`} />
                                            <input type="text" placeholder="Value (e.g. Aluminum)" value={value} onChange={(e) => updateSpec(i, key, e.target.value)} className={`${inputClasses} py-2`} />
                                            <button type="button" onClick={() => removeSpec(i)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <input type="hidden" name="specifications" value={JSON.stringify(Object.fromEntries(specs.filter(([k]) => k)))} />
                            </div>
                        </div>

                        {/* 5. SEO & INSTALLATION */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* INSTALLATION */}
                            <div className="aether-card p-8 space-y-6 h-full">
                                <div className="pb-4 border-b border-slate-100 mb-2">
                                    <h3 className={sectionTitleClasses}>
                                        <Truck className="w-5 h-5 text-cta-blue" />
                                        Installation
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <input
                                            type="checkbox"
                                            name="installationPossible"
                                            defaultChecked={true}
                                            className="w-5 h-5 rounded border-slate-300 accent-cta-blue"
                                        />
                                        <span className="text-sm font-bold text-slate-700">Service Available</span>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Flat Rate Override (₹)</label>
                                        <input
                                            name="installationFlatRate"
                                            type="number"
                                            min="0"
                                            placeholder="Leave empty for matrix"
                                            className={inputClasses}
                                        />
                                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                                            Leave blank to use the global installation rate matrix based on car segment.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SEO */}
                            <div className="aether-card p-8 space-y-6 h-full">
                                <div className="pb-4 border-b border-slate-100 mb-2 flex items-center justify-between">
                                    <h3 className={sectionTitleClasses}>
                                        <Search className="w-5 h-5 text-cta-blue" />
                                        SEO Metadata
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={generateSEOMetadata}
                                        className="text-[9px] font-black uppercase tracking-wider text-cta-blue hover:scale-105 transition-transform"
                                    >
                                        Auto-Generate
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClasses}>Meta Title</label>
                                        <input
                                            name="metaTitle"
                                            type="text"
                                            className={inputClasses}
                                            placeholder="Search Engine Title"
                                            value={metaTitle}
                                            onChange={(e) => setMetaTitle(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Meta Description</label>
                                        <textarea
                                            name="metaDescription"
                                            rows={3}
                                            className={inputClasses}
                                            placeholder="Search Engine Description"
                                            value={metaDescription}
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* --- RIGHT COLUMN: SIDEBAR --- */}
                    <div className="lg:col-span-1 space-y-8 sticky top-8">

                        {/* STATUS CARD */}
                        <div className="aether-card p-6 space-y-6 border-slate-200/60 shadow-lg shadow-slate-200/50">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Publishing</h3>

                            <div>
                                <label className={labelClasses}>Status</label>
                                <select name="status" defaultValue="active" className={inputClasses}>
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <span className="text-sm font-bold text-slate-700">Featured</span>
                                    <input type="checkbox" name="featured" className="w-5 h-5 rounded border-slate-300 accent-cta-blue" />
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <span className="text-sm font-bold text-slate-700">New Arrival</span>
                                    <input type="checkbox" name="isNewArrival" className="w-5 h-5 rounded border-slate-300 accent-cta-blue" />
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <span className="text-sm font-bold text-slate-700">Best Seller</span>
                                    <input type="checkbox" name="isBestSeller" className="w-5 h-5 rounded border-slate-300 accent-cta-blue" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <SubmitButton fullWidth />
                            </div>
                        </div>

                        {/* CATEGORY & ORGANIZATION */}
                        <div className="aether-card p-6 space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Organization</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className={labelClasses}>Category</label>
                                    <select
                                        name="category"
                                        required
                                        className={inputClasses}
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setSelectedSubCategory("");
                                            setSelectedSubSubCategory("");
                                        }}
                                    >
                                        <option value="">Select...</option>
                                        {categories.map((cat) => (
                                            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {selectedCategory && categories.find(c => c.slug === selectedCategory)?.children && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <label className={labelClasses}>Sub Category</label>
                                        <select
                                            name="subCategory"
                                            className={inputClasses}
                                            value={selectedSubCategory}
                                            onChange={(e) => {
                                                setSelectedSubCategory(e.target.value);
                                                setSelectedSubSubCategory("");
                                            }}
                                        >
                                            <option value="">Select...</option>
                                            {categories.find(c => c.slug === selectedCategory)?.children?.map((sub) => (
                                                <option key={sub.slug} value={sub.slug}>{sub.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {selectedSubCategory && categories.find(c => c.slug === selectedCategory)?.children?.find(s => s.slug === selectedSubCategory)?.children && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <label className={labelClasses}>Specific Type</label>
                                        <select
                                            name="subSubCategory"
                                            className={inputClasses}
                                            value={selectedSubSubCategory}
                                            onChange={(e) => setSelectedSubSubCategory(e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            {categories.find(c => c.slug === selectedCategory)?.children?.find(s => s.slug === selectedSubCategory)?.children?.map((ss) => (
                                                <option key={ss.slug} value={ss.slug}>{ss.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-100 space-y-4">
                                <div>
                                    <label className={labelClasses}>Tags (Comma Separated)</label>
                                    <input name="tags" type="text" className={inputClasses} placeholder="e.g. sporty, sleek..." />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClasses}>Colors</label>
                                        <input name="colors" type="text" className={inputClasses} placeholder="Black, Red..." />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Sizes</label>
                                        <input name="sizes" type="text" className={inputClasses} placeholder="S, M, L..." />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {state.message && (
                    <div className={`fixed bottom-8 right-8 z-[100] max-w-sm w-full p-4 rounded-2xl shadow-2xl backdrop-blur-xl border animate-in slide-in-from-bottom-5 duration-500 ${state.success ? 'bg-green-50/90 border-green-200 text-green-700' : 'bg-red-50/90 border-red-200 text-red-600'}`}>
                        <div className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${state.success ? 'bg-green-100' : 'bg-red-100'}`}>
                                {state.success ? <Truck className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider mb-1">{state.success ? 'Success' : 'Error'}</h4>
                                <p className="text-xs font-medium leading-relaxed opacity-90">{state.message}</p>
                            </div>
                            <button type="button" onClick={() => { }} className="ml-auto text-current opacity-50 hover:opacity-100"><X className="w-4 h-4" /></button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

function SubmitButton({ fullWidth = false }: { fullWidth?: boolean }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className={`
                bg-cta-blue text-white font-bold uppercase tracking-widest text-[11px] rounded-xl 
                shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 
                transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed
                ${fullWidth ? 'w-full py-4' : 'px-8 py-3'}
            `}
        >
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                </>
            ) : (
                <>
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Publish Product
                </>
            )}
        </button>
    );
}
