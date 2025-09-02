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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ category: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onFiltersChange({ brand: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Color
          </label>
          <select
            value={filters.color}
            onChange={(e) => onFiltersChange({ color: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e) => onFiltersChange({ gender: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all"
          >
            <option value="">All</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Price Range (USD)
          </label>
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  onFiltersChange({ minPrice: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                min="0"
              />
            </div>
            <div className="flex items-center">
              <span className="text-slate-500 text-sm">to</span>
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice === 999999 ? "" : filters.maxPrice}
                onChange={(e) =>
                  onFiltersChange({
                    maxPrice: parseInt(e.target.value) || 999999,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* In Stock */}
        <div>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) =>
                onFiltersChange({ inStockOnly: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded transition-all"
            />
            <span className="ml-3 text-sm text-slate-700">In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Clear Button */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
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
          className="w-full px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
