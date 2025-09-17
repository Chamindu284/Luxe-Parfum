import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsAPI } from "../../services/api.js";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params = {}) => {
    const { data } = await productsAPI.getAll(params);
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const { data } = await productsAPI.getById(id);
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    page: 1,
    pages: 1,
    total: 0,
    loading: false,
    error: null,
    current: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
