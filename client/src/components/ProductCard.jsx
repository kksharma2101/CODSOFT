"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  async function getProduct() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}product/get-product`
    );
    //   console.log(res.data.product[0].photo)
    setProducts(res.data.product);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {products?.map((product) => (
        <div
          key={product._id}
          className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        >
          <div className="relative w-full h-56">
            {/* {product.photo ? ( */}
            {/* <p className="text-wrap h-screen">{product.photo}</p> */}
            <Image
              // src={product?.photo}
              src={`http://localhost:2026/api/image/${product._id}`}
              alt={product.name}
              width={100}
              height={100}
              // layout="fill"
              // objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
            {/* ) : null} */}
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold">
              {product.name || "Unnamed Product"}
            </h3>
            <p className="text-gray-600 text-sm">
              {product.description || "No description available."}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-blue-600">
                ${product.price || "N/A"}
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
