import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://72.61.0.205:8000/api/academics/tutoring-groups/";

export default function useGruposTutoria() {
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchGrupos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGrupos(res.data);
        } catch (err) {
            toast.error("Error al cargar grupos de tutoría");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createGrupo = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando grupo...",
                success: "Grupo creado",
                error: "Error al crear grupo",
            }
        ).then((res) => {
            setGrupos((prev) => [...prev, res.data]);
        });
    };

    const updateGrupo = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando grupo...",
                success: "Grupo actualizado",
                error: "Error al actualizar grupo",
            }
        ).then((res) => {
            setGrupos((prev) =>
                prev.map((g) => (g.tutoring_group_id === id ? res.data : g))
            );
        });
    };

    const deleteGrupo = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando grupo...",
                success: "Grupo eliminado",
                error: "Error al eliminar grupo",
            }
        ).then(() => {
            setGrupos((prev) => prev.filter((g) => g.tutoring_group_id !== id));
        });
    };

    useEffect(() => {
        fetchGrupos();
    }, []);

    return {
        grupos,
        createGrupo,
        updateGrupo,
        deleteGrupo,
        loading,
    };
}
