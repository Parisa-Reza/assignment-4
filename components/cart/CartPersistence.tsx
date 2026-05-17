"use client";

import { useEffect, useRef } from "react";
import { CART_STORAGE_KEY } from "@/lib/cart-utils";
import { setCartItems, type CartItem } from "@/store/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function isSavedCart(value: unknown): value is CartItem[] {
    return (
        Array.isArray(value) &&
        value.every(
            (item) =>
                typeof item === "object" &&
                item !== null &&
                typeof item.id === "number" &&
                typeof item.title === "string" &&
                typeof item.price === "number" &&
                typeof item.image === "string" &&
                typeof item.categoryName === "string" &&
                typeof item.quantity === "number"
        )
    );
}

export default function CartPersistence() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);
    const hasLoadedSavedCart = useRef(false);

    useEffect(() => {
        const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);

                if (isSavedCart(parsedCart)) {
                    dispatch(setCartItems(parsedCart));
                }
            } catch {
                window.localStorage.removeItem(CART_STORAGE_KEY);
            }
        }

        hasLoadedSavedCart.current = true;
    }, [dispatch]);

    useEffect(() => {
        if (!hasLoadedSavedCart.current) {
            return;
        }

        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    return null;
}
