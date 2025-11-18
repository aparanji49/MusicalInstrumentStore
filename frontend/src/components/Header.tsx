import { useEffect, useMemo, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/slices/cartSlice";
// import { useCart } from "../context/useCart";
// import { useDispatch } from "react-redux";

/* tiny inline icons so no extra deps */
function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45A1.99 1.99 0 0 0 10 19h9v-2h-8.42a.25.25 0 0 1-.22-.37L11.1 14h6.45a2 2 0 0 0 1.86-1.27L22 7H7.42l-.7-1.4A1 1 0 0 0 5.8 5H3"
        fill="currentColor"
      />
      <circle cx="10.5" cy="20.5" r="1.5" fill="currentColor" />
      <circle cx="18.5" cy="20.5" r="1.5" fill="currentColor" />
    </svg>
  );
}
// function UserIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
//       <path
//         d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 6v1h18v-1c0-3.5-4-6-9-6Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...props}>
      <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" fill="currentColor" />
    </svg>
  );
}
function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  // const { state } = useCart();
  // const dispatch = useDispatch();
  const [user, setUser] = useState<{
    id: string;
    email?: string | null;
  } | null>(null);
  const count = useSelector(selectCartCount);
  // 🧠 Fetch current user once on load
  useEffect(() => {
    fetch("http://localhost:4000/api/me", {
      credentials: "include",
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    window.location.href = "/"; // redirect home after logout
  };

  const nav = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/shop", label: "Shop" },
      { to: "/collections", label: "Collections" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/ask-muse", label: "Ask MuseBot" },
    ],
    []
  );

  const linkBase =
    "block w-full text-left py-2 md:py-0 md:w-auto pb-1 transition-opacity hover:opacity-70";
  const activeUnderline =
    "underline decoration-yellow-500 decoration-4 underline-offset-8";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/100 text-black backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left: logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          {/* keep aspect ratio: use h-8 w-auto */}
          <img src={logo} alt="MuseMart logo" className="h-8 w-auto" />
          <span className="font-semibold">MuseMart</span>
        </Link>

        {/* Desktop center nav */}
        <nav className="hidden items-center gap-10 text-sm font-semibold md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.label}
              to={n.to}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeUnderline : ""}`
              }
              end={n.to === "/"}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Right controls (desktop + mobile) */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            to="/cart"
            className="hidden md:flex items-center gap-2 hover:opacity-70"
          >
            <span>Cart ({count})</span>
            <CartIcon />
          </Link>
          {/* <Link
            to="/profile"
            className="hidden md:flex items-center gap-2 hover:opacity-70"
          >
            <span>Profile</span>
            <UserIcon />
          </Link> */}
          {user ? (
            <>
              <span className="hidden md:flex text-gray-800 font-medium">
                {user.email?.split("@")[0] || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center rounded bg-gray-800 text-white px-3 py-1 text-sm hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
                to="/login"
                className="rounded bg-yellow-500 text-white px-3 py-1 text-sm text-center hover:bg-yellow-600"
              >
              Login </Link>
          )}
          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded md:hidden hover:bg-black/5"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden transition-[max-height] duration-300 overflow-hidden border-t border-black/5 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-3">
          <nav className="flex flex-col gap-1 text-sm font-semibold">
            {nav.map((n) => (
              <NavLink
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeUnderline : ""}`
                }
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile quick actions */}
          <div className="mt-2 flex gap-4 border-t border-black/5 pt-3 text-sm">
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:opacity-70"
            >
              <CartIcon /> <span>Cart ({count})</span>
            </Link>
            {/* <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 hover:opacity-70"
            >
              <UserIcon /> <span>Profile</span>
            </Link> */}
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hi {user.email?.split("@")[0] || "User"} !
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded bg-gray-800 text-white px-3 py-1 text-sm hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded bg-yellow-500 text-white px-3 py-1 text-sm text-center hover:bg-yellow-600"
              >
              Login </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
