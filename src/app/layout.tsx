import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Data App - Find Amazing Products",
  description:
    "Browse our extensive collection of products with advanced search and filtering options",
  keywords: "products, shopping, fashion, clothing, accessories",
  authors: [{ name: "Product Data App Team" }],
  openGraph: {
    title: "Product Data App - Find Amazing Products",
    description:
      "Browse our extensive collection of products with advanced search and filtering options",
    type: "website",
    siteName: "Product Data App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Data App - Find Amazing Products",
    description:
      "Browse our extensive collection of products with advanced search and filtering options",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-50">
          <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-slate-900">
                Product Data App
              </h1>
              <p className="text-slate-600 mt-2">
                Discover amazing products with advanced search and filtering
              </p>
            </div>
          </header>

          <main>{children}</main>

          <footer className="bg-white border-t border-slate-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-600">
              <p>&copy; 2024 Product Data App. Built with Next.js and React.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
