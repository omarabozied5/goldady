// Updated cart types to match actual API response
export interface CartItem {
  id: number;
  bar: {
    id: number;
    image: string;
    name: {
      ar: string;
      en: string;
    };
    description: {
      ar: string;
      en: string;
    };
    bar_karat: string;
    bar_weight: string;
    maker: string;
  };
  quantity: number;
  gold_price: number;
  making_charge: number;
  total: number;
}

// Processed cart item for UI display
export interface ProcessedCartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
  weight: string;
  karat: string;
  maker: string;
}

export interface CartSummary {
  subtotal: number;
  total: number;
}

export interface CartState {
  items: ProcessedCartItem[];
  summary: CartSummary;
  loading: boolean;
  error: string | null;
}

// API response structures
export interface CartApiResponse {
  status: boolean;
  message: {
    en: string;
    ar: string;
  };
  Cart: {
    items: CartItem[];
  };
}

export interface CartSummaryApiResponse {
  status: boolean;
  message: {
    en: string;
    ar: string;
  };
  data: {
    subtotal: number;
    total: number;
  };
}

// Cart action types from task requirements
export type CartAction = "INCREMENT" | "DECREMENT" | "DELETE";

export interface CartUpdateRequest {
  bar_id: number;
  action: CartAction;
  token: string;
}
