"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import {
  FaMapMarkerAlt,
  FaChair,
  FaCarSide,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";

export default function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: "",
    driverNeeded: "",
    location: "",
  });

  const fetchCar = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`
    );

    const data = await res.json();
    setCar(data);
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const confirmBooking = async () => {
    if (!bookingData.date) {
      return toast.error("Booking date is required");
    }

    if (!bookingData.location.trim()) {
      return toast.error("Pickup location is required");
    }

    if (
      bookingData.driverNeeded !== "Yes" &&
      bookingData.driverNeeded !== "No"
    ) {
      return toast.error("Please select driver option");
    }

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Booking confirmed");
      setShowForm(false);
      fetchCar();
    } else {
      toast.error(data.message);
    }
  };

  if (!car) return <Loader />;

  return (
    <section className="container-main py-10 md:py-16">
      
      <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">

      
        <div className="relative overflow-hidden rounded-[32px] glass p-3">
          
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-[280px] sm:h-[420px] lg:h-[620px] object-cover rounded-[24px] hover:scale-105 duration-700"
          />

          <div className="absolute top-8 left-8">
            <div className="glass px-5 py-2 rounded-full text-sm font-semibold">
              Premium Collection
            </div>
          </div>

        </div>

      
        <div className="flex flex-col h-full">

          <div>

            <p className="text-blue-500 uppercase tracking-[0.25em] text-sm mb-4">
              Luxury Ride
            </p>

            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              {car.name}
            </h1>

            <p className="mt-6 text-[15px] md:text-lg leading-8 text-[var(--muted)]">
              {car.description}
            </p>

          </div>

        
          <div className="grid sm:grid-cols-2 gap-4 mt-10">

            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-3 text-red-500 mb-3">
                <FaMapMarkerAlt />
                <span className="font-semibold">
                  Location
                </span>
              </div>

              <p className="text-lg font-medium">
                {car.location}
              </p>
            </div>

            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-3 text-yellow-500 mb-3">
                <FaChair />
                <span className="font-semibold">
                  Seats
                </span>
              </div>

              <p className="text-lg font-medium">
                {car.seats} Seats
              </p>
            </div>

            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-3 text-blue-500 mb-3">
                <FaCarSide />
                <span className="font-semibold">
                  Mileage
                </span>
              </div>

              <p className="text-lg font-medium">
                {car.mileage}
              </p>
            </div>

            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-3 text-green-500 mb-3">
                <FaCalendarAlt />
                <span className="font-semibold">
                  Availability
                </span>
              </div>

              <p
                className={`text-lg font-bold ${
                  car.availableCars > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {car.availableCars > 0
                  ? `${car.availableCars} Cars Available`
                  : "Not Available"}
              </p>
            </div>

          </div>

        
          <div className="mt-10 flex items-center justify-between gap-5 flex-wrap">

            <div>
              <p className="text-sm text-[var(--muted)]">
                Rental Price
              </p>

              <h2 className="text-4xl font-black text-blue-500 mt-1">
                BDT {car.price}
                <span className="text-lg font-semibold text-[var(--muted)]">
                  /day
                </span>
              </h2>
            </div>

            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                disabled={car.availableCars === 0}
                className={`px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 ${
                  car.availableCars === 0
                    ? "bg-gray-700 cursor-not-allowed"
                    : "glow-btn hover:scale-105"
                }`}
              >
                {car.availableCars === 0
                  ? "Not Available"
                  : "Book Now"}
              </button>
            )}

          </div>

       
          {showForm && (
            <div className="mt-10 glass rounded-[32px] p-6 md:p-8 space-y-6 animate-slideDown">

              <div className="flex items-center gap-3 mb-2">
                <FaUserTie className="text-blue-500 text-xl" />

                <h2 className="text-2xl md:text-3xl font-black">
                  Complete Booking
                </h2>
              </div>

          
              <div className="space-y-5">

                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--muted)]">
                    Booking Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleChange}
                    className="w-full rounded-2xl px-5 py-4 bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              
                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--muted)]">
                    Driver Option
                  </label>

                  <select
                    name="driverNeeded"
                    value={bookingData.driverNeeded}
                    onChange={handleChange}
                    className="w-full rounded-2xl px-5 py-4 bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">
                      Select Driver Option
                    </option>

                    <option value="Yes">
                      Yes, Driver Needed
                    </option>

                    <option value="No">
                      No Driver Needed
                    </option>
                  </select>
                </div>

              
                <div>
                  <label className="block mb-2 text-sm font-medium text-[var(--muted)]">
                    Pickup Location
                  </label>

                  <input
                    name="location"
                    value={bookingData.location}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    className="w-full rounded-2xl px-5 py-4 bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              
                <button
                  onClick={confirmBooking}
                  className="w-full py-4 rounded-2xl glow-btn text-white font-bold hover:scale-[1.02] transition-all duration-300"
                >
                  Confirm Booking
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}