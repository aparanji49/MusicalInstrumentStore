import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.3 3h-1.9v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}
export function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M22 5.9c-.8.3-1.7.6-2.6.7a4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.9 1.1A4.5 4.5 0 0 0 12 9.1a12.8 12.8 0 0 1-9.3-4.7A4.5 4.5 0 0 0 5 10.3a4.5 4.5 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 2 19.5 12.7 12.7 0 0 0 8.9 21c7.6 0 11.8-6.3 11.8-11.8v-.5A8.3 8.3 0 0 0 22 5.9z" />
    </svg>
  );
}
export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.3 3 3v10c0 1.7-1.4 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm4.8-2.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="MuseMart Logo" className="h-8 w-auto invert" />
            <span className="text-lg font-semibold">MuseMart</span>
          </div>
          <p className="mt-3 text-sm opacity-70">
            Your one-stop shop for authentic instruments and timeless classics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/shop" className="hover:opacity-100">Shop</Link></li>
            <li><Link to="/collections" className="hover:opacity-100">Collections</Link></li>
            <li><Link to="/about" className="hover:opacity-100">About Us</Link></li>
            <li><Link to="/contact" className="hover:opacity-100">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" className="hover:opacity-100">Shipping & Returns</a></li>
            <li><a href="#" className="hover:opacity-100">FAQs</a></li>
            <li><a href="#" className="hover:opacity-100">Support</a></li>
            <li><a href="#" className="hover:opacity-100">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Connect
          </h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:opacity-70"><FacebookIcon /></a>
            <a href="#" aria-label="Twitter" className="hover:opacity-70"><TwitterIcon /></a>
            <a href="#" aria-label="Instagram" className="hover:opacity-70"><InstagramIcon /></a>
          </div>
          <p className="mt-3 text-sm opacity-70">Email: support@musemart.com</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} MuseMart. All rights reserved.
      </div>
    </footer>
  );
}
