import type { Product } from "../types";
import ProductCard from "./ProductCard";

export default function GroupProducts({ products, title }: { products: Product[]; title?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
        {products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
