"use client";

import { useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { fetchFeaturedProducts } from "@/store/product-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function FeaturedProducts() {
    const dispatch = useAppDispatch();
    const { featuredItems, featuredLoading } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchFeaturedProducts());
    }, [dispatch]);

    return (
        <section className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-5">
                <h2 className="text-2xl font-bold">Featured Products</h2>
            </div>

            {featuredLoading && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-72 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-900"
                        />
                    ))}
                </div>
            )}

            {!featuredLoading && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredItems.slice(0, 4).map((product, index) => (
                        <ProductCard key={product.id} product={product} priority={index === 0} />
                    ))}
                </div>
            )}
        </section>
    );
}
