"use client";

import { useEffect, useState } from "react";

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
      
      className="px-3 py-2 rounded-lg text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}