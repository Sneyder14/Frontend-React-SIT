import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/tutoring-topics/";

export default function useTemasTutoria() {
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchTemas = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTemas(res.data);
        } catch (err) {
            toast.error("Error al cargar temas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createTema = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando tema...",
                success: "Tema creado",
                error: "Error al crear tema",
            }
        ).then((res) => {
            setTemas((prev) => [...prev, res.data]);
        });
    };

    const updateTema = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando tema...",
                success: "Tema actualizado",
                error: "Error al actualizar tema",
            }
        ).then((res) => {
            setTemas((prev) =>
                prev.map((t) => (t.tutoring_topic_id === id ? res.data : t))
            );
        });
    };

    const deleteTema = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando tema...",
                success: "Tema eliminado",
                error: "Error al eliminar tema",
            }
        ).then(() => {
            setTemas((prev) => prev.filter((t) => t.tutoring_topic_id !== id));
        });
    };

    useEffect(() => {
        fetchTemas();
    }, []);

    return {
        temas,
        createTema,
        updateTema,
        deleteTema,
        loading,
    };
}
