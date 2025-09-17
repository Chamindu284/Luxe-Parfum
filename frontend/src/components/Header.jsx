import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Lightweight inline SVG icons (to avoid extra deps)
const Icon = {
  Search: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  ShoppingBag: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2l.01 4M18 2l-.01 4M3 7h18l-1 14H4L3 7z" />
      <path d="M16 11a4 4 0 0 1-8 0" />
    </svg>
  ),
  User: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Menu: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItems = useSelector((state) => state.cart?.items || []);
  const user = useSelector((state) => state.user?.user || null);

  // cartSlice uses `qty` per item
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + (item.qty || 0),
    0
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-purple-700"></div>
            <span className="font-serif text-xl font-bold text-purple-700">
              Luxe Parfum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-700 ${
                  isActive ? "text-purple-700" : "text-gray-700"
                }`
              }
            >
              All Perfumes
            </NavLink>
            <NavLink
              to="/products?category=women"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-700 ${
                  isActive ? "text-purple-700" : "text-gray-700"
                }`
              }
            >
              Women
            </NavLink>
            <NavLink
              to="/products?category=men"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-700 ${
                  isActive ? "text-purple-700" : "text-gray-700"
                }`
              }
            >
              Men
            </NavLink>
            <NavLink
              to="/products?category=unisex"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-700 ${
                  isActive ? "text-purple-700" : "text-gray-700"
                }`
              }
            >
              Unisex
            </NavLink>
            <NavLink
              to="/products?featured=true"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-700 ${
                  isActive ? "text-purple-700" : "text-gray-700"
                }`
              }
            >
              Featured
            </NavLink>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="search"
                placeholder="Search perfumes..."
                className="pl-10 w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <Icon.User className="h-4 w-4" />
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
            ) : (
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <Icon.User className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            <Link
              to="/cart"
              className="relative inline-flex items-center h-9 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <Icon.ShoppingBag className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 min-w-[1.25rem] rounded-full bg-purple-700 text-white text-xs grid place-items-center px-1">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <Icon.X className="h-5 w-5" />
              ) : (
                <Icon.Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="search"
                  placeholder="Search perfumes..."
                  className="pl-10 w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <nav className="flex flex-col">
                <Link
                  to="/products"
                  className="text-sm font-medium transition-colors hover:text-purple-700 py-2"
                >
                  All Perfumes
                </Link>
                <Link
                  to="/products?category=women"
                  className="text-sm font-medium transition-colors hover:text-purple-700 py-2"
                >
                  Women
                </Link>
                <Link
                  to="/products?category=men"
                  className="text-sm font-medium transition-colors hover:text-purple-700 py-2"
                >
                  Men
                </Link>
                <Link
                  to="/products?category=unisex"
                  className="text-sm font-medium transition-colors hover:text-purple-700 py-2"
                >
                  Unisex
                </Link>
                <Link
                  to="/products?featured=true"
                  className="text-sm font-medium transition-colors hover:text-purple-700 py-2"
                >
                  Featured
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
