"use client";
import data from "../app/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Courses = () => {
  const router = useRouter();

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
    <motion.ul
      className="min-h-[90vh] min-w-screen p-3 flex justify-center text-black overflow-x-hidden "
      variants={container}
      initial="hidden"
      animate="visible">
      <Swiper
        spaceBetween={10} // Decreased the space between slides for responsiveness
        slidesPerView={1} // Display one slide at a time on smaller screens
        slidesPerGroup={1} // Display one slide at a time on smaller screens
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          // Responsive breakpoints for larger screens
          640: {
            slidesPerView: 2, // Display two slides at a time on screens larger than 640px
            slidesPerGroup: 2, // Display two slides at a time on screens larger than 640px
            spaceBetween: 20, // Increased the space between slides for larger screens
          },
          768: {
            slidesPerView: 3, // Display three slides at a time on screens larger than 768px
            slidesPerGroup: 3, // Display three slides at a time on screens larger than 768px
            spaceBetween: 30, // Increased the space between slides for larger screens
          },
        }}>
        {data.map((course) => (
          <SwiperSlide key={course.id}>
            <motion.li
              className="bg-white items-start border cursor-pointer hover:shadow-xl rounded-xl h-56 p-4 shadow-lg"
              onClick={() => router.push(`/details/${course.id - 1}`)}
              variants={MotionItem}>
              <img
                alt={course.course_name}
                className="w-full object-cover rounded-lg mb-4"
                src={course.image}
              />
              <div className="p-3 ml-3">
                <h3 className="text-2xl font-bold">{course.name}</h3>
                <p className="text-gray-600 text-sm">By {course.instructor}</p>
                <div className="flex items-center mt-2">
                  <p
                    className={`${
                      course.type === "free" ? "bg-blue-400" : "bg-yellow-500"
                    } capitalize w-fit px-3 rounded-sm mb-2 text-white text-base transition-all duration-1000`}>
                    {course.type === "free" ? "Free" : "Premium "}
                  </p>
                </div>
                <p className="mt-2 font-bold">{course.category}</p>
              </div>
            </motion.li>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.ul>
  );
};

export default Courses;
