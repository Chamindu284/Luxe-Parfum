import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";

export default function ProductGrid({
  initialCategory = "",
  initialFeatured = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { list: products, loading, total, pages: totalPages } = useSelector((s) => s.products);

  useEffect(() => {
    const params = {};
    const category = searchParams.get("category") || initialCategory;
    const featured =
      searchParams.get("featured") === "true" || initialFeatured;
    const brands = (searchParams.get("brands") || "")
      .split(",")
      .filter(Boolean);
    const scentFamilies = (searchParams.get("scentFamilies") || "")
      .split(",")
      .filter(Boolean);
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    if (category) params.category = category;
    if (featured) params.featured = true;
    if (brands.length > 0) params.brand = brands.join(",");
    if (scentFamilies.length > 0)
      params.scentFamily = scentFamilies.join(",");
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (search) params.keyword = search;
    if (sort) params.sort = sort;

    params.page = currentPage;
    params.limit = 12;

    dispatch(fetchProducts(params));
  }, [searchParams, currentPage, initialCategory, initialFeatured, dispatch]);

  const handleAddToCart = async (product) => {
    try {
      dispatch(
        addToCart({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "/placeholder.svg",
          qty: 1,
        })
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const StarIcon = (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.168L12 18.896l-7.336 3.868 1.402-8.168L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
  );
  const CartIcon = (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
  const HeartIcon = (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-white animate-pulse">
            <div className="p-4">
              <div className="aspect-square bg-slate-100 rounded-lg mb-4"></div>
              <div className="h-4 bg-slate-100 rounded mb-2"></div>
              <div className="h-3 bg-slate-100 rounded mb-4 w-2/3"></div>
              <div className="h-6 bg-slate-100 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <CartIcon className="h-16 w-16 text-slate-400 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-slate-500 mb-4">
          Try adjusting your filters or search terms
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100"
        >
          View All Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {products.length} of {total} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="group rounded-lg border bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <Link to={`/products/${product._id}`}>
                <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-white">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <span className="absolute top-2 right-2 rounded bg-pink-600 text-white text-xs px-2 py-1">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                  {product.stock < 10 && (
                    <span className="absolute top-2 left-2 rounded bg-orange-500 text-white text-xs px-2 py-1">
                      Only {product.stock} left
                    </span>
                  )}
                </div>
              </Link>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-slate-500">({product.numReviews})</span>
                </div>

                <Link to={`/products/${product._id}`}>
                  <h3 className="font-semibold hover:text-purple-700 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-slate-500">{product.brand}</p>

                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded bg-slate-100 text-slate-700 px-2 py-1">
                    {product.category}
                  </span>
                  <span className="rounded border border-slate-200 text-slate-700 px-2 py-1">
                    {product.scentFamily}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-slate-100"
                      aria-label="Wishlist"
                    >
                      <HeartIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-purple-700 text-white hover:bg-purple-700/90"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      aria-label="Add to cart"
                    >
                      <CartIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`h-9 px-3 rounded-md border ${currentPage === i + 1
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
