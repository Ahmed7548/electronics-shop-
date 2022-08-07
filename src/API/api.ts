import axios from "axios";

 const api = axios.create({
  baseURL: "http://localhost:3500",
   timeout: 1000,
 });


export const authApi = axios.create({
   baseURL: "http://localhost:5000/auth",
   timeout:5000,
 })


export default api