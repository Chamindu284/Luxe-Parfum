import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../store/slices/cartSlice.js";
import { createOrder } from "../store/slices/ordersSlice.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Icons component
const Icons = {
  CreditCard: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  Truck: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16,8 20,8 23,11 23,16 16,16" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  Shield: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  ArrowLeft: (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </svg>
  ),
};

// UI Components
const Button = ({ children, variant = "default", size = "default", className = "", onClick, disabled = false, type = "button" }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-purple-500",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium text-gray-700 ${className}`}
  >
    {children}
  </label>
);

const Select = ({ children, value, onValueChange, className = "" }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
  >
    {children}
  </select>
);

const SelectTrigger = ({ children, className = "" }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

const SelectContent = ({ children }) => <>{children}</>;

const SelectItem = ({ children, value }) => (
  <option value={value}>{children}</option>
);

const SelectValue = ({ placeholder }) => (
  <option value="" disabled>{placeholder}</option>
);

const Separator = ({ className = "" }) => (
  <div className={`border-t border-gray-200 ${className}`}></div>
);

const RadioGroup = ({ value, onValueChange, children }) => (
  <div className="space-y-2">
    {React.Children.map(children, child =>
      React.cloneElement(child, { value, onValueChange })
    )}
  </div>
);

const RadioGroupItem = ({ value, onValueChange, id, children }) => (
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      id={id}
      name="paymentMethod"
      value={value}
      checked={value === value}
      onChange={() => onValueChange(value)}
      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
    />
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {children}
    </label>
  </div>
);

const Checkbox = ({ id, checked, onCheckedChange, children }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
    />
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {children}
    </label>
  </div>
);

const Alert = ({ children, variant = "default" }) => (
  <div className={`rounded-md p-4 ${variant === "destructive" ? "bg-red-50 border border-red-200" : "bg-blue-50 border border-blue-200"
    }`}>
    {children}
  </div>
);

const AlertDescription = ({ children }) => (
  <p className={`text-sm ${children.props?.className?.includes('destructive') ? "text-red-800" : "text-blue-800"
    }`}>
    {children}
  </p>
);

// Auth Guard component
function AuthGuard({ children, requireAuth = true }) {
  const { user } = useSelector((state) => state.user);

  if (requireAuth && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to proceed with checkout.</p>
          <Link to="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return children;
}

export default function CheckoutPage() {
  return (
    <AuthGuard requireAuth={true}>
      <CheckoutContent />
    </AuthGuard>
  );
}

function CheckoutContent() {
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [shippingData, setShippingData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentData, setPaymentData] = useState({
    method: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    sameAsShipping: true,
  });

  // Calculate totals with proper defaults
  const subtotal = total || 0;
  const shipping = subtotal > 75 ? 0 : 10;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderData = {
        orderItems: (items || []).map((item) => ({
          product: item.product,
          name: item.name,
          quantity: item.qty,
          price: item.price,
          image: item.image,
        })),
        shippingAddress: {
          fullName: shippingData.fullName,
          address: shippingData.address,
          city: shippingData.city,
          postalCode: shippingData.zipCode,
          country: shippingData.country,
        },
        paymentMethod: paymentData.method,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: finalTotal,
      };

      const result = await dispatch(createOrder(orderData));

      if (result.meta.requestStatus === "fulfilled") {
        dispatch(clearCart());
        navigate("/dashboard");
      } else {
        setError("Failed to process order. Please try again.");
      }
    } catch (error) {
      setError("Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="font-serif text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/cart">
            <Button variant="ghost" className="mb-4">
              <Icons.ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="font-serif text-3xl font-bold">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? "text-purple-700" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-purple-700 bg-purple-700 text-white" : "border-gray-300"
                  }`}
              >
                1
              </div>
              <span className="ml-2 hidden sm:inline">Shipping</span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? "text-purple-700" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-purple-700 bg-purple-700 text-white" : "border-gray-300"
                  }`}
              >
                2
              </div>
              <span className="ml-2 hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={shippingData.fullName}
                          onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingData.city}
                          onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={shippingData.state}
                          onValueChange={(value) => setShippingData({ ...shippingData, state: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                            <SelectContent>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              <SelectItem value="IL">Illinois</SelectItem>
                              <SelectItem value="PA">Pennsylvania</SelectItem>
                              <SelectItem value="OH">Ohio</SelectItem>
                              <SelectItem value="GA">Georgia</SelectItem>
                            </SelectContent>
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingData.zipCode}
                          onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <Label>Payment Method</Label>
                      <RadioGroup
                        value={paymentData.method}
                        onValueChange={(value) => setPaymentData({ ...paymentData, method: value })}
                      >
                        <RadioGroupItem value="credit_card" id="credit_card">
                          Credit Card
                        </RadioGroupItem>
                        <RadioGroupItem value="debit_card" id="debit_card">
                          Debit Card
                        </RadioGroupItem>
                        <RadioGroupItem value="paypal" id="paypal">
                          PayPal
                        </RadioGroupItem>
                        <RadioGroupItem value="COD" id="cod">
                          Cash on Delivery
                        </RadioGroupItem>
                      </RadioGroup>
                    </div>

                    {(paymentData.method === "credit_card" || paymentData.method === "debit_card") && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentData.expiryDate}
                              onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input
                            id="nameOnCard"
                            value={paymentData.nameOnCard}
                            onChange={(e) => setPaymentData({ ...paymentData, nameOnCard: e.target.value })}
                            required
                          />
                        </div>

                        <Checkbox
                          id="sameAsShipping"
                          checked={paymentData.sameAsShipping}
                          onCheckedChange={(checked) =>
                            setPaymentData({ ...paymentData, sameAsShipping: checked })
                          }
                        >
                          Billing address same as shipping
                        </Checkbox>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back to Shipping
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? "Processing..." : `Place Order - $${finalTotal.toFixed(2)}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items && items.map((item) => (
                    <div key={item.product} className="flex items-center gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Icons.Shield className="h-4 w-4" />
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Icons.Truck className="h-4 w-4" />
                    <span>Free returns within 30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}