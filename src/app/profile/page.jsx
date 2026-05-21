"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
export default function ProfilePage() {
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



  
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    photo: user?.photo || "",
    location: user?.location || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      }
    );

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setEditing(false);
      toast.success("Profile updated");
    } else {
      toast.error("Update failed");
    }
  };

  return (


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

  <div
    className="
      relative
      max-w-3xl mx-auto
      rounded-[40px]
      border border-white/20 dark:border-white/10
      bg-white/70 dark:bg-white/5
      backdrop-blur-2xl
      shadow-[0_20px_80px_rgba(0,0,0,0.08)]
      dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]
      overflow-hidden
    "
  >

 
    <div
      className="
        h-[3px]
        bg-gradient-to-r
        from-transparent
        via-cyan-400
        to-transparent
      "
    />

    {!editing ? (
      <div className="px-8 md:px-14 py-14 text-center">

      
        <div className="relative w-fit mx-auto">

          <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full" />

          <img
            src={
              user?.photo ||
              "https://plus.unsplash.com/premium_vector-1683140924463-adba1c428d66?q=80&w=880&auto=format&fit=crop"
            }
            onError={(e) => {
              e.target.src =
                "https://plus.unsplash.com/premium_vector-1683140924463-adba1c428d66?q=80&w=880&auto=format&fit=crop";
            }}
            className="
              relative
              w-36 h-36
              rounded-full
              object-cover
              border-4 border-cyan-500
              shadow-[0_10px_40px_rgba(6,182,212,0.35)]
            "
          />

        </div>

        <h1
          className="
            mt-8
            text-4xl md:text-5xl
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
          {user?.name}
        </h1>


        <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
          {user?.email}
        </p>

        <div
          className="
            mt-5
            inline-flex items-center gap-2
            px-5 py-3
            rounded-full
            bg-white/70 dark:bg-white/5
            border border-slate-200 dark:border-white/10
            text-slate-700 dark:text-slate-300
            backdrop-blur-xl
          "
        >
          <FaLocationDot /> {user?.location || "Location not added"}
        </div>

   
        <button
          onClick={() => setEditing(true)}
          className="
            group
            relative overflow-hidden
            mt-10
            px-10 py-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-indigo-600
            text-white
            font-bold
            shadow-[0_10px_40px_rgba(59,130,246,0.35)]
            hover:scale-105
            transition-all duration-300
          "
        >

          <span className="relative z-10">
            Update Profile
          </span>

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

        </button>

      </div>
    ) : (
      <div className="px-8 md:px-14 py-14">

  
        <div className="mb-10 text-center">

          <h1
            className="
              text-4xl md:text-5xl
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
            Edit Profile
          </h1>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Update your personal information
          </p>

        </div>

        <div className="space-y-6">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="
              w-full h-16
              rounded-3xl
              border border-slate-200 dark:border-white/10
              bg-white/80 dark:bg-white/5
              backdrop-blur-xl
              px-5
              text-slate-800 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-white/40
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/40
            "
          />

          <input
            name="photo"
            value={form.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            className="
              w-full h-16
              rounded-3xl
              border border-slate-200 dark:border-white/10
              bg-white/80 dark:bg-white/5
              backdrop-blur-xl
              px-5
              text-slate-800 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-white/40
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/40
            "
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className=" w-full h-16 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5
              backdrop-blur-xl
              px-5
              text-slate-800 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-white/40
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/40 "
          />

          <div className="flex flex-col md:flex-row gap-4 pt-4">

            <button
              onClick={updateProfile}
              className=" flex-1 h-16 rounded-3xlbg-gradient-to-r  from-cyan-500 via-blue-500 to-indigo-600 text-blue font-bold shadow-[0_10px_40px_rgba(59,130,246,0.35)] hover:scale-[1.01] transition-all duration-300 " >
              Save Changes
            </button>

            <button
              onClick={() => setEditing(false)}
              className="flex-1 h-16 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5backdrop-blur-xl text-slate-800 dark:text-white  hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300">
              Cancel
            </button>

          </div>

        </div>

      </div>
    )}

  </div>

</section>
  );
}