import apiClient from "./axios";
import { ProductsApiResponse } from "../features/products/productTypes";

export const getProducts = async (): Promise<ProductsApiResponse> => {
  try {
    const response = await apiClient.get<ProductsApiResponse>("/e-bar-store");

    if (!response.data || !response.data.status) {
      throw new Error("Failed to fetch products");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};
