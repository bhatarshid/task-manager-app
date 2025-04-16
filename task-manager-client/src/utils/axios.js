import axios from "axios";
import { API_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Add interceptor to set auth token and content-type dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Set Content-Type dynamically
    const isFormData = config.data instanceof FormData;
    config.headers["Content-Type"] = isFormData
      ? "multipart/form-data"
      : "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;