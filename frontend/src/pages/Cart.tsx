// import { useCart } from "../context/useCart";

import { useDispatch, useSelector } from "react-redux";
import { removeItem, selectCartItems, selectCartSubTotal } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
// import { use } from "react";

export default function CartPage() {
  // const { state, dispatch } = useCart();
  const items = useSelector(selectCartItems);
  // const count = useSelector(selectCartCount);
  const total = useSelector(selectCartSubTotal);
const dispatch = useDispatch();
const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-white text-2xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-white">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="text-white flex items-center justify-between border-b pb-2">
              <span>{item.name} (x{item.qty})</span>
              <span>${(item.price ?? 0) * item.qty}</span>
              <button
                className="text-red-500 text-sm border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
                onClick={() => dispatch(removeItem({id: item._id}))}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-white mt-4 font-bold">Total: ${total.toFixed(2)}</div>
          <button
            className="mt-auto w-full rounded-md bg-yellow-500 py-2 px-3 text-sm font-semibold
            text-white shadow hover:brightness-95 focus:outline-none
            focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
