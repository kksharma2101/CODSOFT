"use client";
import AuthForm from "@/components/AuthForm";
import { login } from "@/redux/slices/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (formData) => {
    try {
      const user = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}login`,
        formData
      );
      if (user?.data?.success) {
        dispatch(login(user?.data));
        // localStorage.setItem("auth", JSON.stringify(user.data))
        navigate.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AuthForm onSubmit={handleLogin} />
      <p className="text-center text-sm my-5">
        New to?{" "}
        <Link href="/register" className="text-blue-600">
          {" "}
          Get Started➡️
        </Link>
      </p>
    </div>
  );
};

export default page;
