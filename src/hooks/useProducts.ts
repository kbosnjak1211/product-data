"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import useSWR from "swr";
import { Product, ProductFilters, ProductsResponse } from "../types/product";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    brand: "",
    color: "",
    gender: "",
    minPrice: 0,
    maxPrice: 999999,
    inStockOnly: false,
  });

  // Memoize query params to prevent unnecessary re-renders
  const queryParams = useMemo(() => {
    const params = new URLSearchParams({
      page: page.toString(),
      search: filters.search,
      category: filters.category,
      brand: filters.brand,
      color: filters.color,
      gender: filters.gender,
      minPrice: filters.minPrice.toString(),
      maxPrice: filters.maxPrice.toString(),
      inStockOnly: filters.inStockOnly.toString(),
    });
    return params.toString();
  }, [page, filters]);

  const { data, error, isLoading } = useSWR<ProductsResponse>(
    `/api/products?${queryParams}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      keepPreviousData: true,
    }
  );

  // Update products when data changes
  useEffect(() => {
    if (data) {
      if (page === 1) {
        // Reset products for first page or new filters
        setAllProducts(data.products);
      } else {
        // Append products for subsequent pages
        setAllProducts((prev) => [...prev, ...data.products]);
      }
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (data?.hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [data?.hasMore, isLoading]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
    setAllProducts([]); // Clear products when filters change
  }, []);

  return {
    products: allProducts,
    loading: isLoading,
    error,
    hasMore: data?.hasMore || false,
    total: data?.total || 0,
    loadMore,
    filters,
    updateFilters,
  };
};
