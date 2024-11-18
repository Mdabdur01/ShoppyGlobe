import { formatePrize } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cartSlice";
import { useState } from "react";

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div
      key={product.id}
      className="group max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          className="w-full h-56 object-cover"
          src={product.images[0]}
          alt={`${product.title}-image`}
        />
        <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
          In Stock
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link to={`/productDetails/${product.id}`}>
          <h2 className="text-lg font-bold text-gray-800 hover:text-blue-500 transition">
            {product.title}
          </h2>
        </Link>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <p className="mt-4 text-xl font-semibold text-green-600">
          {formatePrize(product.price)}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
