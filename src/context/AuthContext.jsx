import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null);
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });


    const login = (accessToken, role, userData, refreshToken) => {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refresh", refreshToken);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setToken(accessToken);
        setRole(role);
    };


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        setRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                user,
                login,
                logout,
                isAuthenticated: !!token,
                isAdmin: role === "admin",
                isStudent: role === "student",
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);
