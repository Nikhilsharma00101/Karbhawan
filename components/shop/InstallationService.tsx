"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGarage } from "./GarageContext";
import { calculateInstallationPrice } from "@/app/actions/installation";
import { carBrands, CarSegment } from "@/lib/cars";
import { ShieldCheck, Wrench, ChevronRight, X, Car, RotateCcw, PenTool, Trash2, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";

interface InstallationServiceProps {
    productId: string;
    productName: string;
    onInstallationChange: (hasInstallation: boolean, cost: number) => void;
}

export default function InstallationService({
    productId,
    productName,
    onInstallationChange
}: InstallationServiceProps) {
    const { selectedCar, carSegment, selectCar, clearGarage } = useGarage();
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Confirmation State
    const [confirmState, setConfirmState] = useState<{
        isOpen: boolean;
        type: 'add' | 'remove';
        title: string;
        description: string;
        onConfirm: () => void;
    } | null>(null);

    // Manual Mode State
    const [isManualMode, setIsManualMode] = useState(false);
    const [manualName, setManualName] = useState("");
    const [manualSegment, setManualSegment] = useState<CarSegment>("Hatchback");

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    // Fetch price when car or product changes
    useEffect(() => {
        const fetchPrice = async () => {
            const currentCarName = selectedCar || (isManualMode ? manualName : undefined);
            const currentSegment = carSegment || (isManualMode ? manualSegment : undefined);

            if (!currentCarName) return;

            setLoading(true);

            // Pass manual segment if exists, action will handle priority
            const res = await calculateInstallationPrice(productId, currentCarName, currentSegment);

            if (res.isAvailable && res.price !== null) {
                setPrice(res.price);
                // If it was already added, we should update the parent with new price
                // But only if we are currently "Active" (isAdded)
                if (isAdded) {
                    onInstallationChange(true, res.price);
                }
            } else {
                setPrice(null);
            }
            setLoading(false);
        };

        fetchPrice();
    }, [productId, selectedCar, carSegment, isAdded, isManualMode, manualName, manualSegment]);

    // Actual Logic Execution Functions
    const executeRemove = () => {
        setIsAdded(false);
        setPrice(null);
        onInstallationChange(false, 0);
        setIsManualMode(false);
        setManualName("");
        setManualSegment("Hatchback");
        clearGarage();
        setConfirmState(null);
    };

    const executeAdd = (name?: string, segment?: CarSegment) => {
        if (name && segment) {
            // For list selection where we need to set state first
            selectCar(name, segment);
        }
        setIsAdded(true);
        setConfirmState(null);
        toast.success("Installation Service Added", {
            description: `Professional setup for ${name || selectedCar || manualName}`
        });
    };

    // User Interaction Handlers
    const handleRemoveRequest = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setConfirmState({
            isOpen: true,
            type: 'remove',
            title: "Remove Installation Service?",
            description: "This will remove the installation service and clear your vehicle selection.",
            onConfirm: executeRemove
        });
    };

    const handleToggle = () => {
        // If no car selected, open modal
        if (!selectedCar && !isManualMode && !price) {
            setShowModal(true);
            return;
        }

        if (isAdded) {
            handleRemoveRequest();
            return;
        }

        // If toggling on without opening modal (e.g. data exists)
        setConfirmState({
            isOpen: true,
            type: 'add',
            title: "Add Installation Service?",
            description: `Confirm adding installation for ${selectedCar || manualName}.`,
            onConfirm: () => executeAdd()
        });
    };

    const handleChangeVehicle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling the service
        setShowModal(true);
        setIsManualMode(false); // Reset manual mode to default view
    };

    const handleManualSubmit = () => {
        if (!manualName.trim()) {
            toast.error("Please enter your car model name");
            return;
        }

        setIsManualMode(true);
        clearGarage();
        setShowModal(false);

        setConfirmState({
            isOpen: true,
            type: 'add',
            title: "Confirm Vehicle Details",
            description: `Add installation service for ${manualName} (${manualSegment})?`,
            onConfirm: () => executeAdd()
        });
    };

    const modalContent = (
        <AnimatePresence>
            {showModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        <div className="p-8 pb-0 shrink-0">
                            <div className="flex justify-between items-start mb-2">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Your Vehicle</h3>
                                    <p className="text-slate-500 text-sm font-medium">We tailor installation prices to your specific model.</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>
                        </div>

                        {!isManualMode ? (
                            <div className="overflow-y-auto custom-scrollbar flex-1 min-h-0 touch-auto overscroll-contain" data-lenis-prevent>
                                <div className="p-6">
                                    {/* Brand List */}
                                    <div className="space-y-8">
                                        {carBrands.map((brandInfo) => (
                                            <div key={brandInfo.brand}>
                                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 sticky top-0 bg-white py-2 z-10">{brandInfo.brand}</h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {brandInfo.models.map((model) => (
                                                        <button
                                                            key={model.name}
                                                            onClick={() => {
                                                                // Close selection modal
                                                                setShowModal(false);
                                                                setIsManualMode(false);

                                                                // Open confirmation modal
                                                                setConfirmState({
                                                                    isOpen: true,
                                                                    type: 'add',
                                                                    title: "Confirm Installation",
                                                                    description: `Add installation service for ${model.name}?`,
                                                                    onConfirm: () => executeAdd(model.name, model.segment)
                                                                });
                                                            }}
                                                            className="flex flex-col items-start p-4 rounded-xl border border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
                                                        >
                                                            <span className="font-bold text-slate-900 text-sm group-hover:text-indigo-700">{model.name}</span>
                                                            <span className="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-indigo-400">{model.segment}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Not Listed Option */}
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <button
                                            onClick={() => setIsManualMode(true)}
                                            className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-3 group"
                                        >
                                            <PenTool className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                                            <span className="font-bold text-slate-600 group-hover:text-indigo-700">My Car is Not Listed Here</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 flex flex-col gap-6">
                                <div className="p-4 bg-indigo-50 rounded-2xl flex gap-3 text-indigo-700 text-sm font-medium">
                                    <Car className="w-5 h-5 shrink-0" />
                                    <p>Enter your vehicle details manually to get a custom installation quote.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Car Model Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Ford Endeavour"
                                            value={manualName}
                                            onChange={(e) => setManualName(e.target.value)}
                                            className="w-full p-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-900"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Segment Type</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(['Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury'] as CarSegment[]).map(seg => (
                                                <button
                                                    key={seg}
                                                    onClick={() => setManualSegment(seg)}
                                                    className={cn(
                                                        "py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border-2 transition-all",
                                                        manualSegment === seg
                                                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                                            : "border-slate-100 text-slate-400 hover:border-slate-200"
                                                    )}
                                                >
                                                    {seg}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setIsManualMode(false)}
                                        className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleManualSubmit}
                                        className="flex-[2] py-4 rounded-2xl bg-slate-900 text-white font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors shadow-lg"
                                    >
                                        Confirm Vehicle
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="w-full">
            {/* Main Service Card */}
            <div
                onClick={handleToggle}
                className={cn(
                    "relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer group",
                    isAdded
                        ? "bg-slate-900 border-slate-900"
                        : "bg-white border-slate-100 hover:border-indigo-100 hover:shadow-lg"
                )}
            >
                <div className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                            isAdded ? "bg-emerald-500 text-white" : "bg-indigo-50 text-indigo-500"
                        )}>
                            {isAdded ? (
                                <CheckCircle2 className="w-6 h-6" />
                            ) : (
                                <Wrench className="w-6 h-6" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className={cn("text-sm font-black uppercase tracking-wider", isAdded ? "text-white" : "text-slate-900")}>
                                    Home Installation
                                </h4>
                                {isAdded && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                            </div>
                            <div className={cn("text-xs font-medium flex items-center gap-2", isAdded ? "text-slate-400" : "text-slate-500")}>
                                {selectedCar || (isManualMode && manualName) ? (
                                    <>
                                        <span>For <strong>{selectedCar || manualName}</strong></span>
                                        <button
                                            onClick={handleChangeVehicle}
                                            className="ml-2 hover:bg-white/20 p-1 rounded-md transition-colors text-[10px] uppercase font-bold tracking-wider underline flex items-center gap-1"
                                        >
                                            <RotateCcw className="w-3 h-3" /> Change
                                        </button>
                                        {isAdded && (
                                            <button
                                                onClick={handleRemoveRequest}
                                                className="ml-2 hover:bg-red-500/20 p-1 rounded-md transition-colors text-[10px] uppercase font-bold tracking-wider underline flex items-center gap-1 text-red-200 hover:text-red-100"
                                            >
                                                <Trash2 className="w-3 h-3" /> Remove
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    "Check availability for your car"
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        {loading ? (
                            <div className="w-16 h-4 bg-slate-200 animate-pulse rounded" />
                        ) : price !== null ? (
                            <div className={cn("font-black text-lg", isAdded ? "text-white" : "text-slate-900")}>
                                +{formatPrice(price)}
                            </div>
                        ) : (
                            <div className={cn("flex items-center text-xs font-bold uppercase tracking-widest", isAdded ? "text-white" : "text-indigo-500")}>
                                Add <ChevronRight className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Portal the modal to body */}
            {mounted && createPortal(modalContent, document.body)}

            {/* Confirmation Modal Portal */}
            {mounted && confirmState && confirmState.isOpen && createPortal(
                <AnimatePresence>
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmState(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-6"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className={cn(
                                    "w-16 h-16 rounded-full flex items-center justify-center mb-2",
                                    confirmState.type === 'add' ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                                )}>
                                    {confirmState.type === 'add' ? (
                                        <CheckCircle2 className="w-8 h-8" />
                                    ) : (
                                        <AlertTriangle className="w-8 h-8" />
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-slate-900">{confirmState.title}</h3>
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                        {confirmState.description}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                                    <button
                                        onClick={() => setConfirmState(null)}
                                        className="py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmState.onConfirm}
                                        className={cn(
                                            "py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95",
                                            confirmState.type === 'add' ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"
                                        )}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
