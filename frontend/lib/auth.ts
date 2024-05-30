import axios from "axios";
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3001/api/login", {
      email,
      password,
    });

    const { token } = await response.data;
    localStorage.setItem("token", token);
    console.log("token recieved and stored ", token);
    return token;
  } catch (error) {
    console.error("Login failed in lib/auth", error);
    throw new Error("Login failed");
  }
};

