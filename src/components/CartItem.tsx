import { Add, Remove, Delete, Star } from "@mui/icons-material";
import { memo, useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { updateCartItem } from "../features/cart/cartSlice";
import { ProcessedCartItem, CartAction } from "../features/cart/cartTypes";

interface CartItemProps {
  item: ProcessedCartItem;
}

const QuantityButton = ({
  onClick,
  disabled = false,
  children,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center justify-center w-10 h-10 border border-yellow-400/30 rounded-lg text-yellow-400 transition-all duration-300 hover:bg-yellow-400/10 hover:border-yellow-400 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
    aria-label={label}
    type="button"
  >
    {children}
  </button>
);

const CartItem = memo(({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleAction = useCallback(
    (action: CartAction) => {
      console.log(`Performing ${action} on item:`, item.id);
      // Use the correct bar_id property based on your API structure
      dispatch(updateCartItem({ bar_id: item.id, action }));
    },
    [dispatch, item.id]
  );

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = "/placeholder-image.jpg";
    },
    []
  );

  const isDecreaseDisabled = item.quantity <= 1;

  // Format price display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("EGP", "EGP");
  };

  return (
    <article className="relative group bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-400/20 rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/20 hover:border-yellow-400/50 transition-all duration-500 mb-4">
      {/* Hover effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 p-6">
        <div className="flex items-start gap-6">
          {/* Product Image */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-yellow-400/30 group-hover:border-yellow-400 group-hover:scale-105 transition-all duration-300">
              <img
                src={item.image || "/placeholder-image.jpg"}
                alt={`${item.name} - Gold bar product`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={handleImageError}
                loading="lazy"
              />
            </div>

            {/* Premium badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-800 shadow-lg">
              <Star className="w-3 h-3 text-black" />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-grow min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors mb-2 line-clamp-2">
                  {item.name}
                </h3>

                {/* Product specs */}
                <div className="flex gap-4 mb-2">
                  <span className="text-yellow-400/70 text-sm">
                    {item.weight} • {item.karat} • {item.maker}
                  </span>
                </div>

                <p className="text-yellow-400/70 mb-4">
                  {formatPrice(item.price)} per item
                </p>

                {/* Quantity Controls */}
                <div
                  className="flex items-center gap-3"
                  role="group"
                  aria-label="Quantity controls"
                >
                  <QuantityButton
                    onClick={() => handleAction("DECREMENT")}
                    disabled={isDecreaseDisabled}
                    label={`Decrease quantity of ${item.name}`}
                  >
                    <Remove className="w-4 h-4" />
                  </QuantityButton>

                  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-4 py-2 min-w-[60px] text-center">
                    <span className="text-yellow-400 font-bold text-lg">
                      {item.quantity}
                    </span>
                  </div>

                  <QuantityButton
                    onClick={() => handleAction("INCREMENT")}
                    label={`Increase quantity of ${item.name}`}
                  >
                    <Add className="w-4 h-4" />
                  </QuantityButton>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col items-end gap-4 text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  {formatPrice(item.total)}
                </div>

                <button
                  onClick={() => handleAction("DELETE")}
                  className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 rounded-full text-sm hover:bg-red-500/10 hover:border-red-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  aria-label={`Remove ${item.name} from cart`}
                  type="button"
                >
                  <Delete className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

CartItem.displayName = "CartItem";

export default CartItem;
