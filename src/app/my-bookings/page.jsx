"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "@/components/EmptyState";
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/bookings",
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
      `http://localhost:5000/api/bookings/${id}`,
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
    <section className="container-main py-20">
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
    <div className="container-main py-20">

      <h1 className="text-4xl font-bold mb-10">
        My Bookings
      </h1>

      <div className="space-y-6">

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-[#111827] p-8 rounded-3xl border shadow"
          >
            <h2 className="text-2xl font-semibold">
              {booking.carName}
            </h2>

            <p className="text-gray-500 mt-2">
              ${booking.price}/day
            </p>

            <p className="text-sm mt-2">
              {new Date(
                booking.bookingDate
              ).toLocaleDateString()}
            </p>

            <button
              onClick={() =>
                cancelBooking(booking._id)
              }
              className="mt-5 px-6 py-3 rounded-xl bg-red-500 text-white"
            >
              Cancel Booking
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}