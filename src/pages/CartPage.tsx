import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowLeft, Shield } from "lucide-react";
import { RootState, AppDispatch } from "../app/store";
import {
  fetchCartItems,
  fetchCartSummary,
  clearCartItems,
} from "../features/cart/cartSlice";
import {
  CartItem as CartItemType,
  ProcessedCartItem,
} from "../features/cart/cartTypes";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const LoadingSpinner = ({ size = "h-20 w-20" }: { size?: string }) => (
  <div
    className={`animate-spin rounded-full ${size} border-4 border-yellow-400/20 border-t-yellow-400`}
  />
);

const CenteredLoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center">
    <div className="relative mb-8">
      <LoadingSpinner />
      <ShoppingCart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-yellow-400" />
    </div>
    <h2 className="text-xl font-bold text-yellow-400 tracking-wider">
      Loading your vault...
    </h2>
  </div>
);

const PageHeader = () => (
  <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-6 mb-8">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 rounded-full">
          <ShoppingCart className="h-8 w-8 text-black" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          Your Gold Vault
        </h1>
      </div>
      <Link
        to="/"
        className="flex items-center space-x-2 px-6 py-3 border border-yellow-400/30 text-yellow-400 rounded-full hover:bg-yellow-400/10 hover:border-yellow-400 hover:-translate-y-1 transition-all duration-300"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Continue Shopping</span>
      </Link>
    </div>
  </div>
);

const EmptyCart = () => (
  <div className="text-center py-16 bg-yellow-400/5 border border-yellow-400/10 rounded-3xl">
    <ShoppingCart className="h-24 w-24 text-yellow-400/30 mx-auto mb-6" />
    <h2 className="text-3xl font-bold text-yellow-400 mb-4">
      Your vault is empty
    </h2>
    <p className="text-yellow-400/70 text-lg mb-8">
      Start building your precious metals collection
    </p>
    <Link
      to="/"
      className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-8 py-4 rounded-full hover:from-yellow-500 hover:to-yellow-400 hover:shadow-lg hover:shadow-yellow-400/25 hover:-translate-y-1 transition-all duration-300"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Explore Collection</span>
    </Link>
  </div>
);

const ErrorAlert = ({ error }: { error: string }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
      <p className="text-red-400">{error}</p>
    </div>
  </div>
);

// Helper function to convert CartItem to ProcessedCartItem based on actual API structure
const processCartItem = (item: CartItemType): ProcessedCartItem => {
  return {
    id: item.id,
    name: item.bar.name.en, // Use English name
    image: item.bar.image,
    price: item.gold_price + item.making_charge, // Total item price
    quantity: item.quantity,
    total: item.total,
    weight: item.bar.bar_weight,
    karat: item.bar.bar_karat,
    maker: item.bar.maker,
  };
};

const CartItemsSection = ({
  items,
  loading,
  onClearCart,
}: {
  items: ProcessedCartItem[]; // Already processed items
  loading: boolean;
  onClearCart: () => void;
}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-yellow-400">
            Vault Items ({items.length})
          </h2>
          <button
            onClick={onClearCart}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 border border-red-500/30 text-red-400 rounded-full hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Vault</span>
          </button>
        </div>
        <div className="border-t border-yellow-400/20 pt-6 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CheckoutButton = ({ disabled }: { disabled: boolean }) => (
  <button
    disabled={disabled}
    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 rounded-xl text-lg hover:from-yellow-500 hover:to-yellow-400 hover:shadow-lg hover:shadow-yellow-400/25 hover:-translate-y-1 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300"
  >
    Secure Checkout
  </button>
);

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, summary, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  // Items are already processed as ProcessedCartItem[] in the Redux state
  const safeItems = Array.isArray(items) ? items : [];

  // Fetch cart data on mount and set up periodic refresh
  useEffect(() => {
    // Initial fetch
    dispatch(fetchCartItems());
    dispatch(fetchCartSummary());

    // Set up periodic refresh every 30 seconds when page is active
    const refreshInterval = setInterval(() => {
      if (!document.hidden) {
        dispatch(fetchCartItems());
        dispatch(fetchCartSummary());
      }
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, [dispatch]);

  // Refresh cart when page becomes visible (user switches back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        dispatch(fetchCartItems());
        dispatch(fetchCartSummary());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [dispatch]);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire vault?")) {
      dispatch(clearCartItems());
    }
  };

  // Loading state for initial load - now uses centered loading screen
  if (loading && safeItems.length === 0) {
    return <CenteredLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-7xl mx-auto">
          <PageHeader />
        </div>
      </div>

      {/* Error Alert */}
      {error && <ErrorAlert error={error} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {safeItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CartItemsSection
              items={safeItems}
              loading={loading}
              onClearCart={handleClearCart}
            />

            {/* Sidebar */}
            <div className="space-y-6">
              <CartSummary summary={summary} itemCount={safeItems.length} />
              <CheckoutButton disabled={safeItems.length === 0} />
            </div>
          </div>
        )}
      </div>

      {/* Loading indicator for updates - centered overlay */}
      {loading && safeItems.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-400/30 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <LoadingSpinner size="h-12 w-12" />
              <p className="text-yellow-400 font-medium">
                Updating your cart...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
