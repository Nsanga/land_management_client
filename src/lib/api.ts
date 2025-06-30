import axios from "axios";

const BASE_URL = "https://land-management-backend-app.onrender.com/api";

// Récupération du token depuis localStorage (ou cookies si tu préfères)
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        return parsed.token || null;
      } catch (error) {
        console.error("Erreur parsing authUser:", error);
        return null;
      }
    }
  }
  return null;
};

// Axios instance avec baseURL
const api = axios.create({
  baseURL: BASE_URL,
});

// Middleware pour injecter automatiquement le token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
