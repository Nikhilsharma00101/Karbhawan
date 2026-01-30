"use client";

import { useEffect, useState } from "react";
import { getInstallationRules, saveInstallationRule } from "@/app/actions/installation";
import { categories } from "@/lib/categories";
import { toast } from "sonner";
import AnimatedDropdown from "@/components/ui/AnimatedDropdown";

// Segments as columns
const SEGMENTS = ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury'];

interface Rule {
    _id?: string;
    category: string;
    subCategory?: string;
    subSubCategory?: string;
    segmentRates: Record<string, number>;
}

export default function InstallationAdminPage() {
    const [rules, setRules] = useState<Rule[]>([]);
    const [loading, setLoading] = useState(true);

    // Quick Add State
    const [newCategory, setNewCategory] = useState("");
    const [newSubCategory, setNewSubCategory] = useState("");
    const [newSubSubCategory, setNewSubSubCategory] = useState("");
    const [newRates, setNewRates] = useState<Record<string, number>>({});

    async function loadRules() {
        setLoading(true);
        const data = await getInstallationRules();
        setRules(data);
        setLoading(false);
    }

    useEffect(() => {
        loadRules();
    }, []);

    const handleRateChange = (index: number, segment: string, value: string) => {
        const updated = [...rules];
        const numValue = parseInt(value) || 0;

        if (!updated[index].segmentRates) updated[index].segmentRates = {};

        updated[index].segmentRates[segment] = numValue;
        setRules(updated);
    };

    const saveRule = async (index: number) => {
        const rule = rules[index];
        const toastId = toast.loading("Saving...");

        const res = await saveInstallationRule(
            rule.category,
            rule.subCategory,
            rule.subSubCategory,
            rule.segmentRates
        );

        if (res.success) {
            toast.success("Saved!", { id: toastId });
        } else {
            toast.error("Failed", { id: toastId });
        }
    };

    const addNewRow = async () => {
        if (!newCategory) return toast.error("Category required");

        const newRule: Rule = {
            category: newCategory,
            subCategory: newSubCategory || undefined,
            subSubCategory: newSubSubCategory || undefined,
            segmentRates: newRates
        };

        // Optimistic update
        const updatedRules = [...rules, newRule];
        setRules(updatedRules);

        // Also save immediately for better UX
        const toastId = toast.loading("Adding rule...");
        const res = await saveInstallationRule(
            newRule.category,
            newRule.subCategory,
            newRule.subSubCategory,
            newRule.segmentRates
        );

        if (res.success) {
            toast.success("Rule added & saved!", { id: toastId });
            // Refresh logic if needed, or just keep optimistic
        } else {
            toast.error("Failed to save", { id: toastId });
        }

        setNewCategory("");
        setNewSubCategory("");
        setNewSubSubCategory("");
        setNewRates({});
    };

    if (loading) return <div className="p-10 text-center">Loading Matrix...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Installation Rate Matrix</h1>
            <p className="text-gray-500 mb-8">Manage standard installation fees by Category x Car Segment.</p>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">Category</th>
                                <th className="p-4 font-semibold text-gray-600">Sub Category</th>
                                <th className="p-4 font-semibold text-gray-600">Specific Type</th>
                                {SEGMENTS.map(seg => (
                                    <th key={seg} className="p-4 font-semibold text-gray-600">{seg}</th>
                                ))}
                                <th className="p-4 font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rules.map((rule, idx) => (
                                <tr key={rule._id || idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{rule.category}</td>
                                    <td className="p-4 text-gray-500">{rule.subCategory || "-"}</td>
                                    <td className="p-4 text-gray-500">{rule.subSubCategory || "-"}</td>
                                    {SEGMENTS.map(seg => (
                                        <td key={seg} className="p-2">
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-24 pl-6 pr-2 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                    placeholder="0"
                                                    value={rule.segmentRates?.[seg] || ''}
                                                    onChange={(e) => handleRateChange(idx, seg, e.target.value)}
                                                />
                                            </div>
                                        </td>
                                    ))}
                                    <td className="p-4">
                                        <button
                                            onClick={() => saveRule(idx)}
                                            className="px-4 py-1.5 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
                                        >
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* Add New Row */}
                            <tr className="bg-blue-50/30">
                                <td className="p-4 w-60">
                                    <AnimatedDropdown
                                        placeholder="Select Category"
                                        value={newCategory}
                                        onChange={(val) => {
                                            setNewCategory(val);
                                            setNewSubCategory("");
                                            setNewSubSubCategory("");
                                        }}
                                        options={categories.map(cat => ({ label: cat.name, value: cat.slug }))}
                                    />
                                </td>
                                <td className="p-4 w-60">
                                    {(() => {
                                        const subOptions = newCategory
                                            ? (categories.find(c => c.slug === newCategory)?.children || [])
                                                .map(sub => ({ label: sub.name, value: sub.slug }))
                                            : [];
                                        const isDisabled = !newCategory || subOptions.length === 0;

                                        return (
                                            <AnimatedDropdown
                                                placeholder={!newCategory ? "Select Sub (Opt)" : (subOptions.length === 0 ? "N/A" : "Select Sub (Opt)")}
                                                value={newSubCategory}
                                                disabled={isDisabled}
                                                onChange={(val) => {
                                                    setNewSubCategory(val);
                                                    setNewSubSubCategory("");
                                                }}
                                                options={subOptions}
                                            />
                                        );
                                    })()}
                                </td>
                                <td className="p-4 w-60">
                                    {(() => {
                                        const subSubOptions = newSubCategory
                                            ? (categories
                                                .find(c => c.slug === newCategory)
                                                ?.children?.find(s => s.slug === newSubCategory)
                                                ?.children || [])
                                                .map(deep => ({ label: deep.name, value: deep.slug }))
                                            : [];
                                        const isDisabled = !newSubCategory || subSubOptions.length === 0;

                                        return (
                                            <AnimatedDropdown
                                                placeholder={!newSubCategory ? "Select Type (Opt)" : (subSubOptions.length === 0 ? "N/A" : "Select Type (Opt)")}
                                                value={newSubSubCategory}
                                                disabled={isDisabled}
                                                onChange={(val) => setNewSubSubCategory(val)}
                                                options={subSubOptions}
                                            />
                                        );
                                    })()}
                                </td>
                                {SEGMENTS.map(seg => (
                                    <td key={seg} className="p-2">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                            <input
                                                type="number"
                                                className="w-24 pl-6 pr-2 py-1.5 bg-white/50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-blue-300"
                                                placeholder="0"
                                                value={newRates[seg] || ''}
                                                onChange={(e) => setNewRates({ ...newRates, [seg]: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                    </td>
                                ))}
                                <td className="p-4">
                                    <button
                                        onClick={addNewRow}
                                        className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                                    >
                                        Add & Save
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-sm">
                <strong>Note:</strong> Product-specific overrides set in the &quot;Edit Product&quot; page will take priority over these matrix rates.
            </div>
        </div>
    );
}
