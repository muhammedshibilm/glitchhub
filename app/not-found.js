
import notfound from "../public/404.svg";
import { Home } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export const metadata={
    title: "404",
    description: "Its a 404 page"
}

export default function NotFound (){
    return(
      <div className="h-screen flex flex-col justify-center items-center"> 
          <Image src={notfound} alt="not found" className=""/>
          <button className="bg-black text-white py-2 px-4 rounded-lg mt-10 "><Link href={"/"} className="flex gap-2"><Home/> Go Back</Link></button>
      </div>
    );
}