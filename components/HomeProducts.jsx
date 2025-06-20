import React from "react";
import HomeProductCard from "./HomeProductCard";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import ProductCard from "./ProductCard";
const HomeProducts = () => {
  const { products, router } = useAppContext();
  const HomeProducts = [
    { id: 1, category: "Dumbbells", imgSrc: assets.Dumbbells },
    { id: 2, category: "Orbitrac", imgSrc: assets.Dumbbells },
    { id: 3, category: "Rowing Matching", imgSrc: assets.Dumbbells },
    { id: 4, category: "Yoga", imgSrc: assets.Dumbbells },
    { id: 5, category: "Sports Accessories", imgSrc: assets.Dumbbells },
    { id: 6, category: "Massage", imgSrc: assets.Dumbbells },
    { id: 7, category: "Home & Kitchen", imgSrc: assets.Dumbbells },
    { id: 8, category: "School Bags", imgSrc: assets.Dumbbells },
    { id: 9, category: "T-Shirts & Shorts", imgSrc: assets.Dumbbells },
    { id: 10, category: "Exercise Bikes", imgSrc: assets.Dumbbells },
  ];
  return (
    <div className="flex flex-col items-start pt-14">
      <div className="flex flex-col items-end pt-12">
        <p className="text-2xl font-medium text-left w-full">
          Shop by Category:
        </p>
        <div className="w-20 h-0.5 bg-orange-600 rounded-full"></div>
      </div>

      <p className="text-md mt-2 font-medium">
        Find everything you need to power your workouts.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {HomeProducts.map((product, index) => (
          <HomeProductCard key={index} product={product} />
        ))}
      </div>
      {/* <button
        onClick={() => {
          router.push("/all-products");
        }}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
      >
        See more
      </button> */}
    </div>
  );
};

export default HomeProducts;
