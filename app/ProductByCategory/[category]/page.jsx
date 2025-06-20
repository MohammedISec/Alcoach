"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";

const ProductsByCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  // const category = params?.category; // category from route
  const decodedCategory = decodeURIComponent(category);
  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category === decodedCategory
  );
  console.log(category);
  // أحيانًا تظهر %20 بدل المسافة لأن اسم الفئة (category) يأتي من عنوان الرابط (URL)
  // في الروابط، المسافة تُحوّل إلى %20 تلقائيًا (URL encoding)
  // لحل المشكلة، استخدم decodeURIComponent لفك ترميز اسم الفئة:

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">{decodedCategory} products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>
        <p className="text-md font-medium">
          Discover our top-selling and most recommended {decodedCategory}{" "}
          products.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsByCategory;
