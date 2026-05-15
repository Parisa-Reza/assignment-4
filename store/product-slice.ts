import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Product = {
    id: number;
    title: string;
    price: number;
    images: string[];
};

export type Category = {
    id: number;
    name: string;
    image: string;
};

type ProductState = {
    items: Product[];
    categories: Category[];
    loading: boolean;
};

const initialState: ProductState = {
    items: [],
    categories: [],
    loading: false,
};

// for featured products first 10 products has been used
export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async () => {
        const res = await fetch(
            "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
        );
        return (await res.json()) as Product[];
    }
);

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async () => {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        return (await res.json()) as Category[];
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

export default productSlice.reducer;