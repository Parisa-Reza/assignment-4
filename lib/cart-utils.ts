import type { CartItem } from "@/store/cart-slice";

export const CART_STORAGE_KEY = "kenakata:cartItems";

export function getCartSubtotal(items: CartItem[]) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartItemCount(items: CartItem[]) {
    return items.reduce((total, item) => total + item.quantity, 0);
}


export function getCartTotal(items: CartItem[]) {
    const subtotal = getCartSubtotal(items);


    return {
        subtotal,
        total: subtotal 
    };
}

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}
