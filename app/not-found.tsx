import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-gray-600">
        We could not find that page.
      </p>

      <Link
        href="/"
        className="mt-6 text-blue-500 hover:underline"
      >
        Go home
      </Link>
    </main>
  );
}