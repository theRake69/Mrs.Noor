import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
// import { authRoute, chatRoute } from "./routes/indexRouter";
import authRoute from "../src/routes/authRoute";
import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow only specified HTTP methods
  },
});
const port = process.env.PORT || 3001;

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("offer", (data) => {
    socket.broadcast.emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.broadcast.emit("answer", data);
  });
  socket.on("candidate", (data) => {
    socket.broadcast.emit("candidate", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

app.use(express.json());
app.use("/api", authRoute);

server.listen(port, () => {
  console.log(`Signaling Server is running on http://localhost:${port}`);
});
