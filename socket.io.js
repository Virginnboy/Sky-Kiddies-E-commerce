import { io } from "socket.io-client";

const token = localStorage.getItem("adminToken");

export const socket = io("http://localhost:5000", {
  auth: { token }
});

