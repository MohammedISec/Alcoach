import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.cover,
    },
    // {
    //   id: 2,
    //   title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    //   offer: "Hurry up only few lefts!",
    //   buttonText1: "Shop Now",
    //   buttonText2: "Explore Deals",
    //   imgSrc: assets.header_playstation_image,
    // },
    // {
    //   id: 3,
    //   title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    //   offer: "Exclusive Deal 40% Off",
    //   buttonText1: "Order Now",
    //   buttonText2: "Learn More",
    //   imgSrc: assets.header_macbook_image,
    // },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between  md:px-1 px-0 mt-4 rounded-xl min-w-full "
          >
            {/* <div className="md:pl-8 mt-10 md:mt-0"> */}
            {/* <p className="md:text-base text-orange-600 pb-h1">{slide.offer}</p> */}
            {/* <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1> */}
            {/* <div className="flex items-center mt-4 md:mt-6 "> */}
            {/* <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button> */}
            {/* <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button> */}
            {/* </div> */}
            {/* // </div> */}
            <div
              onClick={() => {
                window.open(
                  "https://www.amazon.sa/stores/ALCOACH/page/F121CAEF-5071-468F-AB9E-BBB290041BFC?lp_asin=B0C4Q1ZQLQ&ref_=ast_bln",
                  "_blank"
                );
              }}
              className="w-[400px] h-[570px] md:h-[500px] md:w-full relative "
            >
              {/* صورة للموبايل فقط */}
              <Image
                src={assets.Cover_Mobile}
                alt="Mobile Cover"
                className="block sm:hidden w-full h-full object-cover"
                fill
                sizes="100vw"
                priority
              />
              {/* صورة للابتوب فقط */}
              <Image
                src={assets.cover}
                alt="Desktop Cover"
                className="hidden sm:block w-full h-full object-fill"
                fill
                sizes="100vw"
                priority
              />
              {/* محتوى فوق الصورة */}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div> */}
    </div>
  );
};

export default HeaderSlider;
