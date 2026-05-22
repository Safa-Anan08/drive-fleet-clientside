"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
export default function ThemeToggle({ onToggleComplete }) {
  const [dark, setDark] = useState(true);

 useEffect(() => {
  const saved = localStorage.getItem("theme");

  if (saved) {
    document.documentElement.classList.toggle(
      "dark",
      saved === "dark"
    );
    setDark(saved === "dark");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setDark(true);
  }
}, []);

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);

    if (onToggleComplete) {
      onToggleComplete();
    }
  };

  return (

<button
  onClick={toggle}
  className="w-full flex items-center justify-between px-2 py-2 rounded-2xl glass hover:scale-[1.02] transition-all duration-300"
>
  <div className="flex items-center gap-3">
    
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
        dark
          ? "bg-yellow-400/15 text-yellow-300"
          : "bg-blue-500/15 text-blue-400"
      }`}
    >
      {dark ? <FaSun /> : <FaMoon />}
    </div>

    <div className="text-left">
      <p className="font-semibold">
        {dark ? "Light Mode" : "Dark Mode"}
      </p>

      <p className="text-xs text-[var(--muted)]">
        Switch appearance
      </p>
    </div>

  </div>

  <div
    className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${
      dark
        ? "bg-yellow-400/20"
        : "bg-blue-500/20"
    }`}
  >
    <div
      className={`w-6 h-6 rounded-full bg-white transition-all duration-300 ${
        dark ? "translate-x-6" : ""
      }`}
    />
  </div>
</button>
  );
}