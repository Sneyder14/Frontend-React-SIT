import { createContext, useContext, useState } from "react";

const NotificacionesContext = createContext();

export function NotificacionesProvider({ children }) {
    const [notificaciones, setNotificaciones] = useState([]);

    const agregarNotificacion = (nueva) => {
        setNotificaciones((prev) => [
            ...prev,
            { ...nueva, id: `notif-${Date.now()}`, leido: false },
        ]);
    };

    const marcarTodasComoLeidas = () => {
        setNotificaciones((prev) =>
            prev.map((n) => ({ ...n, leido: true }))
        );
    };

    return (
        <NotificacionesContext.Provider
            value={{ notificaciones, agregarNotificacion, marcarTodasComoLeidas }}
        >
            {children}
        </NotificacionesContext.Provider>
    );
}

export const useNotificaciones = () => useContext(NotificacionesContext);
