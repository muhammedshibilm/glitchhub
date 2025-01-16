"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { CircleArrowLeft, RotateCcwSquare } from "lucide-react";
export default function Page() {
  const [form, setForm] = useState({ phoneNumber: "", password: "" });
  const router = useRouter();

  // Validate form fields
  const validateForm = () => {
    let isValid = true;

    if (!form.phoneNumber) {
      toast.error("Phone number is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(form.phoneNumber)) {
      toast.error("Enter a valid 10-digit phone number.");
      isValid = false;
    }

    if (!form.password) {
      toast.error("Password is required.");
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed.");
        return;
      }

      toast.success(data.message || "Login successful!");
      router.replace("/");
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-[#44cc00] text-black h-screen flex flex-col justify-around md:hidden">
      <div className="flex flex-col px-5 space-y-10">
        <h1 className="text-5xl font-extrabold relative">
          Welcome <br /> Back!
        </h1>
        <p className="text-2xl font-bold relative -bottom-9 -right-2">Sign in</p>
        <input
          className="rounded-md py-4 px-4"
          type="tel"
          placeholder="Enter phone number"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />
        <input
          className="rounded-md py-4 px-4"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <p className="text-end font-bold text-lg relative right-2 -top-8 opacity-75">Forgot password</p>
      </div>
      <div className="flex justify-center items-center flex-col">
        <button type="submit" className="rounded-full p-8 bg-black relative -top-20">
          <ArrowRight className="text-white" size={40} />
        </button>
        <p className="text-lg font-semibold">
          If New User? <Link href="/signup" className="hover:underline">Sign Up</Link>
        </p>
      </div>
    </form>
    <div className="h-screen hidden text-6xl font-bold   md:block">
         <div className="h-screen flex justify-center items-center">
         <p>
               This site will not work in Desktop mode <br></br> Kindly access through a Phone
         </p>
         </div>
      </div>
    </>
  );
}
