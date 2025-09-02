"use client";

import { ProductFilters } from "../types/product";
import {
  getUniqueCategories,
  getUniqueBrands,
  getUniqueColors,
} from "../utils/mockData";

interface FilterPanelProps {
  filters: ProductFilters;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
}

export default function FilterPanel({
  filters,
  onFiltersChange,
}: FilterPanelProps) {
  const categories = getUniqueCategories();
  const brands = getUniqueBrands();
  const colors = getUniqueColors();

  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onFiltersChange({ brand: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <select
            value={filters.color}
            onChange={(e) => onFiltersChange({ color: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Colors</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e) => onFiltersChange({ gender: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onFiltersChange({ minPrice: parseInt(e.target.value) || 0 })
              }
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice === 999999 ? "" : filters.maxPrice}
              onChange={(e) =>
                onFiltersChange({
                  maxPrice: parseInt(e.target.value) || 999999,
                })
              }
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* In Stock */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) =>
                onFiltersChange({ inStockOnly: e.target.checked })
              }
              className="mr-2"
            />
            <span className="text-sm">In Stock Only</span>
          </label>
        </div>

        {/* Clear Button */}
        <button
          onClick={() =>
            onFiltersChange({
              category: "",
              brand: "",
              color: "",
              gender: "",
              minPrice: 0,
              maxPrice: 999999,
              inStockOnly: false,
            })
          }
          className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
