import { z } from "zod";

export const checkoutSchema = z.object({
    fullName: z.string().trim().min(2, "Enter your full name."),
    email: z.string().trim().email("Enter a valid email address."),
    phone: z
        .string()
        .trim()
        .min(7, "Enter a valid phone number.")
        .regex(/^[+\d\s().-]+$/, "Phone number can only contain digits and symbols."),
    address: z.string().trim().min(8, "Enter a complete street address."),
    city: z.string().trim().min(2, "Enter your city."),
    postalCode: z.string().trim().min(4, "Enter a valid postal code."),
    paymentMethod: z.enum(["card", "cash"], {
        error: "Choose a payment method.",
    }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
