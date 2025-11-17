// frontend/src/pages/Checkout.tsx
import React, {
  useEffect,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubTotal,
} from "../store/slices/cartSlice";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  qty: number;
}

type EmailInputProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
  // CRA: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:4000";

// ---------- Simple email input (no Stripe email API here) ----------
const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  error,
  setError,
}) => {
  const handleBlur = () => {
    if (!email) {
      setError("Email is required");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(e.target.value);
  };

  return (
    <div className="space-y-1 mb-4 w-full">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-slate-700"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
          error ? "border-red-500" : "border-slate-300"
        }`}
        placeholder="you@example.com"
      />
      {error && (
        <p id="email-errors" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

// ---------- Inner form that actually talks to Stripe ----------
const CheckoutForm: React.FC = () => {
  const items = useSelector(selectCartItems) as CartItem[];
  const subtotal = useSelector(selectCartSubTotal) as number;

  const tax = subtotal * 0.09;
  const total = subtotal + tax;

  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js not yet loaded
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        receipt_email: email,
      },
    });

    if (error) {
      setMessage(error.message ?? "Something went wrong.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center flex-col md:flex-row gap-6 p-6">
      {/* LEFT: payment / customer info */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow-sm max-w-2xl mx-auto md:mx-0">
        <h2 className="text-xl font-semibold mb-1">Checkout</h2>
        <p className="text-sm text-slate-500 mb-6">
          Enter your email and payment details to complete your order.
        </p>

        {/* 🔔 Demo banner */}
        <div className="mt-3 mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <p className="text-[11px] text-amber-800 leading-snug">
            <span className="font-semibold">Demo mode:</span> no real payments
            are processed. Use Stripe test cards such as{" "}
            <span className="font-mono">4242 4242 4242 4242</span> with any
            future expiry, any CVC, and any ZIP.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailInput
            email={email}
            setEmail={setEmail}
            error={emailError}
            setError={setEmailError}
          />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-700">
              Payment details
            </h3>
            <div className="rounded-lg border border-slate-200 p-3">
              <PaymentElement id="payment-element" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-black text-white py-2.5 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing…
              </>
            ) : (
              <>Pay ${total.toFixed(2)} now</>
            )}
          </button>

          {message && (
            <div
              id="payment-message"
              className="mt-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
            >
              {message}
            </div>
          )}
        </form>
      </div>

      {/* RIGHT: order summary */}
      <aside className="w-full md:w-[340px] bg-white rounded-xl p-6 shadow-sm h-fit max-w-md mx-auto md:mx-0">
        <h3 className="text-lg font-semibold mb-3">Order summary</h3>

        <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-slate-700">
                  {item.name}{" "}
                  <span className="text-slate-400">x{item.qty}</span>
                </span>
                <span className="text-slate-700">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold mt-3 text-slate-800">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
};

// ---------- Outer component: fetch client secret and mount Elements ----------

const CheckoutPage: React.FC = () => {
  const items = useSelector(selectCartItems) as CartItem[];
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // This is the snippet from the docs you screenshotted,
    // adapted to your backend URL.
    (async () => {
      const response = await fetch(`${API_BASE_URL}/secret`);
      const { client_secret: secret } = await response.json();
      setClientSecret(secret);
    })();
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-xl bg-white px-6 py-4 shadow-sm text-slate-600 text-sm">
          Your cart is empty.
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-xl bg-white px-6 py-4 shadow-sm text-slate-600 text-sm">
          Preparing your secure checkout…
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: "stripe" },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
