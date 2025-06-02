import { Receipt } from "@mui/icons-material";
import { CartSummary as CartSummaryType } from "../features/cart/cartTypes";

interface CartSummaryProps {
  summary: CartSummaryType;
  itemCount?: number;
}

const CartSummary = ({ summary, itemCount = 0 }: CartSummaryProps) => {
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
    <div className="bg-gray-800 border border-yellow-400/30 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-400 rounded-full p-2">
          <Receipt className="w-5 h-5 text-black" />
        </div>
        <h2 className="text-xl font-bold text-yellow-400">Order Summary</h2>
      </div>

      {/* Items */}
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-yellow-400/20">
          <span className="text-yellow-400">Items ({itemCount})</span>
          <span className="font-semibold text-yellow-400">
            {formatPrice(summary.subtotal)}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 bg-yellow-400/10 rounded-lg px-4">
          <span className="text-lg font-bold text-yellow-400">Total</span>
          <span className="text-xl font-bold text-yellow-400">
            {formatPrice(summary.total)}
          </span>
        </div>

        {/* Security Features */}
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold text-yellow-400/80 uppercase tracking-wide">
            Security Features
          </h3>
          <div className="space-y-2 text-sm text-yellow-400/60">
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚚</span>
              <span>Insured Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>Authenticity Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
