"use client";

import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
    removeFromCart,
    updateCartItemQuantity,
    type CartItem,
} from "@/store/cart-slice";
import { useAppDispatch } from "@/store/hooks";

type CartItemControlsProps = {
    item: CartItem;
};

export default function CartItemControls({ item }: CartItemControlsProps) {
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 items-center rounded-md border border-gray-200 dark:border-gray-800">
                <button
                    type="button"
                    aria-label={`Decrease quantity for ${item.title}`}
                    onClick={() =>
                        dispatch(
                            updateCartItemQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                            })
                        )
                    }
                    className="grid h-10 w-10 place-items-center hover:bg-gray-100 dark:hover:bg-neutral-900"
                >
                    <FaMinus className="text-xs" aria-hidden="true" />
                </button>
                <input
                    aria-label={`Quantity for ${item.title}`}
                    min={1}
                    max={99}
                    type="number"
                    value={item.quantity}
                    onChange={(event) =>
                        dispatch(
                            updateCartItemQuantity({
                                id: item.id,
                                quantity: Number(event.target.value) || 1,
                            })
                        )
                    }
                    className="h-10 w-14 border-x border-gray-200 text-center text-sm font-semibold outline-none dark:border-gray-800 dark:bg-neutral-950"
                />
                <button
                    type="button"
                    aria-label={`Increase quantity for ${item.title}`}
                    onClick={() =>
                        dispatch(
                            updateCartItemQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                            })
                        )
                    }
                    className="grid h-10 w-10 place-items-center hover:bg-gray-100 dark:hover:bg-neutral-900"
                >
                    <FaPlus className="text-xs" aria-hidden="true" />
                </button>
            </div>

            <button
                type="button"
                onClick={() => dispatch(removeFromCart(item.id))}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 px-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-gray-800 dark:hover:bg-red-950/30"
            >
                <FaTrash aria-hidden="true" />
                Remove
            </button>
        </div>
    );
}
