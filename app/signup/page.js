"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    password: "",
  });

  const router = useRouter();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      toast.error(`An error occured. Please try again later. ${error}`);
    }
  };
  return (
    <form onSubmit={handlesubmit} className="flex flex-col space-y-2 mt-4 ">
      <div className="bg-[#44cc00] text-black h-screen flex flex-col justify-around ">
        <div className="flex flex-col px-5 space-y-10">
          <h1 className="text-5xl font-extrabold relative ">
            Create an <br /> Account
          </h1>

          <p className="text-2xl font-bold relative -bottom-9 -right-2">
            Sign Up
          </p>
          <input
            className="rounded-md py-4 px-4"
            placeholder="Enter name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            value={form.name}
          />
          <input
            className="rounded-md py-4 px-4"
            placeholder="Enter phone number" required value={form.phoneNumber} type="tel"   onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
          <input
            className="rounded-md py-4 px-4"
            placeholder="Enter password"    onChange={(e) => setForm({ ...form, password: e.target.value })} required value={form.password} type="password"
          />
        </div>
        <div className="flex justify-center items-center flex-col">
          <button type="submit">
            <div className="rounded-full p-8 bg-black relative -top-20 ">
              <ArrowRight className="text-white" size={40} />
            </div>
          </button>
          <p className="text-lg font-semibold">
            If Already User?{" "}
            <Link href={"/login"} className="hover:underline">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </form>
  );
}
