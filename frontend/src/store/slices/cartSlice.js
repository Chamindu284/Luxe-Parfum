import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("cartState");
const initialState = stored
  ? JSON.parse(stored)
  : { items: [], shippingAddress: null };

const persist = (state) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // {product, name, price, image, qty}
      const existing = state.items.find((i) => i.product === item.product);
      if (existing) {
        existing.qty += item.qty;
      } else {
        state.items.push(item);
      }
      persist(state);
    },
    updateQty: (state, action) => {
      const { product, qty } = action.payload;
      const existing = state.items.find((i) => i.product === product);
      if (existing) existing.qty = qty;
      persist(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.product !== action.payload);
      persist(state);
    },
    clearCart: (state) => {
      state.items = [];
      persist(state);
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      persist(state);
    },
  },
});

export const {
  addToCart,
  updateQty,
  removeFromCart,
  clearCart,
  setShippingAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
