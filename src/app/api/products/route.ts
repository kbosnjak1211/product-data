import { NextRequest, NextResponse } from "next/server";
import { mockProducts } from "../../../utils/mockData";
import {
  ProductsResponse,
  ProductFilters,
  parsePrice,
  isInStock,
} from "../../../types/product";

const ITEMS_PER_PAGE = 12;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const color = searchParams.get("color") || "";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "999999");
  const inStockOnly = searchParams.get("inStockOnly") === "true";
  const gender = searchParams.get("gender") || "";

  const filters: ProductFilters = {
    search,
    category,
    brand,
    color,
    minPrice,
    maxPrice,
    inStockOnly,
    gender,
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      product.brand.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesColor = !filters.color || product.color === filters.color;
    const matchesGender = !filters.gender || product.gender === filters.gender;

    const salePrice = parsePrice(product.sale_price);
    const matchesPrice =
      salePrice >= filters.minPrice && salePrice <= filters.maxPrice;

    const matchesStock =
      !filters.inStockOnly || isInStock(product.availability);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesColor &&
      matchesGender &&
      matchesPrice &&
      matchesStock
    );
  });

  const total = filteredProducts.length;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const hasMore = endIndex < total;

  const response: ProductsResponse = {
    products: paginatedProducts,
    total,
    page,
    hasMore,
  };

  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(response);
}
