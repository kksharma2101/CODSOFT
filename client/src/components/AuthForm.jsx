"use client";
import { useState } from "react";

export default function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(type === "register" && { name: "", role: "" }), // Only show name field for Register
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the parent component function
  };

  return (
    <div className="w-full flex justify-center items-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {type === "register" ? "Register" : "Login"}
        </h2>

        {type === "register" && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        {type === "register" && (
          <input
            type="role"
            name="role"
            placeholder="Type Your Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {type === "register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
}
