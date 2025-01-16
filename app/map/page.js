"use client";

import Link from "next/link";
import BottomNavbar from "../../components/Navbar";
import { useState } from "react";
import { toast, Toaster } from "sonner"; // Import toast and Toaster

export default function Page() {
  // State to store the input value
  const [fairAmount, setFairAmount] = useState("");

  // Function to handle extracting phoneNumber from the token and modifying the URL
  function handleFunction() {
    const url = `http://127.0.0.1:5500/test.html`;
    console.log(url); // Log the full URL for debugging (optional)
    window.location.href = url; // Redirect the user to the constructed URL
  }

  // Function to handle form submission and send the POST request using fetch
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/maprouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fairAmount: fairAmount }), // Send the fairAmount in the request body
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Credit redeemed successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Error sending the request!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-16 px-4">
      <button
        onClick={handleFunction} // Handle the click event
        className="w-full h-36 bg-gray-600 rounded-md text-center flex justify-center items-center"
      >
        <p className="text-white font-bold">Click here</p>
      </button>
      <BottomNavbar />
      {/* Toaster for displaying messages */}
      <Toaster position="top-right" duration={5000} />

      {/* Input field to enter the fair amount */}
      <input
        className="p-4 mt-10 rounded-md bg-gray-200"
        placeholder="Enter the fair amount in rupees"
        value={fairAmount}
        onChange={(e) => setFairAmount(e.target.value)} // Update the state on input change
      />
      <button
        onClick={handleSubmit} // Trigger the handleSubmit function on button click
        className="p-5 bg-green-600 text-white mt-16 rounded-md"
      >
        Redeem Credit
      </button>
    </div>
  );
}
