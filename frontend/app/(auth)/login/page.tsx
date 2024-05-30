"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

// internal import
import { login } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const decodeToken = (token: string): JwtPayload | null => {
    try {
      const decodedToken = jwt.decode(token) as JwtPayload;
      return decodedToken;
    } catch (error) {
      console.error("error decoding token", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      // decode token
      const user = decodeToken(token);
      if (user?.role === "ADMIN") {
        console.log("admin login", user?.role);
        router.push("/dashboard");
      } else if (user?.role === "DOCTOR") {
        console.log("Doctor login", user?.role);
        router.push("/doctor-page");
      } else {
        console.log("user login");
        router.push("/");
      }
      // set item in local storage
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user?.email, role: user?.role })
      );
    } catch (error) {
      alert("login failed");
      console.error(error);
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@mail.com"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
