import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import RelatedProducts from "@/components/product/RelatedProducts";
import { getProductImage } from "@/lib/product-utils";
import type { Product } from "@/store/product-slice";

export const revalidate = 300;

// const API_BASE_URL = "https://api.escuelajs.co/api/v1";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProductPageProps = {
    params: Promise<{
        id: string;
    }>;
};

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        next: { revalidate },
    });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error("Unable to load product.");
    }

    return (await res.json()) as Product;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    return {
        title: `${product.title} | KenaKata`,
        description: product.description,
    };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProduct(id);


    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <Link
                href="/"
                className="mb-6 inline-flex rounded-md border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-neutral-900"
            >
                Back to products
            </Link>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-900">
                    <Image
                        src={getProductImage(product)}
                        alt={product.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                <section className="space-y-5">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {product.category?.name ?? "Product"}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
                            {product.title}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <p className="text-3xl font-bold">${product.price}</p>
                    </div>

                    <p className="leading-7 text-gray-600 dark:text-gray-300">
                        {product.description ?? "No description is available for this product."}
                    </p>

                    <AddToCartButton product={product} className="w-full sm:w-auto" />

                    <div className="grid gap-3 rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-800 sm:grid-cols-3">
                        <div>
                            <p className="font-semibold">Availability</p>
                            <p className="text-gray-500 dark:text-gray-400">In stock</p>
                        </div>
                        <div>
                            <p className="font-semibold">Shipping</p>
                            <p className="text-gray-500 dark:text-gray-400">Standard delivery</p>
                        </div>
                        <div>
                            <p className="font-semibold">Returns</p>
                            <p className="text-gray-500 dark:text-gray-400">7 day return</p>
                        </div>
                    </div>


                </section>
            </div>

            <RelatedProducts
                categoryId={product.category?.id}
                currentProductId={product.id}
            />
        </main>
    );
}
