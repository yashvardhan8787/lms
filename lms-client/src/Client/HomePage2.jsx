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
// import Review from "../components/Cards/Review";
import { Link } from "react-router-dom";

const HomePage2 = () => {
  return (
    <div className="flex-1 p-6 space-y-6 bg-[#f8f4ff] h-screen border rounded-3xl overflow-scroll scrollbar-hide">
      <div className="container mx-auto px-4 py-16">
        {/* Main Section */}
        <section className="text-center mb-20 relative bg-white p-10 rounded-3xl shadow-lg overflow-hidden h-screen">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="flex justify-between items-center">
              <div className="relative mt-16 ml-5">
                <img src={c1} className="w-32 h-24 top-1" alt="Cloud" />
              </div>
              <div className="relative pr-72">
                <img src={sparkels} className="w-14 h-14" alt="Cloud" />
              </div>
              <div className="relative mb-14">
                <img src={c1} className="w-32 h-24" alt="Cloud" />
              </div>
              <div className="relative">
                <img src={sparkels} className="w-14 h-14" alt="Cloud" />
              </div>
              <div className="relative">
                <img src={c2} className="w-36 h-24" alt="Cloud" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="flex justify-between items-center">
              <div className="relative mt-16 ml-5">
                <img src={plus} className="h-11 mt-44" alt="Cloud" />
              </div>
              <div className="relative mt-16 ml-5">
                <img src={plus} className="h-11 mt-80" alt="Cloud" />
              </div>
              <div></div>
              <div className="relative mt-16 ml-5">
                <img src={plus} className="h-11 mt-7" alt="Cloud" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-extrabold mb-4 mt-20 text-[#5A4BA1]">
            Playground
          </h1>
          <p className="text-2xl text-gray-600 mb-8">Learn with fun</p>

          {/* Button with Higher Z-Index */}
          <div className="relative z-30">
            <Link to="/courses">
              <button className="bg-[#5A4BA1] hover:bg-[#704cb2] rounded-full text-white text-lg py-4 px-8 transition duration-300 ease-in-out font-semibold">
                LET'S START
              </button>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-32 left-8 z-20">
            <img src={slider} alt="Slide" className="w-32" />
          </div>
          <div className="absolute bottom-32 right-8 z-20">
            <img src={dummy} alt="Gnome" className="w-32" />
          </div>
          <div className="absolute bottom-32 right-32 z-20">
            <img src={cat} alt="Sleeping Cat" className="w-20" />
          </div>

          {/* Land Image */}
          <div className="absolute bottom-0 left-0 right-0 h-44 z-0 flex">
            <img src={Land} alt="Land" className="w-96" />
            <img src={Land} alt="Land" className="w-96" />
            <img src={Land} alt="Land" className="w-96" />
            <img src={Land} alt="Land" className="w-96" />
          </div>
        </section>

        {/* Review Section
        <section className="w-full">
          <Review />
        </section> */}
      </div>
    </div>
  );
};

export default HomePage2;
