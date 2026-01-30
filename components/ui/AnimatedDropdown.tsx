"use client";

// ... imports
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

// ... interfaces
interface Option {
    label: string;
    value: string;
}

interface AnimatedDropdownProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export default function AnimatedDropdown({
    options,
    value,
    onChange,
    placeholder = "Select...",
    disabled = false,
    className = ""
}: AnimatedDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    const selectedOption = options.find(opt => opt.value === value);

    // Update position on open and scroll
    useEffect(() => {
        if (!isOpen) return;

        const updatePosition = () => {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setPosition({
                    top: rect.bottom + 8,
                    left: rect.left,
                    width: rect.width
                });
            }
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [isOpen]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        onChange(val);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className={`relative ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Trigger Button */}
            <button
                ref={buttonRef}
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between 
                    bg-white border text-left px-4 py-3 rounded-xl 
                    transition-all duration-300 shadow-sm
                    ${isOpen
                        ? 'border-cta-blue ring-4 ring-blue-50/50 shadow-md transform scale-[1.02]'
                        : 'border-slate-200 hover:border-cta-blue/50'
                    }
                `}
            >
                <div>
                    {selectedOption ? (
                        <span className="text-xs font-bold uppercase tracking-wider text-aether-primary">
                            {selectedOption.label}
                        </span>
                    ) : (
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {placeholder}
                        </span>
                    )}
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-cta-blue' : 'text-slate-400'}`} />
                </motion.div>
            </button>

            {/* Dropdown Menu - Fixed Position to escape overflow */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="fixed z-[9999] bg-white/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
                        style={{
                            top: position.top,
                            left: position.left,
                            width: position.width,
                            boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 8px 16px -8px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <ul className="p-1.5">
                            {options.map((option) => (
                                <motion.li
                                    key={option.value}
                                    layout
                                    onClick={() => handleSelect(option.value)}
                                    className={`
                                        relative flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-[11px] font-bold uppercase tracking-wider mb-0.5 last:mb-0
                                        ${value === option.value
                                            ? 'bg-blue-50 text-cta-blue'
                                            : 'text-aether-secondary hover:bg-slate-50 hover:text-aether-primary'
                                        }
                                    `}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <motion.div layoutId="check">
                                            <Check className="w-3.5 h-3.5 text-cta-blue" />
                                        </motion.div>
                                    )}
                                </motion.li>
                            ))}
                            {options.length === 0 && (
                                <li className="px-3 py-4 text-center text-[10px] bg-slate-50 rounded-lg text-slate-400 font-bold uppercase tracking-widest italic">
                                    No options
                                </li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
