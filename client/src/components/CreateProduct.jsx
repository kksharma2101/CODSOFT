"use client";

import axios from "axios";
import React, { useState } from "react";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState();

  // Handle file selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product/create-product`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-center rounded-md flex-col p-3 border gap-5">
      <h1 className="text-center text-black text-lg font-bold">Create Product</h1>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 rounded-sm"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 rounded-sm"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 rounded-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="border p-2 rounded-sm"
          />
          <button type="submit" className="py-1 font-bold bg-blue-500 text-white rounded-lg" >Upload</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
