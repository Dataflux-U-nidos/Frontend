import axios from "axios";
import { getAccessToken, clearTokens } from "./authApi";

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

userApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error.message ?? "Request error"))
);

userApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response?.status === 401) {
      clearTokens();
    }
    return Promise.reject(new Error(error.message ?? "Response error"));
  }
);
