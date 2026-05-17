import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
    id: number;
    title: string;
    price: number;
    description?: string;
    category?: Category;
    images: string[];
 
};

export type Category = {
    id: number;
    name: string;
    image: string;
};

export type SortOption = "price-low" | "price-high";

type ProductState = {
    featuredItems: Product[];
    items: Product[];
    searchItems: Product[];
    categories: Category[];
    selectedCategoryId: number | null;
    sortBy: SortOption;
    page: number;
    limit: number;
    hasNextPage: boolean;
    wishlistIds: number[];
    loading: boolean;
    searchLoading: boolean;
    featuredLoading: boolean;
    categoriesLoading: boolean;
    error: string | null;
    searchError: string | null;
    categoriesError: string | null;
};

const initialState: ProductState = {
    featuredItems: [],
    items: [],
    searchItems: [],
    categories: [],
    selectedCategoryId: null,
    sortBy: "price-low",
    page: 1,
    limit: 10,
    hasNextPage: false,
    wishlistIds: [],
    loading: false,
    searchLoading: false,
    featuredLoading: false,
    categoriesLoading: false,
    error: null,
    searchError: null,
    categoriesError: null,
};

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

async function getJson<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Unable to load products right now.");
    }

    return (await res.json()) as T;
}

// first 4 products in as featured products
export const fetchFeaturedProducts = createAsyncThunk(
    "products/fetchFeatured",
    async () => {
        return getJson<Product[]>(`${API_BASE_URL}/products?offset=0&limit=4`);
    }
);

export const fetchProducts = createAsyncThunk(
    "products/fetch", // "sliceName/actionName" here
    async ({
        page,
        limit,
        categoryId,
    }: {
        page: number;
        limit: number;
        categoryId: number | null;
    }) => {
        const offset = (page - 1) * limit;
        const endpoint = categoryId
            ? `${API_BASE_URL}/categories/${categoryId}/products?offset=${offset}&limit=${limit}`
            : `${API_BASE_URL}/products?offset=${offset}&limit=${limit}`;
        const products = await getJson<Product[]>(endpoint);

        return {
            products,
            hasNextPage: products.length === limit,
        };
    }
);

export const fetchSearchProducts = createAsyncThunk(
    "products/fetchSearch",
    async () => {
        return getJson<Product[]>(`${API_BASE_URL}/products`);
    }
);

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async () => {
        const categories = await getJson<Category[]>(`${API_BASE_URL}/categories`);

        return categories.filter((category) => category.name && category.image);
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (id: number) => {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);

        if (!res.ok) {
            throw new Error("Product not found.");
        }

        return (await res.json()) as Product;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSelectedCategory(state, action: PayloadAction<number | null>) {
            state.selectedCategoryId = action.payload;
            state.page = 1;
        },
        setSortBy(state, action: PayloadAction<SortOption>) {
            state.sortBy = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = Math.max(1, action.payload);
        },
        toggleWishlist(state, action: PayloadAction<number>) {
            const productId = action.payload;
            if (state.wishlistIds.includes(productId)) {
                state.wishlistIds = state.wishlistIds.filter((id) => id !== productId);
            } else {
                state.wishlistIds.push(productId);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.featuredLoading = true;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.featuredItems = action.payload;
                state.featuredLoading = false;
            })
            .addCase(fetchFeaturedProducts.rejected, (state) => {
                state.featuredLoading = false;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload.products;
                state.hasNextPage = action.payload.hasNextPage;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Unable to load products.";
            })
            .addCase(fetchSearchProducts.pending, (state) => {
                state.searchLoading = true;
                state.searchError = null;
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {
                state.searchItems = action.payload;
                state.searchLoading = false;
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError =
                    action.error.message ?? "Unable to search products.";
            })
            .addCase(fetchCategories.pending, (state) => {
                state.categoriesLoading = true;
                state.categoriesError = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.categoriesLoading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.categoriesLoading = false;
                state.categoriesError = action.error.message ?? "Unable to load categories.";
            });
    },
});

export const { setSelectedCategory, setSortBy, setPage, toggleWishlist } =
    productSlice.actions;
export default productSlice.reducer;
