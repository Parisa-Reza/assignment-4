import RequireAuth from "@/components/auth/RequireAuth";
import CartPageContent from "@/components/cart/CartPageContent";

export const metadata = {
    title: "Cart | KenaKata",
    description: "Review and update your KenaKata cart.",
};

export default function CartPage() {
    return (
        <RequireAuth>
            <CartPageContent />
        </RequireAuth>
    );
}
