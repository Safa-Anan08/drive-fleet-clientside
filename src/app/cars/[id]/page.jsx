"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import {
  FaMapMarkerAlt,
  FaChair,FaCarSide
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
    <div className="container-main py-20">

      <div className="grid lg:grid-cols-2 gap-14">

        <img
          src={car.image}
          className="w-full h-[500px] object-cover rounded-3xl"
        />

        <div>

          <h1 className="text-5xl font-bold">
            {car.name}
          </h1>

          <p className="mt-6 text-gray-500">
            {car.description}
          </p>

          <div className="mt-8 space-y-4">
  <p className="flex gap-3"><FaMapMarkerAlt className="text-red-600"/> {car.location}</p>
  <p className="flex gap-3 
  "><FaChair className="text-yellow-800"/>{car.seats} Seats</p>
  <p className="flex gap-3"><FaCarSide className="text-blue-600"/>{car.mileage}</p>

  <p
    className={`font-semibold ${
      car.availableCars > 0
        ? "text-green-600"
        : "text-red-500"
    }`}
  >
    {car.availableCars > 0
      ? `${car.availableCars} Cars Available`
      : "Not Available"}
  </p>

  <p className="text-2xl font-bold text-blue-600">
    ${car.price}/day
  </p>
</div>

      
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              disabled={car.availableCars === 0}
              className={`mt-10 w-full py-5 rounded-2xl text-white ${
                car.availableCars === 0
                  ? "bg-gray-900"
                  : "bg-blue-600"
              }`}
            >
              {car.availableCars === 0
                ? "Not Available"
                : "Book Now"}
            </button>
          ) : (
            <div className="mt-10 bg-white dark:bg-[#111827] border rounded-3xl p-8 space-y-6">

              <h2 className="text-2xl font-bold">
                Complete Booking
              </h2>

              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-4"
              />

              <select
                name="driverNeeded"
                value={bookingData.driverNeeded}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-4 border bg-white dark:bg-[#111827] text-black dark:text-white border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option
  value=""
  className="bg-white text-black dark:bg-[#111827] dark:text-white"
>
  Select Driver Option
</option>

<option
  value="Yes"
  className="bg-white text-black dark:bg-[#111827] dark:text-white"
>
  Yes, Driver Needed
</option>

<option
  value="No"
  className="bg-white text-black dark:bg-[#111827] dark:text-white"
>
  No Driver Needed
</option>
              </select>

              <input
                name="location"
                value={bookingData.location}
                onChange={handleChange}
                placeholder="Pickup Location"
                className="w-full border rounded-xl px-4 py-4"
              />

              <button
                onClick={confirmBooking}
                className="w-full py-4 rounded-2xl bg-green-600 text-white font-semibold"
              >
                Confirm Booking
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}