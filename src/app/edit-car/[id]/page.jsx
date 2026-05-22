"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

export default function EditCar() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seats: "",
    mileage: "",
    location: "",
    description: "",
    availableCars: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`)
      .then((res) => {
        const car = res.data.find((c) => c._id === id);

        if (car) {
          setForm(car);
        }

        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load car");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Car Updated");
      router.push("/my-cars");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-[#081120] dark:to-[#0f172a]">

      <div className="max-w-5xl mx-auto">

        <div className="mb-12 text-center">
          <p className="uppercase tracking-[0.3em] text-blue-500 text-sm">
            Update Vehicle
          </p>

          <h1 className="text-5xl font-black mt-4">
            Edit Car Details
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
            Refine your premium fleet listing
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-[32px] shadow-xl p-10 md:p-14"
        >
          <div className="grid md:grid-cols-2 gap-6">

            {[
              ["name", "Car Name" ],
              ["price", "Price" ],
              ["type", "Type"],
              ["image", "Image URL"],
              ["seats", "Seats"],
              ["mileage", "Mileage"],
              ["location", "Location"],
              ["availableCars", "Available Cars"],
            ].map(([key, label]) => (
              
              
               <div key={key} className="space-y-2">

    <label className="text-sm ">
      {label}:
    </label>
              <input
                key={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              /></div>
            ))}
 
          </div>
         
          <textarea
         
            name="description"
            value= {form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="5"
            className="w-full mt-6 px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {form.image && (
            <div className="mt-8">
              <p className="mb-3 font-semibold">
                Live Preview
              </p>

              <img
                src={form.image}
                alt="preview"
                className="w-full h-72 object-cover rounded-3xl border"
              />
            </div>
          )}

          <div className="flex gap-4 mt-10">

            <button
              type="submit"
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:scale-[1.02] transition shadow-lg"
            >
              Update Car
            </button>

            <button
              type="button"
              onClick={() => router.push("/my-cars")}
              className="flex-1 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-100 dark:hover:bg-[#1f2937] transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </section>
  );
}