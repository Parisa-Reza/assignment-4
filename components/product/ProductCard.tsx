"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getProductImage } from "@/lib/product-utils";
import { toggleWishlist, type Product } from "@/store/product-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type ProductCardProps = {
    product: Product;
    priority?: boolean;
};

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const wishlistIds = useAppSelector((state) => state.products.wishlistIds);
    const isWishlisted = wishlistIds.includes(product.id);

    return (
        <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-neutral-950">
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-neutral-900">
                    <Image
                        src={getProductImage(product)}
                        alt={product.title}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>

            <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <Link
                            href={`/products/${product.id}`}
                            className="line-clamp-2 font-semibold text-gray-950 hover:underline dark:text-white"
                        >
                            {product.title}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {product.category?.name ?? "Product"}
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={() => dispatch(toggleWishlist(product.id))}
                        className="rounded-full border border-gray-200 p-2 text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-neutral-900"
                    >
                        {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                    </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-bold ">${product.price}</p>
                </div>
            </div>
        </article>
    );
}
