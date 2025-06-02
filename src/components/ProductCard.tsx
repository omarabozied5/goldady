import React, { useState } from "react";
import {
  ShoppingCart,
  Star,
  Diamond,
  CheckCircle,
  AlertCircle,
  Tag,
} from "lucide-react";
import { useAppDispatch } from "../app/hooks";
import { updateCartItem } from "../features/cart/cartSlice";
import { Product } from "../features/products/productTypes";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("EGP", "EGP");

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    setError(null);

    try {
      const result = await dispatch(
        updateCartItem({
          bar_id: product.id,
          action: "INCREMENT",
        })
      );

      if (updateCartItem.fulfilled.match(result)) {
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
      } else {
        setError((result.payload as string) || "Failed to add to cart");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/20 rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl hover:border-yellow-400/50 transition-all duration-300">
      {justAdded && (
        <div className="absolute inset-0 bg-green-500/10 border-2 border-green-400/50 rounded-xl z-10 flex items-center justify-center">
          <div className="bg-green-500 rounded-full p-2 animate-bounce">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
        />

        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-lg flex items-center gap-1">
          <Diamond className="w-3 h-3" />
          <span className="text-xs font-bold">PREMIUM</span>
        </div>

        <div className="absolute bottom-2 left-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < 4 ? "text-yellow-400 fill-current" : "text-yellow-400/30"
              }`}
            />
          ))}
          <span className="text-white text-xs ml-1">4.8</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-sm font-bold text-yellow-400 line-clamp-2 group-hover:text-yellow-300 transition-colors">
          {product.name}
        </h3>

        <div className="space-y-2">
          <div className="relative">
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-transform">
              {formatPrice(product.price)}
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
              ✓ Best Price
            </div>
            <div className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full border border-blue-500/30">
              Free Shipping
            </div>
          </div>
        </div>

        {justAdded && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-green-400 text-xs font-medium">
              Added successfully!
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-400 text-xs font-medium">
                  Failed to add
                </p>
                <p className="text-red-400/80 text-xs">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400/60 hover:text-red-400 text-xs underline mt-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2.5 md:py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isAdding
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : justAdded
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-400 hover:shadow-lg"
          }`}
        >
          {justAdded ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
