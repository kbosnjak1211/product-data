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
    <div className="container mx-auto px-4 py-8">
      {/* Search */}
      <div className="mb-6">
        <SearchBar onSearch={(search) => updateFilters({ search })} />
        <p className="mt-2 text-sm text-gray-600">
          {total > 0
            ? `Showing ${products.length} of ${total} products`
            : "Loading..."}
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <FilterPanel filters={filters} onFiltersChange={updateFilters} />
        </div>

        {/* Products */}
        <div className="flex-1">
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
