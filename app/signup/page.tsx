import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
    title: "Sign up | KenaKata",
    description: "Create a KenaKata account to add products and checkout.",
};

export default function SignupPage() {
    return (
        <Suspense>
            <AuthForm mode="signup" />
        </Suspense>
    );
}
