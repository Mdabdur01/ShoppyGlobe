import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { useFetchSingleProduct } from "../../hooks/useFetchSingleProduct";
import { formatePrize } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/reducers/cartSlice";
import { selectCartItems } from "../../redux/selectors/cartSelectors";
import BackButton from "../BackButton";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // Fetch product details using custom hook
  const { product, isLoading, error } = useFetchSingleProduct(
    "https://dummyjson.com/products/",
    id
  );

  const cartProduct = cartItems.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(cartProduct?.quantity || 1);
  const [mainImage, setMainImage] = useState("");

  // Set initial main image
  useEffect(() => {
    if (product) setMainImage(product.images[0]);
  }, [product]);

  const handleIncrease = () => {
    if (cartProduct) {
      dispatch(increaseQuantity(id));
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      if (cartProduct) {
        dispatch(decreaseQuantity(id));
      }
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!cartProduct) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <BackButton />

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div>
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-4"
          />
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail-${index}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
                  mainImage === image ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <p className="text-2xl font-bold text-green-600">
            {formatePrize(product.price * quantity)}
          </p>

          {/* Product Info */}
          <div className="space-y-2 text-gray-500">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDecrease}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white text-lg py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {cartProduct ? "Update Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
