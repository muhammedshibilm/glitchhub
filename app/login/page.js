import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-[#44cc00] text-black h-screen flex flex-col justify-around">

      <div className="flex flex-col px-5 space-y-10">
      <h1 className="text-5xl font-extrabold relative ">
          Welcome <br /> Back!
        </h1>
        <p className="text-2xl font-bold relative -bottom-9 -right-2">Sign in</p>
        <input className="rounded-md py-4 px-4" placeholder="Enter phone number" />
        <input className="rounded-md py-4 px-4" placeholder="Enter password" />
        <p className=" text-end font-bold text-lg relative right-2 -top-8  opacity-75">Forgot password</p>
      </div>
      <div className="flex justify-center items-center flex-col">
        <div className="rounded-full p-8 bg-black relative -top-20 ">
          <ArrowRight className="text-white" size={40} />
        </div>
        <p className="text-lg font-semibold">If New User? <Link href={"/signup"}>Sign Up</Link> </p>
      </div>
    </div>
  );
}
