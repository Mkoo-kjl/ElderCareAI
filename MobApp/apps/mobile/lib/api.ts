import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.apiUrl ??
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:3001/api";

/** Pre-configured Axios instance for ElderCare API */
export const api = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor: Attach JWT ─────────────────────
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // SecureStore may not be available (e.g., web)
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor: Handle 401 ────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear stored token on auth failure
      try {
        await SecureStore.deleteItemAsync("auth_token");
      } catch {
        // Ignore SecureStore errors
      }
    }
    return Promise.reject(error);
  },
);
