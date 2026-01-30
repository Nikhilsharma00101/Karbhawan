"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    Check,
    Clock,
    Truck,
    Package,
    CheckCircle2,
    XCircle,
    RotateCcw,
    History,
    Filter
} from "lucide-react";

export type OrderStatus =
    | "ALL"
    | "PROCESSING"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURN_REQUESTED"
    | "RETURNED";

interface StatusOption {
    label: string;
    value: OrderStatus;
    color: string;
    bg: string;
    border: string;
    icon: any;
}

export const STATUS_OPTIONS: StatusOption[] = [
    {
        label: "Processing",
        value: "PROCESSING",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        icon: Clock
    },
    {
        label: "Shipped",
        value: "SHIPPED",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "border-indigo-100",
        icon: Truck
    },
    {
        label: "Out For Delivery",
        value: "OUT_FOR_DELIVERY",
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-100",
        icon: Package
    },
    {
        label: "Delivered",
        value: "DELIVERED",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        icon: CheckCircle2
    },
    {
        label: "Cancelled",
        value: "CANCELLED",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-100",
        icon: XCircle
    },
    {
        label: "Return Requested",
        value: "RETURN_REQUESTED",
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-100",
        icon: RotateCcw
    },
    {
        label: "Returned",
        value: "RETURNED",
        color: "text-slate-600",
        bg: "bg-slate-50",
        border: "border-slate-100",
        icon: History
    },
];

const ALL_OPTION: StatusOption = {
    label: "All Status",
    value: "ALL",
    color: "text-slate-900",
    bg: "bg-slate-50",
    border: "border-slate-200",
    icon: Filter
};

interface AdminStatusSelectProps {
    value: string;
    onChange: (value: OrderStatus) => void;
    isFilter?: boolean;
    disabled?: boolean;
    className?: string;
}

export default function AdminStatusSelect({
    value,
    onChange,
    isFilter = false,
    disabled = false,
    className = ""
}: AdminStatusSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const options = isFilter ? [ALL_OPTION, ...STATUS_OPTIONS] : STATUS_OPTIONS;
    const selectedOption = options.find(opt => opt.value === value) || (isFilter ? ALL_OPTION : STATUS_OPTIONS[0]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (status: OrderStatus) => {
        if (status !== value) {
            onChange(status);
        }
        setIsOpen(false);
    };

    const SelectedIcon = selectedOption.icon;

    return (
        <div ref={containerRef} className={`relative min-w-[200px] ${className}`}>
            <motion.button
                whileHover={{ scale: disabled ? 1 : 1.01 }}
                whileTap={{ scale: disabled ? 1 : 0.98 }}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
                    w-full flex items-center justify-between gap-4 px-5 py-3 rounded-2xl border transition-all duration-300
                    ${selectedOption.bg} ${selectedOption.border} shadow-sm
                    ${isOpen ? 'ring-4 ring-slate-100 shadow-md border-opacity-100' : 'border-opacity-50 hover:border-opacity-100'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${selectedOption.bg} border ${selectedOption.border} shadow-sm`}>
                        <SelectedIcon className={`w-3.5 h-3.5 ${selectedOption.color}`} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${selectedOption.color}`}>
                        {selectedOption.label}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <ChevronDown className={`w-4 h-4 ${selectedOption.color} opacity-40`} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute top-full left-0 right-0 mt-2 z-[100] bg-white/90 backdrop-blur-2xl border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
                    >
                        <div className="p-2 space-y-1">
                            {options.map((option) => {
                                const Icon = option.icon;
                                const isSelected = option.value === value;

                                return (
                                    <motion.button
                                        key={option.value}
                                        whileHover={{ x: 4, backgroundColor: "rgba(248, 250, 252, 0.8)" }}
                                        onClick={() => handleSelect(option.value)}
                                        className={`
                                            w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group
                                            ${isSelected ? 'bg-slate-50' : 'bg-transparent'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${option.bg} border ${option.border} shadow-sm transition-transform group-hover:scale-110`}>
                                                <Icon className={`w-3.5 h-3.5 ${option.color}`} />
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-[0.1em] ${isSelected ? option.color : 'text-slate-500 group-hover:text-slate-900'}`}>
                                                {option.label}
                                            </span>
                                        </div>
                                        {isSelected && (
                                            <motion.div layoutId="active-check">
                                                <Check className={`w-3.5 h-3.5 ${option.color}`} />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
