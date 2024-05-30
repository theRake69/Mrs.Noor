import Image from "next/image";
import Link from "next/link";
import Doc from "@/public/doc.png";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen  bg-customGray">
      <h1 className="text-7xl mb-9 p-9 ">Book an Appointment with our experts</h1>
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {[...Array(6)].map((_, index) => (
          <Link
            key={index}
            href={"/video-counselling"}
            className="w-1/4 bg-white rounded-lg p-10 hover:scale-105 cursor-pointer transition-transform duration-300"
          >
            <div className="flex flex-col items-center">
              <Image src={Doc} alt="Mrs.Noor" />
              <h1 className="mt-6 text-center">Doc {index + 1}</h1>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
