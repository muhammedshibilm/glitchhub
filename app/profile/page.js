"use client";

import BottomNavbar from "../../components/Navbar";
import { UserCircleIcon, UserPenIcon } from "lucide-react";
import { toast } from "sonner";


export default function Page(){

    const copiedLink = () =>{
        toast.success("Link Copied")
    }
    return(
        <div className="h-screen flex flex-col space-y-20  items-center">
            
                <div className="bg-black rounded-full p-10 mt-16">
                    <UserPenIcon className="text-slate-50" size={100}/>
                </div>
                <div className="bg-green-400 p-8  rounded-lg  font-bold text-xl">
                    <h1>Name: Muhammed Shibil M </h1>
                    <h1>Phone number: 9876543210 </h1>
                </div>
                <div className="bg-green-400  px-10 py-3 rounded-lg font-bold text-lg" onClick={copiedLink}>
                    <p>Refer And Earn </p>
                </div>
                <div>
                    <h1 className="text-xl">“Your Journey, Your Way... <br></br> Smart - Seamless - Secure”</h1>
                </div>

            <BottomNavbar/>
        </div>
    )
}