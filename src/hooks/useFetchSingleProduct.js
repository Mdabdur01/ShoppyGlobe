import { useEffect, useState, useCallback } from "react";

/**
 * Custom hook to fetch a single product from the given URL
 * @param {string} url - The base URL for fetching product data
 * @param {number} id - The ID of the product to fetch
 * @returns {Object} - Contains product data, loading state, and error state
 */
export const useFetchSingleProduct = (url, id) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Function to trigger a retry
  const retryFetch = useCallback(() => {
    setRetryCount((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null); // Reset any previous error

      try {
        const response = await fetch(`${url}${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        const errorMessage =
          err instanceof TypeError
            ? `${err.message} - Please check your internet connection.`
            : err.message;
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [url, id, retryCount]); // Re-run the fetch when retryCount changes

  return { product, isLoading, error, retryFetch };
};
