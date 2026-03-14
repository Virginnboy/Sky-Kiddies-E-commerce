import axios from "axios";

const api = axios.create({
  baseURL: "https://sky-kiddies.onrender.com",
  withCredentials: true,
});

export default api;
