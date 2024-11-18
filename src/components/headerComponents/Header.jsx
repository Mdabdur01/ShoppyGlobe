import React, { useMemo } from "react";
import Logo from "./logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/selectors/cartSelectors";

const Header = () => {
  const cartItems = useSelector(selectCartItems);

  // Memoize total cart count for optimization
  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  return (
    <header className="flex items-center justify-between py-4 px-8 shadow-md sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Cart Section */}
      <div>
        <Link
          to="/cart"
          className="relative flex items-center justify-center text-white hover:text-yellow-300 transition duration-300"
        >
          <i className="fa-solid fa-cart-shopping text-2xl"></i>
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-3 bg-red-600 text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center"
              aria-label={`Cart items: ${cartCount}`}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
