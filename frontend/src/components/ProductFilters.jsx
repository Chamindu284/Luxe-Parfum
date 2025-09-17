import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ProductFilters({ initialCategory = "" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: initialCategory,
    brands: [],
    scentFamilies: [],
    priceRange: [0, 500],
    search: searchParams.get("search") || "",
  });

  const categories = [
    { value: "women", label: "Women's Fragrances" },
    { value: "men", label: "Men's Fragrances" },
    { value: "unisex", label: "Unisex Collection" },
  ];

  const brands = [
    "Chanel",
    "Dior",
    "Tom Ford",
    "Creed",
    "Yves Saint Laurent",
    "Jo Malone",
    "Versace",
    "Gucci",
    "Prada",
    "Hermès",
  ];

  const scentFamilies = [
    { value: "floral", label: "Floral" },
    { value: "oriental", label: "Oriental" },
    { value: "woody", label: "Woody" },
    { value: "fresh", label: "Fresh" },
    { value: "citrus", label: "Citrus" },
    { value: "spicy", label: "Spicy" },
  ];

  // Initialize from URL on mount
  useEffect(() => {
    const urlCategory = searchParams.get("category") || initialCategory || "";
    const urlBrands = (searchParams.get("brands") || "")
      .split(",")
      .filter(Boolean);
    const urlScentFamilies = (searchParams.get("scentFamilies") || "")
      .split(",")
      .filter(Boolean);
    const minPrice = Number(searchParams.get("minPrice") || 0);
    const maxPrice = Number(searchParams.get("maxPrice") || 500);
    const search = searchParams.get("search") || "";
    setFilters({
      category: urlCategory,
      brands: urlBrands,
      scentFamilies: urlScentFamilies,
      priceRange: [
        isNaN(minPrice) ? 0 : minPrice,
        isNaN(maxPrice) ? 500 : maxPrice,
      ],
      search,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.brands.length > 0)
      params.set("brands", newFilters.brands.join(","));
    if (newFilters.scentFamilies.length > 0)
      params.set("scentFamilies", newFilters.scentFamilies.join(","));
    if (newFilters.priceRange[0] > 0)
      params.set("minPrice", String(newFilters.priceRange[0]));
    if (newFilters.priceRange[1] < 500)
      params.set("maxPrice", String(newFilters.priceRange[1]));
    if (newFilters.search) params.set("search", newFilters.search);
    navigate(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    const newFilters = {
      ...filters,
      category: filters.category === category ? "" : category,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleBrandChange = (brand, checked) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleScentFamilyChange = (scentFamily, checked) => {
    const newScentFamilies = checked
      ? [...filters.scentFamilies, scentFamily]
      : filters.scentFamilies.filter((sf) => sf !== scentFamily);
    const newFilters = { ...filters, scentFamilies: newScentFamilies };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleMinPriceChange = (value) => {
    const v = Number(value);
    const clamped = Math.max(0, Math.min(v, filters.priceRange[1]));
    const newFilters = {
      ...filters,
      priceRange: [clamped, filters.priceRange[1]],
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleMaxPriceChange = (value) => {
    const v = Number(value);
    const clamped = Math.min(500, Math.max(v, filters.priceRange[0]));
    const newFilters = {
      ...filters,
      priceRange: [filters.priceRange[0], clamped],
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleSearchChange = (search) => {
    const newFilters = { ...filters, search };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = {
      category: "",
      brands: [],
      scentFamilies: [],
      priceRange: [0, 500],
      search: "",
    };
    setFilters(newFilters);
    navigate("/products");
  };

  const hasActiveFilters = useMemo(
    () =>
      !!(
        filters.category ||
        filters.brands.length > 0 ||
        filters.scentFamilies.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 500 ||
        filters.search
      ),
    [filters]
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="rounded-lg border bg-white">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Search</h3>
        </div>
        <div className="p-4">
          <input
            placeholder="Search perfumes..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full h-10 rounded-md border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-100 inline-flex items-center justify-center gap-2"
        >
          <span className="inline-block h-4 w-4">✕</span>
          Clear All Filters
        </button>
      )}

      {/* Category Filter */}
      <div className="rounded-lg border bg-white">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Category</h3>
        </div>
        <div className="p-4 space-y-3">
          {categories.map((category) => (
            <label
              key={category.value}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={filters.category === category.value}
                onChange={() => handleCategoryChange(category.value)}
                className="h-4 w-4"
              />
              <span>{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="rounded-lg border bg-white">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Brand</h3>
        </div>
        <div className="p-4 space-y-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className="h-4 w-4"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Scent Family Filter */}
      <div className="rounded-lg border bg-white">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Scent Family</h3>
        </div>
        <div className="p-4 space-y-3">
          {scentFamilies.map((family) => (
            <label
              key={family.value}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={filters.scentFamilies.includes(family.value)}
                onChange={(e) =>
                  handleScentFamilyChange(family.value, e.target.checked)
                }
                className="h-4 w-4"
              />
              <span>{family.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="rounded-lg border bg-white">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">Price Range</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Min</label>
              <input
                type="number"
                min={0}
                max={filters.priceRange[1]}
                value={filters.priceRange[0]}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Max</label>
              <input
                type="number"
                min={filters.priceRange[0]}
                max={500}
                value={filters.priceRange[1]}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
