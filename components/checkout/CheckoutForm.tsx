"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/checkout-schema";
import { formatCurrency, getCartTotal } from "@/lib/cart-utils";
import { clearCart } from "@/store/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type FormErrors = Partial<Record<keyof CheckoutFormValues, string>>;
type PaymentStatus = "idle" | "processing" | "success" | "failed";

const initialValues: CheckoutFormValues = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
};

export default function CheckoutForm() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);
    const totals = useMemo(() => getCartTotal(items), [items]);
    const [values, setValues] = useState<CheckoutFormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

    const updateField = <Field extends keyof CheckoutFormValues>(
        field: Field,
        value: CheckoutFormValues[Field]
    ) => {
        setValues((currentValues) => ({
            ...currentValues,
            [field]: value,
        }));
        setErrors((currentErrors) => ({
            ...currentErrors,
            [field]: undefined,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!items.length) {
            setPaymentStatus("failed");
            return;
        }

        const validation = checkoutSchema.safeParse(values);

        if (!validation.success) {
            const fieldErrors: FormErrors = {};

            for (const issue of validation.error.issues) {
                const field = issue.path[0] as keyof CheckoutFormValues | undefined;

                if (field && !fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            }

            setErrors(fieldErrors);
            setPaymentStatus("idle");
            return;
        }

        setErrors({});
        setPaymentStatus("processing");

        window.setTimeout(() => {
            dispatch(clearCart());
            setPaymentStatus("success");
        }, 1200);
    };

    if (paymentStatus === "success") {
        return (
            <section className="rounded-lg border border-pink-200 bg-pink-50 p-6 text-pink-950 dark:border-pink-900 dark:bg-pink-950/30 dark:text-pink-100">
                <p className="text-sm font-semibold uppercase tracking-wide">
                    Payment approved
                </p>
                <h1 className="mt-2 text-2xl font-bold">Thanks for your order.</h1>
                <p className="mt-2 text-sm">
                    Your mock payment was processed successfully and the cart is now
                    cleared.
                </p>
                <Link
                    href="/"
                    className="mt-5 inline-flex rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                    Continue shopping
                </Link>
            </section>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-neutral-950"
            noValidate
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Checkout</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Secure mock payment for {formatCurrency(totals.total)}
                    </p>
                </div>
                <Link href="/cart" className="text-sm font-semibold hover:underline">
                    Edit cart
                </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                    label="Full name"
                    value={values.fullName}
                    error={errors.fullName}
                    onChange={(value) => updateField("fullName", value)}
                />
                <Field
                    label="Email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={(value) => updateField("email", value)}
                />
                <Field
                    label="Phone"
                    value={values.phone}
                    error={errors.phone}
                    onChange={(value) => updateField("phone", value)}
                />
                <Field
                    label="City"
                    value={values.city}
                    error={errors.city}
                    onChange={(value) => updateField("city", value)}
                />
                <Field
                    label="Address"
                    value={values.address}
                    error={errors.address}
                    onChange={(value) => updateField("address", value)}
                    className="sm:col-span-2"
                />
                <Field
                    label="Postal code"
                    value={values.postalCode}
                    error={errors.postalCode}
                    onChange={(value) => updateField("postalCode", value)}
                />
                <label className="grid gap-2 text-sm">
                    <span className="font-medium">Payment method</span>
                    <select
                        value={values.paymentMethod}
                        onChange={(event) =>
                            updateField(
                                "paymentMethod",
                                event.target.value as CheckoutFormValues["paymentMethod"]
                            )
                        }
                        className="h-11 rounded-md border border-gray-200 px-3 outline-none focus:border-black dark:border-gray-800 dark:bg-neutral-950 dark:focus:border-white"
                    >
                        <option value="card">Mock card</option>
                        <option value="cash">Cash on delivery</option>
                    </select>
                    {errors.paymentMethod && (
                        <span className="text-xs font-medium text-red-600">
                            {errors.paymentMethod}
                        </span>
                    )}
                </label>
            </div>

            {paymentStatus === "failed" && (
                <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">
                    Add at least one item to your cart before checkout.
                </p>
            )}

            <button
                type="submit"
                disabled={paymentStatus === "processing"}
                className="mt-6 inline-flex w-full justify-center rounded-md bg-pink-600 px-4 py-3 text-sm font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-pink-200 dark:text-black dark:hover:bg-pink-300"
            >
                {paymentStatus === "processing" ? "Processing payment..." : "Pay now"}
            </button>
        </form>
    );
}

type FieldProps = {
    label: string;
    value: string;
    error?: string;
    type?: string;
    className?: string;
    onChange: (value: string) => void;
};

function Field({
    label,
    value,
    error,
    type = "text",
    className = "",
    onChange,
}: FieldProps) {
    return (
        <label className={`grid gap-2 text-sm ${className}`}>
            <span className="font-medium">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 rounded-md border border-gray-200 px-3 outline-none focus:border-black dark:border-gray-800 dark:bg-neutral-950 dark:focus:border-white"
            />
            {error && <span className="text-xs font-medium text-red-600">{error}</span>}
        </label>
    );
}
