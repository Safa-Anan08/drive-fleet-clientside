"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "@/components/EmptyState";
import { motion } from "framer-motion";
import {
  FaCarSide
} from "react-icons/fa";
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Booking cancelled");
    fetchBookings();
  };
if (!bookings.length) {
  return (
    <section className="container-main  py-20">
      <EmptyState
        title="Your Booking List Is Empty"
        subtitle="Book premium cars and your reservations will appear here instantly."
        buttonText="Explore Cars"
        buttonLink="/cars"
      />
    </section>
  );
}
return (
  <div className="container-main py-8">
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
        My Bookings
      </h1>

      <p className="text-slate-500 dark:text-slate-400 mt-3 text-base">
        Manage all your premium car reservations in one place.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {bookings.map((booking, index) => (
        <motion.div
          key={booking._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          whileHover={{
            y: -6,
            scale: 1.01,
          }}
          className="group relative overflow-hidden rounded-[32px]"
        >
       
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500" />

        
          <div className="relative backdrop-blur-xl bg-white/80 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.18)]">
            
         
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase mb-5">
                  Premium Booking
                </div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {booking.carName}
                </h2>

                <div className="flex items-center gap-3 mt-4">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Reserved on{" "}
                    {new Date(
                      booking.bookingDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

        
              <div className="w-fit rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 px-8 py-6 shadow-xl">
                <p className="text-sm text-white/70 dark:text-black/60 mb-1">
                  Daily Price
                </p>

                <h3 className="text-3xl font-black text-white dark:text-black">
                  ${booking.price}
                  <span className="text-base font-medium opacity-70">
                    /day
                  </span>
                </h3>
              </div>
            </div>

         
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent" />

         
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                  <FaCarSide/>
                </div>

                <span>
                  Enjoy your premium ride experience
                </span>
              </div>

              <button
                onClick={() =>
                  cancelBooking(booking._id)
                }
                className="relative overflow-hidden px-7 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-red-500 to-rose-500 shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-red-500/50 active:scale-95"
              >
                <span className="relative z-10">
                  Cancel Booking
                </span>

                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
 
}