"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  FaCarSide,
  FaMapMarkerAlt,
  FaImage,
  FaGasPump,
} from "react-icons/fa";
import PrivateRoute from "@/components/PrivateRoute";

export default function AddCar() {
   const protectedRoute = (path) => {
    setMobileOpen(false);

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
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    for (let key in form) {
      if (!form[key]) {
        toast.error(`${key} is required`);
        return false;
      }
    }

    if (Number(form.price) <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    if (Number(form.availableCars) <= 0) {
      toast.error("Available cars must be greater than 0");
      return false;
    }

    if (!form.image.trim()) {
      toast.error("Car image is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Car Added Successfully 🚘");
      router.push("/my-cars");
    } catch (error) {
      toast.error("Failed to add car");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
    <section
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-gradient-to-br
        from-white
        via-slate-100
        to-slate-200
        dark:from-[#020617]
        dark:via-[#071028]
        dark:to-[#0f172a]
        py-20 px-4
      "
    >
   
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-5xl mx-auto">
       
        <div className="text-center mb-14">
          <div
            className="
              inline-flex items-center gap-3
              px-6 py-3 rounded-full
              border border-white/20
              bg-white/60 dark:bg-white/5
              backdrop-blur-xl
              shadow-lg
            "
          >
            <FaCarSide className="text-cyan-500 text-lg" />

            <span
              className="
                uppercase tracking-[4px]
                text-xs font-semibold
                text-slate-700 dark:text-slate-300
              "
            >
              DriveFleet
            </span>
          </div>

          <h1
            className="
              mt-6
              text-4xl md:text-6xl
              font-black
              bg-gradient-to-r
              from-slate-900
              via-cyan-600
              to-blue-600
              dark:from-white
              dark:via-cyan-300
              dark:to-blue-400
              bg-clip-text text-transparent
            "
          >
            Add Premium Car
          </h1>

          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            List your luxury vehicle with a modern premium experience
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            relative
            rounded-[40px]
            border border-white/20 dark:border-white/10
            bg-white/70 dark:bg-white/5
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,0.08)]
            dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            p-6 md:p-10
          "
        >
       
          <div
            className="
              absolute top-0 inset-x-0 h-[2px]
              bg-gradient-to-r from-transparent via-cyan-400 to-transparent
            "
          />

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              
              name="name"
              placeholder="Car Name"
              onChange={handleChange}
            />

            <div className="relative group">

  <div
    className="
      absolute inset-0
      rounded-3xl
      bg-cyan-500/10
      blur-2xl
      opacity-0
      group-focus-within:opacity-100
      transition duration-500
    "
  />

  <select
    name="type"
    value={form.type}
    onChange={handleChange}
    className="
      relative z-10
      w-full h-16
      rounded-3xl
      border border-slate-200 dark:border-white/10
      bg-white/80 dark:bg-white/5
      backdrop-blur-xl
      text-slate-800 dark:text-white
      px-5
      shadow-[0_8px_30px_rgba(0,0,0,0.04)]
      dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]
      transition-all duration-300
      focus:outline-none
      focus:ring-2
      focus:ring-cyan-500/40
      focus:border-cyan-400
      hover:border-cyan-300/50
    "
  >
    <option
      value=""
      className="bg-white text-black dark:bg-[#0f172a] dark:text-white"
    >
      Select Car Type
    </option>

    <option
      value="SUV"
      className="bg-white text-black dark:bg-[#0f172a] dark:text-white"
    >
      SUV
    </option>

    <option
      value="Sedan"
      className="bg-white text-black dark:bg-[#0f172a] dark:text-white"
    >
      Sedan
    </option>

    <option
      value="Luxury SUV"
      className="bg-white text-black dark:bg-[#0f172a] dark:text-white"
    >
      Luxury SUV
    </option>
    <option
      value="Luxury Sedan"
      className="bg-white text-black dark:bg-[#0f172a] dark:text-white"
    >
      Luxury Sedan
    </option>
    <option
      value="Luxury Sedan"
      className="bg-white text-black dark:bg-[#0f172a] dark:text-white"
    >
      Microbus
    </option>
  </select>

</div>

            <InputField
              name="price"
              placeholder="Price Per Day"
              type="number"
              onChange={handleChange}
            />

            <InputField
              name="seats"
              placeholder="Seats"
              type="number"
              onChange={handleChange}
            />

            <InputField
            
              name="mileage"
              placeholder="Mileage"
              onChange={handleChange}
            />

            <InputField
              name="availableCars"
              placeholder="Available Cars"
              type="number"
              onChange={handleChange}
            />

            <InputField
             
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />

            <InputField
            
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
            />
          </div>

       
          <div className="mt-6">
            <textarea
              name="description"
              placeholder="Write a premium description about your vehicle..."
              onChange={handleChange}
              className="
                w-full h-40
                rounded-3xl
                border border-slate-200 dark:border-white/10
                bg-white/80 dark:bg-white/5
                backdrop-blur-xl
                px-5 py-4
                text-slate-800 dark:text-white
                placeholder:text-slate-400 dark:placeholder:text-white/40
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500/40
                transition
              "
            />
          </div>

        
          <button
            type="submit"
            disabled={loading}
            className="
              group
              relative
              overflow-hidden
              w-full mt-8 h-16
              rounded-3xl
              font-bold text-lg
              text-white
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-indigo-600
              shadow-[0_10px_40px_rgba(59,130,246,0.35)]
              hover:scale-[1.01]
              active:scale-[0.99]
              transition-all duration-300
              disabled:opacity-50
            "
          >
            <span className="relative z-10">
              {loading ? "Adding Car..." : "Add Premium Car"}
            </span>

            <div
              className="
                absolute inset-0
                translate-x-[-100%]
                group-hover:translate-x-[100%]
                transition duration-1000
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
              "
            />
          </button>
        </form>
      </div>
    </section>
     </PrivateRoute>
  );
}

function InputField({
  icon,
  name,
  placeholder,
  onChange,
  type = "text",
}) {
  return (
    <div className="relative group">
     
      <div
        className="
          absolute inset-0
          rounded-3xl
          bg-cyan-500/10
          blur-2xl
          opacity-0
          group-focus-within:opacity-100
          transition duration-500
        "
      />

     
      {icon && (
        <span
          className="
            absolute left-5 top-1/2 -translate-y-1/2
            text-slate-500 dark:text-slate-400
            z-10 text-lg
            transition
            group-focus-within:text-cyan-500
            group-focus-within:scale-110
          "
        >
          {icon}
        </span>
      )}

   
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
   className={`relative z-10 w-full h-16 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400 hover:border-cyan-300/50 ${
  icon ? "pl-14 pr-5" : "px-5"
}`}
      />

     
    </div>
    
  );
}
