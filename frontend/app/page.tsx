"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Intenal Imports
import Noor from "@/public/Mrs.Noor.png";
import Doc from "@/public/doc.png";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "@/lib/utils/localStorage";

interface User {
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userInfo = getUserFromLocalStorage();
    setUser(userInfo);
    console.log(userInfo);
  }, []);

  const handleLogout = () => {
    removeUserFromLocalStorage();
    window.location.reload();
  };

  return (
    <main className="flex  flex-col items-center justify-center h-screen p-24 bg-customGray">
      <div className="flex space-x-8 h-1/2 m-10 w-1/2">
        <Link
          href="/ai-chat"
          className="w-1/2 bg-white rounded-lg p-10 hover:scale-105  cursor-pointer transition-transform duration-300"
        >
          <div className="">
            <Image src={Noor} alt="Mrs.Noor" />
            <div className="">
              <h1 className="p-10">
                Connect with experienced counselors for personalized sessions,
                tailored to your unique needs and goals
              </h1>
            </div>
          </div>
        </Link>
        <Link
          href="/personal-counselling"
          className="w-1/2 bg-white rounded-lg p-10 hover:scale-105 cursor-pointer transition-transform duration-300"
        >
          <div className="">
            <Image src={Doc} alt="Mrs.Noor" />
            <div className="">
              <h1 className="p-10">
                Connect with experienced counselors for personalized sessions,
                tailored to your unique needs and goals
              </h1>
            </div>
          </div>
        </Link>
        {user && ( // Check if user exists before rendering
          <div>
            <p>Email: {user.email}</p>
          </div>
        )}
        <Link href="/login">
          <div className="">Login</div>
        </Link>
        <div className="cursor-pointer" onClick={handleLogout}>
          <h1>Logout</h1>
        </div>
      </div>
    </main>
  );
}
