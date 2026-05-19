import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
    title: "Login | KenaKata",
    description: "Log in to add products to your cart and checkout.",
};

export default function LoginPage() {
    return (
        <Suspense>
            <AuthForm mode="login" />
        </Suspense>
    );
}
