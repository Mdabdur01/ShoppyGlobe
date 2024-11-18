import { useEffect, useState } from "react";

/**
 * Custom hook to fetch products from the given URL
 * @param {string} url - The URL to fetch products from
 * @returns {Object} - Contains products, loading state, and error state
 */
export const useFetchProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Function to retry fetching in case of failure
  const retryFetch = () => {
    setRetryCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Reset loading state before making a new fetch attempt
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
        setError(null); // Reset error on successful fetch
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

    fetchProducts();
  }, [url, retryCount]); // Re-run fetch when retryCount changes

  return { products, isLoading, error, retryFetch };
};
