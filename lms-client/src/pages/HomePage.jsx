import React from "react";
import Heroimg from "../../public/assets/images/Heroimg.png";
import { FaSearch } from "react-icons/fa";
import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <>
      <div className="flex-1 p-6 space-y-6 bg-gray-100 h-screen border rounded-3xl ">
        {/* Search Bar */}
        <div className="bg-gray-200 p-4 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent flex-1 outline-none text-gray-700"
          />
          <span className="text-gray-800">🔍</span>
        </div>

        {/* Unfinished Courses Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4 mt-20">
            Your unfinished courses
          </h2>
          <div className="flex space-x-4">
            <div
              className="bg-cover bg-center w-56 h-40 rounded-lg relative text-white overflow-hidden"
              style={{ backgroundImage: "url('/path/to/image1.jpg')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end">
                <p className="font-bold">Dianne Edwards</p>
                <p className="text-sm">
                  Learning how to create simple Swift applications in 8 lessons
                </p>
                <span className="bg-red-500 px-2 py-1 text-xs rounded-lg absolute top-2 right-2">
                  82 min
                </span>
              </div>
            </div>
            <div
              className="bg-cover bg-center w-56 h-40 rounded-lg relative text-white overflow-hidden"
              style={{ backgroundImage: "url('/path/to/image2.jpg')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end">
                <p className="font-bold">Dianne Edwards</p>
                <p className="text-sm">
                  Best tips for drawing some good thematic illustration
                </p>
                <span className="bg-red-500 px-2 py-1 text-xs rounded-lg absolute top-2 right-2">
                  90 min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Lessons Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Live lessons</h2>
          <div className="flex space-x-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-24 h-32 bg-cover bg-center rounded-lg relative"
                style={{
                  backgroundImage: `url('/path/to/live-lesson${
                    index + 1
                  }.jpg')`,
                }}
              >
                <span className="bg-red-500 px-2 py-1 text-xs rounded-lg absolute top-2 left-2 text-white">
                  LIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*   
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
       
        <div className="flex items-center space-x-10 px-10 py-20">
         
          <div className="relative">
            =
            <img
              src={Heroimg}
              alt="Character working"
              className="w-96 h-auto rounded-full"
            />
          </div>

      
          <div className="flex-1">
            <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <input
                type="text"
                placeholder="Search Courses..."
                className="w-full px-4 py-3 text-gray-300 bg-transparent outline-none"
              />
              <button className="p-3 bg-blue-500 text-white">
                <FaSearch />
              </button>
            </div>
            <div className="flex items-center mt-6 space-x-2">
              
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Profile 1"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Profile 2"
                className="w-10 h-10 rounded-full border-2 border-white -ml-3"
              />
              <img
                src="https://randomuser.me/api/portraits/men/46.jpg"
                alt="Profile 3"
                className="w-10 h-10 rounded-full border-2 border-white -ml-3"
              />
            
              <p className="text-white ml-4">
                <span className="text-teal-300 font-bold">500K+</span> People
                already trusted us.
                <span className="ml-2 text-green-400 font-bold cursor-pointer">
                  View Courses
                </span>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
