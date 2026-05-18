"use client";

import Link from "next/link";
import { FaCarSide } from "react-icons/fa";

export default function EmptyState({
  title,
  subtitle,
  buttonText,
  buttonLink
}) {
  return (
    <div className="glass rounded-[36px] p-16 text-center flex flex-col items-center justify-center min-h-[520px]">

      <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-5xl shadow-[0_0_40px_rgba(59,130,246,0.35)]">
        <FaCarSide />
      </div>

      <h2 className="mt-8 text-4xl font-bold">
        {title}
      </h2>

      <p className="mt-4 text-gray-500 text-lg max-w-xl leading-8">
        {subtitle}
      </p>

      <Link
        href={buttonLink}
        className="mt-10 glow-btn px-10 py-4 rounded-2xl text-white font-semibold text-lg"
      >
        {buttonText}
      </Link>

    </div>
  );
}