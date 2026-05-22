"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import PrivateRoute from "@/components/PrivateRoute";
export default function MyCars() {
  const [cars, setCars] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    if (savedToken) {
      fetchCars(savedToken);
    }
  }, []);

  const fetchCars = async (authToken = token) => {
    const res = await axios.get(
       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/my`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );

    setCars(res.data);
  };

  const deleteCar = async (id) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Car deleted");
    fetchCars();
  };

  if (!cars.length) {
    return (
      <section className="container-main py-20">


  <div className="relative mb-12">

  
    <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-[32px]" />

    <Link
      href="/add-car"
      className="
        relative
        flex items-center justify-center gap-3
        w-full
        py-5
        rounded-[30px]
        overflow-hidden
        border border-white/20 dark:border-white/10
        bg-white/70 dark:bg-white/5
        backdrop-blur-2xl
        text-slate-900 dark:text-white
        text-xl font-bold
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        hover:scale-[1.01]
        transition-all duration-300
        group
      "
    >

      <div
        className="
          absolute inset-0
          -translate-x-full
          group-hover:translate-x-full
          transition duration-1000
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
        "
      />

      <span
        className="
          flex items-center justify-center
          w-10 h-10 rounded-full
          bg-gradient-to-r from-blue-600 to-cyan-500
          text-white text-2xl
          shadow-lg
        "
      >
        +
      </span>

      <span className="relative z-10">
        Add New Premium Car
      </span>

    </Link>
  </div>


  <div
    className="
      relative overflow-hidden
      rounded-[40px]
      border border-slate-200 dark:border-white/10
      bg-white/70 dark:bg-white/5
      backdrop-blur-2xl
      p-8 md:p-14
      shadow-[0_20px_60px_rgba(0,0,0,0.06)]
      dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
    "
  >

  
    <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

    <div className="relative z-10">
      <EmptyState
        title="You Haven't Added Any Cars"
        subtitle="List your premium vehicles and start receiving bookings."
        buttonText="Add Your First Car"
        buttonLink="/add-car"
      />
    </div>

  </div>

</section>
    );
  }

return (
    
  <section className="container-main py-20">

  
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">

      <div>
        <h1 className="text-4xl font-black tracking-tight text-[var(--text)]">
          Manage Cars
        </h1>

        <p className="text-[var(--text)]/60 mt-2 text-lg">
          Control your rental fleet, update stock and manage listings.
        </p>
      </div>

      <Link
        href="/add-car"
        className="
          px-8 py-4 rounded-2xl
          bg-gradient-to-r from-[var(--accent)] to-cyan-500
          text-white font-bold text-lg
          shadow-[0_10px_40px_rgba(59,130,246,0.35)]
          hover:scale-[1.03]
          transition-all duration-300
          flex items-center justify-center gap-2
        "
      >
        <span className="text-2xl">+</span>
        Add New Car
      </Link>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {cars.map((car) => (
        <div
          key={car._id}
          className="
            group
            overflow-hidden
            rounded-[32px]
            border border-white/10
            bg-[var(--card)]
            backdrop-blur-xl
            shadow-[0_10px_50px_rgba(0,0,0,0.08)]
            hover:-translate-y-2
            hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]
            transition-all duration-500
          "
        >

  
          <div className="relative overflow-hidden">

            <img
              src={car.image}
              alt={car.name}
              className="
                h-60 w-full object-cover
                group-hover:scale-110
                transition duration-700
              "
            />

            <div
              className="
                absolute top-4 right-4
                px-4 py-2 rounded-full
                bg-black/40 backdrop-blur-md
                text-white text-sm font-semibold
              "
            >
              {car.availableCars} Available
            </div>

          </div>

       
          <div className="p-6">

            <div className="flex items-start justify-between gap-4">

              <div>
                <h3 className="text-2xl font-bold text-[var(--text)]">
                  {car.name}
                </h3>

                <p className="text-[var(--text)]/60 mt-1">
                  Premium Rental Car
                </p>
              </div>

              <div
                className="
                  px-4 py-2 rounded-2xl
                  bg-[var(--accent)]/10
                  text-[var(--accent)]
                  font-bold text-sm
                "
              >
                BDT {car.price}
              </div>

            </div>

         
            <div className="h-px bg-[var(--text)]/10 my-6" />

            <div className="space-y-3">

              <div className="flex items-center justify-between">
                <span className="text-[var(--text)]/60">
                  Daily Rent
                </span>

                <span className="font-semibold text-[var(--text)]">
                  BDT {car.price}/day
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[var(--text)]/60">
                  Available Cars
                </span>

                <span className="font-semibold text-green-500">
                  {car.availableCars}
                </span>
              </div>

            </div>

         
            <div className="flex gap-4 mt-8">

              <button
                onClick={() =>
                  window.location.href = `/edit-car/${car._id}`
                }
                className="
                  flex-1 py-3 rounded-2xl
                  bg-gradient-to-r from-[var(--accent)] to-cyan-500
                  text-white font-semibold
                  hover:opacity-90
                  transition
                "
              >
                Edit
              </button>

              <button
                onClick={() => deleteCar(car._id)}
                className="
                  flex-1 py-3 rounded-2xl
                  bg-red-500/10
                  border border-red-500/20
                  text-red-500 font-semibold
                  hover:bg-red-500
                  hover:text-white
                  transition
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      ))}

    </div>

  </section>
  
);
}