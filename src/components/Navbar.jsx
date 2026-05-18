"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaCarSide, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const protectedRoute = (path) => {
    if (!user) {
      toast.error("Please login to continue", {
        style: {
          borderRadius: "18px",
          padding: "16px",
          background: "#0f172a",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.08)"
        }
      });

      router.push("/login");
      return;
    }

    router.push(path);
  };

  return (
    <nav className="w-full border-b bg-white dark:bg-[#081120] sticky top-0 z-50 shadow-md">

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

       
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full glow-btn flex items-center justify-center text-white text-xl shadow-xl">
            <FaCarSide />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            DriveFleet
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium">

          <Link
            href="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            href="/cars"
            className="hover:text-blue-400 transition"
          >
            Explore Cars
          </Link>

          <button
            onClick={() => protectedRoute("/add-car")}
            className="hover:text-blue-400 transition"
          >
            Add Cars
          </button>

          <button
            onClick={() => protectedRoute("/my-bookings")}
            className="hover:text-blue-400 transition"
          >
            My Bookings
          </button>

        </div>

   
        <div className="flex items-center gap-4">

        

          {!user ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl glass hover:scale-105 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-xl glow-btn text-white hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 glass px-4 py-2 rounded-2xl hover:scale-105 transition"
              >
                <img
  src={
    user?.image ||
    "https://plus.unsplash.com/premium_vector-1683140924463-adba1c428d66?q=80&w=880&auto=format&fit=crop"
  }
  alt="profile"
  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
  onError={(e) => {
    e.target.src =
      "https://plus.unsplash.com/premium_vector-1683140924463-adba1c428d66?q=80&w=880&auto=format&fit=crop";
  }}
/>

                <span className="font-medium">
                  {user.name}
                </span>

                <FaChevronDown />
              </button>

              {open && (
                <div className="absolute right-0 mt-4 glass shadow-2xl rounded-2xl w-60 overflow-hidden">

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/my-cars")}}
                    className="block w-full text-left px-5 py-4 hover:bg-white/5 transition"
                  >
                    My Listed Cars
                  </button>

                  <button
                    onClick={() =>
                    {setOpen(false);
                      router.push("/my-bookings")}}
                    className="block w-full text-left px-5 py-4 hover:bg-white/5 transition"
                  >
                    My Bookings
                  </button>

                  <button
                    onClick={() =>
                    {
                      setOpen(false);
                      router.push("/profile")}}
                    className="block w-full text-left px-5 py-4 hover:bg-white/5 transition"
                  >
                    Edit Profile
                  </button>
                    <div className="px-5 py-4 border-y border-white/10 flex justify-between items-center">
  <span>Theme</span>
  <ThemeToggle onToggleComplete={() => setOpen(false)} />
</div>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-5 py-4 text-red-400 hover:bg-red-500/10 transition"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}