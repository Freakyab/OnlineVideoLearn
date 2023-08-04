"use client";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { UserContext } from "../../../app/layout";
import Data from "../../data";
import SearchPopup from "../../../components/searchDiv";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }) {
  const { id } = params;

  // If id is not provided or invalid, show 404 page
  if (!id) return <h1>404</h1>;
  if (id >= 12) return <h1>404</h1>;

  const router = useRouter();
  const [search, setSearch] = useState(false);
  const [preData, setPreData] = useState("");
  const { user } = useContext(UserContext);
  const data = Data[id];

  // Function to get limited description with "More below" text
  const getDescription = () => {
    const limitedDescription = data.description[0]
      .split(" ")
      .slice(0, 50)
      .join(" ");
    return `${limitedDescription}... More below`;
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      {search ? (
        // Show SearchPopup when search is true
        <SearchPopup
          isOpen={search}
          onClose={() => {
            // Clear preData when closing the SearchPopup
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
        <>
          <div className="min-h-screen min-w-screen md:h-full text-black ">
            <div className="p-5 m-5 bg-slate-300 rounded-lg h-auto md:h-1/2 shadow-md flex flex-col md:flex-row items-center">
              <div className="flex flex-col w-full md:w-1/2">
                {/* Show product type */}
                <p
                  className={`${
                    data.type === "free" ? "bg-blue-400" : "bg-yellow-500"
                  } capitalize w-fit px-3 rounded-sm mb-2 text-white text-base transition-all duration-1000`}>
                  {data.type === "free" ? "Free" : "Premium "}
                </p>
                {/* Show product name */}
                <h1 className="text-4xl font-bold capitalize">{data.name}</h1>
                <span>
                  {/* Show instructor */}
                  <h2 className="text-2xl font-bold text-gray-600">
                    By, {data.instructor}
                  </h2>
                  {/* Show limited description */}
                  <p className="text-base mb-2">{getDescription()}</p>
                  {/* Show category */}
                  <p
                    className="text-sm px-3 py-[0.2rem] w-fit bg-white rounded-md hover:text-white hover:bg-gray-600 font-semibold cursor-pointer"
                    onClick={() => {
                      setSearch(true);
                      setPreData(data.category);
                    }}
                  >
                    {data.category}
                  </p>
                </span>
              </div>
              {/* Show product image */}
              <img
                className="h-[300px] w-full md:w-[300px] lg:w-[70vw] rounded-lg object-cover object-center shadow-xl m-2"
                src={data.image}
                alt={data.name}
              />
            </div>
            <div className="shadow-md  rounded-lg my-9 flex flex-col">
              <p
                className={`${
                  user || data.type === "free"
                    ? "hidden"
                    : "text-2xl text-black flex items-center justify-center cursor-pointer"
                } `}
                onClick={() => {
                  // Redirect to login page if not logged in and product is not free
                  router.push("/login");
                }}>
                Login to view the content
              </p>
              <div
                className={`${
                  !user && data.type !== "free"
                    ? "filter blur-2xl bg-opacity-10 h-[500px] overflow-hidden"
                    : "h-full flex flex-col justify-center items-center"
                } `}>
                {/* Show product description */}
                {data.description.map((item, index) => (
                  <p key={index} className="text-base p-3 w-full py-2 md:m-5">
                    {/* Show video if index is odd */}
                    {index / 2 ? (
                      <iframe
                        className="rounded-lg py-2 px-2 w-full md:w-1/2 md:h-96"
                        src={
                          "https://www.youtube.com/embed/" +
                          data.video_id[index - 1]
                        }
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : null}
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
