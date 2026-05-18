"use client";

import { FaCarSide } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">

      <div className="relative flex flex-col items-center">

       
        <div className="absolute w-44 h-44 bg-blue-500/20 blur-3xl rounded-full" />

     
        <div className="relative w-72 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mt-16">

          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-gray-400" />
          </div>

   
          <div className="absolute animate-carMove text-blue-600 dark:text-blue-400 text-4xl -top-5">
            <FaCarSide />
          </div>

        </div>

        <p className="mt-10 text-lg font-semibold text-gray-600 dark:text-gray-300 tracking-wide">
          Please Wait <br />Loading DriveFleet...
        </p>

      </div>

    </div>
  );
}