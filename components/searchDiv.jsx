import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import data from "../app/data";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SearchPopup = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(data);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setFilteredData(
      data.filter(
        (val) =>
          val.name.toLowerCase().includes(searchText.toLowerCase()) ||
          val.category.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 h-screen flex flex-col justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          onClick={handleBackdropClick}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white shadow-lg w-full h-screen p-3">
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="w-2/3 p-2 border border-black rounded-md"
                placeholder="Search courses..."
                value={searchText}
                onChange={handleSearch}
              />
              <button
                className="block mt-4 px-4 py-2 text-black bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={onClose}>
                X
              </button>
            </div>
            {filteredData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-3 text-black overflow-x-hidden"
                style={{ marginTop: "80px" }}>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  slidesPerGroup={1}
                  navigation={true}
                  pagination={{ dynamicBullets: true }}
                  modules={[Pagination, Navigation]}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      slidesPerGroup: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      slidesPerGroup: 3,
                      spaceBetween: 30,
                    },
                  }}>
                  {filteredData.map((course) => (
                    <SwiperSlide key={course.id} className="min-w-[300px]">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-white items-start border cursor-pointer hover:shadow-xl rounded-xl h-56 p-4 shadow-lg"
                        onClick={() =>
                          router.push(`/details/${course.id - 1}`)
                        }>
                        <img
                          alt={course.course_name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                          src={course.image}
                        />
                        <div className="p-3 ml-3">
                          <h3 className="text-2xl font-bold">{course.name}</h3>
                          <p className="text-gray-600 text-sm">
                            By {course.instructor}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-yellow-500">
                              {course.type === "free"
                                ? "Free ⭐"
                                : "Premium 🆓"}
                            </span>
                          </div>
                          <p className="mt-2 font-bold">{course.category}</p>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchPopup;
