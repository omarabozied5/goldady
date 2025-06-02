import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../api/productApi";
import { ProductsState, Product } from "./productTypes";

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Helper function to get localized name (prefer English, fallback to Arabic)
const getLocalizedName = (
  nameObj: { ar: string; en: string } | string
): string => {
  if (typeof nameObj === "string") {
    return nameObj;
  }
  return nameObj.en || nameObj.ar || "Unknown Product";
};

// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();

      console.log("Raw API Response:", response);

      if (!Array.isArray(response.ECommerceBars)) {
        console.log("ECommerceBars is not an array:", response.ECommerceBars);
        return [];
      }

      // Map API response to Product interface
      const products: Product[] = response.ECommerceBars.map(
        (product, index) => {
          const mappedProduct = {
            id: product.id || index + 1,
            name: getLocalizedName(product.name) || `Product ${index + 1}`,
            price: product.total || product.gold_price || 0,
            image: product.image || "/placeholder-image.jpg",
          };

          console.log(`Mapped product ${index}:`, mappedProduct);
          return mappedProduct;
        }
      );

      console.log("Final mapped products:", products);
      return products;
    } catch (error: any) {
      console.error("fetchProducts error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
