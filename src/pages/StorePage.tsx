import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchProducts, clearError } from "../features/products/productSlice";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { HeroSection } from "../components/common/HeroSection";
import { ErrorAlert } from "../components/common/ErrorAlert";
import { EmptyState } from "../components/common/EmptyState";
import { ProductsGrid } from "../components/common/ProductGrid";

const StorePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [retryCount, setRetryCount] = useState(0);

  const validProducts = products.filter(
    (product) =>
      product &&
      product.id &&
      product.name &&
      typeof product.name === "string" &&
      product.name.trim().length > 0
  );

  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    dispatch(clearError());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDismissError = useCallback(() => {
    dispatch(clearError());
    setRetryCount(0);
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    setRetryCount(0);
    dispatch(clearError());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length === 0 && !loading && !error) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading, error]);

  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <HeroSection />

      {error && (
        <ErrorAlert
          error={error}
          retryCount={retryCount}
          onRetry={handleRetry}
          onDismiss={handleDismissError}
          loading={loading}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {validProducts.length === 0 && !loading && !error ? (
          <EmptyState onRefresh={handleRefresh} loading={loading} />
        ) : (
          <ProductsGrid
            products={validProducts}
            loading={loading}
            totalProducts={products.length}
          />
        )}
      </main>
    </div>
  );
};

export default StorePage;
