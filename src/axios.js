import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/admin",
  withCredentials: true,
});

export default api;


// api.interceptors.response.use((response)=> response, 
// (error)=> {
//   if(error.response?.status === 401) {
//     window.location.href = "/login"
//   }
//   return Promise.reject(error)
// });