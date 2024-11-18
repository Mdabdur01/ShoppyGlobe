import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-4">
          &copy; {new Date().getFullYear()} ShoppyGlobe. All Rights Reserved.
        </p>
        <div className="text-sm text-gray-400">
          <p className="mb-2">
            <a href="/terms" className="hover:text-white">Terms & Conditions</a> | 
            <a href="/privacy" className="hover:text-white"> Privacy Policy</a>
          </p>
          <p>
            Contact us at <a href="mailto:contact@shoppyglobe.com" className="hover:text-white">contact@shoppyglobe.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
