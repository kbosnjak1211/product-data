"use client";

import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const {
    products,
    loading,
    hasMore,
    total,
    loadMore,
    filters,
    updateFilters,
  } = useProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Section - Fixed Size */}
      <div className="mb-8">
        <div className="max-w-md">
          {" "}
          {/* This limits the search bar width */}
          <SearchBar onSearch={(search) => updateFilters({ search })} />
        </div>
        <p className="mt-3 text-sm text-slate-600">
          {total > 0
            ? `Showing ${products.length} of ${total} products`
            : loading
            ? "Loading products..."
            : "No products found"}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Fixed Width */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-6">
            <FilterPanel filters={filters} onFiltersChange={updateFilters} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          <ProductList
            products={products}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </div>
      </div>
    </div>
  );
}
