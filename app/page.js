import BottomNavbar from "../components/Navbar";
import Image from "next/image";
import logo from "../public/logo.svg";
import homeimage from "../public/homeimage.svg";
import { Bell, BellRingIcon, IndianRupee } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="overflow-y-scroll ">
        <div className=" top-0 flex justify-between items-center w-full ">
          <Image src={logo} alt="logo" className="w-28 h-28" />
          <BellRingIcon className="relative right-5" size={32} />
        </div>
        {/*  */}

        <div className="relative top-24 mb-7  w-full flex justify-center items-center">
          <div className="relative">
            <p className="absolute  text-end bottom-0 right-0  text-white font-extrabold  text-4xl px-4 py-1 rounded-md z-20">
              Hot <br></br> Locations
            </p>
            <Image
              src={homeimage}
              alt="home image"
              className="w-80 rounded-xl z-10 shadow-lg shadow-black"
            />
          </div>
        </div>

        <div className="relative top-44 flex justify-between">
          <div className="bg-green-600 text-white font-semibold p-4 rounded-lg relative left-4 text-center text-xl">
            Bus Fare/Km <br></br> <IndianRupee className="inline-block" /> 2.00{" "}
          </div>
          <div className="bg-green-600 text-white font-semibold p-4 rounded-lg relative right-4 text-center text-xl">
            Min Fare Till 2 Km <br></br>{" "}
            <IndianRupee className="inline-block" /> 10.00
          </div>
        </div>

        <Link href={"/recharge"}>
        <div className="bg-green-600 text-white font-semibold p-4 mx-4 rounded-lg relative top-52 text-center text-xl">
          Recharge Wallet
        </div>
        </Link>
      </div>
      <BottomNavbar />
    </>
  );
}
