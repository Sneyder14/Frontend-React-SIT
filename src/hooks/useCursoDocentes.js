import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/course-teachers/";

export default function useCursoDocentes() {
    const [cursoDocentes, setCursoDocentes] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchCursoDocentes = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCursoDocentes(res.data);
        } catch (err) {
            toast.error("Error al cargar asignaciones");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createCursoDocente = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Asignando docente...",
                success: "Docente asignado",
                error: "Error al asignar docente",
            }
        ).then((res) => {
            setCursoDocentes((prev) => [...prev, res.data]);
        });
    };

    const updateCursoDocente = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando asignación...",
                success: "Asignación actualizada",
                error: "Error al actualizar asignación",
            }
        ).then((res) => {
            setCursoDocentes((prev) =>
                prev.map((d) => (d.course_teacher_id === id ? res.data : d))
            );
        });
    };

    const deleteCursoDocente = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando asignación...",
                success: "Asignación eliminada",
                error: "Error al eliminar asignación",
            }
        ).then(() => {
            setCursoDocentes((prev) =>
                prev.filter((d) => d.course_teacher_id !== id)
            );
        });
    };

    useEffect(() => {
        fetchCursoDocentes();
    }, []);

    return {
        cursoDocentes,
        createCursoDocente,
        updateCursoDocente,
        deleteCursoDocente,
        loading,
    };
}
