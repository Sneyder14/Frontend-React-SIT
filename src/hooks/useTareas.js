import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://72.61.0.205:8000/api/academics/tasks/";

export default function useTareas() {
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchTareas = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTareas(res.data);
        } catch (err) {
            toast.error("Error al cargar tareas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createTarea = async (data) => {
        const { task_id, ...cleanData } = data;
        console.log("DATOS ENVIADOSS", data);
        await toast.promise(
            axios.post(API_URL, cleanData, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando tarea...",
                success: "Tarea creada",
                error: "Error al crear tarea",
            }
        ).then((res) => {
            setTareas((prev) => [...prev, res.data]);
        });
    };


    const updateTarea = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando tarea...",
                success: "Tarea actualizada",
                error: "Error al actualizar tarea",
            }
        ).then((res) => {
            setTareas((prev) =>
                prev.map((t) => (t.task_id === id ? res.data : t))
            );
        });
    };

    const deleteTarea = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando tarea...",
                success: "Tarea eliminada",
                error: "Error al eliminar tarea",
            }
        ).then(() => {
            setTareas((prev) => prev.filter((t) => t.task_id !== id));
        });
    };

    useEffect(() => {
        fetchTareas();
    }, []);

    return {
        tareas,
        createTarea,
        updateTarea,
        deleteTarea,
        loading,
    };
}
