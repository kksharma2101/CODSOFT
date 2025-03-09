"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiMenuLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="mx-4 flex justify-between items-center">
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
          {!isLoggedIn ? (
            <Link href="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          ) : (
            <div onClick={toggleDropdown}>
              <p className="text-gray-300 hover:text-white cursor-pointer">
                {user?.user || "User"}
              </p>
              {dropDown && (
                <div className="absolute right-1 z-50 flex justify-center flex-col bg-white border-b p-3 rounded-sm">
                  <Link
                    href="/dashboard"
                    className="text-gray-500 hover:text-black"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
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
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
            >
              Login
            </Link>
          ) : (
            <div
              className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              onClick={toggleDropdown}
            >
              <p className="text-gray-300 hover:text-white cursor-pointer">
                {user?.user || "User"}
              </p>
              {dropDown && (
                <div className="absolute left-1 z-50 flex justify-center flex-col bg-white border-b p-3 rounded-sm">
                  <Link
                    href="/dashboard"
                    className="text-gray-500 hover:text-black"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
