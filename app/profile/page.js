"use client";

import BottomNavbar from "../../components/Navbar";
import { LogOut, UserPenIcon } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import checkAuth from "../../lib/auth";
import { CircleArrowLeft, RotateCcwSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [user , setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const copiedLink = () => {
    toast.success("Link Copied");
  };

    const logout = async () => {
      try {
        const res = await fetch("/api/auth/logout", { method: "GET" });
        const data = await res.json();
        if (!res.ok) {
          return toast.error(data.error || "Something went wrong");
        }
        toast.success(data.message || "Logout successful");
        setIsLoggedOut(true); 
      } catch (error) {
        toast.error("Failed to log out");
      }
    };

    useEffect(() => {
        checkAuth().then(setIsAuthenticated);
        const fetchUser = async () => {
          try {
            const res = await fetch("/api/auth/me", { method: "GET" });
            const data = await res.json();
            if (res.ok) {
              setIsAuthenticated(true);
              setUser(data);
            }
      
          } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
          }
        };
        fetchUser();
      }, []);


  return (
    <>
    <div className="h-screen flex flex-col space-y-20 items-center  md:hidden">
      <div className="flex justify-center items-center flex-col">
      <div className=" w-full mt-16 flex justify-end relative -right-20 mb-5">
      <LogOut color="red" size={35}  onClick={logout}/>
      </div>
      <div className="bg-black rounded-full p-10 ">
        <UserPenIcon className="text-slate-50" size={100} />
      </div>
      </div>
      <div className="bg-green-400 p-8 rounded-lg font-bold text-xl">
        <h1>Name: { user && user.name}</h1>
        <h1>Phone number: { user && user.phoneNumber}</h1>
      </div>
      <div
        className="bg-green-400 px-10 py-3 rounded-lg font-bold text-lg"
        onClick={copiedLink}
      >
        <p>Refer And Earn</p>
      </div>
      <div>
        <h1 className="text-xl">
          “Your Journey, Your Way... <br></br> Smart - Seamless - Secure”
        </h1>
      </div>

      <BottomNavbar />
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
