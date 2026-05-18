"use client";

import { useEffect, useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import {
  fetchSearchProducts,
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
    searchItems,
    loading,
    searchLoading,
    error,
    searchError,
    page,
    limit,
    hasNextPage,
    selectedCategoryId,
    sortBy,
  } = useAppSelector((state) => state.products);
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const trimmedSearchQuery = searchQuery.trim();
  const isSearching = trimmedSearchQuery.length > 0;

  useEffect(() => {
    if (isSearching) {
      dispatch(fetchSearchProducts());
      return;
    }

    dispatch(fetchProducts({ page, limit, categoryId: selectedCategoryId }));
  }, [dispatch, page, limit, selectedCategoryId, isSearching]);

  const visibleProducts = useMemo(() => {
    const query = trimmedSearchQuery.toLowerCase();

    if (isSearching) {
      return searchItems.filter((product) =>
        `${product.title} ${product.category?.name ?? ""}`
          .toLowerCase()
          .includes(query),
      );
    }

    return sortProducts(items, sortBy);
  }, [items, searchItems, trimmedSearchQuery, isSearching, sortBy]);

  const activeLoading = isSearching ? searchLoading : loading;
  const activeError = isSearching ? searchError : error;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {isSearching ? "Search Results" : "All Products"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isSearching
              ? `${visibleProducts.length} products found for "${trimmedSearchQuery}"`
              : `Page ${page} - ${visibleProducts.length} shown`}
          </p>
        </div>

        {!isSearching && (
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
        )}
      </div>

      {activeLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-900"
            />
          ))}
        </div>
      )}

      {!activeLoading && activeError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <p className="font-semibold">Products could not be loaded.</p>
          <p className="mt-1 text-sm">{activeError}</p>
          <button
            type="button"
            onClick={() =>
              isSearching
                ? dispatch(fetchSearchProducts())
                : dispatch(
                  fetchProducts({ page, limit, categoryId: selectedCategoryId }),
                )
            }
            className="mt-4 rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
          >
            Try again
          </button>
        </div>
      )}

      {!activeLoading && !activeError && visibleProducts.length === 0 && (
        <div className="rounded-lg border border-gray-200 p-8 text-center dark:border-gray-800">
          <h3 className="font-semibold">No products found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isSearching
              ? "Try another search term."
              : "Try another category."}
          </p>
        </div>
      )}

      {!activeLoading && !activeError && visibleProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isSearching && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page === 1 || loading}
            onClick={() => dispatch(setPage(page - 1))}
            className="rounded-md border border-pink-600 bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-pink-300 dark:bg-pink-300 dark:text-black dark:hover:bg-pink-400"
          >
            Previous
          </button>
          <span className="rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white dark:bg-pink-300 dark:text-black ">
            {page}
          </span>
          <button
            type="button"
            disabled={!hasNextPage || loading}
            onClick={() => dispatch(setPage(page + 1))}
            className="rounded-md border border-pink-600 bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-pink-300 dark:bg-pink-300 dark:text-black dark:hover:bg-pink-400"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
