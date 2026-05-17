"use client";

import { useEffect, useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import { fetchRelatedProducts } from "@/store/product-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type RelatedProductsProps = {
    categoryId?: number;
    currentProductId: number;
};

export default function RelatedProducts({
    categoryId,
    currentProductId,
}: RelatedProductsProps) {
    const dispatch = useAppDispatch();
    const { relatedItems, relatedLoading, relatedError } = useAppSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchRelatedProducts(categoryId));
        }
    }, [categoryId, dispatch]);

    const visibleProducts = useMemo(
        () =>
            relatedItems
                .filter((product) => product.id !== currentProductId)
                .slice(0, 4),
        [currentProductId, relatedItems]
    );

    if (!categoryId) {
        return null;
    }

    return (
        <section className="mt-12">
            <div className="mb-5">
                <h2 className="text-2xl font-bold">Related Products</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    More products from the same category.
                </p>
            </div>

            {relatedLoading && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-72 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-900"
                        />
                    ))}
                </div>
            )}

            {!relatedLoading && relatedError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                    {relatedError}
                </div>
            )}

            {!relatedLoading && !relatedError && visibleProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {!relatedLoading && !relatedError && visibleProducts.length === 0 && (
                <div className="rounded-lg border border-gray-200 p-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    No related products found in this category.
                </div>
            )}
        </section>
    );
}
