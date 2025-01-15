import Image from "next/image";
import sucess from "../../public/animation/sucess.gif"
import Link from "next/link";
import { CircleArrowLeft, RotateCcwSquare } from "lucide-react";


export default function Page(){
    return(
        <div className="h-screen flex justify-center flex-col items-center">
            <Image src={sucess} alt="sucess" className="w-80" />
            <Link href="/"><button className="text-xl"> <RotateCcwSquare className="inline-block"/> Home </button></Link>
        </div>
    )
}