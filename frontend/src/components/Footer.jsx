import { Link } from "react-router-dom";

const Icons = {
  Facebook: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.563 9.874v-6.988H7.898V12h2.54V9.797c0-2.507 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563V12h2.773l-.443 2.886h-2.33v6.988A10.001 10.001 0 0 0 22 12z" />
    </svg>
  ),
  Instagram: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 17.8 2.8 2.8 0 0 0 12 9.2zM17.8 6.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  ),
  Twitter: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.162 5.656c-.77.343-1.597.574-2.465.678a4.296 4.296 0 0 0 1.887-2.37 8.589 8.589 0 0 1-2.724 1.041 4.284 4.284 0 0 0-7.297 3.91 12.16 12.16 0 0 1-8.828-4.476 4.283 4.283 0 0 0 1.325 5.716 4.263 4.263 0 0 1-1.94-.536v.054a4.284 4.284 0 0 0 3.437 4.198 4.3 4.3 0 0 1-1.935.074 4.286 4.286 0 0 0 4.001 2.973A8.588 8.588 0 0 1 2 18.407a12.117 12.117 0 0 0 6.569 1.926c7.884 0 12.2-6.534 12.2-12.2 0-.186-.004-.371-.013-.555a8.707 8.707 0 0 0 2.106-2.222z" />
    </svg>
  ),
  Mail: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16v16H4z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  Phone: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.7 12.7 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.7 12.7 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  MapPin: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-700"></div>
              <span className="text-xl font-bold text-purple-700">
                Luxe Parfum
              </span>
            </Link>
            <p className="text-sm text-slate-500">
              Your destination for luxury fragrances from the world's most
              prestigious brands.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-slate-500 hover:text-purple-700 transition-colors"
                aria-label="Facebook"
              >
                <Icons.Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-purple-700 transition-colors"
                aria-label="Instagram"
              >
                <Icons.Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-purple-700 transition-colors"
                aria-label="Twitter"
              >
                <Icons.Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products?featured=true"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=women"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  Women's Fragrances
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=men"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  Men's Fragrances
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=unisex"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  Unisex Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="text-slate-500 hover:text-purple-700 transition-colors"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Icons.MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-slate-500">
                  123 Fragrance Ave, New York, NY 10001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Phone className="h-4 w-4 text-slate-500" />
                <span className="text-slate-500">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Mail className="h-4 w-4 text-slate-500" />
                <span className="text-slate-500">hello@luxeparfum.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Luxe Parfum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
