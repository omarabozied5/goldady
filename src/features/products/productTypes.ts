// Simple product interface based on task requirements
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Raw API product structure
export interface RawApiProduct {
  id: number;
  weight: string;
  image: string;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  maker: string;
  karat: string;
  fineness: number;
  cashback: number;
  making_charge: number;
  gold_price: number;
  total: number;
}

// API response structure
export interface ProductsApiResponse {
  status: boolean;
  message: {
    en: string;
    ar: string;
  };
  ECommerceBars: RawApiProduct[];
}
