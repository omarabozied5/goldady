import { RefreshCw, AlertTriangle } from "lucide-react";
import { getErrorMessage } from "../../utils/errorUtils";

interface ErrorAlertProps {
  error: unknown;
  retryCount: number;
  onRetry: () => void;
  onDismiss: () => void;
  loading: boolean;
}

const MAX_RETRY_COUNT = 3;

export const ErrorAlert = ({
  error,
  retryCount,
  onRetry,
  onDismiss,
  loading,
}: ErrorAlertProps) => {
  const getErrorText = (error: unknown): string => {
    if (error instanceof Error) {
      return getErrorMessage(error, "en", "An unexpected error occurred");
    }
    if (typeof error === "string") {
      return error;
    }
    return "An unexpected error occurred";
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3 flex-1">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-red-400 font-semibold">
                Failed to Load Products
              </h3>
              <p className="text-red-400/80 mt-1">{getErrorText(error)}</p>
              {retryCount > 0 && (
                <p className="text-red-400/60 text-sm mt-1">
                  Retry attempts: {retryCount}/{MAX_RETRY_COUNT}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={onRetry}
              disabled={loading || retryCount >= MAX_RETRY_COUNT}
              className="flex items-center space-x-1 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              <span>{loading ? "Retrying..." : "Retry"}</span>
            </button>
            <button
              onClick={onDismiss}
              className="px-3 py-1 text-red-400/80 hover:text-red-400 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
