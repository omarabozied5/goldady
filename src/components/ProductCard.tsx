import {
  ShoppingCart,
  Star,
  Diamond,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAppDispatch } from "../app/hooks";
import { updateCartItem } from "../features/cart/cartSlice";
import { Product } from "../features/products/productTypes";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("EGP", "EGP");
  };
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    setError(null);
    setJustAdded(false);

    try {
      const payload = {
        bar_id: product.id,
        action: "INCREMENT" as const,
      };

      const result = await dispatch(updateCartItem(payload));

      if (updateCartItem.fulfilled.match(result)) {
        // Success - show feedback
        setJustAdded(true);

        // Clear success message after 2 seconds
        setTimeout(() => {
          setJustAdded(false);
        }, 2000);
      } else if (updateCartItem.rejected.match(result)) {
        setError((result.payload as string) || "Failed to add to cart");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to add to cart"
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/20 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 hover:border-yellow-400/50">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Success indicator */}
      {justAdded && (
        <div className="absolute inset-0 bg-green-500/10 border-2 border-green-400/50 rounded-2xl z-10 flex items-center justify-center">
          <div className="bg-green-500 rounded-full p-3 animate-bounce">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
        </div>
      )}

      {/* Image container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-image.jpg";
          }}
        />

        {/* Premium badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-lg flex items-center space-x-1">
          <Diamond className="h-3 w-3" />
          <span className="text-xs font-bold">PREMIUM</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-2 left-2 bg-black/70 rounded-full px-2 py-1 flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < 4 ? "text-yellow-400 fill-current" : "text-yellow-400/30"
              }`}
            />
          ))}
          <span className="text-white text-xs ml-1">4.8</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-bold text-yellow-400 line-clamp-2 group-hover:text-yellow-300 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full font-bold">
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Success message */}
        {justAdded && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-2 flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-xs font-medium">
              Added to cart successfully!
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2 flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 text-xs font-medium">
                Failed to add to cart
              </p>
              <p className="text-red-400/80 text-xs mt-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-400/60 hover:text-red-400 text-xs underline mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`
            w-full py-3 rounded-xl font-bold flex items-center justify-center space-x-2 
            transition-all duration-300 relative z-10
            ${
              isAdding
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : justAdded
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black cursor-pointer hover:from-yellow-500 hover:to-yellow-400 hover:shadow-lg hover:shadow-yellow-400/25 hover:-translate-y-1 active:translate-y-0"
            }
          `}
        >
          {justAdded ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
