import axios from "axios";

export const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    try {
        const response = await axios.post("http://72.61.0.205:8000/auth/refresh/", {
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
