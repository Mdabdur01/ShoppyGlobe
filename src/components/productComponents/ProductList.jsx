import Loader from "../Loader";
import ProductItem from "./ProductItem";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useState } from "react";

const ProductList = () => {
  const { products, isLoading, error } = useFetchProducts(
    `https://dummyjson.com/products`
  );

  const [filterCategory, setFilterCategory] = useState("all");

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  const categories = ["all", "beauty", "fragrances", "furniture", "groceries"];

  // Filter products by category
  const filteredProducts =
    filterCategory === "all"
      ? products
      : products.filter((product) => product.category === filterCategory);

  return (
    <div className="container mx-auto my-12 p-4">
      {/* Filters */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
