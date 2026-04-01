"use server";

import { unstable_cache, revalidateTag } from "next/cache";
import { productsRepository } from "@/lib/db/drizzle/repositories";
import {
  type ProductCategory,
  productWithVariantsSchema,
  type ProductWithVariants,
} from "@/lib/db/drizzle/schema";

/**
 * Fetch all products with caching
 * Cache is tagged for invalidation and set to revalidate every hour
 */
export const getAllProducts = unstable_cache(
  async (): Promise<ProductWithVariants[]> => {
    try {
      const products = await productsRepository.findAll();
      const validatedProducts = productWithVariantsSchema
        .array()
        .parse(products);
      return validatedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);

/**
 * Fetch products by category with caching
 * Each category has its own cache entry (category arg becomes part of cache key)
 */
export async function getCategoryProducts(
  category: ProductCategory,
): Promise<ProductWithVariants[]> {
  const cached = unstable_cache(
    async () => {
      try {
        const products = await productsRepository.findByCategory(category);
        const validatedProducts = productWithVariantsSchema
          .array()
          .parse(products);
        return validatedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } catch (error) {
        console.error("Error fetching category products:", error);
        return [];
      }
    },
    ["products", `category-${category}`],
    { revalidate: 3600, tags: ["products", `category-${category}`] },
  );
  return cached();
}

/**
 * Fetch a single product by ID with caching
 * Each product has its own cache entry (productId arg becomes part of cache key)
 */
export async function getProduct(
  productId: number,
): Promise<ProductWithVariants | null> {
  const cached = unstable_cache(
    async () => {
      try {
        const product = await productsRepository.findById(productId);
        if (!product) return null;
        return productWithVariantsSchema.parse(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        return null;
      }
    },
    ["products", `product-${productId}`],
    { revalidate: 3600, tags: ["products", `product-${productId}`] },
  );
  return cached();
}

/**
 * Fetch random products excluding a specific product
 * Note: This is dynamic (random) so it stays outside cache
 * It benefits from the cached getAllProducts() call
 */
export async function getRandomProducts(
  productIdToExclude: number,
): Promise<ProductWithVariants[]> {
  try {
    const allProducts = await getAllProducts();
    const filtered = allProducts.filter((p) => p.id !== productIdToExclude);
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return productWithVariantsSchema.array().parse(shuffled.slice(0, 6));
  } catch (error) {
    console.error("Error fetching random products:", error);
    return [];
  }
}

/**
 * Invalidates all product caches immediately
 * Call this after creating, updating, or deleting products
 * Uses revalidateTag for cache invalidation
 */
export async function revalidateProducts(productId?: number): Promise<void> {
  // Always invalidate the general products tag
  revalidateTag("products");

  // If a specific product ID is provided, also invalidate that specific product
  if (productId) {
    revalidateTag(`product-${productId}`);
  }
}
