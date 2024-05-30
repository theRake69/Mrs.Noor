import Image from "next/image";
import Link from "next/link";

// Intenal Imports
import Noor from "@/public/Mrs.Noor.png";
import Doc from "@/public/doc.png";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-center h-screen p-24 bg-customGray">
      <div className="flex space-x-8 h-1/2 m-10 w-1/2">
        <Link
          href="/video-counselling"
          className="w-1/2 bg-white rounded-lg p-10 hover:scale-105  cursor-pointer transition-transform duration-300"
        >
          <div className="">
            {/* <Image src={Noor} alt="Mrs.Noor" /> */}
            <div className="">
              <h1 className="p-10">
                Video Counselling with our Specilized doctor at your local
                convenience 
              </h1>
            </div>
          </div>
        </Link>
        <Link
          href="/book-appointment"
          className="w-1/2 bg-white rounded-lg p-10 hover:scale-105 cursor-pointer transition-transform duration-300"
        >
          <div className="">
            <Image src={Doc} alt="Mrs.Noor" />
            <div className="">
              <h1 className="p-10">
                Book an Appointment with our Specilized doctor{" "}
              </h1>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
