// components/Navbar.js
"use client";
import { UserContext } from "../app/layout";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const Navbar = ({ search, setSearch }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  return (
    <nav className="fixed z-50 bg-slate-700 w-full p-5 h-full overflow-auto">
      <div className="flex w-full justify-between items-center text-white">
        <h1 className="text-xl uppercase px-2 font-bold cursor-pointer"
          onClick={()=>router.push('/')}
        >
          Weblearn
        </h1>
        <div className="flex gap-2">
          <h2
            className="text-lg px-2 font-semibold cursor-pointer "
            onClick={() => {
              setSearch(!search);
            }}>
            Search
          </h2>
          <h2
            className="text-lg px-2 font-semibold cursor-pointer capitalize"
            onClick={() => {
              if (!user) {
                router.push("/login");
              }
            }}>
            {user
              ? user.user_metadata.fullName || user.email.split("@")[0]
              : "Login"}
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
