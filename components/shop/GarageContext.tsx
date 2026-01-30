"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CarModel, CarSegment } from "@/lib/cars";

interface GarageContextType {
    selectedCar: string | null; // e.g., "Thar"
    carSegment: CarSegment | null; // e.g., "SUV"
    selectCar: (modelName: string, segment: CarSegment) => void;
    clearGarage: () => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export function GarageProvider({ children }: { children: React.ReactNode }) {
    const [selectedCar, setSelectedCar] = useState<string | null>(null);
    const [carSegment, setCarSegment] = useState<CarSegment | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedName = localStorage.getItem("karbhawan-garage-model");
        const savedSegment = localStorage.getItem("karbhawan-garage-segment") as CarSegment;

        if (savedName) setSelectedCar(savedName);
        if (savedSegment) setCarSegment(savedSegment);
    }, []);

    const selectCar = (modelName: string, segment: CarSegment) => {
        setSelectedCar(modelName);
        setCarSegment(segment);
        localStorage.setItem("karbhawan-garage-model", modelName);
        localStorage.setItem("karbhawan-garage-segment", segment);
    };

    const clearGarage = () => {
        setSelectedCar(null);
        setCarSegment(null);
        localStorage.removeItem("karbhawan-garage-model");
        localStorage.removeItem("karbhawan-garage-segment");
    };

    return (
        <GarageContext.Provider value={{ selectedCar, carSegment, selectCar, clearGarage }}>
            {children}
        </GarageContext.Provider>
    );
}

export const useGarage = () => {
    const context = useContext(GarageContext);
    if (!context) throw new Error("useGarage must be used within a GarageProvider");
    return context;
};
