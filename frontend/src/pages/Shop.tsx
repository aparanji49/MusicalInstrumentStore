import { useEffect, useState } from "react";
import { fetchGraphQL } from "../lib/api";
import type { Product } from "../types";
import GroupProducts from "../components/GroupProducts";

const SHOP_QUERY = `
  query Shop($limit: Int!) {
    products: allProducts(limit: $limit) {
      _id
      name
      brand
      price
      images
      isNewArrival
    }
  }
`;

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGraphQL<{ products: Product[] }>(SHOP_QUERY, { limit: 20 })
      .then((data) => setProducts(data.products))
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 text-red-600">
        Error: {error}
      </div>
    );
  }

  return <GroupProducts title="All Products" products={products} />;
}
