import CartSummary from "@/components/cart/CartSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata = {
    title: "Checkout | KenaKata",
    description: "Complete your KenaKata order with a mock payment flow.",
};

export default function CheckoutPage() {
    return (
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
            <CheckoutForm />
            <CartSummary showCheckoutLink={false} />
        </div>
    );
}
