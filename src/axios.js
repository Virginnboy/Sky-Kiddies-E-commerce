import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/admin",
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  },
});

export default api;

