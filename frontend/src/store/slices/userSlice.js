import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api.js";

const storedUser = localStorage.getItem("authUser");
const storedToken = localStorage.getItem("token");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password }) => {
    const { data } = await authAPI.register({ name, email, password });
    return data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const { data } = await authAPI.login({ email, password });
    return data;
  }
);

export const fetchProfile = createAsyncThunk(
  "user/profile",
  async () => {
    const { data } = await authAPI.getProfile();
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.profile = null;
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
