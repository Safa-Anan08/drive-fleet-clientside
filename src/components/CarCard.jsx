"use client";

import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaChair
} from "react-icons/fa";

export default function CarCard({ car }) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-[28px] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-[0_18px_40px_rgba(37,99,235,0.12)] dark:hover:shadow-[0_18px_40px_rgba(14,165,233,0.14)] transition-all duration-300 hover:-translate-y-2 flex flex-col">

      <div className="relative w-full h-[260px] overflow-hidden">

        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
        />

        <span className="absolute top-5 left-5 bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
          {car.type}
        </span>
        <span className="absolute top-5 right-5 bg-green-100 px-4 py-2 rounded-full text-lg  font-bold"> <p
    className={`font-semibold ${
      car.availableCars > 0
        ? "text-green-700"
        : "text-red-500"
    }`}
  >
    {car.availableCars > 0
      ? `${car.availableCars} Cars Available`
      : "Not Available"}
  </p></span>

      </div>

      <div className="p-7 flex flex-col flex-1">

        <div className="flex justify-between items-start gap-6">

       
          <div className="flex-1">

            <h3 className="text-2xl font-bold text-[var(--text)]">
              {car.name}
            </h3>

            <p className="mt-3 text-gray-500 leading-7 text-sm">
              {car.description}
            </p>

            <div className="mt-5 flex flex-col gap-3 text-gray-500 text-sm">

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                {car.location}
              </div>

              <div className="flex items-center gap-2">
                <FaChair className="text-blue-500" />
                {car.seats} Seats
              </div>

            </div>

          </div>

          <div className="text-right shrink-0">

            <p className="text-sm text-gray-600">
              Per Day
            </p>

            <h2 className="text-4xl font-bold text-blue-600">
              BDT {car.price}
            </h2>

          </div>

        </div>

  
        <Link
          href={`/cars/${car._id}`}
          className="mt-8 w-full py-4 rounded-2xl bg-black hover:bg-blue-700 text-white text-center font-semibold transition-all"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}