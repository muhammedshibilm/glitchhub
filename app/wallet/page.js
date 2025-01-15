
import { IndianRupee, Wallet2Icon } from "lucide-react";
import Link from "next/link";
import BottomNavbar from "../../components/Navbar";

export default function Page() {
  return (
    <div className="overflow-y-scroll">
      {/* Scrollable Content */}
      <div className="flex-1 ">
        {/* Wallet Balance Section */}
        <div className="flex flex-col justify-around px-5 mt-10 mx-5 rounded-md bg-green-900 h-72">
          <div className="text-white flex justify-center items-center text-7xl">
            <div className="pt-10">
              <Wallet2Icon className="inline-block" size={40} />{" "}
              <IndianRupee className="inline-block" size={40} /> 1,000
            </div>
          </div>
         <Link href={"/recharge"} className="flex justify-center items-center" > <button className="bg-green-600 text-xl px-6 py-5 font-bold mt-10 rounded-full">
            Recharge
          </button></Link>
        </div>

 
        <div
          className="pt-5 px-2 space-y-4"
         
        >
          <div className="flex justify-around bg-green-700 py-5 text-xl font-extrabold opacity-90 text-white rounded-md">
            <p>Rs.10</p> <p className="text-red-400">Spent</p>
          </div>

          <div className="flex justify-around bg-green-700 py-5 text-xl font-extrabold opacity-90 text-white rounded-md">
            <p>Rs.10</p> <p className="text-white relative -right-10">Recharged</p>
          </div>

          <div className="flex justify-around bg-green-700 py-5 text-xl font-extrabold opacity-90 text-white rounded-md">
            <p>Rs.30</p> <p className="text-white relative -right-10">Recharged</p>
          </div>

          <div className="flex justify-around bg-green-700 py-5 text-xl font-extrabold opacity-90 text-white rounded-md">
            <p>Rs.30</p> <p className="text-red-400">Spent</p>
          </div>

          <div className="flex justify-around bg-green-700 py-5 text-xl font-extrabold opacity-90 text-white rounded-md">
            <p>Rs.30</p> <p className="text-red-400">Spent</p>
          </div>

          <div className="flex justify-around bg-green-700 py-5 text-xl font-extrabold opacity-90 text-white rounded-md">
            <p>Rs.30</p> <p className="text-red-400">Spent</p>
          </div>

          <div className="flex justify-around bg-green-700 py-5 text-xl font-extrabold opacity-90 text-white rounded-md">
            <p>Rs.30</p> <p className="text-red-400">Spent</p>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full">
         <BottomNavbar/>
      </div>
    </div>
  );
}
