import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
};

export const formatOrderId = (id: string | any) => {
    if (!id) return "#00000000";
    const strId = id.toString();
    return `#${strId.slice(-8).toUpperCase()}`;
};
