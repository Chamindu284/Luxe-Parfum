import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateQty,
  clearCart,
} from "../store/slices/cartSlice.js";
import Header from "../components/Header";

export default function CartPage() {
  const { items } = useSelector((s) => s.cart);
  const user = useSelector((s) => s.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = itemsPrice > 75 ? 0 : 10;
  const tax = itemsPrice * 0.08;
  const total = itemsPrice + shipping + tax;

  const handleQtyChange = (productId, nextQty) => {
    const qty = Number(nextQty);
    if (qty <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQty({ product: productId, qty }));
    }
  };

  const proceedCheckout = () => {
    if (!user) {
      navigate("/auth/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-slate-200 grid place-items-center">
              👜
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-slate-500 mb-6">
              Discover our exquisite collection of luxury fragrances
            </p>
            <Link
              to="/products"
              className="inline-flex h-10 px-6 rounded-md bg-purple-700 text-white items-center justify-center hover:bg-purple-700/90"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/products"
          className="inline-flex items-center text-sm text-slate-600 hover:text-purple-700"
        >
          <span className="mr-2">←</span>
          Continue Shopping
        </Link>
        <button
          onClick={() => dispatch(clearCart())}
          className="inline-flex items-center h-9 px-3 rounded-md border border-slate-200 hover:bg-slate-100"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <div
              key={it.product}
              className="rounded-lg border bg-white p-4 flex flex-col md:flex-row gap-4"
            >
              <div className="w-full md:w-28 h-28 rounded-lg overflow-hidden bg-slate-100">
                {it.image && (
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{it.name}</h3>
                <p className="text-slate-500 text-sm">Premium Fragrance</p>
                <div className="text-sm text-slate-600">
                  ${it.price} per item
                </div>
              </div>
              <div className="flex md:items-end gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className="h-8 w-8 rounded-md border border-slate-200 hover:bg-slate-100"
                    onClick={() => handleQtyChange(it.product, it.qty - 1)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={0}
                    value={it.qty}
                    onChange={(e) =>
                      handleQtyChange(it.product, e.target.value)
                    }
                    className="w-16 h-9 rounded-md border border-slate-200 text-center"
                  />
                  <button
                    className="h-8 w-8 rounded-md border border-slate-200 hover:bg-slate-100"
                    onClick={() => handleQtyChange(it.product, it.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    ${(it.price * it.qty).toFixed(2)}
                  </span>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => dispatch(removeFromCart(it.product))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-white p-4 h-fit lg:sticky lg:top-4">
          <div className="font-semibold mb-2">Order Summary</div>
          <div className="flex justify-between text-sm mb-1">
            <span>Subtotal ({items.length} items)</span>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t my-3" />
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={proceedCheckout}
            className="w-full h-10 rounded-md bg-purple-700 text-white hover:bg-purple-700/90"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
