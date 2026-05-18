import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/hero-background.webp"
                    alt="Modern ecommerce hero with clothing and electronics"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 py-28 text-center text-white sm:px-6 lg:px-8">
                <span className="inline-flex rounded-md bg-pink-500/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-pink-500/20">
                    New arrivals • Clothing & electronics
                </span>
                <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    Shop smart style and tech essentials
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-pink-100 sm:text-lg">
                    Discover a curated collection of fashion, gadgets, and accessories for every lifestyle — powered by premium deals and fast delivery.
                </p>

            </div>
        </section>
    );
}