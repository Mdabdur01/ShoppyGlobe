import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/reducers/cartSlice";
import BackButton from "./BackButton";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "creditCard",
  });

  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    dispatch(clearCart());
    navigate("/orderConfirmation");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <BackButton />
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

      {currentStep === 1 && (
        <form className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Shipping Details</h3>
          <div>
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Next: Payment
          </button>
        </form>
      )}

      {currentStep === 2 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Details</h3>
          <div className="mb-6">
            <label className="block text-gray-600">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Next: Review Order
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Review Order</h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-gray-700"
              >
                <span>
                  {item.name} - {item.quantity} x ${item.price}
                </span>
                <span>${item.quantity * item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
