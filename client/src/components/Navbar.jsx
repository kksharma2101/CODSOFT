"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiMenuLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          Ecommerce
        </Link>

        <div className="hidden md:flex space-x-4">
          <Link href="/products" className="text-gray-300 hover:text-white">
            Products
          </Link>
          <Link href="/categories" className="text-gray-300 hover:text-white">
            Categories
          </Link>
          <Link href="/cart" className="text-gray-300 hover:text-white">
            Cart
          </Link>
          <Link href="/account" className="text-gray-300 hover:text-white">
            Account
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white"
          >
            {isOpen ? (
              <RxCross2 className="h-6 w-6" />
            ) : (
              <RiMenuLine className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2">
          <Link
            href="/products"
            className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
          >
            Categories
          </Link>
          <Link
            href="/cart"
            className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
          >
            Cart
          </Link>
          <Link
            href="/account"
            className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
          >
            Account
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
