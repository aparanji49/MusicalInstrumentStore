// frontend/src/pages/CheckoutSuccess.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

// const AUTO_REDIRECT_SECONDS = 6;

const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentIntent = searchParams.get("payment_intent");
//   const [secondsLeft, setSecondsLeft] = useState(AUTO_REDIRECT_SECONDS);
  const [showConfetti, setShowConfetti] = useState(true);

//   useEffect(() => {
//     // countdown for redirect text
//     const interval = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     // actual redirect to /orders
//     if (secondsLeft === 0) {
//       navigate("/orders");
//     }
//   }, [secondsLeft, navigate]);

  useEffect(() => {
    // stop confetti after a bit
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewOrders = () => {
    navigate("/orders");
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  const handleDownloadReceipt = () => {
    // TODO: wire this to a backend endpoint that returns a PDF/receipt
    // For now, just a placeholder action
    alert("Receipt download coming soon! 😊");
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-10">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={220}
          recycle={false}
        />
      )}

      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-lg w-full">
        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-slate-900 text-center mb-2">
          Payment successful! 🎉
        </h1>
        <p className="text-sm text-slate-600 text-center mb-6">
          Thank you for your purchase. Your order has been placed and a
          confirmation email will be sent shortly.
        </p>

        {paymentIntent && (
          <p className="text-[11px] text-slate-400 text-center mb-4">
            Payment Intent ID:{" "}
            <span className="font-mono break-all">{paymentIntent}</span>
          </p>
        )}

        {/* Order summary highlight */}
        <div className="border border-slate-200 rounded-xl p-4 mb-6 bg-slate-50/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Order Status
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Confirmed
            </span>
          </div>
          <p className="text-sm text-slate-700">
            Your instruments are getting ready to ship. You can find full
            details under{" "}
            <span className="font-medium text-slate-900">My Orders</span>.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleViewOrders}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            View my orders
          </button>

          <button
            onClick={handleContinueShopping}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-slate-800 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Continue shopping
          </button>

          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 py-2 text-xs font-medium hover:bg-slate-100 transition-colors"
          >
            Download receipt (PDF)
          </button>
        </div>

        {/* <p className="mt-5 text-[11px] text-slate-400 text-center">
          Redirecting you to your orders in{" "}
          <span className="font-semibold text-slate-600">
            {secondsLeft}s
          </span>
          …
        </p> */}
      </div>
    </div>
  );
};

export default CheckoutSuccess;
