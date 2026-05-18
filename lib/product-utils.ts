import type { Product } from "@/store/product-slice";

export function getProductImage(product: Product): string {
    const [firstImage] = product.images ?? [];
    const rawImage = firstImage ?? "https://placehold.co/640x480?text=Product";
    const cleaned = rawImage.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "");

    try {
        const url = new URL(cleaned);

        if (url.hostname === "placehold.co" && !url.pathname.match(/\.[a-zA-Z0-9]+$/)) {
            url.pathname = `${url.pathname}.png`;
        }

        return url.toString();
    } catch {
        return cleaned;
    }
}


export function sortProducts(products: Product[], sortBy: string) {
    const nextProducts = [...products];

    if (sortBy === "price-low") {
        return nextProducts.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
        return nextProducts.sort((a, b) => b.price - a.price);
    }


    return nextProducts;
}
