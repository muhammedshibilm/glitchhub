import Image from "next/image";
import sucess from "../../public/animation/sucess.gif"
import Link from "next/link";
import { CircleArrowLeft, RotateCcwSquare } from "lucide-react";


export default function Page(){
    return(
        <>
      <div className="block md:hidden">

      <div className="h-screen flex justify-center flex-col items-center ">
            <Image src={sucess} alt="sucess" className="w-80" />
            <Link href="/"><button className="text-xl"> <RotateCcwSquare className="inline-block"/> Home </button></Link>
        </div>
      </div>
        <div className="h-screen hidden text-6xl font-bold   md:block">
         <div className="h-screen flex justify-center items-center">
         <p>
               This site will not work in Desktop mode <br></br> Kindly access through a Phone
         </p>
         </div>
      </div>

        </>
        
    )
}