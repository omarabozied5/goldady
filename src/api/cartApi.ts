import apiClient from "./axios";
import {
  CartApiResponse,
  CartSummaryApiResponse,
  CartUpdateRequest,
  ProcessedCartItem,
  CartItem,
} from "../features/cart/cartTypes";

const processCartItem = (item: CartItem): ProcessedCartItem => {
  return {
    id: item.bar.id,
    name: item.bar.name.en,
    image: item.bar.image,
    price: item.gold_price + item.making_charge,
    quantity: item.quantity,
    total: item.total,
    weight: `${item.bar.bar_weight}g`,
    karat: `${item.bar.bar_karat}K`,
    maker: item.bar.maker,
  };
};

// Get cart items
export const getCartItems = async (): Promise<{
  success: boolean;
  data: ProcessedCartItem[];
  message?: string;
}> => {
  try {
    console.log("Fetching cart items...");
    const response = await apiClient.get("/cart/index");

    console.log("Raw cart response:", response.data);

    if (!response.data || !response.data.status) {
      throw new Error("Invalid response format");
    }

    const items = response.data.Cart?.items || [];
    console.log("Extracted items:", items);

    const processedItems = items.map(processCartItem);
    console.log("Processed items:", processedItems);

    return {
      success: true,
      data: processedItems,
      message: response.data.message?.en || "Cart items retrieved successfully",
    };
  } catch (error: any) {
    console.error("Error fetching cart items:", error);
    throw new Error(
      error.response?.data?.message?.en ||
        error.response?.data?.message ||
        "Failed to fetch cart items"
    );
  }
};

export const getCartSummary = async (): Promise<{
  success: boolean;
  data: { subtotal: number; total: number };
  message?: string;
}> => {
  try {
    console.log("Fetching cart summary...");
    const response = await apiClient.get("/cart/prices");

    console.log("Raw cart summary response:", response.data);

    if (!response.data || !response.data.status) {
      throw new Error("Invalid response format");
    }

    // Calculate totals from the response
    let subtotal = 0;
    let total = 0;

    if (response.data.Cart?.items) {
      response.data.Cart.items.forEach((item: CartItem) => {
        subtotal += item.total;
        total += item.total;
      });
    } else if (response.data.data) {
      subtotal = response.data.data.subtotal || 0;
      total = response.data.data.total || 0;
    }

    console.log("Calculated summary:", { subtotal, total });

    return {
      success: true,
      data: { subtotal, total },
      message:
        response.data.message?.en || "Cart summary retrieved successfully",
    };
  } catch (error: any) {
    console.error("Error fetching cart summary:", error);
    throw new Error(
      error.response?.data?.message?.en ||
        error.response?.data?.message ||
        "Failed to fetch cart summary"
    );
  }
};

// Update cart
export const updateCart = async (
  request: CartUpdateRequest
): Promise<{ success: boolean; message?: string }> => {
  try {
    console.log("Updating cart with request:", request);
    const response = await apiClient.post("/cart/store", request);

    console.log("Cart update response:", response.data);

    return {
      success: true,
      message: response.data?.message?.en || "Cart updated successfully",
    };
  } catch (error: any) {
    console.error("Error updating cart:", error);
    throw new Error(
      error.response?.data?.message?.en ||
        error.response?.data?.message ||
        "Failed to update cart"
    );
  }
};

// Clear entire cart
export const clearCart = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    console.log("Clearing cart...");
    const response = await apiClient.get("/cart/clear-cart");

    console.log("Clear cart response:", response.data);

    return {
      success: true,
      message: response.data?.message?.en || "Cart cleared successfully",
    };
  } catch (error: any) {
    console.error("Error clearing cart:", error);
    throw new Error(
      error.response?.data?.message?.en ||
        error.response?.data?.message ||
        "Failed to clear cart"
    );
  }
};
