"use client";
import AuthForm from "@/components/AuthForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const navigate = useRouter();

  const handleRegister = async (formData) => {
    try {
      const user = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}register`,
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
      <AuthForm type="register" onSubmit={handleRegister} />
      <p className="text-center text-sm my-5">
        If Already have an Account?{" "}
        <Link href="/login" className="text-blue-600">
          {" "}
          Log-in➡️
        </Link>
      </p>
    </div>
  );
};

export default page;
