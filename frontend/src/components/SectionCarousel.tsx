import { useRef } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types";

type Props = {
  title: string;
  viewAllHref?: string;
  products: Product[];
};

export default function SectionCarousel({ title, viewAllHref = "#", products }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="relative py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <a href={viewAllHref} className="text-sm underline underline-offset-4">
            View all →
          </a>
        </div>

        {/* arrows (desktop) */}
        <button
          aria-label="Previous"
          onClick={() => scrollBy(-320)}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:grid h-10 w-8 place-items-center rounded-r bg-neutral-200/90 hover:bg-neutral-300"
        >
          ‹
        </button>

        <div
          ref={scroller}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 md:px-0"
        >
          {products.map((p) => (
            <div key={p._id} className="min-w-[280px]">
              <ProductCard p={p} />
            </div>
          ))}
          {/* empty state */}
          {products.length === 0 && (
            <div className="text-sm opacity-70">No products found.</div>
          )}
        </div>

        <button
          aria-label="Next"
          onClick={() => scrollBy(320)}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:grid h-10 w-8 place-items-center rounded-l bg-neutral-200/90 hover:bg-neutral-300"
        >
          ›
        </button>
      </div>
    </section>
  );
}
