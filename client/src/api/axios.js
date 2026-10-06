import axios from "axios";

// Central axios instance. Base URL comes from VITE_API_URL (defaults to /api,
// which is proxied to the backend in development).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Attach the JWT from localStorage to every request if present.
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
