import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/selectors/cartSelectors";
import { formatePrize } from "../../utils/helpers";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/reducers/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveCart = (id) => dispatch(removeFromCart(id));
  const handleIncreaseQuantity = (id) => dispatch(increaseQuantity(id));
  const handleDecreaseQuantity = (id) => dispatch(decreaseQuantity(id));
  const handleCheckout = () => navigate("/checkout");

  if (!cartItems.length) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-center text-gray-600 text-xl md:text-2xl">
          🛒 Your cart is empty! Start adding items to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => handleRemoveCart(item.id)}
                onIncrease={() => handleIncreaseQuantity(item.id)}
                onDecrease={() => handleDecreaseQuantity(item.id)}
              />
            ))}
          </div>

          {/* Cart Summary Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Items</span>
                <span className="font-semibold">{cartItems.length}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Total Price</span>
                <span className="font-semibold">{formatePrize(cartTotal)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md text-lg font-semibold transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
