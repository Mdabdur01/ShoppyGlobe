import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/home"}>
      <span className="text-white text-2xl">ShoppyGlobe</span>
    </Link>
  );
};

export default Logo;
