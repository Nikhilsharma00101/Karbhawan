import { z } from "zod";

export const AddressSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().refine((val) => val.toLowerCase() === "delhi", {
        message: "We only provide services in Delhi",
    }),
    zip: z.string().regex(/^11[0-9]{4}$/, "Please enter a valid Delhi pincode (starts with 11)"),
    country: z.string().min(2, "Country is required"),
    phone: z.string().min(10, "Valid phone number is required"),
});

export type AddressFormValues = z.infer<typeof AddressSchema>;
