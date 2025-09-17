import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice.js";
import cartReducer from "./slices/cartSlice.js";
import userReducer from "./slices/userSlice.js";
import ordersReducer from "./slices/ordersSlice.js";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    orders: ordersReducer,
  },
});
