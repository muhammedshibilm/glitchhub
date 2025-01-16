"use client";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { ArrowLeftCircleIcon, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CircleArrowLeft, RotateCcwSquare } from "lucide-react";


export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [amount, setAmount] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track the submission process
  const route = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleBackArrow = () => {
    route.back(); // Navigate back to the previous page
  };

  // Function to update the amount
  const handleRecharge = (value) => {
    setAmount((prevAmount) => prevAmount + value); // Update the amount using the previous state
  };

  const formHandler = async (e) => {
    e.preventDefault(); // Prevents form default behavior (page refresh)

    if (amount <= 0) {
      toast.error("Amount should be greater than 0.");
      return;
    }

    setIsSubmitting(true); // Start the submission process

    const res = await fetch("/api/rechargeroute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    setIsSubmitting(false); // End the submission process

    if (res.ok) {
      toast.success("Recharge successful!");
    } else {
      toast.error("Recharge failed!");
    }
  };

  return (
    <>
      <div>
      <form onSubmit={formHandler}>
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
          {[5, 10, 100, 500].map((plan) => (
            <div
              key={plan}
              className="bg-green-800 px-10 py-4 text-white w-fit text-3xl rounded-md"
              onClick={() => handleRecharge(plan)}
            >
              <IndianRupee className="inline-block" /> {plan}
            </div>
          ))}
        </div>

        {/* Custom pay */}
        <input
          className="mx-4 p-4 rounded-md mt-10 bg-gray-200 text-black"
          placeholder="Insert Amount"
          type="number"
          value={amount} // Set the value of input to the amount state
          onChange={(e) => setAmount(Number(e.target.value))} // Update the amount manually
          min="0" // Prevent negative values
        />
        <div className="w-full flex justify-center">
          <button
            className={`bg-green-600 text-4xl px-10 py-5 font-bold mt-10 rounded-full ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            type="submit"
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? "Processing..." : "Pay"}
          </button>
        </div>
      </div>
    </form>
      </div>
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
