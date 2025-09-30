import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/semesters/";

export default function useSemestres() {
    const [semestres, setSemestres] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchSemestres = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSemestres(response.data);
        } catch (err) {
            toast.error("Error al cargar semestres");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createSemestre = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando semestre...",
                success: "Semestre creado",
                error: "Error al crear semestre",
            }
        ).then((res) => {
            setSemestres((prev) => [...prev, res.data]);
        });
    };

    const updateSemestre = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando semestre...",
                success: "Semestre actualizado",
                error: "Error al actualizar semestre",
            }
        ).then((res) => {
            setSemestres((prev) =>
                prev.map((s) => (s.semester_id === id ? res.data : s))
            );
        });
    };

    const deleteSemestre = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando semestre...",
                success: "Semestre eliminado",
                error: "Error al eliminar semestre",
            }
        ).then(() => {
            setSemestres((prev) => prev.filter((s) => s.semester_id !== id));
        });
    };

    useEffect(() => {
        fetchSemestres();
    }, []);

    return {
        semestres,
        createSemestre,
        updateSemestre,
        deleteSemestre,
        loading,
    };
}
