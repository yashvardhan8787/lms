import React from "react";
import hero from "../../public/assets/images/hero-unscreen.png";
import c1 from "../../public/assets/cloud1.png";
import c2 from "../../public/assets/cloud2.png";
import Land from "../../public/assets/land.png";
import dummy from "../../public/assets/dummy.png";
import slider from "../../public/assets/slider.png";
import cat from "../../public/assets/cat.png";
import sparkels from "../../public/assets/sparkels.png";
import plus from "../../public/assets/plus.png";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const HomePage2 = () => {
  return (
    <div className="flex-1  space-y-6 bg-[#fcfcfb] min-h-screen border rounded-3xl overflow-scroll scrollbar-hide">
      <div className="container mx-auto lg:py-16">
        {/* Main Section */}
        <section className="relative bg-white p-6 space-y-16 lg:p-10 rounded-3xl shadow-lg overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-10 flex justify-between items-start">
            <img
              src={c1}
              className="hidden sm:block w-20 sm:w-32 h-auto absolute top-10 left-4"
              alt="Cloud"
            />
            <img
              src={sparkels}
              className="hidden lg:block w-6 sm:w-14 h-auto absolute top-8 right-20"
              alt="Sparkles"
            />
            <img
              src={c2}
              className="hidden sm:block w-24 sm:w-36 h-auto absolute top-20 right-4"
              alt="Cloud"
            />
            <img
              src={plus}
              className="hidden sm:block w-8 h-auto absolute top-40 left-8"
              alt="Plus"
            />
            <img
              src={plus}
              className="hidden sm:block w-8 h-auto absolute top-72 right-10"
              alt="Plus"
            />
          </div>

          <div className="text-center mt-10 sm:mt-16">
            {/* Enhanced Title */}
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#4A3D8E] leading-tight">
              Playground
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-lg p-6 sm:p-12 sm:text-2xl text-[#6F6598] font-medium mb-8 leading-relaxed">
              Explore, Learn, and Grow with Fun Activities!
            </p>

            {/* Start Button */}
            <div>
              <Link to="/courses">
                <button className="bg-[#5A4BA1] hover:bg-[#704cb2] rounded-full text-white text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 transition duration-300 ease-in-out font-semibold">
                  LET'S START
                </button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-16 sm:bottom-32 left-8 z-20">
            <img src={slider} alt="Slide" className="w-16 sm:w-32" />
          </div>
          <div className="absolute bottom-16 sm:bottom-32 right-8 z-20">
            <img src={dummy} alt="Gnome" className="w-16 sm:w-32" />
          </div>
          <div className="absolute bottom-16 sm:bottom-32 right-24 sm:right-32 z-20">
            <img src={cat} alt="Sleeping Cat" className="w-10 sm:w-20" />
          </div>

          {/* Land Images */}
          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 z-0 flex">
            <img src={Land} alt="Land" className="w-64 sm:w-96" />
            <img src={Land} alt="Land" className="w-64 sm:w-96" />
            <img src={Land} alt="Land" className="w-64 sm:w-96" />
            <img src={Land} alt="Land" className="w-64 sm:w-96" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage2;
