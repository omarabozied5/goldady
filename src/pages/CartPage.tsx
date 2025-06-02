import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { RootState, AppDispatch } from "../app/store";
import {
  fetchCartItems,
  fetchCartSummary,
  clearCartItems,
} from "../features/cart/cartSlice";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400/20 border-t-yellow-400" />
  </div>
);

const EmptyCart = () => (
  <div className="text-center py-16">
    <ShoppingCart className="h-16 w-16 text-yellow-400/30 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-yellow-400 mb-2">
      Your cart is empty
    </h2>
    <p className="text-yellow-400/70 mb-6">
      Start building your precious metals collection
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Continue Shopping
    </Link>
  </div>
);

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, summary, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  const safeItems = Array.isArray(items) ? items : [];

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchCartSummary());
  }, [dispatch]);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCartItems());
    }
  };

  if (loading && safeItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-2xl sm:text-xl font-bold text-yellow-400">
              Shopping Cart
            </h1>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 border border-yellow-400/30 text-yellow-400 rounded-lg hover:bg-yellow-400/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Content */}
        {safeItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-yellow-400">
                  Items ({safeItems.length})
                </h2>
                <button
                  onClick={handleClearCart}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-red-400 border border-red-400/30 rounded hover:bg-red-400/10 disabled:opacity-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {safeItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <CartSummary summary={summary} itemCount={safeItems.length} />

              <button
                disabled={safeItems.length === 0}
                className="w-full bg-yellow-400 text-black font-semibold py-4 rounded-lg hover:bg-yellow-500 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && safeItems.length > 0 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-yellow-400/30 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-yellow-400/20 border-t-yellow-400" />
                <span className="text-yellow-400">Updating cart...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
