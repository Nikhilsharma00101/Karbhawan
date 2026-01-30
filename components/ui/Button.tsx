import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-cta-blue text-white hover:bg-cta-soft shadow-lg shadow-blue-100",
                secondary:
                    "bg-white border border-slate-100 text-aether-primary hover:bg-slate-50 shadow-sm",
                outline:
                    "border border-slate-200 bg-transparent hover:bg-slate-50 text-aether-secondary",
                ghost: "hover:bg-slate-50 text-aether-secondary",
                link: "text-cta-blue underline-offset-4 hover:underline",
                luxury: "bg-gradient-to-r from-cta-soft to-cta-blue text-white shadow-lg shadow-blue-100 hover:scale-[1.02]",
            },
            size: {
                default: "h-12 px-8 py-3",
                sm: "h-9 rounded-xl px-4",
                lg: "h-14 rounded-[1.5rem] px-10 text-xs",
                icon: "h-12 w-12 rounded-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
