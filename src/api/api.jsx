import axios from "axios";

// const BASE_URL = 'http://localhost:5000/api/'
const BASE_URL = 'https://tipzo-be-production.up.railway.app/api/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: { 
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": 1
    }
  });


const publicRoutes = ["/login", "/register"];

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // If the request is NOT in publicRoutes, add token
    if (token && !publicRoutes.some((route) => config.url.includes(route))) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance