"use client";
// Import necessary dependencies and components
import data from "./data.js"; // Course data (imported from data.js)
import category from "../components/category"; // Category data (imported from category.js)
import Courses from "../components/swiperCourses"; // Custom component to display courses using swiper
import Navbar from "../components/Navbar"; // Custom Navbar component
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { useState } from "react"; // React hook for state management
import SearchPopup from "../components/searchDiv"; // Custom SearchPopup component for search functionality
import { motion } from "framer-motion"; // Framer Motion for animations

// ... Some constants and state ...

const Course = () => {
  const router = useRouter(); // Next.js router instance
  const [search, setSearch] = useState(false); // State for managing search popup visibility
  const [preData, setPreData] = useState(""); // State to store data before opening the search popup

  // Framer Motion variants for animations
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const MotionItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      {/* Render the custom Navbar component */}
      <Navbar search={search} setSearch={setSearch} />

      {/* Conditional rendering for search popup */}
      {search ? (
        <SearchPopup
          isOpen={search}
          onClose={() => {
            {
              preData ? setPreData("") : null;
            }
            setSearch(false);
          }}
          controls={{
            preData: preData,
          }}
        />
      ) : (
        // Render the main course content
        <div className=" min-w-screen flex justify-center items-center text-black overflow-x-hidden ">
          <div
            className="h-full w-screen relative bg-cover bg-center rounded-b-md"
            style={{
              backgroundImage: ` url("https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1221&q=80")`,
            }}>
            {/* Framer Motion animation wrapper */}
            <motion.ul
              className="flex justify-center p-10 z-10"
              variants={container}
              initial="hidden"
              animate="visible">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl px-4 md:px-8">
                {/* Course Details */}
                <div className="bg-slate-200 h-96 overflow-hidden rounded-md shadow-lg grid col-span-3 border-black border">
                  {/* Course details content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                    {/* Course Image */}
                    <img
                      src={data[0].image}
                      alt={data[0].name}
                      className="p-5 object-center object-cover h-[100px] md:h-full w-full md:col-span-1"
                    />
                    <div className="col-span-2 md:col-start-2 m-3">
                      {/* Course Type */}
                      <span className="text-sm text-blue-500">Course</span>
                      {/* Course Title */}
                      <div className="text-xl text-gray-800 pb-2 flex-nowrap overflow-hidden">
                        {data[0].name}
                      </div>
                      {/* Course Description */}
                      <p className="text-md text-black max-h-20 md:max-h-48 overflow-hidden">
                        {data[0].description}
                      </p>
                      {/* Click for more link */}
                      <p
                        className="text-lg text-gray-500 font-medium cursor-pointer hover:text-black"
                        onClick={() =>
                          router.push(`/details/${data[0].id - 1}`)
                        }>
                        .... click for more
                      </p>
                      {/* Course Instructor */}
                      <p className="text-sm text-gray-500 font-medium">
                        By, {data[0].instructor}
                      </p>
                      {/* Course Type (Free/Premium) */}
                      <div className="flex items-center mt-2">
                        <p
                          className={`${
                            data[0].type === "free"
                              ? "bg-blue-400"
                              : "bg-yellow-500"
                          } capitalize w-fit px-3 rounded-sm mb-2 text-white text-base transition-all duration-1000`}>
                          {data[0].type === "free" ? "Free" : "Premium "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <motion.ul
                  className="bg-slate-200 h-96 rounded-md sm:px-8 w-full shadow-lg overflow-auto  border-black border"
                  variants={container}
                  initial="hidden"
                  animate="visible">
                  <h1 className="text-xl text-blue-500 p-2 ml-3 ">Category</h1>
                  {/* Render categories */}
                  <div className="grid grid-cols-1 gap-1">
                    {category.map((item, index) =>
                      index < 5 ? (
                        <motion.li
                          className="flex justify-between items-center p-3 item"
                          variants={MotionItem}
                          key={index}>
                          {/* Category item */}
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            {/* Category name */}
                            <p
                              className="text-md text-gray-800 ml-3 mt-1 cursor-pointer"
                              onClick={() => {
                                setSearch(true);
                                setPreData(item.name);
                              }}>
                              {item.name}
                            </p>
                          </div>
                        </motion.li>
                      ) : null
                    )}
                  </div>
                </motion.ul>
              </div>
            </motion.ul>
          </div>
        </div>
      )}

      {/* Course listing */}
      <div className="p-5 m-5 ">
        <h2 className="text-2xl font-semibold hover:text-blue-600">Courses</h2>
        {/* Render courses using the custom Courses component */}
        <Courses />
      </div>
    </>
  );
};

export default Course;
