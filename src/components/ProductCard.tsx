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
      const result = await dispatch(
        updateCartItem({
          bar_id: product.id,
          action: "INCREMENT" as const,
        })
      );

      if (updateCartItem.fulfilled.match(result)) {
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
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

  const getButtonContent = () => {
    if (justAdded) {
      return (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>Added!</span>
        </>
      );
    }
    return (
      <>
        <ShoppingCart className="w-4 h-4" />
        <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
      </>
    );
  };

  const getButtonStyles = () => {
    if (isAdding) return "bg-gray-600 text-gray-400 cursor-not-allowed";
    if (justAdded) return "bg-green-500 text-white";
    return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-400 hover:shadow-lg transition-all";
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/20 rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl hover:border-yellow-400/50 transition-all duration-300">
      {/* Success overlay */}
      {justAdded && (
        <div className="absolute inset-0 bg-green-500/10 border-2 border-green-400/50 rounded-xl z-10 flex items-center justify-center">
          <div className="bg-green-500 rounded-full p-2 animate-bounce">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-image.jpg";
          }}
        />

        {/* Premium badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-lg flex items-center gap-1">
          <Diamond className="w-3 h-3" />
          <span className="text-xs font-bold">PREMIUM</span>
        </div>

        {/* Rating */}
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

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-bold text-yellow-400 line-clamp-2 group-hover:text-yellow-300 transition-colors">
          {product.name}
        </h3>

        <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 text-black px-3 py-1 rounded-full font-bold text-center">
          {formatPrice(product.price)}
        </div>

        {/* Success message */}
        {justAdded && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-green-400 text-xs font-medium">
              Added successfully!
            </p>
          </div>
        )}

        {/* Error message */}
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

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2.5 md:py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${getButtonStyles()}`}
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
