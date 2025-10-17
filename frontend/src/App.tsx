// frontend/src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Shop from "./pages/Shop";
import CartPage from "./pages/Cart";
// import 'index.css';
// QUICK placeholders (optional: create real pages later)
// function Shop() { return <div className="mx-auto max-w-6xl px-4 py-10">Shop page</div>; }
// function Collections() { return <div className="mx-auto max-w-6xl px-4 py-10">Collections page</div>; }
// function About() { return <div className="mx-auto max-w-6xl px-4 py-10">About page</div>; }
// function Contact() { return <div className="mx-auto max-w-6xl px-4 py-10">Contact page</div>; }
// function Cart() { return <div className="mx-auto max-w-6xl px-4 py-10">Cart page</div>; }
function Profile() { return <div className="mx-auto max-w-6xl px-4 py-10">Profile page</div>; }

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
