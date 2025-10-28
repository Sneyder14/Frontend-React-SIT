import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://72.61.0.205:8000/api/academics/students/";

export default function useEstudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchEstudiantes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEstudiantes(response.data);
        } catch (err) {
            toast.error("Error al cargar estudiantes");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createEstudiante = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando estudiante...",
                success: "Estudiante creado",
                error: "Error al crear estudiante",
            }
        ).then((res) => {
            setEstudiantes((prev) => [...prev, res.data]);
        });
    };

    const updateEstudiante = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando estudiante...",
                success: "Estudiante actualizado",
                error: "Error al actualizar estudiante",
            }
        ).then((res) => {
            setEstudiantes((prev) =>
                prev.map((e) => (e.student_id === id ? res.data : e))
            );
        });
    };

    const deleteEstudiante = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando estudiante...",
                success: "Estudiante eliminado",
                error: "Error al eliminar estudiante",
            }
        ).then(() => {
            setEstudiantes((prev) => prev.filter((e) => e.student_id !== id));
        });
    };

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    return {
        estudiantes,
        createEstudiante,
        updateEstudiante,
        deleteEstudiante,
        loading,
    };
}
