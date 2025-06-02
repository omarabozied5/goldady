import { Receipt, TrendingUp } from "@mui/icons-material";
import { CartSummary as CartSummaryType } from "../features/cart/cartTypes";

interface CartSummaryProps {
  summary: CartSummaryType;
  itemCount?: number;
}

const SummaryRow = ({
  label,
  value,
  icon: Icon,
  className = "",
}: {
  label: string;
  value: string;
  icon?: any;
  className?: string;
}) => (
  <div className={`flex justify-between items-center ${className}`}>
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </div>
    <span className="font-medium">{value}</span>
  </div>
);

const SecurityFeature = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center gap-2 text-yellow-400/70 text-sm bg-yellow-400/5 rounded-lg p-2">
    <span>
      {icon} {text}
    </span>
  </div>
);

const CartSummary = ({ summary, itemCount = 0 }: CartSummaryProps) => {
  const securityFeatures = [
    { icon: "🛡️", text: "Bank-Level Security" },
    { icon: "🚚", text: "Insured Shipping" },
    { icon: "✅", text: "Authenticity Guaranteed" },
  ];

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

  // Check if subtotal and total are the same (no additional fees/discounts)
  const showSubtotalSeparately = summary.subtotal !== summary.total;

  return (
    <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-400/30 rounded-2xl shadow-2xl">
      {/* Animated header */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-[length:200%_100%] animate-pulse flex-shrink-0" />

      <div className="p-6 flex flex-col h-full overflow-hidden">
        {/* Title */}
        <div className="flex items-center gap-4 mb-6 flex-shrink-0">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-3">
            <Receipt className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-xl font-bold text-yellow-400">Order Summary</h2>
        </div>

        <div className="space-y-4 flex-1 min-h-0">
          {/* Items - show subtotal only if different from total */}
          {showSubtotalSeparately ? (
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4 flex-shrink-0">
              <SummaryRow
                label={`Items (${itemCount})`}
                value={formatPrice(summary.subtotal)}
                className="text-yellow-400"
              />
            </div>
          ) : (
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4 flex-shrink-0">
              <SummaryRow
                label={`Items (${itemCount})`}
                value={formatPrice(summary.total)}
                className="text-yellow-400"
              />
            </div>
          )}

          {/* Show divider only if we have separate subtotal */}
          {showSubtotalSeparately && (
            <div className="border-t border-yellow-400/30 flex-shrink-0" />
          )}

          {/* Total */}
          <div className="bg-yellow-400/15 border-2 border-yellow-400/40 rounded-2xl p-6 flex-shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-yellow-400">
                {showSubtotalSeparately ? "Total" : "Total Amount"}
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                {formatPrice(summary.total)}
              </span>
            </div>
          </div>

          {/* Investment indicator */}
          <div className="text-center bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4 flex-shrink-0">
            <div className="flex items-center justify-center gap-2 text-yellow-400/80">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium italic">
                Investment-grade precious metals
              </span>
            </div>
          </div>

          {/* Security features - scrollable section */}
          <div className="space-y-3 ">
            <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider flex-shrink-0">
              Security Features
            </h3>
            <div className="space-y-2 ">
              {securityFeatures.map((feature, index) => (
                <SecurityFeature key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
