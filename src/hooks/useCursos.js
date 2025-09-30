import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/courses/";

export default function useCursos() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchCursos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCursos(response.data);
        } catch (err) {
            toast.error("Error al cargar cursos");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createCurso = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando curso...",
                success: "Curso creado",
                error: "Error al crear curso",
            }
        ).then((res) => {
            setCursos((prev) => [...prev, res.data]);
        });
    };

    const updateCurso = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando curso...",
                success: "Curso actualizado",
                error: "Error al actualizar curso",
            }
        ).then((res) => {
            setCursos((prev) =>
                prev.map((c) => (c.course_id === id ? res.data : c))
            );
        });
    };

    const deleteCurso = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando curso...",
                success: "Curso eliminado",
                error: "Error al eliminar curso",
            }
        ).then(() => {
            setCursos((prev) => prev.filter((c) => c.course_id !== id));
        });
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    return {
        cursos,
        createCurso,
        updateCurso,
        deleteCurso,
        loading,
    };
}
