import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ProductSort() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "name", label: "Name: A to Z" },
  ];

  // Initialize from URL on mount
  useEffect(() => {
    const urlSort = searchParams.get("sort") || "newest";
    setSortBy(urlSort);
  }, [searchParams]);

  const handleSortChange = (value) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    navigate(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-500">Showing luxury fragrances</p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-48 h-9 rounded-md border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
