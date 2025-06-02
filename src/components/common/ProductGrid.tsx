import ProductCard from "../ProductCard";
import { Product } from "../../features/products/productTypes";

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
  totalProducts: number;
}

export const ProductsGrid = ({
  products,
  loading,
  totalProducts,
}: ProductsGridProps) => {
  return (
    <>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {loading && (
        <div className="flex justify-center items-center mt-12 space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-yellow-400/20 border-t-yellow-400"></div>
          <span className="text-yellow-400">Updating collection...</span>
        </div>
      )}

      <div className="text-center mt-8">
        <p className="text-yellow-400/60 text-sm">
          Showing {products.length} premium{" "}
          {products.length === 1 ? "item" : "items"}
          {totalProducts !== products.length && (
            <span className="text-yellow-400/40 ml-2">
              ({totalProducts - products.length} filtered out)
            </span>
          )}
        </p>
      </div>
    </>
  );
};
