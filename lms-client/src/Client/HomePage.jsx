import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import hero from "../../public/assets/images/hero-unscreen.png";
import "@splidejs/react-splide/css";
import { FaHeart } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import Review from "../components/Cards/Review";
const HomePage = () => {

  return (
    <>
      <div className="flex-1 p-6 space-y-6 bg-gray-100 h-screen border rounded-3xl overflow-scroll ">
        {/* Search Bar */}


        <div className="container mx-auto px-4 py-16">
          <section className="text-center mb-20  ">
            <img
              src={hero}
              height="458px"
              width="458px"
              className=" relative  mx-auto mb-8"
            />
            <h1 className="text-6xl font-bold mb-6 text-gray-800 tracking-tight">
              Enhance Learning With{" "}
              <span className="text-purple-700">EduEra</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Personalized learning system with gamification and freelance work
            </p>
            <button className="bg-purple-700 hover:bg-purple-900 rounded-2xl text-white text-lg py-6 px-10">
              Let's Being
            </button>
          </section>

          <section className="bg-white pt-10 rounded-3xl shadow-lg mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
              Our Impact
            </h2>

          <Review/>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
