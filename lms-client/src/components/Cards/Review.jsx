import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaHeart, FaClock, FaHashtag } from "react-icons/fa";
import icon from "../../../public/assets/images/image1.png";

const Review = () => {
  const story = {
    title: "Top Stories",
    news: [
      {
        title: "Jayson Tatum Debuts",
        text: "Jordan Brands signature model for the past few years, Jayson Tatum will be dawning the Air Jordan 37 this season before attaining potentially his first signature sneaker with Jumpman, which he rumored to be in the works recently via his Twitter.",
        img: icon,
        url: "https://sneakernews.com/2022/09/14/air-jordan-37-low/",
        like: "5/5",
        time: "11 Mins",
        by: "Jared Ebanks",
        btn: "Read More",
      },
      // ... other news items
    ],
  };

  const splideOptions = {
    perPage: 4,
    perMove: 1,
    type: "loop",
    rewind: true,
    keyboard: "global",
    gap: "1rem",
    pagination: false,
    padding: "2rem",
    breakpoints: {
      1200: { perPage: 3 },
      991: { perPage: 2.3 },
      768: { perPage: 2 },
      500: { perPage: 1.3 },
      425: { perPage: 1 },
    },
  };

  return (
    <div className="container mx-auto my-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#5A4BA1]">Top Stories</h2>
      </div>
      <Splide options={splideOptions}>
        {story.news.map((val, i) => (
          <SplideSlide key={i} className="mb-6">
            <div className="relative grid items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center">
                <img
                  className="w-28 h-28 object-cover shadow-md rounded-full"
                  src={val.img}
                  alt={`img/story/${i}`}
                />
              </div>
              <div className="flex items-center justify-between w-full px-4">
                <div className="flex items-center space-x-1">
                  <FaHeart className="w-5 h-5 text-red-500" />
                  <span className="text-xs font-bold">{val.like}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaClock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold">{val.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaHashtag className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold text-blue-500">{val.by}</span>
                </div>
              </div>
              <div className="grid items-center justify-items-start px-4">
                <h1 className="text-lg font-semibold text-[#5A4BA1]">{val.title}</h1>
                <p className="text-sm text-justify text-gray-600">{val.text}</p>
              </div>
              <div className="flex items-center justify-center px-4 w-full">
                <a
                  href={val.url}
                  target="_blank"
                  role="button"
                  className="w-full bg-gradient-to-r from-[#5A4BA1] to-[#704cb2] text-center text-white py-2 rounded-lg transition-all duration-300 ease-in-out hover:from-[#704cb2] hover:to-[#5A4BA1] shadow-md"
                >
                  {val.btn}
                </a>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Review;
