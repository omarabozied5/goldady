import { Diamond, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  onRefresh: () => void;
  loading: boolean;
}

export const EmptyState = ({ onRefresh, loading }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 md:py-16">
      <Diamond className="w-16 h-16 md:w-20 md:h-20 text-yellow-400/50 mx-auto mb-6" />

      <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4">
        No Products Available
      </h2>

      <p className="text-yellow-400/70 mb-6 md:mb-8 max-w-md mx-auto">
        Our vault is being restocked with premium pieces
      </p>

      <button
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 border border-yellow-400/30 text-yellow-400 rounded-full hover:bg-yellow-400/10 hover:border-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        <span>{loading ? "Refreshing..." : "Refresh Collection"}</span>
      </button>
    </div>
  );
};
