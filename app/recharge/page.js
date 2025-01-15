"use client";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { ArrowLeftCircleIcon, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const route = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;



  const handleBackArrow = () => {
   
    route.back(); // Corrected here
  };

  return (
    <div className="flex flex-col h-screen">
      <ArrowLeftCircleIcon
        size={40}
        className="relative left-4 top-4"
        onClick={handleBackArrow}
      />
      <div className="flex justify-center">
        <Image src={logo} alt="logo" />
      </div>

      {/* Recharge plans heading */}
      <div className="px-4">
        <p className="pl-2 font-bold text-4xl border-b-2 border-white pb-2">
          Recharge Plans
        </p>
      </div>

      <div className="flex justify-around flex-wrap pt-10 gap-4">
        <div className="bg-green-800 px-10 py-4 text-white w-fit text-3xl rounded-md">
          <IndianRupee className="inline-block" /> 5
        </div>
        <div className="bg-green-800 px-10 py-4 text-white w-fit text-3xl rounded-md">
          <IndianRupee className="inline-block" /> 10
        </div>
        <div className="bg-green-800 px-10 py-4 text-white w-fit text-3xl rounded-md">
          <IndianRupee className="inline-block" /> 100
        </div>
        <div className="bg-green-800 px-10 py-4 text-white w-fit text-3xl rounded-md">
          <IndianRupee className="inline-block" /> 500
        </div>
      </div>

      {/* Custom pay */}
      <input
        className="mx-4 p-4 rounded-md mt-10 bg-gray-200 text-black"
        placeholder="Insert Amount"
        type="number"
      />
      <div className="w-full flex justify-center">
        <Link href={"/sucess"}>
          <button className="bg-green-600 text-4xl px-10 py-5 font-bold mt-10 rounded-full">
            Pay
          </button>
        </Link>
      </div>
    </div>
  );
}
