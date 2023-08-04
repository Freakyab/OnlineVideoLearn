"use client";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";

import { createClient } from "@supabase/supabase-js";
import { UserContext } from "../layout";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const [login, setLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [name, setName] = useState("");

  const handleSumbit = async () => {
    try {
      if (login) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        if (data) {
          setUser(data.user);
          toast.success(`Welcome ${data.user.user_metadata.fullName || data.user.email.split("@")[0]}`);

          router.push("/");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { fullName: name },
          },
        });
        if(data)
        toast.success("Check your email for confirmation");
        if (error) throw error;
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-700">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        >
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h1 className="text-3xl font-bold text-center mb-6">
            {login ? "LOGIN" : "SIGNUP"}
          </h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl">EMAIL</h2>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <h2 className="text-xl">PASSWORD</h2>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            {!login && (
              <div>
                <h2 className="text-xl">FULL NAME</h2>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your full name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={handleSumbit}>
              {!login ? "SIGNUP" : "LOGIN"}
            </button>
            <button
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={() => setLogin(!login)}>
              {login ? "SIGNUP" : "LOGIN"}
            </button>
          </div>
        </div>
      </motion.div>
      <ToastContainer />

    </div>
  );
}
