import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://72.61.0.205:8000/api/academics/teachers/";

export default function useProfesores() {
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const fetchProfesores = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfesores(response.data);
        } catch (err) {
            toast.error("Error al cargar profesores");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createProfesor = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando profesor...",
                success: "Profesor creado",
                error: "Error al crear profesor",
            }
        ).then((res) => {
            setProfesores((prev) => [...prev, res.data]);
        });
    };

    const updateProfesor = async (teacher_id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${teacher_id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando profesor...",
                success: "Profesor actualizado",
                error: "Error al actualizar profesor",
            }
        ).then((res) => {
            setProfesores((prev) =>
                prev.map((p) => (p.teacher_id === teacher_id ? res.data : p))
            );
        });
    };

    const deleteProfesor = async (teacher_id) => {
        await toast.promise(
            axios.delete(`${API_URL}${teacher_id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando profesor...",
                success: "Profesor eliminado",
                error: "El profesor Tiene Cursos Asignados",
            }
        ).then(() => {
            setProfesores((prev) => prev.filter((p) => p.teacher_id !== teacher_id));
        });
    };

    useEffect(() => {
        fetchProfesores();
    }, []);

    return {
        profesores,
        createProfesor,
        updateProfesor,
        deleteProfesor,
        loading,
    };
}
