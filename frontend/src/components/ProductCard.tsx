// frontend/src/components/ProductCard.tsx
import { Link } from "react-router-dom";
import type { Product } from "../types";
// import { useCart } from "../context/useCart";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";

const currency = (n?: number) =>
  typeof n === "number" ? `$${n.toFixed(2)}` : "—";

const fallbackImg =
  "https://images.unsplash.com/photo-1513885535751-8b9238bd3456?q=80&w=800&auto=format&fit=crop";

export default function ProductCard({ p }: { p: Product }) {
  const img = p.images?.[0] ?? fallbackImg;
const dispatch = useDispatch();
  return (
    <div
      className="
        group relative flex flex-col overflow-hidden rounded-xl border
        border-black/10 bg-white shadow hover:shadow-lg hover:-translate-y-1
        transition-all
      "
    >
      {/* Image */}
      <Link to={`/products/${p._id}`} className="relative block overflow-hidden">
        <img
          src={img}
          alt={p.name}
          className="
            h-64 w-full object-cover transition-transform duration-300
            group-hover:scale-105
          "
          loading="lazy"
        />
        {p.isNewArrival && (
          <span className="absolute left-2 top-2 rounded bg-yellow-500 px-2 py-0.5 text-xs font-semibold">
            NEW
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <Link
          to={`/products/${p._id}`}
          className="text-base font-semibold line-clamp-2 hover:underline"
          title={p.name}
        >
          {p.name}
        </Link>
        <p className="mt-1 text-xs opacity-70">{p.brand}</p>

        <div className="mt-2 text-lg font-bold text-yellow-600">
          {currency(p.price)}
        </div>

        <button
          className="
            mt-auto w-full rounded-md bg-yellow-500 py-2 px-3 text-sm font-semibold
            text-white shadow hover:brightness-95 focus:outline-none
            focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
          "
          // TODO: hook this to your Cart context later
          onClick={() => dispatch(addItem({product: p, qty:1}))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
