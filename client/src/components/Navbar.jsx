"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiMenuLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          Ecommerce
        </Link>

        <div className="hidden sm:flex space-x-4">
          <Link href="/products" className="text-gray-300 hover:text-white">
            Products
          </Link>
          <Link href="/categories" className="text-gray-300 hover:text-white">
            Categories
          </Link>
          <Link href="/cart" className="text-gray-300 hover:text-white">
            Cart
          </Link>
          <Link href="/login" className="text-gray-300 hover:text-white">
            {!isLoggedIn ? "Login" : user?.user}
          </Link>
          <div
            className="flex justify-center flex-col p-2"
            onClick={toggleDropdown}
          >
            <select>
              <option>{user?.user || "User"}</option>
              <option>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
              </option>
              <option value="">
                <Link href="/" className="text-gray-300 hover:text-white">
                  Logout
                </Link>
              </option>
            </select>
          </div>
        </div>

        <div className="sm:hidden">
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
        <div className="sm:hidden mt-2">
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
