import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartItems,
  getCartSummary,
  updateCart,
  clearCart,
} from "../../api/cartApi";
import { CartState, CartUpdateRequest } from "./cartTypes";
import { getSessionToken } from "../../utils/session";

const initialState: CartState = {
  items: [],
  summary: {
    subtotal: 0,
    total: 0,
  },
  loading: false,
  error: null,
};

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Redux: Fetching cart items...");
      const response = await getCartItems();
      console.log("Redux: Cart items response:", response);
      return response.data;
    } catch (error: any) {
      console.error("Redux: Error fetching cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch cart summary
export const fetchCartSummary = createAsyncThunk(
  "cart/fetchCartSummary",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Redux: Fetching cart summary...");
      const response = await getCartSummary();
      console.log("Redux: Cart summary response:", response);
      return response.data;
    } catch (error: any) {
      console.error("Redux: Error fetching cart summary:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    request: Omit<CartUpdateRequest, "token">,
    { dispatch, rejectWithValue }
  ) => {
    try {
      console.log("Redux: Updating cart item with request:", request);
      const token = getSessionToken();
      const fullRequest = { ...request, token };

      await updateCart(fullRequest);

      // Refetch cart data after update
      console.log("Redux: Refetching cart data after update...");
      await dispatch(fetchCartItems());
      await dispatch(fetchCartSummary());

      return "Cart updated successfully";
    } catch (error: any) {
      console.error("Redux: Error updating cart item:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Clear cart
export const clearCartItems = createAsyncThunk(
  "cart/clearCartItems",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log("Redux: Clearing cart...");
      await clearCart();

      // Refetch cart data after clearing
      console.log("Redux: Refetching cart data after clearing...");
      await dispatch(fetchCartItems());
      await dispatch(fetchCartSummary());

      return "Cart cleared successfully";
    } catch (error: any) {
      console.error("Redux: Error clearing cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCartItems.pending, (state) => {
        console.log("Redux: Cart items fetch pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        console.log(
          "Redux: Cart items fetch fulfilled with data:",
          action.payload
        );
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        console.log("Redux: Cart items fetch rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
        state.items = [];
      })

      // Fetch cart summary
      .addCase(fetchCartSummary.pending, (state) => {
        console.log("Redux: Cart summary fetch pending");
      })
      .addCase(fetchCartSummary.fulfilled, (state, action) => {
        console.log(
          "Redux: Cart summary fetch fulfilled with data:",
          action.payload
        );
        state.summary = action.payload || { subtotal: 0, total: 0 };
      })
      .addCase(fetchCartSummary.rejected, (state, action) => {
        console.log("Redux: Cart summary fetch rejected:", action.payload);
        state.summary = { subtotal: 0, total: 0 };
      })

      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        console.log("Redux: Cart item update pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        console.log("Redux: Cart item update fulfilled");
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        console.log("Redux: Cart item update rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Clear cart
      .addCase(clearCartItems.pending, (state) => {
        console.log("Redux: Cart clear pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        console.log("Redux: Cart clear fulfilled");
        state.loading = false;
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        console.log("Redux: Cart clear rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
