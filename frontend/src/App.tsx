// frontend/src/App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Shop from "./pages/Shop";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutPage from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function Profile() {
  return <div className="mx-auto max-w-6xl px-4 py-10">Profile page</div>;
}

export default function App() {
  const location = useLocation();
  const hideChrome = location.pathname === "/login"; // hide header/footer on login page

  return (
    <>
      {!hideChrome && <Header />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute>
              <CheckoutSuccess />
            </ProtectedRoute>
          }
        />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideChrome && <Footer />}
    </>
  );
}
