import axios from "axios";

const api = axios.create({
  baseURL: "http://13.233.247.230:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token only for protected requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Login and register should NOT receive old token
  const isAuthRequest =
    config.url?.includes("/auth/login") ||
    config.url?.includes("/auth/register");

  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Automatically remove expired/invalid token
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const isAuthRequest =
      error.config?.url?.includes("/auth/login") ||
      error.config?.url?.includes("/auth/register");

    // Token expired on protected API
    if (error.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;