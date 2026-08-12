import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.response.use((response)=> response, (error)=> {
  console.log(error);
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("adminData");
  }

  return Promise.reject(error);
});

export default api;
