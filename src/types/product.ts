export interface Product {
  id: number;
  title: string;
  description: string;
  link: string;
  image_link: string;
  additional_image_link: string;
  availability: string;
  list_price: string;
  sale_price: string;
  gtin: string;
  product_type: string;
  brand: string;
  condition: string;
  raw_color: string;
  color: string;
  gender: string;
  size_format: string;
  sizing_schema: string;
  sizes: string;
  size_type: string;
  item_group_id: number;
  category: string;
  shipping: string;
  mpn: string;
  material: string;
  collection: string;
  additional_image_link_2?: string;
  additional_image_link_3?: string;
  additional_image_link_4?: string;
}

export interface ProductFilters {
  search: string;
  category: string;
  brand: string;
  color: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  gender: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const parsePrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/[^0-9.]/g, "")) || 0;
};

export const isInStock = (availability: string): boolean => {
  return availability.toLowerCase().includes("in stock");
};

export const getDiscountPercentage = (
  listPrice: string,
  salePrice: string
): number => {
  const list = parsePrice(listPrice);
  const sale = parsePrice(salePrice);
  if (list > 0 && sale > 0) {
    return Math.round(((list - sale) / list) * 100);
  }
  return 0;
};
