"use client";
import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

// internal imports
import { userSchema } from "@/src/schema/userSchema";
import { getUserFromLocalStorage } from "@/lib/utils/localStorage";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // validate the user input against the schema
      userSchema.parse({
        email,
        password,
        confirmPassword,
      });

      // call the backend registration api
      const response = await axios.post("http://localhost:3001/api/register", {
        email,
        password,
        role,
      });

      console.log("Registration successfull", response.data);
      setSuccess("Registration successfull");
      setError("");

      // set item in local storage
      localStorage.setItem("user", JSON.stringify({ email, role }));

      // navigation based on role
      if (role === "ADMIN") {
        router.push("/dashboard");
      } else if (role == "DOCTOR") {
        router.push("/doctor-page");
      } else if (role === "USER") {
        router.push("/");
      }
    } catch (error) {
      // if validation fails set the error message
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError("An unexpected error occured");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Register PAGE...!!!!</h2>
      {error && <p className="text-red-400">{error}</p>}
      {success && <p className="text-green-400">{success}</p>}
      <form action="" onSubmit={handleSubmit}>
        <div className="">
          <label>Email: </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>confirmPassword </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="DOCTOR">DOCTOR</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
