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
    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden bg-slate-100 relative">
        <Image
          src={product.image_link}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
          loading="lazy"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
            -{discountPercent}%
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold bg-black/50 px-3 py-1 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Brand */}
        <p className="text-sm font-medium text-blue-600 mb-2">
          {product.brand}
        </p>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 mb-3 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
            {product.category}
          </span>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
            {product.color}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(salePrice)}
            </span>
            {listPrice > salePrice && (
              <span className="text-sm text-slate-500 line-through">
                {formatPrice(listPrice)}
              </span>
            )}
          </div>
          <div className="text-right text-sm text-slate-500">
            <div>Size: {product.sizes}</div>
          </div>
        </div>

        {/* Button */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-center font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm"
        >
          View Product
        </a>
      </div>
    </div>
  );
});

export default ProductCard;
