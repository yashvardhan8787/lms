import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import hero from "../../public/assets/images/hero-unscreen.png";
import "@splidejs/react-splide/css";
import { FaHeart, FaClock, FaHashtag } from "react-icons/fa";
import Review from "../components/Cards/Review";

const HomePage = () => {
  return (
    <div className="flex-1 p-6 space-y-6 bg-gray-100 h-screen border rounded-3xl overflow-scroll scrollbar-hide">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <img
            src={hero}
            alt="Hero"
            className="relative mx-auto mb-8 max-w-full h-auto" // Ensure image is responsive
            style={{ maxHeight: "458px", objectFit: "cover" }}
          />
          <h1 className="text-6xl font-extrabold mb-6 text-gray-800 tracking-tight">
            Enhance Learning With{" "}
            <span className="text-[#5A4BA1]">Playground</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover a personalized learning system enriched with gamification
            and freelance opportunities.
          </p>
          <button className="bg-[#5A4BA1] hover:bg-[#704cb2] rounded-2xl text-white text-lg py-4 px-8 transition duration-300 ease-in-out font-semibold">
            Let's Begin
          </button>
        </section>

        {/* Impact Section */}
        <section className="bg-white pt-10 rounded-3xl shadow-lg mb-20">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
            Our Impact
          </h2>

          {/* Reviews Section */}
          <div className="px-4">
            <Review /> {/* Assuming Review component handles responsiveness */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
