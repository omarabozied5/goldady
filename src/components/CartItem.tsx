import { Add, Remove, Delete } from "@mui/icons-material";
import { memo, useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { updateCartItem } from "../features/cart/cartSlice";
import { ProcessedCartItem, CartAction } from "../features/cart/cartTypes";

interface CartItemProps {
  item: ProcessedCartItem;
}

const CartItem = memo(({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleAction = useCallback(
    (action: CartAction) => {
      dispatch(updateCartItem({ bar_id: item.id, action }));
    },
    [dispatch, item.id]
  );

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
    <div className="bg-gray-800 border border-yellow-400/20 rounded-xl p-4 hover:border-yellow-400/50 transition-colors">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <img
            src={item.image || "/placeholder-image.jpg"}
            alt={item.name}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-yellow-400/30"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-image.jpg";
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2 truncate">
            {item.name}
          </h3>

          <div className="text-sm text-yellow-400/60 mb-2">
            {item.weight} • {item.karat} • {item.maker}
          </div>

          <div className="text-yellow-400/80">
            {formatPrice(item.price)} per item
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          <div className="text-xl font-bold text-yellow-400 text-center sm:text-right">
            {formatPrice(item.total)}
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button
              onClick={() => handleAction("DECREMENT")}
              disabled={item.quantity <= 1}
              className="w-8 h-8 border border-yellow-400/30 rounded text-yellow-400 hover:bg-yellow-400/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Remove className="w-4 h-4" />
            </button>

            <span className="w-12 text-center text-yellow-400 font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => handleAction("INCREMENT")}
              className="w-8 h-8 border border-yellow-400/30 rounded text-yellow-400 hover:bg-yellow-400/10 transition-colors"
            >
              <Add className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => handleAction("DELETE")}
            className="flex items-center justify-center gap-1 px-3 py-1 text-sm text-red-400 border border-red-400/30 rounded hover:bg-red-400/10 transition-colors"
          >
            <Delete className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = "CartItem";

export default CartItem;
