import { ShoppingCart, Store, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const Header = () => {
  const location = useLocation();
  const cartItems = useAppSelector((state) => state.cart.items);

  // Safe guard to ensure cartItems is always an array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const cartItemCount = safeCartItems.reduce(
    (total, item) => total + (item?.quantity || 0),
    0
  );

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-yellow-500/20 shadow-2xl">
      <div className="relative">
        {/* Animated golden line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
                <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  GOLD ADY
                </h1>
              </div>
              <span className="text-yellow-400/80 text-sm italic hidden sm:block">
                Premium Collection
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-6 py-2 rounded-full border transition-all duration-300 ${
                  location.pathname === "/"
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-400/25"
                    : "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5"
                }`}
              >
                <Store className="h-4 w-4" />
                <span className="font-medium">Store</span>
              </Link>

              <Link
                to="/cart"
                className="relative p-3 rounded-full border-2 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300 hover:scale-110"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
