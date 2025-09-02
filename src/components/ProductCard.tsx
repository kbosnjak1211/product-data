"use client";

import Image from "next/image";
import { memo } from "react";
import {
  Product,
  parsePrice,
  isInStock,
  getDiscountPercentage,
} from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const salePrice = parsePrice(product.sale_price);
  const listPrice = parsePrice(product.list_price);
  const discountPercent = getDiscountPercentage(
    product.list_price,
    product.sale_price
  );
  const inStock = isInStock(product.availability);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
      {/* Fixed image container */}
      <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-200 relative">
        <Image
          src={product.image_link}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-full object-cover"
          priority={false}
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{discountPercent}%
          </div>
        )}

        {/* Out of Stock */}
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Brand */}
        <p className="text-sm font-medium text-blue-600 mb-1">
          {product.brand}
        </p>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Tags */}
        <div className="flex gap-2 mb-3">
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {product.category}
          </span>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
            {product.color}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(salePrice)}
            </span>
            {listPrice > salePrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(listPrice)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">Size: {product.sizes}</span>
        </div>

        {/* Button */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center font-medium transition-colors"
        >
          View Product
        </a>
      </div>
    </div>
  );
});

export default ProductCard;
