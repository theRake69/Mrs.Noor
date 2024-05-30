"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";
import { getToken, removeUserFromLocalStorage } from "@/lib/utils/localStorage";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface AuthProviderProps {
  roles?: string[];
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  roles = [],
  children,
}) => {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const token = getToken();
    console.log("retrieved token ", token);
    if (!token) {
      console.log("token is not present redirecting to the login page");
      router.push("/login");
      return;
    }
    const user = decodeToken(token);
    console.log("decoded token: ", user);
    if (user && user.role) {
      setLoading(false);
    } else {
      console.log("token is invalid or has no role, logging outt");
      removeUserFromLocalStorage();
      router.push("/login");
    }
  }, [roles, router]);

  useEffect(() => {
    if (!loading) {
      const token = getToken();
      console.log("Retrieved token after loadingg", token);
      if (token) {
        const user = decodeToken(token);
        console.log("Decoded token afterloading: ", user);
        if (user?.role === "ADMIN") {
          console.log("Redirecting to the Dashboarddd...!");
          router.push("/dashboard");
        } else if (user?.role === "DOCTOR") {
          console.log("Redirecting to the doctors page");
          router.push("/doctor-page");
        } else {
          console.log("Redirecting to the home page");
          router.push("/");
        }
      } else {
        console.log("token is not present redirecting to the home page");
        router.push("/");
      }
    }
  }, [loading, router]);

  return loading ? <div>loading...</div> : children;
};

export default AuthProvider;
