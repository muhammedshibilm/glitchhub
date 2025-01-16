"use client";
import Link from "next/link";
import BottomNavbar from "../../components/Navbar";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken"; // Import jwt to decode the token

export default function Page() {
  // Function to handle extracting phoneNumber from the token and modifying the URL
  function handleFunction() {
    const authToken = Cookies.get("authToken");

    if (authToken) {
      try {
        // Decode the token to extract the phoneNumber
        const decoded = jwt.decode(authToken); // Decode without verifying, since we just need the payload
        const phoneNumber = decoded?.phoneNumber;

        if (phoneNumber) {
          // Create the URL with phoneNumber as a query param
          const url = `http://127.0.0.1:5500/test.html`;
          console.log(url); // Log the full URL for debugging (optional)
          
          // Redirect the user to the constructed URL
          window.location.href = url;
        } else {
          console.error("Phone number not found in the token");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      console.error("Auth token not found");
    }
  }

  return (
    <div className="flex justify-center items-center pt-16 px-4">
      <button
        onClick={handleFunction} // Handle the click event
        className="w-full h-36 bg-gray-600 rounded-md text-center flex justify-center items-center"
      >
        <p className="text-white font-bold">Click here</p>
      </button>
      <BottomNavbar />
    </div>
  );
}
