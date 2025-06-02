import { Diamond, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  onRefresh: () => void;
  loading: boolean;
}

export const EmptyState = ({ onRefresh, loading }: EmptyStateProps) => {
  return (
    <section className="text-center py-16">
      <Diamond className="h-20 w-20 text-yellow-400/50 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        No Products Available
      </h2>
      <p className="text-yellow-400/70 mb-8">
        Our vault is being restocked with premium pieces
      </p>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center space-x-2 mx-auto px-6 py-3 border border-yellow-400/30 text-yellow-400 rounded-full hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300 disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        <span>{loading ? "Refreshing..." : "Refresh Collection"}</span>
      </button>
    </section>
  );
};
