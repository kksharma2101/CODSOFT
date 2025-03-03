import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ProductCard />
    </div>
  );
}
