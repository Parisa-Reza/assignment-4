"use client";

import { useEffect, useRef } from "react";
import { setWishlistIds } from "@/store/product-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const WISHLIST_STORAGE_KEY = "kenakata:wishlistIds";

export default function WishlistPersistence() {
    const dispatch = useAppDispatch();
    const wishlistIds = useAppSelector((state) => state.products.wishlistIds);
    const hasLoadedSavedWishlist = useRef(false);

    useEffect(() => {
        const savedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);

        if (savedWishlist) {
            try {
                const parsedWishlist = JSON.parse(savedWishlist);

                if (
                    Array.isArray(parsedWishlist) &&
                    parsedWishlist.every((id) => typeof id === "number")
                ) {
                    dispatch(setWishlistIds(parsedWishlist));
                }
            } catch {
                window.localStorage.removeItem(WISHLIST_STORAGE_KEY);
            }
        }

        hasLoadedSavedWishlist.current = true;
    }, [dispatch]);

    useEffect(() => {
        if (!hasLoadedSavedWishlist.current) {
            return;
        }

        window.localStorage.setItem(
            WISHLIST_STORAGE_KEY,
            JSON.stringify(wishlistIds)
        );
    }, [wishlistIds]);

    return null;
}
