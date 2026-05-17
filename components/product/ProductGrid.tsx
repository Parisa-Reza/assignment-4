"use client";

import { useEffect, useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import {
  fetchProducts,
  setPage,
  setSortBy,
  type SortOption,
} from "@/store/product-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sortProducts } from "@/lib/product-utils";

export default function ProductGrid() {
  const dispatch = useAppDispatch();
  const {
    items,
    loading,
    error,
    page,
    limit,
    hasNextPage,
    selectedCategoryId,
    sortBy,
  } = useAppSelector((state) => state.products);
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit, categoryId: selectedCategoryId }));
  }, [dispatch, page, limit, selectedCategoryId]);

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredProducts = query
      ? items.filter((product) =>
          `${product.title} ${product.category?.name ?? ""}`
            .toLowerCase()
            .includes(query),
        )
      : items;

    return sortProducts(filteredProducts, sortBy);
  }, [items, searchQuery, sortBy]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Products</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} - {visibleProducts.length} shown
          </p>
        </div>

        <label className="flex w-full flex-col gap-1 text-sm font-medium sm:w-56">
          Sort
          <select
            value={sortBy}
            onChange={(event) =>
              dispatch(setSortBy(event.target.value as SortOption))
            }
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-neutral-950"
          >
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-900"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <p className="font-semibold">Products could not be loaded.</p>
          <p className="mt-1 text-sm">{error}</p>
          <button
            type="button"
            onClick={() =>
              dispatch(
                fetchProducts({ page, limit, categoryId: selectedCategoryId }),
              )
            }
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && visibleProducts.length === 0 && (
        <div className="rounded-lg border border-gray-200 p-8 text-center dark:border-gray-800">
          <h3 className="font-semibold">No products found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try another search term or category.
          </p>
        </div>
      )}

      {!loading && !error && visibleProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={page === 1 || loading}
          onClick={() => dispatch(setPage(page - 1))}
          className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800"
        >
          Previous
        </button>
        <span className="rounded-md bg-gray-400 px-4 py-2 text-sm font-semibold text-gray-950 dark:bg-gray-200 dark:text-gray-950">
          {page}
        </span>
        <button
          type="button"
          disabled={!hasNextPage || loading}
          onClick={() => dispatch(setPage(page + 1))}
          className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800"
        >
          Next
        </button>
      </div>
    </section>
  );
}
