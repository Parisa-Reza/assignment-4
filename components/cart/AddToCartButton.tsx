"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import { addToCart } from "@/store/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticated = useAppSelector(
        (state) => state.auth.status === "authenticated" && Boolean(state.auth.user)
    );

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }

        dispatch(addToCart(product));
    };

    return (
        <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-2 rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 dark:bg-pink-200 dark:text-black dark:hover:bg-pink-300 ${className}`}
        >
            <FaCartPlus className="text-pink-200 dark:text-pink-600" aria-hidden="true" />
            {isAuthenticated ? "Add to cart" : "Login to add"}
        </button>
    );
}
