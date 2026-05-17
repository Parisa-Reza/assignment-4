import type { Product } from "@/store/product-slice";

export function getProductImage(product: Product): string {
    const [firstImage] = product.images ?? [];

    if (!firstImage) {
        return "https://placehold.co/640x480?text=Product";
    }

    return firstImage.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "");
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
