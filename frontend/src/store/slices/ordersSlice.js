import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ordersAPI } from "../../services/api.js";

export const createOrder = createAsyncThunk(
  "orders/create",
  async (order) => {
    const { data } = await ordersAPI.create(order);
    return data;
  }
);

export const fetchMyOrders = createAsyncThunk(
  "orders/my",
  async () => {
    const { data } = await ordersAPI.getMyOrders();
    return data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { list: [], current: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
