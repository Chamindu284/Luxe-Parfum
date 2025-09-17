import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters";
import ProductSort from "../components/ProductSort";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();

  // Get initial filters from URL params
  const initialCategory = searchParams.get("category") || "";
  const initialFeatured = searchParams.get("featured") === "true";

  const FilterIcon = (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
    </svg>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {initialCategory
              ? `${
                  initialCategory.charAt(0).toUpperCase() +
                  initialCategory.slice(1)
                }'s Fragrances`
              : initialFeatured
              ? "Featured Collection"
              : "All Perfumes"}
          </h1>
          <p className="text-slate-500">
            Discover our exquisite collection of luxury fragrances from the
            world's most prestigious brands
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full h-10 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 inline-flex items-center justify-center gap-2"
            >
              <FilterIcon className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <ProductFilters initialCategory={initialCategory} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <ProductSort />
            </div>
            <ProductGrid
              initialCategory={initialCategory}
              initialFeatured={initialFeatured}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
