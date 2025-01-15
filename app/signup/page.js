import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-[#44cc00] text-black h-screen flex flex-col justify-around ">

      <div className="flex flex-col px-5 space-y-10">
      <h1 className="text-5xl font-extrabold relative ">
          Create an <br /> Account
        </h1>
        <p className="text-2xl font-bold relative -bottom-9 -right-2">Sign Up</p>
        <input className="rounded-md py-4 px-4" placeholder="Enter name" />
        <input className="rounded-md py-4 px-4" placeholder="Enter phone number" />
        <input className="rounded-md py-4 px-4" placeholder="Enter password" />
      </div>
      <div className="flex justify-center items-center flex-col">
        <div className="rounded-full p-8 bg-black relative -top-20 ">
          <ArrowRight className="text-white" size={40} />
        </div>
        <p className="text-lg font-semibold">If Already User? <Link href={"/login"} className="hover:underline">Login</Link> </p>
      </div>
    </div>
  );
}
