import axios from "axios";

// Centralized Axios instance
// Base URL can be configured via Vite env variable. Defaults to same-origin.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 15000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;


