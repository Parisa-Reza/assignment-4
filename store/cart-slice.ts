import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./product-slice";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    categoryName: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const clampQuantity = (quantity: number) => Math.min(99, Math.max(1, quantity));

function toCartItem(product: Product): CartItem {
    const [firstImage] = product.images ?? [];

    return {
        id: product.id,
        title: product.title,
        price: product.price,
        image:
            firstImage?.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "") ??
            "https://placehold.co/640x480?text=Product",
        categoryName: product.category?.name ?? "Product",
        quantity: 1,
    };
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity = clampQuantity(existingItem.quantity + 1);
                return;
            }

            state.items.push(toCartItem(action.payload));
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateCartItemQuantity(
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) {
            const item = state.items.find(
                (cartItem) => cartItem.id === action.payload.id
            );

            if (item) {
                item.quantity = clampQuantity(action.payload.quantity);
            }
        },
        clearCart(state) {
            state.items = [];
        },
        setCartItems(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload.map((item) => ({
                ...item,
                quantity: clampQuantity(item.quantity),
            }));
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
