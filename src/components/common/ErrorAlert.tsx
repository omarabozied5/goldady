import { RefreshCw, AlertTriangle, X } from "lucide-react";
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

  const canRetry = retryCount < MAX_RETRY_COUNT && !loading;

  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />

        <div className="flex-1 min-w-0">
          <h3 className="text-red-400 font-semibold mb-1">
            Failed to Load Products
          </h3>
          <p className="text-red-400/80 text-sm mb-2 break-words">
            {getErrorText(error)}
          </p>
          {retryCount > 0 && (
            <p className="text-red-400/60 text-xs">
              Retry attempts: {retryCount}/{MAX_RETRY_COUNT}
            </p>
          )}
        </div>

        <button
          onClick={onDismiss}
          className="text-red-400/60 hover:text-red-400 p-1 rounded transition-colors"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        {canRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 hover:bg-red-500/30 transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Retrying..." : "Retry"}</span>
          </button>
        )}

        {!canRetry && retryCount >= MAX_RETRY_COUNT && (
          <p className="text-red-400/60 text-sm">
            Maximum retry attempts reached. Please refresh the page.
          </p>
        )}
      </div>
    </div>
  );
};
