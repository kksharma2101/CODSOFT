"use client";
import AuthForm from "@/components/AuthForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const navigate = useRouter();

  const handleLogin = async (formData) => {
    try {
      const user = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}login`,
        formData
      );
      localStorage.setItem("token", user?.data?.userToken);
      if (user?.data?.success) {
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
