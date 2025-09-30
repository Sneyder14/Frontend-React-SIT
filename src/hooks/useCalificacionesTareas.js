import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/task-grades/";

export default function useCalificacionesTareas() {
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchCalificaciones = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCalificaciones(res.data);
        } catch (err) {
            toast.error("Error al cargar calificaciones");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createCalificacion = async (data) => {
        const dataClean = { ...data };
        delete dataClean.task_grade_id;

        await toast.promise(
            axios.post(API_URL, dataClean, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Registrando calificación...",
                success: "Calificación registrada",
                error: "Error al registrar calificación",
            }
        ).then((res) => {
            setCalificaciones((prev) => [...prev, res.data]);
        });
    };

    const updateCalificacion = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando calificación...",
                success: "Calificación actualizada",
                error: "Error al actualizar calificación",
            }
        ).then((res) => {
            setCalificaciones((prev) =>
                prev.map((c) => (c.task_grade_id === id ? res.data : c))
            );
        });
    };

    const deleteCalificacion = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando calificación...",
                success: "Calificación eliminada",
                error: "Error al eliminar calificación",
            }
        ).then(() => {
            setCalificaciones((prev) =>
                prev.filter((c) => c.task_grade_id !== id)
            );
        });
    };

    useEffect(() => {
        fetchCalificaciones();
    }, []);

    return {
        calificaciones,
        createCalificacion,
        updateCalificacion,
        deleteCalificacion,
        loading,
    };
}
