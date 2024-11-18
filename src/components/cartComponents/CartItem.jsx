import React from "react";
import { formatePrize } from "../../utils/helpers";
import { Link } from "react-router-dom";

const CartItem = ({ item, onRemove, onDecrease, onIncrease }) => {
  const { id, title, price, images, quantity } = item;

  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <img
        src={images[0]}
        alt={`${title}-image`}
        className="w-28 h-28 object-cover rounded-lg mb-4 md:mb-0"
      />

      {/* Product Details */}
      <div className="flex-1 md:ml-6">
        <Link to={`/productDetails/${id}`} className="hover:underline">
          <h2 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm">Unit Price: {formatePrize(price)}</p>
      </div>

      {/* Quantity Controls and Price */}
      <div className="flex flex-col items-center md:ml-6">
        <div className="flex items-center">
          <button
            onClick={onDecrease}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-4 font-medium">{quantity}</span>
          <button
            onClick={onIncrease}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <p className="mt-2 font-semibold text-gray-800">
          Total: {formatePrize(price * quantity)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="mt-4 md:mt-0 md:ml-6 text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
