"use client";

import Link from "next/link";
import { FaCarCrash } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#081120] px-6">

      <div className="text-center max-w-2xl">

        <div className="text-blue-600 text-8xl flex justify-center mb-8">
          <FaCarCrash />
        </div>

        <h1 className="text-7xl font-bold mb-6">
          404
        </h1>

        <h2 className="text-3xl font-semibold mb-4">
          Oops! Route Lost
        </h2>

        <p className="text-gray-500 text-lg mb-10">
          Looks like this road doesn't lead anywhere.
          Let's get you back to DriveFleet.
        </p>

        <Link
          href="/"
          className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>

      </div>

    </section>
  );
}