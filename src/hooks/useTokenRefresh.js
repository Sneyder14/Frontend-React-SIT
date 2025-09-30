import axios from "axios";

export const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", {
            refresh,
        });
        const newAccess = response.data.access;
        localStorage.setItem("token", newAccess);
        return newAccess;
    } catch (error) {
        console.error("Error al renovar token:", error);
        return null;
    }
};
