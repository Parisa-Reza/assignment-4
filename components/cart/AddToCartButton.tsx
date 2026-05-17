"use client";

import { FaCartPlus } from "react-icons/fa";
import { addToCart } from "@/store/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import type { Product } from "@/store/product-slice";

type AddToCartButtonProps = {
    product: Product;
    className?: string;
};

export default function AddToCartButton({
    product,
    className = "",
}: AddToCartButtonProps) {
    const dispatch = useAppDispatch();

    return (
        <button
            type="button"
            onClick={() => dispatch(addToCart(product))}
            className={`inline-flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 ${className}`}
        >
            <FaCartPlus aria-hidden="true" />
            Add to cart
        </button>
    );
}
