/* import axios from "axios";
import { refreshAccessToken } from "../hooks/useTokenRefresh";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
 */