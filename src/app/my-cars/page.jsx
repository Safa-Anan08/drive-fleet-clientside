"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";

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
      "http://localhost:5000/api/cars/my",
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
      `http://localhost:5000/api/cars/${id}`,
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

        <Link
          href="/add-car"
          className="block mb-10 w-full text-center py-5 rounded-[28px] bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl font-bold shadow-[0_0_35px_rgba(59,130,246,0.35)]"
        >
          + Add New Car
        </Link>

        <EmptyState
          title="You Haven’t Added Any Cars"
          subtitle="List your premium vehicles and start receiving bookings."
          buttonText="Add Your First Car"
          buttonLink="/add-car"
        />

      </section>
    );
  }

  return (
    <section className="container-main py-20">

      <Link
        href="/add-car"
        className="block mb-12 w-full text-center py-5 rounded-[28px] bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl font-bold shadow-[0_0_35px_rgba(59,130,246,0.35)] hover:scale-[1.01] transition"
      >
        + Add New Car
      </Link>

      <div className="grid md:grid-cols-3 gap-8">

        {cars.map((car) => (
          <div key={car._id} className="glass rounded-3xl p-5">

            <img
              src={car.image}
              className="rounded-2xl h-52 w-full object-cover"
            />

            <h3 className="text-2xl font-bold mt-4">
              {car.name}
            </h3>

            <p>${car.price}/day</p>

            <p className="text-blue-500">
              Stock: {car.availableCars}
            </p>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() =>
                  window.location.href = `/edit-car/${car._id}`
                }
                className="px-5 py-2 bg-blue-500 rounded-xl text-white"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCar(car._id)}
                className="px-5 py-2 bg-red-500 rounded-xl text-white"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}