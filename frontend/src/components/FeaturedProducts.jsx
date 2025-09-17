import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../store/slices/cartSlice";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/products?featured=true&limit=4`
      );
      const list = Array.isArray(data?.products)
        ? data.products
        : Array.isArray(data)
        ? data
        : [];
      setProducts(list);
    } catch (error) {
      const mock = [
        {
          _id: "1",
          name: "Chanel No. 5",
          brand: "Chanel",
          price: 150,
          originalPrice: 180,
          images: ["/chanel-no-5-perfume-bottle-elegant.jpg"],
          rating: 4.8,
          numReviews: 156,
        },
        {
          _id: "2",
          name: "Tom Ford Black Orchid",
          brand: "Tom Ford",
          price: 180,
          images: ["/tom-ford-black-orchid-perfume-bottle-luxury.jpg"],
          rating: 4.6,
          numReviews: 89,
        },
        {
          _id: "3",
          name: "Dior Sauvage",
          brand: "Dior",
          price: 120,
          images: ["/dior-sauvage-perfume-bottle-masculine.jpg"],
          rating: 4.7,
          numReviews: 234,
        },
        {
          _id: "4",
          name: "Creed Aventus",
          brand: "Creed",
          price: 350,
          images: ["/creed-aventus-perfume-bottle-luxury-premium.jpg"],
          rating: 4.9,
          numReviews: 67,
        },
      ];
      setProducts(mock);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/placeholder.svg",
        qty: 1,
      })
    );
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

  if (loading) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Discover our handpicked selection of the most exquisite fragrances
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border bg-white p-4 animate-pulse"
              >
                <div className="aspect-square bg-slate-100 rounded-lg mb-4"></div>
                <div className="h-4 bg-slate-100 rounded mb-2"></div>
                <div className="h-3 bg-slate-100 rounded mb-4 w-2/3"></div>
                <div className="h-6 bg-slate-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Collection
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Discover our handpicked selection of the most exquisite fragrances
            from renowned perfume houses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <div
              key={product._id}
              className="group rounded-lg border bg-white p-4 hover:shadow-lg transition-shadow duration-300"
            >
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
                </div>
              </Link>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="font-medium">
                    {product.rating?.toFixed
                      ? product.rating.toFixed(1)
                      : product.rating}
                  </span>
                  <span className="text-slate-500">
                    ({product.numReviews || 0})
                  </span>
                </div>

                <Link to={`/products/${product._id}`}>
                  <h3 className="font-semibold hover:text-purple-700 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-slate-500">{product.brand}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-purple-700 text-white hover:bg-purple-700/90"
                    aria-label="Add to cart"
                  >
                    <CartIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
