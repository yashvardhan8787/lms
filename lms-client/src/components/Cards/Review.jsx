// import React from "react";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css";
// import { FaHeart, FaClock, FaHashtag } from "react-icons/fa";
// import icon from "../../../public/assets/images/image1.png";

// const Review = () => {
//   const story = {
//     title: "Top Stories",
//     news: [
//       {
//         title: "Jayson Tatum Debuts",
//         text: "Jordan Brands signature model for the past few years, Jayson Tatum will be dawning the Air Jordan 37 this season before attaining potentially his first signature sneaker with Jumpman, which he rumored to be in the works recently via his Twitter.",
//         img: icon,
//         url: "https://sneakernews.com/2022/09/14/air-jordan-37-low/",
//         like: "5/5",
//         time: "11 Mins",
//         by: "Jared Ebanks",
//         btn: "Read More",
//       },
//       // Add more news items as needed
//     ],
//   };

//   const splideOptions = {
//     perPage: 4,
//     perMove: 1,
//     type: "loop",
//     rewind: true,
//     keyboard: "global",
//     gap: "1rem",
//     pagination: false,
//     padding: "2rem",
//     breakpoints: {
//       1200: { perPage: 3 },
//       991: { perPage: 2.3 },
//       768: { perPage: 2 },
//       500: { perPage: 1.3 },
//       425: { perPage: 1 },
//     },
//   };

//   return (
//     <div className="container mx-auto my-12 px-4 lg:px-0">
//       {/* Title */}
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-bold text-[#5A4BA1]">
//           {story.title || "Stories"}
//         </h2>
//         <p className="text-gray-500 mt-2">
//           Explore the latest updates and exciting news from the world of sports and beyond.
//         </p>
//       </div>

//       {/* Carousel */}
//       <Splide options={splideOptions}>
//         {story.news.map((val, i) => (
//           <SplideSlide key={i}>
//             <div className="relative grid items-center gap-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
//               {/* Image */}
//               <div className="flex items-center justify-center">
//                 <img
//                   className="w-28 h-28 object-cover shadow-md rounded-full"
//                   src={val.img || "/default-image.jpg"}
//                   alt={val.title || "Story Image"}
//                 />
//               </div>

//               {/* Stats */}
//               <div className="flex items-center justify-between w-full px-4 text-gray-500">
//                 <div className="flex items-center space-x-1">
//                   <FaHeart className="w-5 h-5 text-red-500" />
//                   <span className="text-xs font-bold">{val.like || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <FaClock className="w-4 h-4 text-gray-500" />
//                   <span className="text-xs font-bold">{val.time || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <FaHashtag className="w-4 h-4 text-blue-500" />
//                   <span className="text-xs font-bold text-blue-500">
//                     {val.by || "Anonymous"}
//                   </span>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="grid items-center justify-items-start px-4">
//                 <h3 className="text-lg font-semibold text-[#5A4BA1] truncate">
//                   {val.title || "Untitled Story"}
//                 </h3>
//                 <p className="text-sm text-justify text-gray-600 line-clamp-3">
//                   {val.text || "No description available."}
//                 </p>
//               </div>

//               {/* Button */}
//               <div className="flex items-center justify-center px-4 w-full">
//                 <a
//                   href={val.url || "#"}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   role="button"
//                   className="w-full bg-gradient-to-r from-[#5A4BA1] to-[#704cb2] text-center text-white py-2 rounded-lg transition-all duration-300 ease-in-out hover:from-[#704cb2] hover:to-[#5A4BA1] shadow-md"
//                 >
//                   {val.btn || "Learn More"}
//                 </a>
//               </div>
//             </div>
//           </SplideSlide>
//         ))}
//       </Splide>
//     </div>
//   );
// };

// export default Review;
