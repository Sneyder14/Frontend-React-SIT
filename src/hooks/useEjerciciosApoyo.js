import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://72.61.0.205:8000/api/academics/support-exercises/";

export default function useEjerciciosApoyo() {
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchEjercicios = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEjercicios(res.data);
        } catch (err) {
            toast.error("Error al cargar ejercicios");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createEjercicio = async (data) => {
        const cleanData = { ...data };
        delete cleanData.support_exercise_id;

        await toast.promise(
            axios.post(API_URL, cleanData, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando ejercicio...",
                success: "Ejercicio creado",
                error: "Error al crear ejercicio",
            }
        ).then((res) => {
            setEjercicios((prev) => [...prev, res.data]);
        });
    };

    const updateEjercicio = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando ejercicio...",
                success: "Ejercicio actualizado",
                error: "Error al actualizar ejercicio",
            }
        ).then((res) => {
            setEjercicios((prev) =>
                prev.map((e) => (e.support_exercise_id === id ? res.data : e))
            );
        });
    };

    const deleteEjercicio = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando ejercicio...",
                success: "Ejercicio eliminado",
                error: "Error al eliminar ejercicio",
            }
        ).then(() => {
            setEjercicios((prev) => prev.filter((e) => e.support_exercise_id !== id));
        });
    };

    useEffect(() => {
        fetchEjercicios();
    }, []);

    return {
        ejercicios,
        createEjercicio,
        updateEjercicio,
        deleteEjercicio,
        loading,
    };
}
