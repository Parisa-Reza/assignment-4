import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>

          <Navbar />

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </Providers>
      </body>
    </html>
  );
}